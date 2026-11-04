import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { lessons } from '../app/content/lessons.js';
import { courseModules } from '../app/content/course.js';
import { civicsQuestions, civicsTopics } from '../app/content/civics.js';

const text = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label}: Text fehlt.`);
};
const requireValue = (condition, label) => { if (!condition) throw new Error(label); };
const list = (value, min, label) => requireValue(Array.isArray(value) && value.length >= min, `${label}: Liste unvollständig.`);
const strings = (value, min, label) => { list(value, min, label); value.forEach(item => text(item, label)); };
const normalized = value => value.normalize('NFC').trim().toLocaleLowerCase('de-DE').replace(/[.!?]+$/u, '').replace(/\s+/gu, ' ');
const inspect = value => {
  if (typeof value === 'string') requireValue(!value.includes('\\n'), 'Literales \\n statt Zeilenumbruch.');
  else if (value && typeof value === 'object') Object.values(value).forEach(inspect);
};

// Pure data checks + injectable media reader make malformed-content tests independent
// of production files. This verifies structure, not pedagogical correctness.
export function validateContent(content, modules, manifest, readAudio) {
  list(content, 1, 'Lektionen'); list(modules, 1, 'Module'); list(manifest, 0, 'Manifest');
  const ids = new Set();
  const identify = (id, label) => { text(id, label); requireValue(!ids.has(id), `Doppelte ID: ${id}`); ids.add(id); };
  const moduleMap = new Map();
  for (const module of modules) {
    identify(module.id, 'Modul-ID'); moduleMap.set(module.id, module);
    text(module.title, module.id);
    requireValue(['A1', 'A2', 'B1'].includes(module.cefr), `${module.id}: Niveau ungültig.`);
    requireValue(Number.isInteger(module.order) && module.order > 0, `${module.id}: Reihenfolge ungültig.`);
    requireValue(['pilot', 'complete'].includes(module.status), `${module.id}: Status ungültig.`);
    strings(module.lessonIds, 1, `${module.id}.lessonIds`);
    if (module.status === 'complete') requireValue(module.lessonIds.length === 6, `${module.id}: Vollständiges Modul braucht sechs Lektionen.`);
    strings(module.prerequisites, 0, `${module.id}.prerequisites`);
    list(module.goals, 1, `${module.id}.goals`);
    module.goals.forEach(goal => { identify(goal.id, 'Ziel-ID'); text(goal.text, goal.id); });
  }
  for (const module of modules) for (const id of module.prerequisites) {
    requireValue(moduleMap.has(id) && moduleMap.get(id).order < module.order, `${module.id}: Ungültige Voraussetzung ${id}`);
  }
  const audioMap = new Map();
  for (const entry of manifest) {
    text(entry.file, 'Audio-Datei'); text(entry.text, entry.file);
    requireValue(/^[a-z0-9-]+\.wav$/u.test(entry.file) && !audioMap.has(entry.file), `Ungültiger/doppelter Manifest-Eintrag: ${entry.file}`);
    audioMap.set(entry.file, entry.text);
  }
  const usedAudio = new Set();
  for (const lesson of content) {
    identify(lesson.id, 'Lektions-ID');
    for (const field of ['title', 'theme', 'description', 'level']) text(lesson[field], `${lesson.id}.${field}`);
    const module = moduleMap.get(lesson.moduleId);
    requireValue(module && module.lessonIds.includes(lesson.id), `${lesson.id}: Ungültiger Modulverweis.`);
    strings(lesson.goalIds, 1, `${lesson.id}.goalIds`);
    lesson.goalIds.forEach(id => requireValue(module.goals.some(goal => goal.id === id), `${lesson.id}: Unbekanntes Lernziel ${id}`));
    strings(lesson.skills, 1, `${lesson.id}.skills`);
    lesson.skills.forEach(skill => requireValue(['reading', 'listening', 'writing', 'speaking', 'interaction', 'mediation'].includes(skill), `${lesson.id}: Unbekannte Fertigkeit.`));
    list(lesson.dialogue, 2, `${lesson.id}.dialogue`);
    lesson.dialogue.forEach(line => ['speaker', 'de', 'vi'].forEach(field => text(line[field], `${lesson.id}.dialogue.${field}`)));
    list(lesson.words, 1, `${lesson.id}.words`);
    lesson.words.forEach(word => { identify(word.id, 'Wort-ID'); ['de', 'vi', 'example'].forEach(field => text(word[field], `${word.id}.${field}`)); });
    list(lesson.steps, 1, `${lesson.id}.steps`);
    for (const step of lesson.steps) {
      identify(step.id, 'Schritt-ID'); text(step.title, step.id); text(step.vi, `${step.id}.vi`);
      requireValue(['study', 'rule', 'choice', 'input', 'free'].includes(step.type), `${step.id}: Typ ungültig.`);
      if (step.type === 'study') text(step.instruction, `${step.id}.instruction`);
      if (step.type === 'rule') { text(step.rule, `${step.id}.rule`); text(step.example, `${step.id}.example`); }
      if (['choice', 'input', 'free'].includes(step.type)) text(step.prompt, `${step.id}.prompt`);
      if (['choice', 'input'].includes(step.type)) {
        text(step.explanation, `${step.id}.explanation`); text(step.explanationVi, `${step.id}.explanationVi`);
        const values = step.type === 'choice' ? step.options : step.answers;
        strings(values, step.type === 'choice' ? 3 : 1, `${step.id}.Antworten`);
        requireValue(new Set(values.map(normalized)).size === values.length, `${step.id}: Doppelte Antworten.`);
        if (step.type === 'choice') requireValue(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < values.length, `${step.id}: Lösungsindex ungültig.`);
      }
      if (step.type === 'free') {
        text(step.model, `${step.id}.model`); strings(step.checklist, 2, `${step.id}.checklist`);
        requireValue(step.mode === undefined || ['writing', 'speaking', 'interaction', 'mediation'].includes(step.mode), `${step.id}: Modus ungültig.`);
      }
      if (step.sourceText !== undefined) text(step.sourceText, `${step.id}.sourceText`);
      if (step.comprehension !== undefined) requireValue(['reading', 'listening'].includes(step.comprehension), `${step.id}: Verständnisart ungültig.`);
      const hearing = step.comprehension === 'listening' || /Hören Sie|Hören oder lesen Sie/u.test(step.prompt || step.instruction || '');
      const reading = step.comprehension === 'reading' || /Lesen Sie (die Antwort|den Text)/u.test(step.prompt || '');
      if (hearing) text(step.audio, `${step.id}: Audio für Höraufgabe`);
      if (reading) text(step.sourceText, `${step.id}: Textquelle für Leseaufgabe`);
      if (step.transcript !== undefined && !step.audio) text(step.sourceText, `${step.id}: Sichtbare Textalternative`);
      if (step.audio !== undefined) {
        text(step.audio, `${step.id}.audio`);
        requireValue(audioMap.has(step.audio), `${step.id}: Audio nicht im Manifest.`);
        const expected = step.type === 'study' ? lesson.dialogue.map(line => line.de).join(' ') : step.transcript;
        text(expected, `${step.id}: Transkript`);
        requireValue(audioMap.get(step.audio) === expected, `${step.id}: Audio und Transkript stimmen nicht überein.`);
        if (!usedAudio.has(step.audio)) {
          const wav = readAudio(step.audio);
          requireValue(wav.length > 44 && wav.toString('ascii', 0, 4) === 'RIFF' && wav.toString('ascii', 8, 12) === 'WAVE', `${step.audio}: Ungültige WAV-Datei.`);
        }
        usedAudio.add(step.audio);
      }
    }
    inspect(lesson);
  }
  const assigned = modules.flatMap(module => module.lessonIds);
  requireValue(new Set(assigned).size === assigned.length && assigned.length === content.length && assigned.every(id => content.some(lesson => lesson.id === id)), 'Kurszuordnung unvollständig oder doppelt.');
  requireValue(usedAudio.size === audioMap.size, 'Unbenutzte Manifest-Einträge.');
  return { lessons: content.length, ids: ids.size, audios: usedAudio.size, modules: modules.length };
}

// Practice questions: four distinct options with Vietnamese help, a valid solution and a known topic.
export function validateCivics(questions, topics) {
  list(topics, 1, 'Themen'); list(questions, 1, 'Testfragen');
  const topicIds = new Set(topics.map(topic => { text(topic.id, 'Themen-ID'); text(topic.title, topic.id); text(topic.vi, `${topic.id}.vi`); return topic.id; }));
  const ids = new Set();
  for (const question of questions) {
    text(question.id, 'Fragen-ID');
    requireValue(/^lid-[a-z0-9-]+$/u.test(question.id) && !ids.has(question.id), `Ungültige/doppelte Fragen-ID: ${question.id}`);
    ids.add(question.id);
    requireValue(topicIds.has(question.topic), `${question.id}: Unbekanntes Thema.`);
    for (const field of ['prompt', 'vi', 'explanation', 'explanationVi']) text(question[field], `${question.id}.${field}`);
    strings(question.options, 4, `${question.id}.options`);
    requireValue(question.options.length === 4, `${question.id}: Genau vier Antworten erwartet.`);
    strings(question.optionsVi, 4, `${question.id}.optionsVi`);
    requireValue(question.optionsVi.length === question.options.length, `${question.id}: Vietnamesische Antworten unvollständig.`);
    requireValue(new Set(question.options.map(normalized)).size === question.options.length, `${question.id}: Doppelte Antworten.`);
    requireValue(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `${question.id}: Lösungsindex ungültig.`);
    list(question.terms ?? [], 0, `${question.id}.terms`);
    (question.terms ?? []).forEach(term => { text(term.de, `${question.id}.terms.de`); text(term.vi, `${question.id}.terms.vi`); });
    inspect(question);
  }
  return { questions: questions.length, topics: topicIds.size };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const manifest = JSON.parse(readFileSync(new URL('../app/content/audio-manifest.json', import.meta.url), 'utf8'));
  const result = validateContent(lessons, courseModules, manifest, file => readFileSync(new URL(`../app/assets/audio/${file}`, import.meta.url)));
  console.log('Inhaltsprüfung erfolgreich:', result, validateCivics(civicsQuestions, civicsTopics));
}
