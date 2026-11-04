import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEY, DAY, INTERVALS, emptyState, normalizeAnswer, isCorrect,
  validateState, completeLesson, scheduleReview, dueWords, createStore,
} from '../app/src/state.js';

// Deliberately independent from the lesson catalogue: these tests guard stored
// user data and answer grading even while authors revise the shipped content.
const lesson = {
  id: 'fixture-termin',
  words: [{ id: 'fixture-termin-word' }, { id: 'fixture-morgen-word' }],
  steps: [
    { id: 'fixture-choice', type: 'choice', options: ['Am Montag', 'Am Dienstag'], answer: 0 },
    { id: 'fixture-input', type: 'input', answers: ['Ich gehe zum großen Haus', 'Zum großen Haus'] },
    { id: 'fixture-speaking', type: 'speaking' },
  ],
};
const otherLesson = {
  id: 'fixture-einkauf',
  words: [{ id: 'fixture-brot-word' }],
  steps: [{ id: 'fixture-other-input', type: 'input', answers: ['Ein Brot'] }],
};
const lessons = [lesson, otherLesson];
const now = Date.UTC(2026, 8, 25, 12);
const clone = value => structuredClone(value);

function stateWithDraft() {
  return {
    ...emptyState(),
    active: {
      lessonId: lesson.id,
      step: 1,
      answers: {
        'fixture-choice': { value: '0', checked: true, correct: true },
        'fixture-input': { value: 'Ich gehe zum gro', checked: false, correct: false },
      },
    },
  };
}

function memoryStorage(initial = null) {
  let value = initial;
  return {
    writes: 0,
    failRead: false,
    failWrite: false,
    get value() { return value; },
    getItem(key) {
      assert.equal(key, STORAGE_KEY);
      if (this.failRead) throw new Error('SecurityError');
      return value;
    },
    setItem(key, next) {
      assert.equal(key, STORAGE_KEY);
      if (this.failWrite) throw new Error('QuotaExceededError');
      value = next;
      this.writes += 1;
    },
  };
}

test('answer normalization accepts Unicode umlauts, capitalization, spaces and final punctuation', () => {
  assert.equal(normalizeAnswer('  A\u0308RZTIN\t  am   Montag.  '), 'ärztin am montag');
  assert.equal(normalizeAnswer('Möchten Sie einen Termin?!'), 'möchten sie einen termin');
  const step = { type: 'input', answers: ['Die Ärztin ist da'] };
  assert.equal(isCorrect(step, '  Die A\u0308rztin   ist da. '), true);
});

test('answer normalization does not erase grammatical case or meaningful German spelling', () => {
  const step = lesson.steps[1];
  assert.equal(isCorrect(step, 'Ich gehe zum großen Haus.'), true);
  assert.equal(isCorrect(step, 'Ich gehe zum großem Haus.'), false);
  assert.equal(isCorrect(step, 'Ich gehe zu großen Haus.'), false);
  assert.equal(isCorrect({ type: 'input', answers: ['schön'] }, 'schon'), false);
  assert.equal(isCorrect({ type: 'input', answers: ['Ärztin'] }, 'Arztin'), false);
});

test('an unanswered choice is never graded as option zero', () => {
  const step = lesson.steps[0];
  for (const value of ['', ' ', '\t', 'unbekannt', '-1', '2']) {
    assert.equal(isCorrect(step, value), false, `Must reject ${JSON.stringify(value)}`);
  }
  assert.equal(isCorrect(step, '0'), true);
  assert.equal(isCorrect(step, '1'), false);
});

test('review intervals advance and cap; forgotten items return tomorrow', () => {
  let previous = { stage: 0, due: now };
  for (const days of [1, 3, 7, 14, 30, 30]) {
    const original = clone(previous);
    const next = scheduleReview(previous, true, now);
    assert.equal(next.due, now + days * DAY);
    assert.deepEqual(previous, original, 'Scheduling must not mutate prior state');
    previous = next;
  }
  assert.equal(previous.stage, INTERVALS.length);
  assert.deepEqual(scheduleReview(previous, false, now), { stage: 0, due: now + DAY });
});

test('lesson completion preserves an established review schedule and the caller state', () => {
  const state = stateWithDraft();
  state.reviews['fixture-termin-word'] = { stage: 4, due: now + 14 * DAY };
  const before = clone(state);
  const next = completeLesson(state, lesson, now);
  assert.deepEqual(state, before);
  assert.equal(next.completed[lesson.id], now);
  assert.equal(next.active, null);
  assert.deepEqual(next.reviews['fixture-termin-word'], before.reviews['fixture-termin-word']);
  assert.deepEqual(next.reviews['fixture-morgen-word'], { stage: 0, due: now + DAY });
});

test('repeating lesson completion is idempotent even at a later time', () => {
  const completed = completeLesson(emptyState(), lesson, now);
  const repeated = completeLesson(completed, lesson, now + 3 * DAY);
  assert.deepEqual(repeated, completed, 'First completion date and review dates must remain stable');
});

