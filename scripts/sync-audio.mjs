import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { lessons } from '../app/content/lessons.js';

// Derives the audio manifest from lesson content so transcripts cannot drift:
// study steps speak the dialogue, other steps their transcript. Existing entries are
// never rewritten silently; a changed text is reported so its WAV is regenerated on purpose.
const manifestUrl = new URL('../app/content/audio-manifest.json', import.meta.url);
const manifest = JSON.parse(readFileSync(manifestUrl, 'utf8'));
const known = new Map(manifest.map(entry => [entry.file, entry.text]));
const required = new Map();
for (const lesson of lessons) for (const step of lesson.steps) {
  if (!step.audio) continue;
  const text = step.type === 'study' ? lesson.dialogue.map(line => line.de).join(' ') : step.transcript;
  if (required.has(step.audio) && required.get(step.audio) !== text) throw new Error(`${step.audio}: unterschiedliche Texte in der Lektion ${lesson.id}.`);
  required.set(step.audio, text);
}
const changed = [...required].filter(([file, text]) => known.has(file) && known.get(file) !== text).map(([file]) => file);
if (changed.length) throw new Error(`Audiotext geändert, bitte bewusst neu erzeugen: ${changed.join(', ')}`);
const added = [...required].filter(([file]) => !known.has(file)).map(([file, text]) => ({ file, text }));
if (added.length) writeFileSync(manifestUrl, JSON.stringify([...manifest, ...added], null, 2) + '\n');
const missing = [...required.keys()].filter(file => !existsSync(new URL(`../app/assets/audio/${file}`, import.meta.url)));
console.log(`Manifest: ${added.length} neue Einträge. Fehlende WAV-Dateien: ${missing.length ? missing.join(',') : 'keine'}`);
