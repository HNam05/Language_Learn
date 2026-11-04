export const STORAGE_KEY = 'schritt-fuer-schritt.v1';
export const DAY = 86400000;
export const INTERVALS = [1, 3, 7, 14, 30];
export const CIVICS_MODES = ['round', 'voluntary', 'mock'];

export function emptyState() {
  return { version: 1, settings: { vietnamese: false, largeText: false, onboardingSeen: false }, completed: {}, reviews: {}, notes: {}, civics: {}, civicsSession: null, active: null };
}

export function normalizeAnswer(value) {
  return value.normalize('NFC').trim().toLocaleLowerCase('de-DE').replace(/[.!?]+$/u, '').replace(/\s+/gu, ' ');
}

export function isCorrect(step, value) {
  return step.type === 'choice' ? /^\d+$/u.test(String(value)) && Number(value) === step.answer : step.answers.some(answer => normalizeAnswer(answer) === normalizeAnswer(String(value)));
}

const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const timestamp = value => Number.isSafeInteger(value) && value >= 0 && value <= 8640000000000000;
const requireValue = (condition, message) => { if (!condition) throw new Error(message); };

// Whitelist fields instead of retaining arbitrary imported properties or HTML.
export function validateState(input, lessons, questions = []) {
  requireValue(record(input) && input.version === 1, 'Diese Sicherung hat ein unbekanntes Format.');
  requireValue(record(input.settings) && typeof input.settings.vietnamese === 'boolean' && typeof input.settings.largeText === 'boolean' && (input.settings.onboardingSeen === undefined || typeof input.settings.onboardingSeen === 'boolean'), 'Die Einstellungen in der Sicherung sind ungültig.');
  requireValue(record(input.completed) && record(input.reviews), 'Der Lernstand in der Sicherung ist unvollständig.');
  const output = emptyState();
  output.settings = { vietnamese: input.settings.vietnamese, largeText: input.settings.largeText };
  if (input.settings.onboardingSeen !== undefined) output.settings.onboardingSeen = input.settings.onboardingSeen;
  if (input.settings.bundesland !== undefined) {
    const lands = new Set(questions.map(question => question.land).filter(Boolean));
    requireValue(input.settings.bundesland === '' || lands.has(input.settings.bundesland), 'Das Bundesland in der Sicherung ist unbekannt.');
    output.settings.bundesland = input.settings.bundesland;
  }
  const lessonIds = new Set(lessons.map(lesson => lesson.id));
  const wordIds = new Set(lessons.flatMap(lesson => lesson.words.map(word => word.id)));
  for (const [id, date] of Object.entries(input.completed)) {
    requireValue(lessonIds.has(id) && timestamp(date), 'Die Sicherung enthält einen unbekannten Lernschritt.');
    output.completed[id] = date;
  }
  for (const [id, review] of Object.entries(input.reviews)) {
    requireValue(wordIds.has(id) && record(review) && timestamp(review.due) && Number.isInteger(review.stage) && review.stage >= 0 && review.stage <= INTERVALS.length, 'Eine Wiederholung in der Sicherung ist ungültig.');
    output.reviews[id] = { due: review.due, stage: review.stage };
  }
  // Older v1 backups did not retain free answers after completion.
  if (input.notes !== undefined) {
    requireValue(record(input.notes), 'Die eigenen Sätze in der Sicherung sind ungültig.');
    const freeIds = new Set(lessons.flatMap(lesson => lesson.steps.filter(step => step.type === 'free').map(step => step.id)));
    for (const [id, text] of Object.entries(input.notes)) {
      requireValue(freeIds.has(id) && typeof text === 'string' && text.length <= 5000, 'Ein eigener Satz in der Sicherung ist ungültig.');
      output.notes[id] = text;
    }
  }
  // Backups made before the citizenship-test practice have no civics section.
  if (input.civics !== undefined) {
    requireValue(record(input.civics), 'Die Testfragen in der Sicherung sind ungültig.');
    const questionIds = new Set(questions.map(question => question.id));
    for (const [id, review] of Object.entries(input.civics)) {
      requireValue(questionIds.has(id) && record(review) && timestamp(review.due) && Number.isInteger(review.stage) && review.stage >= 0 && review.stage <= INTERVALS.length, 'Eine Testfrage in der Sicherung ist ungültig.');
      output.civics[id] = { due: review.due, stage: review.stage };
    }
  }
  if (input.civicsSession !== undefined && input.civicsSession !== null) {
    const session = input.civicsSession;
    const invalid = 'Die begonnene Testrunde in der Sicherung ist ungültig.';
    requireValue(record(session) && CIVICS_MODES.includes(session.mode) && Array.isArray(session.items) && session.items.length >= 1 && session.items.length <= 40 && Array.isArray(session.results), invalid);
    const items = session.items.map(item => {
      const question = record(item) && questions.find(entry => entry.id === item.id);
      const indices = question ? question.options.map((_, index) => index) : [];
      requireValue(question && Array.isArray(item.order) && item.order.length === indices.length && indices.every(index => item.order.includes(index)), invalid);
      return { id: item.id, order: [...item.order], question };
    });
    // Either the current question is still open, or it was just answered (feedback shown).
    const answeredCurrent = session.results.length === session.position + 1 && session.position < items.length;
    requireValue(Number.isInteger(session.position) && session.position >= 0 && session.position <= items.length && (session.results.length === session.position || answeredCurrent), invalid);
    // Correctness is recomputed from the stored choice, never trusted from the file.
    const results = session.results.map((result, index) => {
      requireValue(record(result) && /^\d$/u.test(result.value) && Number(result.value) < items[index].order.length, invalid);
      return { value: result.value, correct: items[index].order[Number(result.value)] === items[index].question.answer };
    });
    output.civicsSession = { mode: session.mode, items: items.map(({ id, order }) => ({ id, order })), position: session.position, results };
  }
  if (input.active !== null) {
    const active = input.active;
    requireValue(record(active), 'Die gespeicherte Übung ist ungültig.');
    const lesson = lessons.find(item => item.id === active.lessonId);
    requireValue(lesson && Number.isInteger(active.step) && active.step >= 0 && active.step < lesson.steps.length && record(active.answers), 'Die gespeicherte Übung ist nicht verfügbar.');
    const answers = {};
    for (const [id, answer] of Object.entries(active.answers)) {
      const step = lesson.steps.find(item => item.id === id);
      requireValue(step && record(answer) && typeof answer.value === 'string' && answer.value.length <= 5000 && typeof answer.checked === 'boolean' && typeof answer.correct === 'boolean', 'Eine gespeicherte Antwort ist ungültig.');
      if (step.type === 'choice') requireValue(answer.value === '' || (/^\d+$/u.test(answer.value) && Number(answer.value) < step.options.length), 'Eine ausgewählte Antwort ist ungültig.');
      answers[id] = { value: answer.value, checked: answer.checked, correct: ['choice', 'input'].includes(step.type) ? answer.checked && isCorrect(step, answer.value) : answer.correct };
    }
    output.active = { lessonId: lesson.id, step: active.step, answers };
  }
  return output;
}

