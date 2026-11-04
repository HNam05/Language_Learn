import { escapeHtml as e, icon, button, help, speakButtons } from './ui.js';

// Requirements as checked in November 2026 (docs/curriculum/EINBUERGERUNG-STRATEGIE.md). No legal advice.
const civicsFacts = [
  ['Deutsch auf Niveau B1, zum Beispiel mit dem „Deutsch-Test für Zuwanderer“ (B1) oder einem anderen anerkannten B1-Zertifikat.', 'Tiếng Đức trình độ B1, ví dụ bằng kỳ thi „Deutsch-Test für Zuwanderer“ (B1) hoặc một chứng chỉ B1 khác được công nhận.'],
  ['Der Test „Leben in Deutschland“: 33 Fragen, 60 Minuten, mindestens 17 richtige Antworten. 30 Fragen sind allgemein, 3 Fragen betreffen Ihr Bundesland.', 'Bài thi „Leben in Deutschland“ (Cuộc sống ở Đức): 33 câu hỏi, 60 phút, cần trả lời đúng ít nhất 17 câu. 30 câu là câu hỏi chung, 3 câu về bang nơi bạn sống.'],
  ['In der Regel fünf Jahre rechtmäßiger Aufenthalt, gesicherter Lebensunterhalt und keine Verurteilung wegen einer Straftat.', 'Thông thường cần cư trú hợp pháp năm năm, tự lo được cuộc sống và không bị kết án vì tội phạm.']
];

