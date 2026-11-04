// Compact builders for module files (A1-M04 onwards). They produce exactly the lesson schema
// that legacy lessons and m01–m03 use. Step and word IDs follow the masterplan scheme
// (a1-m04-l02-s01, a1-m04-l02-w01) and are derived from position: never reorder or remove
// released steps or words, because stored progress and reviews refer to these IDs.

const pad = number => String(number).padStart(2, '0');

// Dialogue lines are written as [speaker, German, Vietnamese].
export const spoken = dialogue => dialogue.map(line => Array.isArray(line) ? line[1] : line.de).join(' ');

const why = ([title, de, vi, comparisons = []]) => ({
  title, de, vi,
  comparisons: comparisons.map(([good, bad, note, noteVi]) => ({ good, bad, note, noteVi }))
});

// Optional extras: hint [de, vi], listen [file, transcript], read (visible source text).
function extras({ hint, listen, read } = {}) {
  return {
    ...(hint ? { whyHint: { de: hint[0], vi: hint[1] } } : {}),
    ...(listen ? { audio: listen[0], transcript: listen[1] } : {}),
    ...(read ? { sourceText: read, comprehension: 'reading' } : {})
  };
}

export const study = (title, instruction, vi, audio) => ({ type: 'study', title, instruction, vi, ...(audio ? { audio } : {}) });
export const rule = (title, text, example, vi, whyParts) => ({ type: 'rule', title, rule: text, example, vi, why: why(whyParts) });
export const choice = (title, prompt, vi, options, answer, explanation, explanationVi, extra) =>
  ({ type: 'choice', title, prompt, vi, options, answer, explanation, explanationVi, ...extras(extra) });
export const input = (title, prompt, vi, answers, explanation, explanationVi, extra) =>
  ({ type: 'input', title, prompt, vi, answers, explanation, explanationVi, ...extras(extra) });
export const free = (title, prompt, vi, model, checklist, mode) =>
  ({ type: 'free', title, prompt, vi, model, checklist, ...(mode ? { mode } : {}) });

export function lesson(id, { title, theme, description, minutes = 10, level = 'A1' }, dialogue, words, steps) {
  return {
    id, title, theme, description, level, minutes,
    dialogue: dialogue.map(([speaker, de, vi]) => ({ speaker, de, vi })),
    words: words.map(([de, vi, example], index) => ({ id: `${id}-w${pad(index + 1)}`, de, vi, example })),
    steps: steps.map((step, index) => ({ id: `${id}-s${pad(index + 1)}`, ...step }))
  };
}
