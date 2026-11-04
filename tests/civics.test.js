import test from 'node:test';
import assert from 'node:assert/strict';
import { civicsQuestions, civicsTopics, bundeslaender } from '../app/content/civics.js';
import { lessons } from '../app/content/lessons.js';
import { validateCivics } from '../scripts/validate-content.mjs';
import { DAY, emptyState, validateState, civicsRound, answerCivics, civicsProgress, mockTestIds, startCivicsSession, answerCivicsSession, advanceCivicsSession } from '../app/src/state.js';
import { civicsView, civicsQuizView } from '../app/src/civics-views.js';
import { homeView } from '../app/src/views.js';

// Independent fixtures guard scheduling while authors revise the shipped questions.
const questions = [
  { id: 'lid-a', topic: 'demokratie', options: ['a', 'b', 'c', 'd'], answer: 0 },
  { id: 'lid-b', topic: 'demokratie', options: ['a', 'b', 'c', 'd'], answer: 1 },
  { id: 'lid-c', topic: 'geschichte', options: ['a', 'b', 'c', 'd'], answer: 2 },
];
const now = Date.UTC(2026, 10, 4, 12);
const sources = { checked: 'November 2026', trainer: 'https://example.test/trainer', info: 'https://example.test/info' };

test('shipped practice questions pass the content validator', () => {
  assert.deepEqual(validateCivics(civicsQuestions, civicsTopics), { questions: 148, topics: 4 });
  assert.equal(civicsQuestions.filter(question => !question.land).length, 100);
  for (const topic of civicsTopics.filter(item => item.id !== 'bundesland')) assert.ok(civicsQuestions.filter(question => question.topic === topic.id && !question.land).length >= 30);
});

test('every Land has three questions with the expected stable answers', () => {
  assert.equal(bundeslaender.length, 16);
  const answer = id => { const question = civicsQuestions.find(item => item.id === id); return question.options[question.answer]; };
  for (const land of bundeslaender) {
    const own = civicsQuestions.filter(question => question.land === land.id);
    assert.equal(own.length, 3, land.id);
    assert.ok(own.every(question => question.topic === 'bundesland'));
  }
  assert.equal(answer('lid-l-sachsen-hauptstadt'), 'Dresden');
  assert.equal(answer('lid-l-hessen-hauptstadt'), 'Wiesbaden');
  assert.equal(answer('lid-l-berlin-parlament'), 'das Abgeordnetenhaus');
  assert.equal(answer('lid-l-hamburg-regierung'), 'der Erste Bürgermeister oder die Erste Bürgermeisterin');
  assert.equal(answer('lid-l-bremen-parlament'), 'die Bürgerschaft');
  assert.ok(civicsQuestions.some(question => question.id === 'lid-l-berlin-stadtstaat'));
});

test('the chosen Land is validated and kept in backups; older backups without it stay readable', () => {
  const state = emptyState();
  state.settings.bundesland = 'sachsen';
  assert.equal(validateState(state, lessons, civicsQuestions).settings.bundesland, 'sachsen');
  assert.equal(validateState(emptyState(), lessons, civicsQuestions).settings.bundesland, undefined);
  state.settings.bundesland = 'atlantis';
  assert.throws(() => validateState(state, lessons, civicsQuestions), /Bundesland/u);
});

test('read-aloud buttons carry escaped text in the shown option order', () => {
  const question = { ...civicsQuestions[0], prompt: 'Frage "mit" <Zeichen>?' };
  const html = civicsQuizView({ question: question, order: [1, 0, 2, 3], selection: { value: '', checked: false, correct: false }, position: 0, total: 1, score: 0, mode: 'round', mistakes: [] }, { vietnamese: false });
  assert.match(html, /data-action="speak" data-rate="1"/u);
  assert.match(html, /data-rate="0.8"/u);
  assert.match(html, /&quot;mit&quot; &lt;Zeichen&gt;\? Die Antworten: das Bundesgesetz\. das Grundgesetz/u);
  assert.doesNotMatch(html, /<Zeichen>/u);
});