export function completeLesson(state, lesson, now = Date.now()) {
  const next = structuredClone(state);
  next.completed[lesson.id] ??= now;
  for (const word of lesson.words) next.reviews[word.id] ??= { stage: 0, due: now + DAY };
  if (next.active?.lessonId === lesson.id) {
    for (const step of lesson.steps.filter(item => item.type === 'free')) {
      const value = next.active.answers[step.id]?.value;
      if (value?.trim()) next.notes[step.id] = value;
    }
  }
  next.active = null;
  return next;
}

export function scheduleReview(previous, remembered, now = Date.now()) {
  const stage = remembered ? Math.min(previous.stage + 1, INTERVALS.length) : 0;
  return { stage, due: now + DAY * (remembered ? INTERVALS[Math.max(0, stage - 1)] : 1) };
}

export function dueWords(state, lessons, now = Date.now()) {
  return lessons.flatMap(lesson => lesson.words).filter(word => state.reviews[word.id] && state.reviews[word.id].due <= now);
}

// Due questions first (oldest first), then unseen ones in catalogue order. Seen questions
// that are not yet due wait, so a round repeats what needs repeating instead of drilling.
export function civicsRound(state, questions, { topic = null, now = Date.now(), size = 10 } = {}) {
  const pool = questions.filter(question => !topic || question.topic === topic);
  const due = pool.filter(question => state.civics[question.id]?.due <= now).sort((a, b) => state.civics[a.id].due - state.civics[b.id].due);
  const unseen = pool.filter(question => !state.civics[question.id]);
  return [...due, ...unseen].slice(0, size).map(question => question.id);
}

