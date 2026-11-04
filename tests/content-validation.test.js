import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lessons } from '../app/content/lessons.js';
import { legacyLessons } from '../app/content/legacy-lessons.js';
import { courseModules } from '../app/content/course.js';
import { validateContent } from '../scripts/validate-content.mjs';
import { emptyState, validateState } from '../app/src/state.js';
import { lessonView } from '../app/src/views.js';

const manifest = JSON.parse(readFileSync(new URL('../app/content/audio-manifest.json', import.meta.url)));
const check = (items, modules = courseModules) => validateContent(items, modules, manifest, file => readFileSync(new URL(`../app/assets/audio/${file}`, import.meta.url)));
test('shared course passes structural validation', () => assert.equal(check(lessons).lessons, lessons.length));
// Corruptions address lessons by ID so new modules do not shift the fixtures.
const byId = (items, id) => items.find(lesson => lesson.id === id);
const corruptions = [
  ['null accepted answer', items => { items[0].steps.find(s => s.type === 'input').answers = [null]; }, /Antworten/],
  ['missing reading source', items => { const step = items[0].steps.find(s => s.comprehension === 'reading'); delete step.sourceText; delete step.transcript; }, /Textquelle/],
  ['missing goal', items => { items[0].goalIds = ['missing']; }, /Lernziel/],
  ['empty option', items => { items[0].steps.find(s => s.type === 'choice').options[0] = ''; }, /Antworten/],
  ['duplicate options', items => { const s = items[0].steps.find(s => s.type === 'choice'); s.options[1] = s.options[0]; }, /Doppelte Antworten/],
  ['invalid answer index', items => { items[0].steps.find(s => s.type === 'choice').answer = 99; }, /Lösungsindex/],
  ['missing listening audio', items => { delete byId(items, 'termine').steps.find(s => s.audio).audio; }, /Audio/],
  ['missing audio in a module listening task', items => { delete byId(items, 'a1-m01-l04').steps.find(s => s.type === 'choice' && s.audio).audio; }, /Audio/],
  ['wrong dialogue transcript', items => { byId(items, 'termine').dialogue[0].de = 'Ein anderer Text.'; }, /Transkript/],
  ['wrong module dialogue transcript', items => { byId(items, 'a1-m01-l06').dialogue[4].de = 'Ich komme aus Bremen.'; }, /Transkript/],
  ['unknown module', items => { items[0].moduleId = 'missing'; }, /Modulverweis/],
  ['duplicate step ID', items => { items[0].steps[1].id = items[0].steps[0].id; }, /Doppelte ID/]
];
for (const [name, corrupt, error] of corruptions) test(`rejects ${name}`, () => {
  const copy = structuredClone(lessons); corrupt(copy); assert.throws(() => check(copy), error);
});
test('a module cannot be declared complete with fewer than six lessons', () => {
  const modules = structuredClone(courseModules);
  const module = modules.find(item => item.id === 'a1-m01');
  const removed = module.lessonIds.pop();
  module.status = 'complete';
  assert.throws(() => check(lessons.filter(lesson => lesson.id !== removed), modules), /sechs Lektionen/);
});
test('A1-M01 has all six slots in order and may be marked complete only structurally', () => {
  const module = courseModules.find(item => item.id === 'a1-m01');
  assert.deepEqual(module.lessonIds, ['vorstellen', 'a1-m01-l02', 'a1-m01-l03', 'a1-m01-l04', 'a1-m01-l05', 'a1-m01-l06']);
  assert.equal(module.status, 'pilot', 'stays pilot until human review');
  const modules = structuredClone(courseModules); modules.find(item => item.id === 'a1-m01').status = 'complete';
  assert.equal(check(lessons, modules).lessons, lessons.length);
  for (const id of module.lessonIds.slice(1)) {
    const lesson = byId(lessons, id);
    assert.ok(lesson.steps.length >= 6 && lesson.steps.length <= 9, `${id}: 6–9 Schritte`);
    assert.ok(lesson.words.length <= 6, `${id}: höchstens sechs neue Einträge`);
    assert.ok(lesson.steps.every(step => step.id.startsWith(`${id}-s`)) && lesson.words.every(word => word.id.startsWith(`${id}-w`)));
  }
  const l05 = byId(lessons, 'a1-m01-l05');
  assert.deepEqual(l05.steps.filter(step => step.type === 'free').map(step => step.mode), ['writing', 'speaking'], 'L05: Schreiben und Sprechen getrennt');
  assert.ok(byId(lessons, 'a1-m01-l06').steps.some(step => step.mode === 'interaction'));
});
// Production rules from the masterplan (section 4) for every fully written module.
const writtenModules = courseModules.filter(module => module.lessonIds.length === 6).map(module => module.id);
test('at least the first three A1 modules are fully written', () => assert.ok(['a1-m01', 'a1-m02', 'a1-m03'].every(id => writtenModules.includes(id))));
for (const moduleId of writtenModules) test(`${moduleId} follows the module production rules`, () => {
  const module = courseModules.find(item => item.id === moduleId);
  assert.equal(module.lessonIds.length, 6);
  const own = module.lessonIds.filter(id => id.startsWith(moduleId));
  for (const id of own) {
    const lesson = byId(lessons, id);
    assert.ok(lesson.steps.length >= 6 && lesson.steps.length <= 9, `${id}: 6–9 Schritte`);
    assert.ok(lesson.words.length <= 6, `${id}: höchstens sechs neue Einträge`);
    assert.ok(lesson.steps.every(step => step.id.startsWith(`${id}-s`)) && lesson.words.every(word => word.id.startsWith(`${id}-w`)), `${id}: ID-Schema`);
    assert.ok(lesson.steps.some(step => step.type === 'free'), `${id}: eigene Leistung`);
    assert.ok(lesson.steps.some(step => step.type === 'rule' && step.why?.vi), `${id}: kontrastive Erklärung`);
  }
  const l05 = byId(lessons, `${moduleId}-l05`);
  assert.deepEqual(l05.steps.filter(step => step.type === 'free').map(step => step.mode), ['writing', 'speaking'], 'L05: Schreiben und Sprechen getrennt');
  const l06 = byId(lessons, `${moduleId}-l06`);
  assert.ok(l06.steps.some(step => step.mode === 'interaction'), 'L06: Interaktion');
  assert.ok(module.lessonIds.some(id => byId(lessons, id).steps.some(step => step.audio && step.type === 'choice')), 'mindestens eine Höraufgabe im Modul');
});
test('example phone numbers are reserved media numbers only', () => {
  const text = JSON.stringify(lessons);
  const numbers = text.match(/0\d{2,4} \d{4,6} \d{3}/gu) || [];
  assert.ok(numbers.length > 0);
  for (const number of numbers) assert.match(number, /^(030 23125|040 66969) \d{3}$/u, number);
  for (const mail of text.match(/[\w.]+@[\w.]+/gu) || []) assert.match(mail, /@example\.com$/u, mail);
});
test('every old lesson keeps IDs, step order and saved answers after aggregation', () => {
  for (const legacy of legacyLessons) {
    const current = lessons.find(l => l.id === legacy.id);
    assert.deepEqual(current.steps.map(s => s.id), legacy.steps.map(s => s.id));
    const free = legacy.steps.find(s => s.type === 'free');
    const state = emptyState(); state.completed[legacy.id] = 1; state.notes[free.id] = 'Mein eigener Satz.';
    state.active = { lessonId: legacy.id, step: legacy.steps.indexOf(free), answers: { [free.id]: { value: 'Mein Entwurf.', checked: false, correct: false } } };
    assert.deepEqual(validateState(state, lessons), state);
  }
});
for (const mode of ['speaking', 'interaction', 'mediation']) test(`${mode}: help is available before confirmation without completing the task`, () => {
  const lesson = structuredClone(lessons[0]); const index = lesson.steps.findIndex(s => s.type === 'free');
  lesson.steps[index].mode = mode;
  const html = lessonView(lesson, { step: index, answers: {} }, { vietnamese: false });
  assert.match(html, /<details[^>]*data-disclosure="spoken-model"/);
  assert.match(html, /<summary>Beispiel und Hilfe ansehen<\/summary>/);
  assert.match(html, /data-action="mark-free"/);
  assert.doesNotMatch(html, /data-action="next"|id="free-answer"/);
});