test('overview offers the Land choice and names the chosen Land', () => {
  const settings = { vietnamese: false, bundesland: 'bayern' };
  const progress = { all: civicsProgress(emptyState(), civicsQuestions), bundesland: civicsProgress(emptyState(), civicsQuestions.filter(question => question.land === 'bayern')) };
  const html = civicsView(civicsTopics.filter(topic => topic.id === 'bundesland'), progress, sources, settings, bundeslaender);
  assert.match(html, /id="bundesland-select"/u);
  assert.match(html, /<option value="bayern" selected>Bayern/u);
  assert.match(html, /Mein Bundesland: Bayern/u);
});

test('validator rejects broken solutions, missing Vietnamese help and unknown topics', () => {
  const valid = civicsQuestions[0];
  assert.throws(() => validateCivics([{ ...valid, answer: 4 }], civicsTopics), /Lösungsindex/u);
  assert.throws(() => validateCivics([{ ...valid, optionsVi: valid.optionsVi.slice(0, 3) }], civicsTopics), /optionsVi|Vietnamesische/u);
  assert.throws(() => validateCivics([{ ...valid, topic: 'sport' }], civicsTopics), /Unbekanntes Thema/u);
  assert.throws(() => validateCivics([valid, valid], civicsTopics), /doppelte Fragen-ID/u);
  assert.throws(() => validateCivics([{ ...valid, options: ['a', 'a', 'b', 'c'] }], civicsTopics), /Doppelte Antworten/u);
});

test('a round offers due questions first, then unseen ones, and skips questions not yet due', () => {
  const state = emptyState();
  state.civics['lid-a'] = { stage: 2, due: now + DAY };
  state.civics['lid-b'] = { stage: 0, due: now - DAY };
  assert.deepEqual(civicsRound(state, questions, { now }), ['lid-b', 'lid-c']);
  assert.deepEqual(civicsRound(state, questions, { now, topic: 'geschichte' }), ['lid-c']);
  assert.deepEqual(civicsRound(state, questions, { now, size: 1 }), ['lid-b']);
});

test('correct answers move a question further out; a wrong answer returns it tomorrow without other penalty', () => {
  let state = answerCivics(emptyState(), 'lid-a', true, now);
  assert.deepEqual(state.civics['lid-a'], { stage: 1, due: now + DAY });
  state = answerCivics(state, 'lid-a', true, now);
  assert.equal(state.civics['lid-a'].stage, 2);
  state = answerCivics(state, 'lid-a', false, now);
  assert.deepEqual(state.civics['lid-a'], { stage: 0, due: now + DAY });
  state = answerCivics(state, 'lid-b', true, now);
  assert.deepEqual(civicsProgress(state, questions, now), { total: 3, seen: 2, secure: 0, due: 0 });
  assert.deepEqual(civicsProgress(state, questions, now + DAY), { total: 3, seen: 2, secure: 0, due: 2 });
});

test('backups without civics stay readable; malformed or unknown civics entries are rejected', () => {
  const legacy = emptyState();
  delete legacy.civics;
  assert.deepEqual(validateState(legacy, lessons, questions).civics, {});
  const valid = { ...emptyState(), civics: { 'lid-a': { stage: 1, due: now, extra: '<b>' } } };
  assert.deepEqual(validateState(valid, lessons, questions).civics, { 'lid-a': { stage: 1, due: now } });
  assert.throws(() => validateState({ ...emptyState(), civics: { 'lid-x': { stage: 1, due: now } } }, lessons, questions), /Testfrage/u);
  assert.throws(() => validateState({ ...emptyState(), civics: { 'lid-a': { stage: 9, due: now } } }, lessons, questions), /Testfrage/u);
  assert.throws(() => validateState({ ...emptyState(), civics: [] }, lessons, questions), /Testfragen/u);
});

