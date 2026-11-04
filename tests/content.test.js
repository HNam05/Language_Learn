import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lessons } from '../app/content/lessons.js';
import { lessons as courseLessons } from '../app/content/lessons.js';
import { courseModules } from '../app/content/course.js';
import { whyGrammar } from '../app/src/ui.js';
import { homeView, lessonView, pathView, reviewView } from '../app/src/views.js';
import { emptyState } from '../app/src/state.js';

test('lesson identifiers, accepted answers and audio assets form a consistent offline course', () => {
  const manifest = JSON.parse(readFileSync(new URL('../app/content/audio-manifest.json', import.meta.url), 'utf8'));
  const ids = new Set();
  const usedAudio = new Set();
  const text = value => assert.ok(typeof value === 'string' && value.trim());
  for (const lesson of lessons) {
    for (const item of [lesson, ...lesson.words, ...lesson.steps]) {
      assert.ok(!ids.has(item.id), `Duplicate ID: ${item.id}`);
      ids.add(item.id);
    }
    for (const step of lesson.steps) {
      text(step.vi);
      assert.ok(['study', 'rule', 'choice', 'input', 'free'].includes(step.type));
      if (step.type === 'choice') assert.ok(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.options.length);
      if (step.type === 'input') { assert.ok(step.answers.length > 0); step.answers.forEach(text); }
      if (step.type === 'free') { text(step.model); assert.ok(step.checklist.length > 0); }
      if (!step.audio) continue;
      assert.match(step.audio, /^[a-z0-9-]+\.wav$/u);
      const entries = manifest.filter(item => item.file === step.audio);
      assert.equal(entries.length, 1, `Missing/duplicate manifest entry: ${step.audio}`);
      if (step.transcript) assert.equal(entries[0].text, step.transcript);
      if (step.type === 'study') assert.equal(entries[0].text, lesson.dialogue.map(line => line.de).join(' '));
      const wav = readFileSync(new URL(`../app/assets/audio/${step.audio}`, import.meta.url));
      assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
      assert.equal(wav.toString('ascii', 8, 12), 'WAVE');
      assert.ok(wav.length > 44, 'Audio must contain more than a WAV header');
      usedAudio.add(step.audio);
    }
  }
  assert.equal(usedAudio.size, manifest.length, 'Manifest contains audio not used by a lesson');
});

test('pilot lessons have explicit course-module metadata without changing legacy IDs', () => {
  assert.deepEqual(courseLessons.map(lesson => lesson.id), ['vorstellen', 'a1-m01-l02', 'a1-m01-l03', 'a1-m01-l04', 'a1-m01-l05', 'a1-m01-l06', 'a1-m02-l01', 'a1-m02-l02', 'a1-m02-l03', 'a1-m02-l04', 'a1-m02-l05', 'a1-m02-l06', 'a1-m03-l01', 'a1-m03-l02', 'a1-m03-l03', 'a1-m03-l04', 'a1-m03-l05', 'a1-m03-l06', 'termine', 'einkaufen', 'gestern']);
  assert.deepEqual([...new Set(courseLessons.map(lesson => lesson.moduleId))], ['a1-m01', 'a1-m02', 'a1-m03', 'a1-m04', 'a1-m06', 'a1-m12']);
  assert.equal(courseModules.length, 6);
  for (const lesson of courseLessons) {
    assert.ok(Array.isArray(lesson.goalIds) && lesson.goalIds.length > 0);
    assert.ok(Array.isArray(lesson.skills) && lesson.skills.length > 0);
  }
});

test('text-first pilot step does not create an empty audio source', () => {
  const lesson = courseLessons.find(item => item.id === 'vorstellen');
  const study = lesson.steps.find(step => step.id === 'vorstellen-dialog');
  const listening = lesson.steps.find(step => step.id === 'vorstellen-hoeren');
  const studyHtml = lessonView(lesson, { step: lesson.steps.indexOf(study), answers: {} }, { vietnamese: false });
  const listeningHtml = lessonView(lesson, { step: lesson.steps.indexOf(listening), answers: {} }, { vietnamese: false });
  assert.doesNotMatch(studyHtml, /assets\/audio\/(?:"|')/u);
  assert.match(listeningHtml, /class="source-text"/u);
  assert.match(listeningHtml, /Ich komme aus Vietnam/u);
  assert.doesNotMatch(listeningHtml, /Eine Antwort hören/u);
});

test('Vietnamese grammar explanations and headings respect the help switch', () => {
  for (const lesson of lessons) {
    const rule = lesson.steps.find(step => step.type === 'rule');
    const off = whyGrammar(rule.why, { vietnamese: false });
    const on = whyGrammar(rule.why, { vietnamese: true });
    assert.doesNotMatch(off, /lang="vi"|So sánh|Tại sao/u);
    assert.match(on, /lang="vi"/u);
    assert.match(on, /Tại sao/u);
    assert.match(off, /<details[^>]+data-disclosure="grammar"/u);
    assert.doesNotMatch(off, /<details[^>]+\bopen\b/u);
  }
});

test('failed answers retain a live hint for subsequent empty submissions', () => {
  const lesson = lessons[0];
  const index = lesson.steps.findIndex(step => step.type === 'input');
  const step = lesson.steps[index];
  const html = lessonView(lesson, { step: index, answers: { [step.id]: { value: 'falsch', checked: true, correct: false } } }, { vietnamese: false });
  assert.match(html, /id="answer-hint"/u);
  assert.match(html, /role="status" tabindex="-1"/u);
  assert.doesNotMatch(html, /data-action="next"/u);
});

test('saved learner text is escaped and appears in the learning path', () => {
  const state = emptyState();
  const free = lessons[0].steps.find(step => step.type === 'free');
  state.notes[free.id] = '<img src=x onerror=alert(1)>\nMein Termin.';
  const html = pathView(lessons, state);
  assert.match(html, /Meine Sätze für den Sprachkurs/u);
  assert.match(html, /data-action="print-notes"/u);
  assert.match(html, /&lt;img/u);
  assert.doesNotMatch(html, /<img/u);
});

test('learning path groups registered lessons by module and states available scope honestly', () => {
  const html = pathView(courseLessons, emptyState());
  assert.match(html, /Kontakt aufnehmen/u);
  assert.match(html, /Zeit und Termine/u);
  assert.match(html, /0 von 21 verfügbaren Lektionen geübt/u);
  assert.doesNotMatch(html, /module-b1/u);
});

test('voluntary vocabulary practice does not promise to change scheduled reviews', () => {
  const html = reviewView(lessons[0].words[0], { stage: 0, due: 0 }, true, 1, 1, { vietnamese: false }, true);
  assert.match(html, /verändert Ihre geplanten Wiederholungen nicht/u);
  assert.doesNotMatch(html, /bestimmt die nächste Wiederholung/u);
});

test('first visit explains the app and lets the learner choose the help language', () => {
  const state = emptyState();
  const first = homeView(lessons, state);
  assert.match(first, /So funktioniert Ihre Übung/u);
  assert.match(first, /data-action="start-with-vietnamese"/u);
  assert.match(first, /data-action="start-german-only"/u);
  assert.match(first, /lang="vi"/u);
  state.settings.onboardingSeen = true;
  const returning = homeView(lessons, state);
  assert.doesNotMatch(returning, /So funktioniert Ihre Übung/u);
  assert.match(returning, /heute wiederholen/u);
});
