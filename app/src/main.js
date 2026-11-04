import { lessons } from '../content/lessons.js';
import { civicsQuestions, civicsTopics, civicsSources, bundeslaender } from '../content/civics.js';
import { createStore, completeLesson, isCorrect, dueWords, scheduleReview, validateState, civicsRound, civicsProgress, mockTestIds, startCivicsSession, answerCivicsSession, advanceCivicsSession } from './state.js';
import { icon, escapeHtml as e, speak } from './ui.js';
import { homeView, pathView, lessonView, finishView, reviewView, settingsView } from './views.js';
import { civicsView, civicsQuizView } from './civics-views.js';

// A denied localStorage getter must not prevent opening the learning interface.
let storage;
try { storage = window.localStorage; } catch { storage = { getItem() { throw new Error('Storage unavailable'); } }; }
const store = createStore(storage, lessons, civicsQuestions);
let state = store.state;
let page = 'home';
let finishedLesson = null;
let pendingImport = null;
let settingsMessage = '';
let reviewQueue = [];
let reviewRevealed = false;
let voluntaryReview = false;
let importGeneration = 0;
let renderedViewKey = '';
// Rounds and mock tests live in state.civicsSession (survive pause and reload); only the
// not yet submitted radio choice stays in memory.
let civicsChoice = '';
const app = document.querySelector('#app');

function persist({ restore = false } = {}) {
  const success = store.save(state, { restore });
  state = store.state;
  const status = document.querySelector('#storage-warning');
  if (status) { status.textContent = store.warning; status.hidden = !store.warning; }
  return success;
}