test('due words include the exact due boundary and exclude future or unlearned words', () => {
  const state = emptyState();
  state.reviews['fixture-termin-word'] = { stage: 0, due: now };
  state.reviews['fixture-morgen-word'] = { stage: 2, due: now + 1 };
  assert.deepEqual(dueWords(state, lessons, now).map(word => word.id), ['fixture-termin-word']);
  assert.deepEqual(dueWords(state, lessons, now - 1), []);
});

test('JSON export/import round trip preserves settings, progress, reviews and unfinished draft', () => {
  const state = stateWithDraft();
  state.settings = { vietnamese: true, largeText: true };
  state.completed[otherLesson.id] = now;
  state.reviews['fixture-brot-word'] = { stage: 5, due: now + 30 * DAY };
  const imported = validateState(JSON.parse(JSON.stringify(state)), lessons);
  assert.deepEqual(imported, state);
  imported.active.answers['fixture-input'].value = 'changed';
  assert.equal(state.active.answers['fixture-input'].value, 'Ich gehe zum gro');
});

test('import recalculates answer correctness instead of trusting a claimed score', () => {
  const state = stateWithDraft();
  state.active.answers['fixture-choice'] = { value: '1', checked: true, correct: true };
  state.active.answers['fixture-input'] = { value: 'Ich gehe zum großem Haus', checked: true, correct: true };
  const imported = validateState(state, lessons);
  assert.equal(imported.active.answers['fixture-choice'].correct, false);
  assert.equal(imported.active.answers['fixture-input'].correct, false);

  state.active.answers['fixture-input'] = { value: 'Zum großen Haus', checked: false, correct: true };
  assert.equal(validateState(state, lessons).active.answers['fixture-input'].correct, false);
});

test('import never upgrades a blank checked choice to a correct answer', () => {
  const state = stateWithDraft();
  state.active.answers['fixture-choice'] = { value: '', checked: true, correct: true };
  assert.equal(validateState(state, lessons).active.answers['fixture-choice'].correct, false);
});

test('import rejects future formats, malformed records and invalid progress', () => {
  for (const input of [null, [], {}, { ...emptyState(), version: 2 }]) {
    assert.throws(() => validateState(input, lessons));
  }
  const mutations = [
    state => { state.settings.vietnamese = 'true'; },
    state => { state.completed = []; },
    state => { state.completed.unknown = now; },
    state => { state.completed[lesson.id] = -1; },
    state => { state.completed[lesson.id] = Number.POSITIVE_INFINITY; },
    state => { state.reviews.unknown = { stage: 0, due: now }; },
  ];
  for (const mutate of mutations) {
    const state = emptyState();
    mutate(state);
    assert.throws(() => validateState(state, lessons));
  }
});

test('import rejects invalid review stages and timestamps', () => {
  for (const stage of [-1, 1.5, 6, '1', null, Number.NaN]) {
    const state = emptyState();
    state.reviews['fixture-termin-word'] = { stage, due: now };
    assert.throws(() => validateState(state, lessons), `stage ${String(stage)}`);
  }
  for (const due of [-1, '123', 1.5, 8640000000000001, Number.POSITIVE_INFINITY]) {
    const state = emptyState();
    state.reviews['fixture-termin-word'] = { stage: 0, due };
    assert.throws(() => validateState(state, lessons), `due ${String(due)}`);
  }
});

test('import rejects unknown lessons, cross-lesson answers, invalid positions and oversized drafts', () => {
  const mutations = [
    state => { state.active.lessonId = 'unknown'; },
    state => { state.active.step = -1; },
    state => { state.active.step = lesson.steps.length; },
    state => { state.active.step = 1.5; },
    state => { state.active.answers = []; },
    state => { state.active.answers['fixture-other-input'] = { value: 'Ein Brot', checked: true, correct: true }; },
    state => { state.active.answers['fixture-choice'].value = '2'; },
    state => { state.active.answers['fixture-choice'].value = '-1'; },
    state => { state.active.answers['fixture-input'].value = 'a'.repeat(5001); },
    state => { state.active.answers['fixture-input'].checked = 'false'; },
  ];
  for (const mutate of mutations) {
    const state = stateWithDraft();
    mutate(state);
    assert.throws(() => validateState(state, lessons));
  }
});