test('quiz view shows shuffled options, hides Vietnamese by default and names the right answer after a mistake', () => {
  const question = civicsQuestions[0];
  const order = [3, 2, 1, 0];
  const open = civicsQuizView({ question: question, order: order, selection: { value: '', checked: false, correct: false }, position: 0, total: 10, score: 0, mode: 'round', mistakes: [] }, { vietnamese: false });
  assert.ok(open.indexOf(question.options[3]) < open.indexOf(question.options[0]));
  assert.doesNotMatch(open, /lang="vi"/u);
  assert.match(open, /id="civics-form"/u);
  assert.doesNotMatch(open, /data-action="civics-next"/u);
  const wrongIndex = order.findIndex(original => original !== question.answer);
  const wrong = civicsQuizView({ question: question, order: order, selection: { value: String(wrongIndex), checked: true, correct: false }, position: 0, total: 10, score: 0, mode: 'round', mistakes: [] }, { vietnamese: true });
  assert.match(wrong, new RegExp(`Die richtige Antwort ist: ${question.options[question.answer]}`, 'u'));
  assert.match(wrong, /wrong-choice/u);
  assert.match(wrong, /choice-mark">Richtig/u);
  assert.match(wrong, /lang="vi"/u);
  assert.match(wrong, /data-action="civics-next"/u);
  assert.doesNotMatch(wrong, /type="submit"/u);
});

test('round summary reassures and keeps voluntary practice from promising schedule changes', () => {
  const done = mode => civicsQuizView({ question: null, total: 10, position: 10, score: 7, mode, mistakes: [] }, { vietnamese: false });
  assert.match(done('round'), /7 von 10 Fragen/u);
  assert.match(done('round'), /17 von 33/u);
  assert.match(done('voluntary'), /nicht verändert/u);
  assert.match(civicsQuizView({ question: null, total: 0, position: 0, score: 0, mode: 'round', mistakes: [] }, { vietnamese: false }), /Gerade nichts offen/u);
});

test('overview explains requirements, the contract-worker rule and links to the official catalogue', () => {
  const progress = { all: civicsProgress(emptyState(), civicsQuestions), ...Object.fromEntries(civicsTopics.map(topic => [topic.id, civicsProgress(emptyState(), civicsQuestions.filter(question => question.topic === topic.id))])) };
  const html = civicsView(civicsTopics, progress, sources, { vietnamese: false });
  assert.match(html, /mindestens 17 richtige Antworten/u);
  assert.match(html, /13\. Juni 1990/u);
  assert.match(html, /ersetzen keine Beratung/u);
  assert.match(html, /href="https:\/\/example\.test\/trainer" target="_blank" rel="noopener"/u);
  assert.match(html, /data-action="civics-start"/u);
  assert.doesNotMatch(html, /lang="vi"/u);
  assert.match(civicsView(civicsTopics, progress, sources, { vietnamese: true }), /lang="vi"/u);
});

test('home page links the citizenship goal when progress is provided', () => {
  const state = { ...emptyState(), settings: { ...emptyState().settings, onboardingSeen: true } };
  const html = homeView(lessons, state, civicsProgress(state, civicsQuestions));
  assert.match(html, /Ziel Einbürgerung/u);
  assert.match(html, /data-action="civics"/u);
  assert.doesNotMatch(homeView(lessons, state), /Ziel Einbürgerung/u);
});

const session = (mode, ids = ['lid-a', 'lid-b']) => startCivicsSession(emptyState(), mode, ids.map(id => ({ id, order: [3, 2, 1, 0] })));

test('a mock test draws 30 general and 3 Land questions, or 33 general without a Land', () => {
  const pool = [...Array(40).keys()].map(index => ({ id: `lid-g${index}` })).concat([1, 2, 3, 4].map(index => ({ id: `lid-l${index}`, land: 'bayern' })));
  const random = (() => { let seed = 7; return () => (seed = (seed * 16807) % 2147483647) / 2147483647; })();
  const withLand = mockTestIds(pool, 'bayern', random);
  assert.equal(withLand.length, 33);
  assert.equal(new Set(withLand).size, 33);
  assert.equal(withLand.filter(id => id.startsWith('lid-l')).length, 3);
  const without = mockTestIds(pool, '', random);
  assert.equal(without.length, 33);
  assert.ok(without.every(id => id.startsWith('lid-g')));
  assert.equal(mockTestIds(civicsQuestions, 'sachsen').filter(id => id.startsWith('lid-l-sachsen')).length, 3);
});

test('sessions record each answer once and schedule according to their mode', () => {
  // order [3, 2, 1, 0]: shown index 3 is original 0 (correct for lid-a), shown 0 is wrong.
  let state = answerCivicsSession(session('round'), questions, '3', now);
  assert.deepEqual(state.civicsSession.results, [{ value: '3', correct: true }]);
  assert.deepEqual(state.civics['lid-a'], { stage: 1, due: now + DAY });
  assert.equal(answerCivicsSession(state, questions, '0', now), state, 'second answer to the same question is ignored');
  state = advanceCivicsSession(state);
  assert.equal(state.civicsSession.position, 1);
  assert.equal(advanceCivicsSession(state), state, 'cannot skip an unanswered question');

  const voluntary = answerCivicsSession(session('voluntary'), questions, '0', now);
  assert.deepEqual(voluntary.civics, {});
  const mockRight = answerCivicsSession(session('mock'), questions, '3', now);
  assert.deepEqual(mockRight.civics, {}, 'a correct mock answer does not move a review');
  const mockWrong = answerCivicsSession(session('mock'), questions, '0', now);
  assert.deepEqual(mockWrong.civics['lid-a'], { stage: 0, due: now + DAY });
});

test('a paused session survives a backup; tampered results are recomputed or rejected', () => {
  const state = advanceCivicsSession(answerCivicsSession(session('mock'), questions, '3', now));
  const restored = validateState(JSON.parse(JSON.stringify(state)), lessons, questions);
  assert.deepEqual(restored.civicsSession, state.civicsSession);
  const tampered = structuredClone(state);
  tampered.civicsSession.results[0] = { value: '0', correct: true };
  assert.equal(validateState(tampered, lessons, questions).civicsSession.results[0].correct, false);
  const broken = mutate => { const copy = structuredClone(state); mutate(copy.civicsSession); return () => validateState(copy, lessons, questions); };
  assert.throws(broken(item => { item.mode = 'exam'; }), /Testrunde/u);
  assert.throws(broken(item => { item.items[0].id = 'lid-x'; }), /Testrunde/u);
  assert.throws(broken(item => { item.items[0].order = [0, 0, 1, 2]; }), /Testrunde/u);
  assert.throws(broken(item => { item.position = 0; item.results = []; item.position = 2; }), /Testrunde/u);
  assert.throws(broken(item => { item.results[0].value = '7'; }), /Testrunde/u);
  const legacy = emptyState();
  delete legacy.civicsSession;
  assert.equal(validateState(legacy, lessons, questions).civicsSession, null);
});

test('mock test hides solutions until the end and the summary lists mistakes kindly', () => {
  const question = civicsQuestions[0];
  const html = civicsQuizView({ question, order: [0, 1, 2, 3], selection: { value: '', checked: false, correct: false }, position: 0, total: 33, score: 0, mode: 'mock', mistakes: [] }, { vietnamese: false });
  assert.match(html, /Probeprüfung · Frage 1 von 33/u);
  assert.match(html, /Antwort speichern und weiter/u);
  assert.match(html, /Lösungen erst am Ende/u);
  const failed = civicsQuizView({ question: null, total: 33, position: 33, score: 15, mode: 'mock', mistakes: [question] }, { vietnamese: false });
  assert.match(failed, /Probeprüfung beendet/u);
  assert.match(failed, /Es fehlen noch 2/u);
  assert.match(failed, /kein Urteil/u);
  assert.match(failed, /Diese Fragen üben wir weiter/u);
  assert.match(failed, new RegExp(`Richtig: ${question.options[question.answer]}`, 'u'));
  const passed = civicsQuizView({ question: null, total: 33, position: 33, score: 20, mode: 'mock', mistakes: [] }, { vietnamese: false });
  assert.match(passed, /zum Bestehen gereicht/u);
  assert.doesNotMatch(passed, /Diese Fragen üben wir weiter/u);
});

test('overview offers the mock test and a way back into a paused session', () => {
  const progress = { all: civicsProgress(emptyState(), civicsQuestions) };
  const open = { mode: 'mock', items: new Array(33).fill({}), position: 4, results: [] };
  const html = civicsView([], progress, sources, { vietnamese: false }, bundeslaender, open);
  assert.match(html, /data-action="civics-mock"/u);
  assert.match(html, /Begonnene Probeprüfung:<\/strong> Frage 5 von 33/u);
  assert.match(html, /data-action="civics-resume"/u);
  assert.match(html, /noch kein Bundesland gewählt/u);
  assert.doesNotMatch(civicsView([], progress, sources, { vietnamese: false }, bundeslaender), /civics-resume/u);
});