export function civicsView(topics, progress, sources, settings, lands = [], open = null) {
  const total = progress.all;
  const topicRows = topics.map(topic => {
    const item = progress[topic.id];
    const land = topic.id === 'bundesland' ? lands.find(entry => entry.id === settings.bundesland) : null;
    return `<div class="lesson-row"><span class="row-number">${item.secure}/${item.total}</span><div><h3>${e(topic.title)}${land ? `: ${e(land.name)}` : ''}</h3><p>${item.seen} von ${item.total} Fragen geübt · ${item.secure} sicher${item.due ? ` · ${item.due} heute fällig` : ''}</p>${help(topic.vi, settings)}</div><button class="text-button" data-action="civics-start" data-topic="${e(topic.id)}" aria-label="${e(topic.title)} – Fragen üben">Fragen üben ${icon('arrow')}</button></div>`;
  }).join('');
  const nothingOpen = total.seen === total.total && total.due === 0;
  const start = nothingOpen
    ? `<p>Heute sind keine Fragen fällig. Sie können freiwillig wiederholen; das verändert Ihre geplanten Wiederholungen nicht.</p>${button('Freiwillig 10 Fragen üben', 'civics-voluntary', { primary: true, arrow: true })}`
    : `<p>${total.due ? `${total.due} ${total.due === 1 ? 'Frage ist' : 'Fragen sind'} heute zur Wiederholung fällig.` : 'Beginnen Sie mit neuen Fragen.'} Eine Runde hat höchstens 10 Fragen und keine Zeitbegrenzung.</p>${button('Übungsrunde starten', 'civics-start', { primary: true, arrow: true })}`;
  const resume = open ? `<section class="goal-line" aria-label="Begonnene Übung"><p><strong>${open.mode === 'mock' ? 'Begonnene Probeprüfung' : 'Begonnene Runde'}:</strong> Frage ${open.position + 1} von ${open.items.length}.</p>${button('Fortsetzen', 'civics-resume', { primary: true, arrow: true })}</section>` : '';
  return `<header class="page-heading"><h1>Leben in Deutschland</h1><p>Üben für den Einbürgerungstest. In Ruhe, ohne Zeitdruck.</p></header>${resume}
    <section class="quick-stats" aria-label="Ihr Stand bei den Testfragen"><div><strong>${total.seen}</strong><span>von ${total.total} Übungsfragen beantwortet</span></div><div><strong>${total.secure}</strong><span>sicher gewusst</span></div></section>
    <section class="featured civics-start"><div class="featured-copy"><p class="small-label">Ihre nächste Runde</p><h2>Fragen zu Demokratie, Geschichte und Alltag</h2>${start}${help('Mỗi vòng có tối đa 10 câu hỏi, không giới hạn thời gian. Câu trả lời sai sẽ được hỏi lại vào ngày mai.', settings)}</div></section>
    <section class="settings-section mock-test"><h2>Probeprüfung</h2><p>33 Fragen wie im echten Test: 30 allgemeine und 3 zu Ihrem Bundesland. Ohne Zeitbegrenzung; Sie können jederzeit pausieren. Die Lösungen sehen Sie am Ende.</p>${settings.bundesland ? '' : '<p class="hint">Sie haben noch kein Bundesland gewählt. Dann besteht die Probe aus 33 allgemeinen Fragen.</p>'}${help('Bài thi thử gồm 33 câu như bài thi thật: 30 câu chung và 3 câu về bang của bạn. Không giới hạn thời gian, có thể tạm dừng bất cứ lúc nào. Đáp án được hiển thị ở cuối.', settings)}${button('Probeprüfung beginnen', 'civics-mock')}</section>
    <section class="settings-section land-choice"><h2>Ihr Bundesland</h2><p>Im Test gibt es 3 Fragen zu dem Bundesland, in dem Sie wohnen. Wählen Sie es aus, dann kommen passende Übungsfragen dazu.</p>${help('Trong bài thi có 3 câu hỏi về bang nơi bạn đang sống. Hãy chọn bang của bạn để luyện thêm các câu hỏi phù hợp.', settings)}<label class="input-label" for="bundesland-select">Bundesland</label><select id="bundesland-select"><option value="">Noch nicht gewählt</option>${lands.map(land => `<option value="${e(land.id)}" ${settings.bundesland === land.id ? 'selected' : ''}>${e(land.name)}</option>`).join('')}</select></section>
    <section class="path-preview"><h2>Themenbereiche</h2><div class="lesson-list">${topicRows}</div></section>
    <section class="quiet-note civics-facts" aria-labelledby="civics-facts-title"><h2 id="civics-facts-title">Was brauchen Sie für die Einbürgerung?</h2><ul>${civicsFacts.map(([de, vi]) => `<li>${e(de)}${help(vi, settings)}</li>`).join('')}</ul>
      <div class="rule-panel"><h3>Wichtig für frühere Vertragsarbeiterinnen und Vertragsarbeiter</h3><p>Wer als Vertragsarbeitnehmerin oder Vertragsarbeitnehmer bis zum 13. Juni 1990 in die DDR eingereist ist, braucht nach dem Gesetz nur mündliche Deutschkenntnisse für den Alltag. Der Einbürgerungstest entfällt dann. Das gilt auch für Ehepartner, die damals bald nachgezogen sind (§ 10 Absatz 4 und 6 Staatsangehörigkeitsgesetz).</p>${help('Người đã sang Đông Đức (DDR) làm lao động hợp tác đến ngày 13 tháng 6 năm 1990 theo luật chỉ cần nói được tiếng Đức trong sinh hoạt hằng ngày. Khi đó không cần thi bài kiểm tra nhập quốc tịch. Điều này cũng áp dụng cho vợ hoặc chồng đã sang đoàn tụ ngay sau đó (Điều 10 khoản 4 và 6 Luật Quốc tịch).', settings)}<p>Auch bei Krankheit, Behinderung oder wenn es altersbedingt nicht möglich ist, wird auf den Sprachnachweis und den Test verzichtet.</p>${help('Khi bị bệnh, khuyết tật hoặc vì tuổi cao không thể đáp ứng, người nộp đơn được miễn chứng chỉ tiếng và bài thi.', settings)}</div>
      <p>Diese Hinweise ersetzen keine Beratung. Verbindlich ist die Auskunft Ihrer Einbürgerungsbehörde. Geprüft im ${e(sources.checked)}.</p>${help('Các thông tin này không thay thế tư vấn pháp lý. Hãy hỏi cơ quan nhập quốc tịch (Einbürgerungsbehörde) nơi bạn sống để có câu trả lời chính thức.', settings)}
      <p>Die Fragen hier sind eigene Übungsfragen zu denselben Themen. Den offiziellen Katalog mit allen Fragen, auch zu Ihrem Bundesland, finden Sie beim Bundesamt für Migration und Flüchtlinge.</p>
      <div class="actions"><a class="button secondary" href="${e(sources.trainer)}" target="_blank" rel="noopener">Offizielle Übungsfragen (Internet)</a><a class="button secondary" href="${e(sources.info)}" target="_blank" rel="noopener">Informationen zur Einbürgerung</a></div></section>`;
}