function render({ focus = true, preservePosition = false, focusSelector = '' } = {}) {
  const viewKey = page === 'lesson' && state.active ? `${page}:${state.active.lessonId}:${state.active.step}` : page === 'civics-quiz' ? `${page}:${state.civicsSession?.position}` : page;
  const sameView = viewKey === renderedViewKey;
  const previousScroll = window.scrollY;
  const disclosures = sameView ? new Map([...app.querySelectorAll('[data-disclosure]')].map(element => [element.dataset.disclosure, element.open])) : new Map();
  const players = sameView ? [...app.querySelectorAll('audio')].map(element => ({ element, src: element.getAttribute('src'), rate: element.playbackRate, playing: !element.paused })) : [];
  if (!sameView) { app.querySelectorAll('audio').forEach(audio => audio.pause()); window.speechSynthesis?.cancel(); }
  document.documentElement.classList.toggle('large-text', state.settings.largeText);
  let body;
  if (page === 'lesson' && state.active) body = lessonView(lessons.find(item => item.id === state.active.lessonId), state.active, state.settings);
  else if (page === 'path') body = pathView(lessons, state);
  else if (page === 'finish' && finishedLesson) body = finishView(finishedLesson);
  else if (page === 'review') {
    const word = lessons.flatMap(item => item.words).find(item => item.id === reviewQueue[0]);
    body = reviewView(word, word && state.reviews[word.id], reviewRevealed, reviewQueue.length, Object.keys(state.reviews).length, state.settings, voluntaryReview);
  } else if (page === 'settings') body = settingsView(state, pendingImport, settingsMessage);
  else if (page === 'civics') body = civicsView(activeCivicsTopics(), civicsOverview(), civicsSources, state.settings, bundeslaender, openCivicsSession());
  else if (page === 'civics-quiz') body = civicsQuizView(civicsQuizData(), state.settings);
  else body = homeView(lessons, state, civicsOverview().all);
  const selected = page === 'lesson' || page === 'finish' ? 'home' : page === 'civics-quiz' ? 'civics' : page;
  const nav = [['home', 'home', 'Heute'], ['path', 'book', 'Mein Lernweg'], ['review', 'repeat', 'Wiederholen'], ['civics', 'flag', 'Einbürgerungstest']];
  app.innerHTML = `<aside class="sidebar"><a class="brand" href="#" data-action="home">Schritt für Schritt<span>Deutsch im Alltag</span></a><nav aria-label="Hauptnavigation">${nav.map(([action, glyph, label]) => `<button data-action="${action}" ${selected === action ? 'aria-current="page"' : ''}>${icon(glyph)}<span>${label}</span></button>`).join('')}</nav><button class="settings-nav" data-action="settings" ${selected === 'settings' ? 'aria-current="page"' : ''}>${icon('settings')}<span>Einstellungen</span></button></aside><div class="workspace"><div class="topbar"><button class="help-toggle" data-action="toggle-help" aria-pressed="${state.settings.vietnamese}">${icon('help')}<span>Hilfe auf Vietnamesisch${state.settings.vietnamese ? ' · an' : ''}</span></button></div><div id="storage-warning" class="storage-warning" role="alert" ${store.warning ? '' : 'hidden'}>${e(store.warning)}</div><main id="main" tabindex="-1">${body}</main></div>`;
  // Reuse the actual media node: a translation/feedback update must not restart audio.
  app.querySelectorAll('audio').forEach(placeholder => {
    const previous = players.find(player => player.src === placeholder.getAttribute('src'));
    if (!previous) return;
    placeholder.replaceWith(previous.element);
    previous.element.playbackRate = previous.rate;
    previous.element.closest('.audio-block').querySelector('[data-speed]').value = String(previous.rate);
    if (previous.playing) previous.element.play().catch(() => {});
  });
  app.querySelectorAll('[data-disclosure]').forEach(element => { element.open = disclosures.get(element.dataset.disclosure) || false; });
  app.querySelectorAll('audio').forEach(audio => { audio.onerror = () => {
    audio.closest('.audio-block').querySelector('.audio-error').textContent = 'Die Aufnahme konnte nicht geladen werden. Sie können mit dem Text weiterüben.';
  }; });
  renderedViewKey = viewKey;
  if (preservePosition && sameView) window.scrollTo({ top: previousScroll, behavior: 'instant' });
  else if (focus) window.scrollTo({ top: 0, behavior: 'instant' });
  const focusElement = focusSelector ? app.querySelector(focusSelector) : focus ? document.querySelector('#main') : null;
  if (focusElement) {
    focusElement.focus({ preventScroll: true });
    if (focusSelector && preservePosition) focusElement.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
}

function activeStep() {
  return lessons.find(item => item.id === state.active.lessonId).steps[state.active.step];
}

function setAnswer(value, checked = false, correct = false) {
  state.active.answers[activeStep().id] = { value, checked, correct };
  persist();
}

function clearFeedback() {
  app.querySelector('.feedback')?.remove();
  const hint = app.querySelector('#answer-hint');
  if (hint) hint.textContent = '';
}

// General questions plus the three-question block of the learner's own Land, as in the real test.
function availableCivics() {
  return civicsQuestions.filter(question => !question.land || question.land === state.settings.bundesland);
}

function activeCivicsTopics() {
  return civicsTopics.filter(topic => topic.id !== 'bundesland' || state.settings.bundesland);
}

function civicsOverview() {
  const available = availableCivics();
  const topics = activeCivicsTopics().map(topic => [topic.id, civicsProgress(state, available.filter(question => question.topic === topic.id))]);
  return { all: civicsProgress(state, available), ...Object.fromEntries(topics) };
}

// Shuffled options: learners should recognise the answer, not its position.
function shuffledOrder(length) {
  const order = [...Array(length).keys()];
  for (let index = length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [order[index], order[other]] = [order[other], order[index]];
  }
  return order;
}

const questionById = id => civicsQuestions.find(question => question.id === id);

function openCivicsSession() {
  const session = state.civicsSession;
  return session && session.position < session.items.length ? session : null;
}

function civicsQuizData() {
  const session = state.civicsSession;
  if (!session) return { question: null, total: 0, position: 0, score: 0, mode: 'round', mistakes: [] };
  const item = session.items[session.position];
  const result = session.results[session.position];
  return {
    question: item && questionById(item.id), order: item?.order, mode: session.mode,
    selection: result ? { value: result.value, checked: true, correct: result.correct } : { value: civicsChoice, checked: false, correct: false },
    position: session.position, total: session.items.length,
    score: session.results.filter(entry => entry.correct).length,
    mistakes: session.results.map((entry, index) => entry.correct ? null : questionById(session.items[index].id)).filter(Boolean)
  };
}

function startCivics({ topic = null, mode = 'round' } = {}) {
  const open = openCivicsSession();
  if (open && !window.confirm(`Sie haben eine begonnene ${open.mode === 'mock' ? 'Probeprüfung' : 'Runde'} (Frage ${open.position + 1} von ${open.items.length}). Möchten Sie stattdessen neu beginnen? Ihre bisherigen Antworten bleiben für die Wiederholung gespeichert.`)) return;
  const available = availableCivics();
  const ids = mode === 'mock' ? mockTestIds(available, state.settings.bundesland)
    : mode === 'voluntary' ? shuffledOrder(available.length).map(index => available[index].id).slice(0, 10)
    : civicsRound(state, available, { topic });
  const items = ids.map(id => ({ id, order: shuffledOrder(questionById(id).options.length) }));
  state = items.length ? startCivicsSession(state, mode, items) : { ...state, civicsSession: null };
  civicsChoice = '';
  persist();
  page = 'civics-quiz';
}

function startReview(all = false) {
  voluntaryReview = all;
  reviewQueue = (all ? lessons.flatMap(item => item.words).filter(word => state.reviews[word.id]) : dueWords(state, lessons)).map(word => word.id);
  reviewRevealed = false;
  page = 'review';
}

function exportProgress() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `lernstand-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  settingsMessage = 'Die Sicherungsdatei wurde zum Herunterladen bereitgestellt. Sie finden sie im Download-Ordner Ihres Browsers.';
}

app.addEventListener('click', event => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  event.preventDefault();
  const action = target.dataset.action;
  if (['home', 'path', 'settings', 'civics'].includes(action)) {
    // A finished round has been summarised; leaving it clears the stored session.
    if (state.civicsSession && !openCivicsSession()) { state.civicsSession = null; persist(); }
    page = action;
  }
  else if (action === 'civics-start') startCivics({ topic: target.dataset.topic || null });
  else if (action === 'civics-voluntary') startCivics({ mode: 'voluntary' });
  else if (action === 'civics-mock') startCivics({ mode: 'mock' });
  else if (action === 'civics-resume' && openCivicsSession()) page = 'civics-quiz';
  else if (action === 'speak') {
    speak(target.dataset.text, Number(target.dataset.rate) || 1, target.closest('.speak-row')?.querySelector('.speak-status'));
    return;
  }
  else if (action === 'civics-next') {
    state = advanceCivicsSession(state);
    civicsChoice = '';
    persist();
  }
  else if (action === 'toggle-help') { state.settings.vietnamese = !state.settings.vietnamese; persist(); }
  else if (action === 'start-with-vietnamese' || action === 'start-german-only') {
    state.settings.vietnamese = action === 'start-with-vietnamese';
    state.settings.onboardingSeen = true;
    persist();
  } else if (action === 'print-notes') {
    window.print();
    return;
  }
  else if (action === 'start') {
    const lesson = lessons.find(item => item.id === target.dataset.id);
    if (!lesson) return;
    if (state.active && state.active.lessonId !== lesson.id) {
      // An explicit choice prevents silently losing the unfinished lesson's draft.
      const message = 'Eine andere Lektion ist noch offen. Sie können sie über „Heute“ fortsetzen. Möchten Sie stattdessen diese Lektion beginnen? Die bisherigen Eingaben der offenen Lektion werden ersetzt.';
      if (!window.confirm(message)) return;
    }
    if (state.active?.lessonId !== lesson.id) { state.active = { lessonId: lesson.id, step: 0, answers: {} }; persist(); }
    page = 'lesson';
  } else if (action === 'previous') { state.active.step = Math.max(0, state.active.step - 1); persist(); }
  else if (action === 'next') {
    const lesson = lessons.find(item => item.id === state.active.lessonId);
    if (state.active.step === lesson.steps.length - 1) {
      state = completeLesson(state, lesson); finishedLesson = lesson; page = 'finish';
    } else state.active.step++;
    persist();
  } else if (action === 'reveal-model') { setAnswer(state.active.answers[activeStep().id]?.value || '', true, false); }
  else if (action === 'mark-free' && activeStep().type === 'free') { setAnswer(state.active.answers[activeStep().id]?.value || '', true, false); }
  else if (action === 'review' || action === 'review-all') startReview(action === 'review-all');
  else if (action === 'reveal-review') reviewRevealed = true;
  else if (action === 'rate-good' || action === 'rate-hard') {
    if (!reviewQueue.length || !reviewRevealed) return;
    const id = reviewQueue.shift();
    // Voluntary preview never postpones an already scheduled review.
    if (!voluntaryReview) { state.reviews[id] = scheduleReview(state.reviews[id], action === 'rate-good'); persist(); }
    reviewRevealed = false;
  } else if (action === 'export') exportProgress();
  else if (action === 'cancel-restore') pendingImport = null;
  else if (action === 'restore' && pendingImport) {
    state = pendingImport;
    settingsMessage = persist({ restore: true }) ? 'Ihre Sicherung wurde übernommen.' : 'Die Sicherung ist in diesem Fenster geöffnet, konnte aber nicht dauerhaft gespeichert werden.';
    pendingImport = null;
  }
  const preservePosition = ['toggle-help', 'reveal-model', 'reveal-review', 'mark-free'].includes(action);
  const focusSelector = action === 'toggle-help' ? '[data-action="toggle-help"]' : action === 'reveal-model' ? '.model-answer' : '';
  render({ preservePosition, focusSelector });
});

app.addEventListener('submit', event => {
  if (event.target.id === 'civics-form') {
    event.preventDefault();
    const value = new FormData(event.target).get('civics-answer');
    if (value === null || !openCivicsSession()) {
      document.querySelector('#civics-hint')?.replaceChildren(document.createTextNode('Bitte wählen Sie zuerst eine Antwort.'));
      return;
    }
    state = answerCivicsSession(state, civicsQuestions, String(value));
    civicsChoice = '';
    // Like the real test, a mock shows no solution per question; it moves straight on.
    if (state.civicsSession?.mode === 'mock') {
      state = advanceCivicsSession(state);
      persist();
      render();
      return;
    }
    persist();
    render({ preservePosition: true, focusSelector: '.feedback' });
    return;
  }
  if (event.target.id !== 'answer-form') return;
  event.preventDefault();
  const form = new FormData(event.target);
  const value = form.get('answer');
  if (value === null || !String(value).trim()) {
    document.querySelector('#answer-hint')?.replaceChildren(document.createTextNode('Bitte wählen oder schreiben Sie zuerst eine Antwort.'));
    return;
  }
  setAnswer(String(value), true, isCorrect(activeStep(), String(value)));
  render({ preservePosition: true, focusSelector: '.feedback' });
});

app.addEventListener('input', event => {
  if (event.target.id === 'free-answer') {
    const old = state.active.answers[activeStep().id];
    setAnswer(event.target.value, old?.checked || false, false);
  } else if (event.target.id === 'answer-input') { setAnswer(event.target.value); clearFeedback(); }
});

app.addEventListener('change', async event => {
  const target = event.target;
  if (target.name === 'civics-answer' && target.type === 'radio') {
    civicsChoice = target.value;
    document.querySelector('#civics-hint')?.replaceChildren();
    app.querySelectorAll('.choice').forEach(label => label.classList.toggle('selected', label.querySelector('input').checked));
  } else if (target.name === 'answer' && target.type === 'radio') {
    setAnswer(target.value);
    clearFeedback();
    app.querySelectorAll('.choice').forEach(label => label.classList.toggle('selected', label.querySelector('input').checked));
  } else if (target.id === 'bundesland-select') {
    state.settings.bundesland = target.value;
    persist();
    render({ focus: false, preservePosition: true });
    app.querySelector('#bundesland-select')?.focus();
  } else if (target.dataset.setting) {
    state.settings[target.dataset.setting] = target.checked; persist(); render({ focus: false });
    app.querySelector(`[data-setting="${target.dataset.setting}"]`)?.focus();
  } else if (target.hasAttribute('data-speed')) target.closest('.audio-block').querySelector('audio').playbackRate = Number(target.value);
  else if (target.id === 'import-file') {
    const file = target.files[0];
    if (!file) return;
    const generation = ++importGeneration;
    try {
      if (file.size > 500000) throw new Error('Die Datei ist zu groß. Bitte wählen Sie eine Lernstand-Sicherung dieser App.');
      const imported = validateState(JSON.parse(await file.text()), lessons, civicsQuestions);
      if (generation !== importGeneration) return;
      pendingImport = imported; settingsMessage = '';
    } catch (error) {
      if (generation !== importGeneration) return;
      pendingImport = null; settingsMessage = `Die Sicherung wurde nicht übernommen. ${error instanceof SyntaxError ? 'Die Datei enthält kein gültiges JSON.' : error.message}`;
    }
    if (page === 'settings') render();
  }
});

render({ focus: false });
