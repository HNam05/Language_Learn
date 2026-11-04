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
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    flag: '<path d="M5 21V4m0 0h11l-2 4 2 4H5"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9zm12 0a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/>'
  };
  return `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
}
export function button(text, action, { primary = false, attrs = '', arrow = false } = {}) {
  return `<button type="button" class="button ${primary ? 'primary' : 'secondary'}" data-action="${action}" ${attrs}>${escapeHtml(text)}${arrow ? icon('arrow') : ''}</button>`;
}
export function help(text, settings) {
  return settings.vietnamese && text ? `<p class="translation" lang="vi">${escapeHtml(text)}</p>` : '';
}
// Read-aloud for texts without a recording. Uses the browser's installed voices, so it works
// offline with a local German voice; without one it explains the gap instead of using English.
export function speakButtons(text) {
  const attrs = rate => `data-action="speak" data-rate="${rate}" data-text="${escapeHtml(text)}"`;
  return `<div class="speak-row"><button type="button" class="text-button" ${attrs(1)}>${icon('sound')}<span>Vorlesen</span></button><button type="button" class="text-button" ${attrs(0.8)}>${icon('sound')}<span>Langsam vorlesen</span></button><p class="speak-status" role="status"></p></div>`;
}

function germanVoice(synth) {
  const voices = synth.getVoices().filter(voice => /^de([-_]|$)/iu.test(voice.lang));
  return voices.find(voice => voice.localService) || voices[0] || null;
}

export async function speak(text, rate, status) {
  const report = message => { if (status) status.textContent = message; };
  const synth = globalThis.speechSynthesis;
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return report('Dieser Browser kann leider nicht vorlesen.');
  // Voice lists load asynchronously in some browsers.
  if (!synth.getVoices().length) await new Promise(resolve => { synth.addEventListener('voiceschanged', resolve, { once: true }); setTimeout(resolve, 1500); });
  const voice = germanVoice(synth);
  if (!voice) return report('Auf diesem Rechner ist keine deutsche Stimme installiert. Eine deutsche Stimme kann in den Windows-Einstellungen unter „Zeit und Sprache“ hinzugefügt werden.');
  report('');
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = rate;
  utterance.onerror = () => report('Das Vorlesen hat nicht geklappt. Sie können den Text weiter lesen.');
  synth.speak(utterance);
}

export function audioPlayer(file, transcript = '') {
  if (!file) return '';
  return `<div class="audio-block"><label>Hören Sie zu. Sie können die Aufnahme wiederholen.<audio controls preload="metadata" src="./assets/audio/${escapeHtml(file)}">Ihr Browser unterstützt keine Audiowiedergabe.</audio></label><label class="speed">Geschwindigkeit <select data-speed aria-label="Geschwindigkeit der Aufnahme"><option value="1">Normal</option><option value="0.8">Langsamer</option></select></label><p class="audio-error" role="status"></p>${transcript ? `<details data-disclosure="transcript"><summary>Text zur Aufnahme anzeigen</summary><p>${escapeHtml(transcript)}</p><small>Mit Text üben ist erlaubt. Versuchen Sie es später auch ohne Hilfe.</small></details>` : ''}</div>`;
}
export function whyGrammar(why, settings) {
  if (!why) return '';
  const comparisons = why.comparisons && why.comparisons.length ? `
    <div class="contrast-list">
      <h4 class="contrast-title">Richtig und nicht richtig${settings.vietnamese ? ' · <span lang="vi">So sánh để tránh lỗi</span>' : ''}</h4>
      ${why.comparisons.map(c => `
        <div class="contrast-item">
          <div class="case-row good"><span class="case-badge">✔ Richtig</span><strong>${escapeHtml(c.good)}</strong></div>
          <div class="case-row bad"><span class="case-badge">✖ Nicht so</span><span>${escapeHtml(c.bad)}</span></div>
          <p class="contrast-note">${escapeHtml(c.note)}${settings.vietnamese && c.noteVi ? `<br><span lang="vi" class="vi-sub">${escapeHtml(c.noteVi)}</span>` : ''}</p>
        </div>
      `).join('')}
    </div>
  ` : '';

  return `
    <details class="why-card" data-disclosure="grammar">
      <summary class="why-header">Warum ist das so?${settings.vietnamese ? ' <span lang="vi">· Tại sao lại như vậy?</span>' : ''}</summary>
      <h3>${escapeHtml(why.title || 'Die Regel erklärt')}</h3>
      <div class="why-body">
        <p class="why-de">${escapeHtml(why.de).replace(/\n/g, '<br>')}</p>
        ${settings.vietnamese && why.vi ? `<div class="why-vi translation" lang="vi">${escapeHtml(why.vi).replace(/\n/g, '<br>')}</div>` : ''}
      </div>
      ${comparisons}
    </details>
  `;
}