test('prototype-like imported map keys are rejected and extra root fields are not retained', () => {
  for (const key of ['__proto__', 'constructor', 'prototype']) {
    for (const field of ['completed', 'reviews']) {
      const state = emptyState();
      state[field] = JSON.parse(`{"${key}": ${field === 'completed' ? now : '{"stage":0,"due":0}'}}`);
      assert.throws(() => validateState(state, lessons), `${field}.${key}`);
    }
    const state = stateWithDraft();
    state.active.answers = JSON.parse(`{"${key}": {"value":"x","checked":false,"correct":false}}`);
    assert.throws(() => validateState(state, lessons), `answers.${key}`);
  }
  const input = JSON.parse(JSON.stringify(emptyState()).replace(/}$/, ',"__proto__":{"polluted":true},"constructor":{},"extra":"discard"}'));
  const imported = validateState(input, lessons);
  assert.deepEqual(imported, emptyState());
  assert.equal(Object.prototype.hasOwnProperty.call(imported, '__proto__'), false);
  assert.equal({}.polluted, undefined);
});

test('corrupt or incompatible stored data is preserved until an explicit restore', () => {
  for (const raw of ['{ broken', JSON.stringify({ ...emptyState(), version: 99 })]) {
    const storage = memoryStorage(raw);
    const store = createStore(storage, lessons);
    assert.match(store.warning, /nicht gelesen|nicht überschrieben/i);
    assert.equal(store.save(stateWithDraft()), false);
    assert.equal(storage.value, raw);
    assert.equal(storage.writes, 0);
    assert.equal(store.save(stateWithDraft(), { restore: true }), true);
    assert.equal(store.warning, '');
    assert.deepEqual(JSON.parse(storage.value), stateWithDraft());
  }
});

test('blocked storage produces a warning and does not attempt destructive replacement', () => {
  const storage = memoryStorage('existing data');
  storage.failRead = true;
  const store = createStore(storage, lessons);
  assert.notEqual(store.warning, '');
  assert.equal(store.save(stateWithDraft()), false);
  assert.equal(storage.writes, 0);
  assert.equal(storage.value, 'existing data');
  assert.deepEqual(store.state, stateWithDraft(), 'Current work remains available for export');
});

test('quota failure keeps the previous persistent data and current draft, and retry can recover', () => {
  const raw = JSON.stringify(emptyState());
  const storage = memoryStorage(raw);
  const store = createStore(storage, lessons);
  storage.failWrite = true;
  assert.equal(store.save(stateWithDraft()), false);
  assert.match(store.warning, /Speichern|sichern/i);
  assert.equal(storage.value, raw);
  assert.deepEqual(store.state, stateWithDraft());
  storage.failWrite = false;
  assert.equal(store.save(store.state), true);
  assert.equal(store.warning, '');
  assert.deepEqual(JSON.parse(storage.value), stateWithDraft());
});

test('a stale tab cannot overwrite another tab and remains blocked on subsequent saves', () => {
  const storage = memoryStorage(JSON.stringify(emptyState()));
  const firstTab = createStore(storage, lessons);
  const staleTab = createStore(storage, lessons);
  const fresh = emptyState();
  fresh.settings.largeText = true;
  assert.equal(firstTab.save(fresh), true);
  const latestRaw = storage.value;
  assert.equal(staleTab.save(stateWithDraft()), false);
  assert.match(staleTab.warning, /anderen Fenster|neu/i);
  assert.equal(storage.value, latestRaw);
  assert.equal(staleTab.save(emptyState()), false);
  assert.equal(storage.value, latestRaw);
  assert.equal(storage.writes, 1);
});

test('completing a lesson retains written responses, including after backup and restore', () => {
  const writingLesson = { id: 'writing', words: [], steps: [{ id: 'writing-free', type: 'free' }] };
  const state = emptyState();
  state.active = { lessonId: 'writing', step: 0, answers: { 'writing-free': { value: 'Ich möchte einen Termin.\nAm Montag, bitte.', checked: true, correct: false } } };
  const completed = completeLesson(state, writingLesson, now);
  assert.equal(completed.notes['writing-free'], state.active.answers['writing-free'].value);
  assert.equal(completed.active, null);
  assert.deepEqual(validateState(JSON.parse(JSON.stringify(completed)), [writingLesson]), completed);
  completed.active = { lessonId: 'writing', step: 0, answers: { 'writing-free': { value: '  ', checked: true, correct: false } } };
  assert.equal(completeLesson(completed, writingLesson, now).notes['writing-free'], state.active.answers['writing-free'].value, 'A later spoken-only attempt must not erase written work');
});

test('legacy v1 backups remain usable without notes; malformed or unknown notes are rejected', () => {
  const legacy = stateWithDraft();
  delete legacy.notes;
  assert.deepEqual(validateState(legacy, lessons).notes, {});
  for (const notes of [[], null, { unknown: 'text' }, { 'fixture-input': 'not a free response' }, JSON.parse('{"__proto__":"text"}')]) {
    assert.throws(() => validateState({ ...emptyState(), notes }, lessons));
  }
  const writingLesson = { id: 'writing', words: [], steps: [{ id: 'writing-free', type: 'free' }] };
  for (const value of [7, null, 'a'.repeat(5001)]) assert.throws(() => validateState({ ...emptyState(), notes: { 'writing-free': value } }, [writingLesson]));
});