export function answerCivics(state, id, correct, now = Date.now()) {
  const next = structuredClone(state);
  next.civics[id] = scheduleReview(next.civics[id] || { stage: 0 }, correct, now);
  return next;
}

// Mock test like the real one: 30 general questions plus 3 of the chosen Land
// (33 general ones while no Land is chosen). `random` is injectable for tests.
export function mockTestIds(questions, land, random = Math.random) {
  const sample = (pool, count) => {
    const copy = [...pool];
    for (let index = copy.length - 1; index > 0; index--) {
      const other = Math.floor(random() * (index + 1));
      [copy[index], copy[other]] = [copy[other], copy[index]];
    }
    return copy.slice(0, count).map(question => question.id);
  };
  const own = land ? questions.filter(question => question.land === land) : [];
  const general = questions.filter(question => !question.land);
  return [...sample(general, own.length ? 30 : 33), ...sample(own, 3)];
}

export function startCivicsSession(state, mode, items) {
  const next = structuredClone(state);
  next.civicsSession = { mode, items, position: 0, results: [] };
  return next;
}

// Practice rounds schedule every answer. A mock test only brings mistakes back sooner,
// and voluntary rounds change nothing, so neither postpones a planned repetition.
export function answerCivicsSession(state, questions, value, now = Date.now()) {
  const session = state.civicsSession;
  if (!session || session.results.length > session.position || session.position >= session.items.length) return state;
  const item = session.items[session.position];
  const question = questions.find(entry => entry.id === item.id);
  const correct = item.order[Number(value)] === question.answer;
  let next = structuredClone(state);
  next.civicsSession.results.push({ value: String(value), correct });
  if (session.mode === 'round' || (session.mode === 'mock' && !correct)) {
    next = answerCivics(next, item.id, correct, now);
  }
  return next;
}

export function advanceCivicsSession(state) {
  const session = state.civicsSession;
  if (!session || session.results.length <= session.position) return state;
  const next = structuredClone(state);
  next.civicsSession.position++;
  return next;
}

// "Sicher" means answered correctly twice in a row, on different days.
export function civicsProgress(state, questions, now = Date.now()) {
  const seen = questions.filter(question => state.civics[question.id]);
  return {
    total: questions.length,
    seen: seen.length,
    secure: seen.filter(question => state.civics[question.id].stage >= 2).length,
    due: seen.filter(question => state.civics[question.id].due <= now).length
  };
}

export function createStore(storage, lessons, questions = []) {
  let state = emptyState();
  let raw = null;
  let blocked = false;
  let warning = '';
  try {
    raw = storage.getItem(STORAGE_KEY);
    if (raw !== null) state = validateState(JSON.parse(raw), lessons, questions);
  } catch {
    blocked = true;
    warning = 'Der Lernstand kann nicht gelesen werden. Er wird nicht überschrieben. Bitte prüfen Sie die Browser-Einstellungen oder laden Sie eine Sicherung in den Einstellungen.';
  }
  return {
    get state() { return state; },
    get warning() { return warning; },
    save(next, { restore = false } = {}) {
      state = validateState(next, lessons, questions);
      if (blocked && !restore) return false;
      try {
        if (!restore && storage.getItem(STORAGE_KEY) !== raw) {
          warning = 'Der Lernstand wurde in einem anderen Fenster geändert. Bitte laden Sie diese Seite neu, bevor Sie weiterüben.';
          blocked = true;
          return false;
        }
        const serialized = JSON.stringify(state);
        storage.setItem(STORAGE_KEY, serialized);
        raw = serialized;
        blocked = false;
        warning = '';
        return true;
      } catch {
        warning = 'Speichern ist gerade nicht möglich. Ihr aktueller Stand bleibt in diesem Fenster. Bitte sichern Sie ihn unter Einstellungen, bevor Sie das Fenster schließen.';
        return false;
      }
    }
  };
}