function civicsSummary({ total, score, mode, mistakes }, settings) {
  const actions = `<div class="actions">${button('Zur Übersicht', 'civics', { primary: true })}${button('Zur Startseite', 'home')}</div>`;
  if (!total) return `<section class="finish-view"><h1>Gerade nichts offen</h1><p>In diesem Bereich sind heute keine Fragen fällig. Sie können freiwillig wiederholen oder morgen weiterüben.</p>${actions}</section>`;
  const review = mistakes.length ? `<section class="mistake-list" aria-labelledby="mistakes-title"><h2 id="mistakes-title">Diese Fragen üben wir weiter</h2>${mistakes.map(question => `<details data-disclosure="mistake-${e(question.id)}"><summary>${e(question.prompt)}</summary><p><strong>Richtig: ${e(question.options[question.answer])}</strong></p><p>${e(question.explanation)}</p>${help(question.explanationVi, settings)}</details>`).join('')}</section>` : '';
  let message;
  if (mode === 'mock') {
    message = score >= 17
      ? `Das hätte im echten Test zum Bestehen gereicht; nötig sind 17 von 33.`
      : `Im echten Test sind 17 von 33 nötig. Es fehlen noch ${17 - score}. Das ist ein Zwischenstand, kein Urteil – mit jeder Runde wird es mehr.`;
    message += mistakes.length ? ' Die falsch beantworteten Fragen kommen ab morgen in Ihren Übungsrunden wieder.' : '';
  } else {
    message = `Im echten Test reichen 17 von 33 richtigen Antworten. ${mode === 'voluntary' ? 'Diese freiwillige Runde hat Ihre geplanten Wiederholungen nicht verändert.' : 'Fragen, die heute noch nicht geklappt haben, kommen morgen wieder.'}`;
  }
  const vi = mode === 'mock' ? 'Trong bài thi thật cần đúng 17 trên 33 câu. Đây chỉ là kết quả tạm thời, không phải đánh giá về bạn.' : 'Trong bài thi thật, chỉ cần đúng 17 trên 33 câu.';
  return `<section class="finish-view"><div class="finish-check">${icon('check')}</div><h1>${mode === 'mock' ? 'Probeprüfung beendet' : 'Runde beendet'}</h1><p>Sie haben ${score} von ${total} ${total === 1 ? 'Frage' : 'Fragen'} richtig beantwortet.</p><p>${message}</p>${help(vi, settings)}${actions}</section>${review}`;
}

export function civicsQuizView(data, settings) {
  const { question, order, selection, position, total, mode } = data;
  if (!question) return civicsSummary(data, settings);
  const label = { round: 'Übungsrunde', voluntary: 'Freiwillige Wiederholung', mock: 'Probeprüfung' }[mode];
  const checked = selection.checked;
  const choices = order.map((original, index) => {
    const selected = selection.value === String(index);
    const mark = checked ? (original === question.answer ? ' correct-choice' : selected ? ' wrong-choice' : '') : '';
    return `<label class="choice${selected ? ' selected' : ''}${mark}"><input type="radio" name="civics-answer" value="${index}" ${selected ? 'checked' : ''} ${checked ? 'disabled' : ''}><span>${e(question.options[original])}${settings.vietnamese ? `<small lang="vi">${e(question.optionsVi[original])}</small>` : ''}</span>${checked && original === question.answer ? '<strong class="choice-mark">Richtig</strong>' : ''}</label>`;
  }).join('');
  const terms = question.terms?.length ? `<h4>Wichtige Wörter</h4><ul class="term-list">${question.terms.map(term => `<li><strong>${e(term.de)}</strong>${settings.vietnamese ? ` – <span lang="vi">${e(term.vi)}</span>` : ''}</li>`).join('')}</ul>` : '';
  const feedback = checked ? `<div class="feedback ${selection.correct ? 'correct' : 'retry'}" role="status" tabindex="-1"><h3>${selection.correct ? 'Das stimmt!' : `Die richtige Antwort ist: ${e(question.options[question.answer])}`}</h3><p>${e(question.explanation)}</p>${speakButtons(question.explanation)}${help(question.explanationVi, settings)}${terms}</div>` : '';
  return `<div class="lesson-toolbar"><button class="text-button" data-action="civics">${icon('back')} Pause machen</button><span>${label} · Frage ${position + 1} von ${total}</span></div><progress class="lesson-progress" max="${total}" value="${position + 1}" aria-label="Fortschritt in dieser Runde"></progress><div class="exercise"><p class="lesson-context">Leben in Deutschland</p><form id="civics-form"><fieldset><legend>${e(question.prompt)}</legend>${speakButtons(`${question.prompt} Die Antworten: ${order.map(original => question.options[original]).join('. ')}.`)}${help(question.vi, settings)}<div class="choices">${choices}</div></fieldset>${checked ? '' : `<button class="button primary" type="submit">${mode === 'mock' ? (position === total - 1 ? 'Antwort speichern und auswerten' : 'Antwort speichern und weiter') : 'Antwort prüfen'}</button>`}</form>${mode === 'mock' && !checked ? '<p class="hint">In der Probeprüfung sehen Sie die Lösungen erst am Ende.</p>' : ''}${feedback}<p id="civics-hint" class="hint" role="status"></p><div class="lesson-actions"><span></span>${checked ? button(position === total - 1 ? 'Runde beenden' : 'Nächste Frage', 'civics-next', { primary: true, arrow: true }) : ''}</div></div>`;
}
