import { lessons } from '../content/lessons.js';
import { createStore, completeLesson, isCorrect, dueWords, scheduleReview, validateState } from './state.js';
import { icon, escapeHtml as e } from './ui.js';
import { homeView, pathView, lessonView, finishView, reviewView, settingsView } from './views.js';

// A denied localStorage getter must not prevent opening the learning interface.
let storage;
try { storage = window.localStorage; } catch { storage = { getItem() { throw new Error('Storage unavailable'); } }; }
const store = createStore(storage, lessons);
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
const app = document.querySelector('#app');

function persist({ restore = false } = {}) {
  const success = store.save(state, { restore });
  state = store.state;
  const status = document.querySelector('#storage-warning');
  if (status) { status.textContent = store.warning; status.hidden = !store.warning; }
  return success;
}

function render({ focus = true, preservePosition = false, focusSelector = '' } = {}) {
  const viewKey = page === 'lesson' && state.active ? `${page}:${state.active.lessonId}:${state.active.step}` : page;
  const sameView = viewKey === renderedViewKey;
  const previousScroll = window.scrollY;
  const disclosures = sameView ? new Map([...app.querySelectorAll('[data-disclosure]')].map(element => [element.dataset.disclosure, element.open])) : new Map();
  const players = sameView ? [...app.querySelectorAll('audio')].map(element => ({ element, src: element.getAttribute('src'), rate: element.playbackRate, playing: !element.paused })) : [];
  if (!sameView) app.querySelectorAll('audio').forEach(audio => audio.pause());
  document.documentElement.classList.toggle('large-text', state.settings.largeText);
  let body;
  if (page === 'lesson' && state.active) body = lessonView(lessons.find(item => item.id === state.active.lessonId), state.active, state.settings);
  else if (page === 'path') body = pathView(lessons, state);
  else if (page === 'finish' && finishedLesson) body = finishView(finishedLesson);
  else if (page === 'review') {
    const word = lessons.flatMap(item => item.words).find(item => item.id === reviewQueue[0]);
    body = reviewView(word, word && state.reviews[word.id], reviewRevealed, reviewQueue.length, Object.keys(state.reviews).length, state.settings, voluntaryReview);
  } else if (page === 'settings') body = settingsView(state, pendingImport, settingsMessage);
  else body = homeView(lessons, state);
  const selected = page === 'lesson' || page === 'finish' ? 'home' : page;
  const nav = [['home', 'home', 'Heute'], ['path', 'book', 'Mein Lernweg'], ['review', 'repeat', 'Wiederholen']];
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
  if (['home', 'path', 'settings'].includes(action)) page = action;
  else if (action === 'toggle-help') { state.settings.vietnamese = !state.settings.vietnamese; persist(); }
  else if (action === 'dismiss-onboarding') { state.settings.onboardingSeen = true; persist(); }
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
  const preservePosition = ['toggle-help', 'reveal-model', 'reveal-review'].includes(action);
  const focusSelector = action === 'toggle-help' ? '[data-action="toggle-help"]' : action === 'reveal-model' ? '.model-answer' : '';
  render({ preservePosition, focusSelector });
});

app.addEventListener('submit', event => {
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
  if (target.name === 'answer' && target.type === 'radio') {
    setAnswer(target.value);
    clearFeedback();
    app.querySelectorAll('.choice').forEach(label => label.classList.toggle('selected', label.querySelector('input').checked));
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
      const imported = validateState(JSON.parse(await file.text()), lessons);
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
