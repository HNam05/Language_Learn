export const STORAGE_KEY = 'schritt-fuer-schritt.v1';
export const DAY = 86400000;
export const INTERVALS = [1, 3, 7, 14, 30];

export function emptyState() {
  return { version: 1, settings: { vietnamese: false, largeText: false, onboardingSeen: false }, completed: {}, reviews: {}, notes: {}, active: null };
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
export function validateState(input, lessons) {
  requireValue(record(input) && input.version === 1, 'Diese Sicherung hat ein unbekanntes Format.');
  requireValue(record(input.settings) && typeof input.settings.vietnamese === 'boolean' && typeof input.settings.largeText === 'boolean' && (input.settings.onboardingSeen === undefined || typeof input.settings.onboardingSeen === 'boolean'), 'Die Einstellungen in der Sicherung sind ungültig.');
  requireValue(record(input.completed) && record(input.reviews), 'Der Lernstand in der Sicherung ist unvollständig.');
  const output = emptyState();
  output.settings = { vietnamese: input.settings.vietnamese, largeText: input.settings.largeText };
  if (input.settings.onboardingSeen !== undefined) output.settings.onboardingSeen = input.settings.onboardingSeen;
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

export function createStore(storage, lessons) {
  let state = emptyState();
  let raw = null;
  let blocked = false;
  let warning = '';
  try {
    raw = storage.getItem(STORAGE_KEY);
    if (raw !== null) state = validateState(JSON.parse(raw), lessons);
  } catch {
    blocked = true;
    warning = 'Der Lernstand kann nicht gelesen werden. Er wird nicht überschrieben. Bitte prüfen Sie die Browser-Einstellungen oder laden Sie eine Sicherung in den Einstellungen.';
  }
  return {
    get state() { return state; },
    get warning() { return warning; },
    save(next, { restore = false } = {}) {
      state = validateState(next, lessons);
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
