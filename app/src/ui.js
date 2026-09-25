export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/gu, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export function icon(name) {
  const paths = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M12 5c-3-2-6-2-10-1v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v16"/>',
    repeat: '<path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/>',
    settings: '<path d="m9 3-1 3-3 1-2 3 2 3-1 3 3 2 3-1 2 3 3-2 3 1 2-3-1-3 2-2-2-3-3-1-1-3z"/><circle cx="12" cy="11" r="3"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3h.01"/>',
    check: '<path d="m5 12 4 4 10-10"/>',
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>'
  };
  return `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
}
export function button(text, action, { primary = false, attrs = '', arrow = false } = {}) {
  return `<button type="button" class="button ${primary ? 'primary' : 'secondary'}" data-action="${action}" ${attrs}>${escapeHtml(text)}${arrow ? icon('arrow') : ''}</button>`;
}
export function help(text, settings) {
  return settings.vietnamese && text ? `<p class="translation" lang="vi">${escapeHtml(text)}</p>` : '';
}
export function audioPlayer(file, transcript = '') {
  return `<div class="audio-block"><label>Hören Sie zu. Sie können die Aufnahme wiederholen.<audio controls preload="metadata" src="./assets/audio/${escapeHtml(file)}">Ihr Browser unterstützt keine Audiowiedergabe.</audio></label><label class="speed">Geschwindigkeit <select data-speed aria-label="Geschwindigkeit der Aufnahme"><option value="1">Normal</option><option value="0.8">Langsamer</option></select></label><p class="audio-error" role="status"></p>${transcript ? `<details><summary>Text zur Aufnahme anzeigen</summary><p>${escapeHtml(transcript)}</p><small>Mit Text üben ist erlaubt. Versuchen Sie es später auch ohne Hilfe.</small></details>` : ''}</div>`;
}
