// Original practice questions on the topic areas of the official test "Leben in Deutschland".
// Not the BAMF catalogue: link to it instead of copying it (docs/curriculum/EINBUERGERUNG-STRATEGIE.md).
// Facts checked against the Grundgesetz and BAMF pages in November 2026; German and Vietnamese
// wording still await human review. Keep IDs stable: learners' progress is stored per ID.
import { extendedQuestions } from './civics-extended.js';

export const civicsTopics = [
  { id: 'demokratie', title: 'Leben in der Demokratie', vi: 'Cuộc sống trong nền dân chủ' },
  { id: 'geschichte', title: 'Geschichte und Verantwortung', vi: 'Lịch sử và trách nhiệm' },
  { id: 'gesellschaft', title: 'Mensch und Gesellschaft', vi: 'Con người và xã hội' },
  { id: 'bundesland', title: 'Mein Bundesland', vi: 'Bang của tôi' }
];

const generalQuestions = [
  {
    id: 'lid-d01', topic: 'demokratie',
    prompt: 'Wie heißt die Verfassung der Bundesrepublik Deutschland?',
    vi: 'Hiến pháp của nước Cộng hòa Liên bang Đức tên là gì?',
    options: ['das Grundgesetz', 'das Bundesgesetz', 'das Volksgesetz', 'das Landesgesetz'],
    optionsVi: ['Luật Cơ bản (Grundgesetz)', 'Luật Liên bang', 'Luật Nhân dân', 'Luật của bang'],
    answer: 0,
    explanation: 'Die deutsche Verfassung heißt Grundgesetz. Es gilt seit dem 23. Mai 1949.',
    explanationVi: 'Hiến pháp của Đức gọi là Grundgesetz (Luật Cơ bản), có hiệu lực từ ngày 23 tháng 5 năm 1949.',
    terms: [{ de: 'die Verfassung', vi: 'hiến pháp' }, { de: 'das Grundgesetz', vi: 'Luật Cơ bản' }]
  },
  {
    id: 'lid-d02', topic: 'demokratie',
    prompt: 'Was steht in Artikel 1 des Grundgesetzes?',
    vi: 'Điều 1 của Luật Cơ bản nói gì?',
    options: ['Alle Menschen müssen arbeiten.', 'Die Würde des Menschen ist unantastbar.', 'Der Staat bestimmt die Religion.', 'Nur Deutsche haben Rechte.'],
    optionsVi: ['Mọi người đều phải làm việc.', 'Phẩm giá con người là bất khả xâm phạm.', 'Nhà nước quyết định tôn giáo.', 'Chỉ người Đức mới có quyền.'],
    answer: 1,
    explanation: 'Artikel 1 beginnt mit dem Satz: „Die Würde des Menschen ist unantastbar.“ Der Staat muss die Würde jedes Menschen achten und schützen.',
    explanationVi: 'Điều 1 bắt đầu bằng câu: „Phẩm giá con người là bất khả xâm phạm.“ Nhà nước phải tôn trọng và bảo vệ phẩm giá của mọi người.',
    terms: [{ de: 'die Würde', vi: 'phẩm giá' }, { de: 'unantastbar', vi: 'bất khả xâm phạm' }]
  },
  {
    id: 'lid-d03', topic: 'demokratie',
    prompt: 'Wer darf bei der Bundestagswahl wählen?',
    vi: 'Ai được bỏ phiếu trong cuộc bầu cử Quốc hội Liên bang (Bundestag)?',
    options: ['alle Menschen, die in Deutschland wohnen', 'nur Mitglieder einer Partei', 'deutsche Staatsangehörige ab 18 Jahren', 'nur Menschen mit Arbeit'],
    optionsVi: ['tất cả những người sống ở Đức', 'chỉ thành viên của một đảng', 'công dân Đức từ 18 tuổi trở lên', 'chỉ những người có việc làm'],
    answer: 2,
    explanation: 'Bei der Bundestagswahl wählen deutsche Staatsangehörige ab 18 Jahren. Nach der Einbürgerung dürfen Sie also auch wählen.',
    explanationVi: 'Trong bầu cử Quốc hội Liên bang, công dân Đức từ 18 tuổi trở lên được bỏ phiếu. Sau khi nhập quốc tịch, bạn cũng được đi bầu.',
    terms: [{ de: 'die Wahl', vi: 'cuộc bầu cử' }, { de: 'die Staatsangehörigkeit', vi: 'quốc tịch' }]
  },
  {
    id: 'lid-d04', topic: 'demokratie',
    prompt: 'Für wie viele Jahre wird der Bundestag normalerweise gewählt?',
    vi: 'Quốc hội Liên bang (Bundestag) thường được bầu cho nhiệm kỳ bao nhiêu năm?',
    options: ['für zwei Jahre', 'für vier Jahre', 'für sechs Jahre', 'für acht Jahre'],
    optionsVi: ['hai năm', 'bốn năm', 'sáu năm', 'tám năm'],
    answer: 1,
    explanation: 'Der Bundestag wird für vier Jahre gewählt. Diese Zeit heißt Wahlperiode.',
    explanationVi: 'Bundestag được bầu cho bốn năm. Khoảng thời gian này gọi là nhiệm kỳ (Wahlperiode).',
    terms: [{ de: 'der Bundestag', vi: 'Quốc hội Liên bang' }, { de: 'die Wahlperiode', vi: 'nhiệm kỳ' }]
  },
  {
    id: 'lid-d05', topic: 'demokratie',
    prompt: 'Wer wählt den Bundeskanzler oder die Bundeskanzlerin?',
    vi: 'Ai bầu ra Thủ tướng Liên bang?',
    options: ['das Volk direkt', 'der Bundesrat', 'das Bundesverfassungsgericht', 'der Bundestag'],
    optionsVi: ['người dân bầu trực tiếp', 'Hội đồng Liên bang (Bundesrat)', 'Tòa án Hiến pháp Liên bang', 'Quốc hội Liên bang (Bundestag)'],
    answer: 3,
    explanation: 'Die Bürgerinnen und Bürger wählen den Bundestag. Der Bundestag wählt dann den Bundeskanzler oder die Bundeskanzlerin.',
    explanationVi: 'Người dân bầu ra Bundestag. Sau đó Bundestag bầu ra Thủ tướng Liên bang.',
    terms: [{ de: 'der Bundeskanzler / die Bundeskanzlerin', vi: 'Thủ tướng Liên bang' }, { de: 'wählen', vi: 'bầu, bỏ phiếu' }]
  },
  {
    id: 'lid-d06', topic: 'demokratie',
    prompt: 'Was bedeutet „geheime Wahl“?',
    vi: '„Bỏ phiếu kín“ có nghĩa là gì?',
    options: ['Niemand darf sehen oder kontrollieren, wen ich wähle.', 'Die Wahl findet in der Nacht statt.', 'Nur Politiker kennen den Wahltag.', 'Ich muss meinen Namen auf den Stimmzettel schreiben.'],
    optionsVi: ['Không ai được xem hay kiểm soát tôi bầu cho ai.', 'Cuộc bầu cử diễn ra vào ban đêm.', 'Chỉ chính trị gia biết ngày bầu cử.', 'Tôi phải viết tên mình lên lá phiếu.'],
    answer: 0,
    explanation: 'Geheime Wahl heißt: Ich wähle allein in der Wahlkabine. Niemand darf mich zwingen oder sehen, wen ich wähle.',
    explanationVi: 'Bỏ phiếu kín nghĩa là: Tôi bỏ phiếu một mình trong phòng bỏ phiếu. Không ai được ép buộc tôi hoặc xem tôi bầu cho ai.',
    terms: [{ de: 'geheim', vi: 'bí mật, kín' }, { de: 'der Stimmzettel', vi: 'lá phiếu' }]
  },
  {
    id: 'lid-d07', topic: 'demokratie',
    prompt: 'Wie viele Bundesländer hat Deutschland?',
    vi: 'Nước Đức có bao nhiêu bang?',
    options: ['12', '14', '16', '18'],
    optionsVi: ['12', '14', '16', '18'],
    answer: 2,
    explanation: 'Deutschland hat 16 Bundesländer, zum Beispiel Berlin, Sachsen und Bayern. Im Test kommen drei Fragen zu Ihrem eigenen Bundesland.',
    explanationVi: 'Nước Đức có 16 bang, ví dụ Berlin, Sachsen và Bayern. Trong bài thi có ba câu hỏi về bang nơi bạn sinh sống.',
    terms: [{ de: 'das Bundesland, die Bundesländer', vi: 'bang' }]
  },
  {
    id: 'lid-d08', topic: 'demokratie',
    prompt: 'Darf man in Deutschland die Regierung öffentlich kritisieren?',
    vi: 'Ở Đức có được công khai phê bình chính phủ không?',
    options: ['Nein, das ist verboten.', 'Nur mit Erlaubnis der Polizei.', 'Ja, es gibt Meinungsfreiheit.', 'Nur Politikerinnen und Politiker dürfen das.'],
    optionsVi: ['Không, điều đó bị cấm.', 'Chỉ khi cảnh sát cho phép.', 'Có, vì có quyền tự do ngôn luận.', 'Chỉ chính trị gia mới được làm vậy.'],
    answer: 2,
    explanation: 'Das Grundgesetz schützt die Meinungsfreiheit. Man darf die Regierung kritisieren. Beleidigungen und Aufrufe zu Gewalt sind aber verboten.',
    explanationVi: 'Luật Cơ bản bảo vệ quyền tự do ngôn luận. Có thể phê bình chính phủ. Nhưng xúc phạm người khác và kêu gọi bạo lực thì bị cấm.',
    terms: [{ de: 'die Meinungsfreiheit', vi: 'tự do ngôn luận' }, { de: 'kritisieren', vi: 'phê bình' }]
  },
  {
    id: 'lid-d09', topic: 'demokratie',
    prompt: 'Welches Gericht prüft, ob ein Gesetz zum Grundgesetz passt?',
    vi: 'Tòa án nào xem xét một đạo luật có phù hợp với Luật Cơ bản hay không?',
    options: ['das Amtsgericht', 'das Bundesverfassungsgericht', 'das Arbeitsgericht', 'das Finanzgericht'],
    optionsVi: ['Tòa án sơ thẩm khu vực', 'Tòa án Hiến pháp Liên bang', 'Tòa án lao động', 'Tòa án tài chính'],
    answer: 1,
    explanation: 'Das Bundesverfassungsgericht in Karlsruhe prüft, ob Gesetze mit dem Grundgesetz übereinstimmen.',
    explanationVi: 'Tòa án Hiến pháp Liên bang ở Karlsruhe xem xét các đạo luật có phù hợp với Luật Cơ bản hay không.',
    terms: [{ de: 'das Gericht', vi: 'tòa án' }, { de: 'das Gesetz', vi: 'đạo luật' }]
  },
  {
    id: 'lid-d10', topic: 'demokratie',
    prompt: 'Was bedeutet Gewaltenteilung?',
    vi: 'Tam quyền phân lập (Gewaltenteilung) có nghĩa là gì?',
    options: ['Polizei und Militär teilen sich die Arbeit.', 'Die Bundesländer teilen sich das Geld.', 'Die Macht des Staates ist auf Parlament, Regierung und Gerichte verteilt.', 'Jeder darf sich mit Gewalt verteidigen.'],
    optionsVi: ['Cảnh sát và quân đội chia nhau công việc.', 'Các bang chia nhau tiền.', 'Quyền lực nhà nước được chia cho quốc hội, chính phủ và tòa án.', 'Ai cũng được dùng bạo lực để tự vệ.'],
    answer: 2,
    explanation: 'Das Parlament macht die Gesetze, die Regierung führt sie aus, die Gerichte kontrollieren. So hat niemand die ganze Macht.',
    explanationVi: 'Quốc hội làm luật, chính phủ thi hành luật, tòa án kiểm soát. Như vậy không ai nắm toàn bộ quyền lực.',
    terms: [{ de: 'die Macht', vi: 'quyền lực' }, { de: 'die Regierung', vi: 'chính phủ' }]
  },
  {
    id: 'lid-g01', topic: 'geschichte',
    prompt: 'In welchem Jahr wurde die Bundesrepublik Deutschland gegründet?',
    vi: 'Nước Cộng hòa Liên bang Đức được thành lập vào năm nào?',
    options: ['1933', '1949', '1961', '1990'],
    optionsVi: ['1933', '1949', '1961', '1990'],
    answer: 1,
    explanation: 'Die Bundesrepublik Deutschland wurde 1949 gegründet. Im selben Jahr entstand im Osten die DDR.',
    explanationVi: 'Cộng hòa Liên bang Đức được thành lập năm 1949. Cùng năm đó, ở phía Đông, nước Cộng hòa Dân chủ Đức (DDR) ra đời.',
    terms: [{ de: 'gründen', vi: 'thành lập' }]
  },
  {
    id: 'lid-g02', topic: 'geschichte',
    prompt: 'Wie hieß der deutsche Staat im Osten von 1949 bis 1990?',
    vi: 'Nhà nước Đức ở phía Đông từ năm 1949 đến 1990 tên là gì?',
    options: ['Bundesrepublik Deutschland', 'Weimarer Republik', 'Deutsche Demokratische Republik', 'Königreich Preußen'],
    optionsVi: ['Cộng hòa Liên bang Đức', 'Cộng hòa Weimar', 'Cộng hòa Dân chủ Đức (DDR)', 'Vương quốc Phổ'],
    answer: 2,
    explanation: 'Im Osten gab es von 1949 bis 1990 die Deutsche Demokratische Republik, kurz DDR.',
    explanationVi: 'Từ năm 1949 đến 1990, ở phía Đông có nước Cộng hòa Dân chủ Đức, viết tắt là DDR (Đông Đức).',
    terms: [{ de: 'die DDR', vi: 'Cộng hòa Dân chủ Đức (Đông Đức)' }, { de: 'der Osten', vi: 'phía Đông' }]
  },
  {
    id: 'lid-g03', topic: 'geschichte',
    prompt: 'Welche Partei hatte in der DDR die Macht?',
    vi: 'Đảng nào nắm quyền ở Đông Đức (DDR)?',
    options: ['die SED', 'die SPD', 'die FDP', 'die Grünen'],
    optionsVi: ['SED (Đảng Xã hội chủ nghĩa Thống nhất Đức)', 'SPD', 'FDP', 'Đảng Xanh'],
    answer: 0,
    explanation: 'In der DDR hatte die SED, die Sozialistische Einheitspartei Deutschlands, die Macht. Es gab keine freien Wahlen.',
    explanationVi: 'Ở Đông Đức, đảng SED (Đảng Xã hội chủ nghĩa Thống nhất Đức) nắm quyền. Không có bầu cử tự do.',
    terms: [{ de: 'die Partei', vi: 'đảng' }, { de: 'freie Wahlen', vi: 'bầu cử tự do' }]
  },
  {
    id: 'lid-g04', topic: 'geschichte',
    prompt: 'In welchem Jahr wurde die Berliner Mauer gebaut?',
    vi: 'Bức tường Berlin được xây vào năm nào?',
    options: ['1945', '1953', '1961', '1989'],
    optionsVi: ['1945', '1953', '1961', '1989'],
    answer: 2,
    explanation: 'Die DDR baute die Mauer im August 1961. Danach konnten die Menschen aus der DDR nicht mehr frei in den Westen reisen.',
    explanationVi: 'Đông Đức xây bức tường vào tháng 8 năm 1961. Sau đó người dân Đông Đức không còn được tự do sang phía Tây.',
    terms: [{ de: 'die Mauer', vi: 'bức tường' }, { de: 'bauen', vi: 'xây dựng' }]
  },
  {
    id: 'lid-g05', topic: 'geschichte',
    prompt: 'Wann fiel die Berliner Mauer?',
    vi: 'Bức tường Berlin sụp đổ khi nào?',
    options: ['am 9. November 1989', 'am 3. Oktober 1990', 'am 13. August 1961', 'am 23. Mai 1949'],
    optionsVi: ['ngày 9 tháng 11 năm 1989', 'ngày 3 tháng 10 năm 1990', 'ngày 13 tháng 8 năm 1961', 'ngày 23 tháng 5 năm 1949'],
    answer: 0,
    explanation: 'Am 9. November 1989 öffnete sich die Grenze in Berlin. Vorher hatten viele Menschen in der DDR friedlich demonstriert.',
    explanationVi: 'Ngày 9 tháng 11 năm 1989, biên giới ở Berlin được mở. Trước đó nhiều người dân Đông Đức đã biểu tình ôn hòa.',
    terms: [{ de: 'die Grenze', vi: 'biên giới' }, { de: 'friedlich', vi: 'ôn hòa, hòa bình' }]
  },
  {
    id: 'lid-g06', topic: 'geschichte',
    prompt: 'Welcher Tag ist der Tag der Deutschen Einheit?',
    vi: 'Ngày Thống nhất nước Đức là ngày nào?',
    options: ['der 1. Mai', 'der 9. November', 'der 3. Oktober', 'der 24. Dezember'],
    optionsVi: ['ngày 1 tháng 5', 'ngày 9 tháng 11', 'ngày 3 tháng 10', 'ngày 24 tháng 12'],
    answer: 2,
    explanation: 'Am 3. Oktober 1990 wurden die DDR und die Bundesrepublik wieder ein Staat. Der 3. Oktober ist ein Feiertag.',
    explanationVi: 'Ngày 3 tháng 10 năm 1990, Đông Đức và Tây Đức trở lại thành một nhà nước. Ngày 3 tháng 10 là ngày lễ.',
    terms: [{ de: 'die Einheit', vi: 'sự thống nhất' }, { de: 'der Feiertag', vi: 'ngày lễ' }]
  },
  {
    id: 'lid-g07', topic: 'geschichte',
    prompt: 'Wer regierte Deutschland von 1933 bis 1945?',
    vi: 'Ai cai trị nước Đức từ năm 1933 đến 1945?',
    options: ['Konrad Adenauer', 'die Nationalsozialisten unter Adolf Hitler', 'der Kaiser', 'die SED'],
    optionsVi: ['Konrad Adenauer', 'Đảng Quốc xã dưới quyền Adolf Hitler', 'Hoàng đế', 'đảng SED'],
    answer: 1,
    explanation: 'Von 1933 bis 1945 regierten die Nationalsozialisten unter Adolf Hitler. Es war eine Diktatur ohne freie Wahlen.',
    explanationVi: 'Từ năm 1933 đến 1945, Đảng Quốc xã dưới quyền Adolf Hitler cai trị. Đó là một chế độ độc tài, không có bầu cử tự do.',
    terms: [{ de: 'die Diktatur', vi: 'chế độ độc tài' }, { de: 'regieren', vi: 'cai trị, điều hành' }]
  },
  {
    id: 'lid-g08', topic: 'geschichte',
    prompt: 'Was war der Holocaust?',
    vi: 'Holocaust là gì?',
    options: ['die Gründung der Europäischen Union', 'der Bau der Berliner Mauer', 'eine Wahl in der DDR', 'die Ermordung von Millionen Juden und anderen Menschen durch die Nationalsozialisten'],
    optionsVi: ['việc thành lập Liên minh châu Âu', 'việc xây bức tường Berlin', 'một cuộc bầu cử ở Đông Đức', 'việc Đức Quốc xã sát hại hàng triệu người Do Thái và những người khác'],
    answer: 3,
    explanation: 'Die Nationalsozialisten ermordeten etwa sechs Millionen Juden sowie viele andere Menschen. Deutschland trägt dafür eine besondere Verantwortung.',
    explanationVi: 'Đức Quốc xã đã sát hại khoảng sáu triệu người Do Thái và nhiều người khác. Nước Đức mang một trách nhiệm đặc biệt về điều này.',
    terms: [{ de: 'die Verantwortung', vi: 'trách nhiệm' }, { de: 'verfolgen', vi: 'truy bức, đàn áp' }]
  },
  {
    id: 'lid-g09', topic: 'geschichte',
    prompt: 'Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?',
    vi: 'Ai là Thủ tướng Liên bang đầu tiên của Cộng hòa Liên bang Đức?',
    options: ['Konrad Adenauer', 'Willy Brandt', 'Helmut Kohl', 'Helmut Schmidt'],
    optionsVi: ['Konrad Adenauer', 'Willy Brandt', 'Helmut Kohl', 'Helmut Schmidt'],
    answer: 0,
    explanation: 'Konrad Adenauer war von 1949 bis 1963 der erste Bundeskanzler.',
    explanationVi: 'Konrad Adenauer là Thủ tướng Liên bang đầu tiên, từ năm 1949 đến 1963.',
    terms: [{ de: 'erste, erster', vi: 'đầu tiên' }]
  },
  {
    id: 'lid-g10', topic: 'geschichte',
    prompt: 'Mit welchem Nachbarland schloss Deutschland 1963 einen Freundschaftsvertrag?',
    vi: 'Năm 1963 nước Đức ký hiệp ước hữu nghị với nước láng giềng nào?',
    options: ['mit Frankreich', 'mit Russland', 'mit Spanien', 'mit Schweden'],
    optionsVi: ['với Pháp', 'với Nga', 'với Tây Ban Nha', 'với Thụy Điển'],
    answer: 0,
    explanation: 'Mit dem Élysée-Vertrag von 1963 wurden Deutschland und Frankreich nach vielen Kriegen enge Partner.',
    explanationVi: 'Với Hiệp ước Élysée năm 1963, Đức và Pháp trở thành đối tác thân thiết sau nhiều cuộc chiến tranh.',
    terms: [{ de: 'der Vertrag', vi: 'hiệp ước, hợp đồng' }, { de: 'das Nachbarland', vi: 'nước láng giềng' }]
  },
  {
    id: 'lid-m01', topic: 'gesellschaft',
    prompt: 'Was sagt das Grundgesetz über Männer und Frauen?',
    vi: 'Luật Cơ bản nói gì về nam và nữ?',
    options: ['Männer entscheiden in der Familie.', 'Männer und Frauen sind gleichberechtigt.', 'Frauen dürfen nicht wählen.', 'Nur Männer dürfen arbeiten.'],
    optionsVi: ['Đàn ông quyết định trong gia đình.', 'Nam và nữ bình đẳng.', 'Phụ nữ không được đi bầu.', 'Chỉ đàn ông mới được đi làm.'],
    answer: 1,
    explanation: 'Artikel 3 des Grundgesetzes sagt: Männer und Frauen sind gleichberechtigt.',
    explanationVi: 'Điều 3 của Luật Cơ bản nói: Nam và nữ có quyền bình đẳng.',
    terms: [{ de: 'gleichberechtigt', vi: 'bình đẳng về quyền' }]
  },
  {
    id: 'lid-m02', topic: 'gesellschaft',
    prompt: 'Welche Religion muss man in Deutschland haben?',
    vi: 'Ở Đức người ta phải theo tôn giáo nào?',
    options: ['das Christentum', 'die Religion der Eltern', 'die Religion des Bundeslandes', 'Jeder darf seine Religion frei wählen oder keine haben.'],
    optionsVi: ['Kitô giáo', 'tôn giáo của cha mẹ', 'tôn giáo của bang', 'Mỗi người được tự do chọn tôn giáo hoặc không theo tôn giáo nào.'],
    answer: 3,
    explanation: 'In Deutschland gibt es Religionsfreiheit. Man darf einer Religion angehören, sie wechseln oder keine Religion haben.',
    explanationVi: 'Ở Đức có tự do tôn giáo. Mỗi người được theo một tôn giáo, đổi tôn giáo hoặc không theo tôn giáo nào.',
    terms: [{ de: 'die Religionsfreiheit', vi: 'tự do tôn giáo' }]
  },
  {
    id: 'lid-m03', topic: 'gesellschaft',
    prompt: 'Wer ist in erster Linie für die Erziehung der Kinder verantwortlich?',
    vi: 'Ai chịu trách nhiệm chính trong việc nuôi dạy con cái?',
    options: ['der Staat', 'die Eltern', 'nur die Schule', 'die Nachbarn'],
    optionsVi: ['nhà nước', 'cha mẹ', 'chỉ nhà trường', 'hàng xóm'],
    answer: 1,
    explanation: 'Nach dem Grundgesetz sind Pflege und Erziehung der Kinder zuerst das Recht und die Pflicht der Eltern.',
    explanationVi: 'Theo Luật Cơ bản, chăm sóc và nuôi dạy con cái trước hết là quyền và nghĩa vụ của cha mẹ.',
    terms: [{ de: 'die Erziehung', vi: 'sự giáo dục, nuôi dạy' }, { de: 'die Pflicht', vi: 'nghĩa vụ' }]
  },
  {
    id: 'lid-m04', topic: 'gesellschaft',
    prompt: 'Dürfen Eltern in Deutschland ihre Kinder schlagen?',
    vi: 'Ở Đức cha mẹ có được đánh con không?',
    options: ['Ja, wenn das Kind nicht hört.', 'Ja, aber nur zu Hause.', 'Nein, Kinder haben ein Recht auf Erziehung ohne Gewalt.', 'Ja, wenn die Lehrerin zustimmt.'],
    optionsVi: ['Có, nếu đứa trẻ không nghe lời.', 'Có, nhưng chỉ ở nhà.', 'Không, trẻ em có quyền được nuôi dạy không bạo lực.', 'Có, nếu cô giáo đồng ý.'],
    answer: 2,
    explanation: 'Kinder haben ein Recht auf gewaltfreie Erziehung. Schläge sind verboten. Mit Kindern Vietnamesisch zu sprechen ist dagegen natürlich erlaubt und wertvoll.',
    explanationVi: 'Trẻ em có quyền được nuôi dạy không bạo lực. Đánh trẻ là bị cấm. Còn nói tiếng Việt với con cháu thì tất nhiên được phép và rất quý.',
    terms: [{ de: 'die Gewalt', vi: 'bạo lực' }, { de: 'verboten', vi: 'bị cấm' }]
  },
  {
    id: 'lid-m05', topic: 'gesellschaft',
    prompt: 'Müssen Kinder in Deutschland zur Schule gehen?',
    vi: 'Ở Đức trẻ em có bắt buộc phải đi học không?',
    options: ['Ja, es gibt eine Schulpflicht.', 'Nein, die Schule ist freiwillig.', 'Nur Kinder mit deutschem Pass.', 'Nur, wenn die Eltern es wollen.'],
    optionsVi: ['Có, có nghĩa vụ đi học.', 'Không, đi học là tự nguyện.', 'Chỉ trẻ em có hộ chiếu Đức.', 'Chỉ khi cha mẹ muốn.'],
    answer: 0,
    explanation: 'In Deutschland gibt es eine Schulpflicht für alle Kinder, die hier leben. Die staatliche Schule kostet kein Schulgeld.',
    explanationVi: 'Ở Đức có nghĩa vụ đi học cho mọi trẻ em sống ở đây. Trường công không thu học phí.',
    terms: [{ de: 'die Schulpflicht', vi: 'nghĩa vụ đi học' }]
  },
  {
    id: 'lid-m06', topic: 'gesellschaft',
    prompt: 'Ab welchem Alter darf man in Deutschland heiraten?',
    vi: 'Ở Đức từ bao nhiêu tuổi thì được kết hôn?',
    options: ['ab 14 Jahren', 'ab 16 Jahren', 'ab 18 Jahren', 'ab 21 Jahren'],
    optionsVi: ['từ 14 tuổi', 'từ 16 tuổi', 'từ 18 tuổi', 'từ 21 tuổi'],
    answer: 2,
    explanation: 'In Deutschland darf man ab 18 Jahren heiraten. Niemand darf zu einer Ehe gezwungen werden.',
    explanationVi: 'Ở Đức được kết hôn từ 18 tuổi. Không ai được bị ép buộc kết hôn.',
    terms: [{ de: 'heiraten', vi: 'kết hôn' }, { de: 'die Ehe', vi: 'hôn nhân' }]
  },
  {
    id: 'lid-m07', topic: 'gesellschaft',
    prompt: 'Sie ziehen in eine neue Wohnung. Was müssen Sie tun?',
    vi: 'Bạn chuyển đến một căn hộ mới. Bạn phải làm gì?',
    options: ['Nichts, das ist privat.', 'Mich innerhalb von zwei Wochen bei der Meldebehörde anmelden.', 'Die Polizei anrufen.', 'Nur die Nachbarn informieren.'],
    optionsVi: ['Không làm gì, đó là việc riêng.', 'Đăng ký cư trú tại cơ quan đăng ký (Meldebehörde) trong vòng hai tuần.', 'Gọi cảnh sát.', 'Chỉ báo cho hàng xóm.'],
    answer: 1,
    explanation: 'Nach einem Umzug meldet man sich innerhalb von zwei Wochen bei der Meldebehörde an, zum Beispiel im Bürgeramt.',
    explanationVi: 'Sau khi chuyển nhà, phải đăng ký cư trú trong vòng hai tuần tại cơ quan đăng ký, ví dụ ở Bürgeramt (văn phòng công dân).',
    terms: [{ de: 'sich anmelden', vi: 'đăng ký' }, { de: 'der Umzug', vi: 'việc chuyển nhà' }]
  },
  {
    id: 'lid-m08', topic: 'gesellschaft',
    prompt: 'Welche Nummer rufen Sie bei einem Brand oder einem medizinischen Notfall an?',
    vi: 'Khi có hỏa hoạn hoặc cấp cứu y tế, bạn gọi số nào?',
    options: ['110', '112', '115', '116 117'],
    optionsVi: ['110', '112', '115', '116 117'],
    answer: 1,
    explanation: '112 ist die Nummer für Feuerwehr und Rettungsdienst. 110 ist die Polizei. 116 117 ist der ärztliche Bereitschaftsdienst, wenn die Praxis geschlossen ist.',
    explanationVi: '112 là số của cứu hỏa và cấp cứu. 110 là cảnh sát. 116 117 là dịch vụ bác sĩ trực khi phòng khám đóng cửa.',
    terms: [{ de: 'der Notfall', vi: 'trường hợp khẩn cấp' }, { de: 'die Feuerwehr', vi: 'cứu hỏa' }]
  },
  {
    id: 'lid-m09', topic: 'gesellschaft',
    prompt: 'Was ist ein Ehrenamt?',
    vi: 'Ehrenamt (công việc tình nguyện) là gì?',
    options: ['eine gut bezahlte Arbeit beim Staat', 'eine Strafe vom Gericht', 'eine freiwillige Arbeit für andere ohne Lohn', 'ein Büro im Rathaus'],
    optionsVi: ['một công việc lương cao ở nhà nước', 'một hình phạt của tòa án', 'công việc tự nguyện giúp người khác, không nhận lương', 'một văn phòng ở tòa thị chính'],
    answer: 2,
    explanation: 'Im Ehrenamt hilft man freiwillig und ohne Lohn, zum Beispiel im Verein, in der Nachbarschaft oder bei der Tafel.',
    explanationVi: 'Làm Ehrenamt là giúp đỡ một cách tự nguyện, không nhận lương, ví dụ trong hội, trong khu phố hoặc ở Tafel (nơi phát thực phẩm).',
    terms: [{ de: 'freiwillig', vi: 'tự nguyện' }, { de: 'der Verein', vi: 'hội, câu lạc bộ' }]
  },
  {
    id: 'lid-m10', topic: 'gesellschaft',
    prompt: 'Wofür gibt es in Deutschland die Krankenversicherung?',
    vi: 'Ở Đức bảo hiểm y tế dùng để làm gì?',
    options: ['Sie bezahlt einen großen Teil der Kosten für Arzt und Krankenhaus.', 'Sie bezahlt die Miete.', 'Sie bezahlt den Urlaub.', 'Sie ist nur für Kinder.'],
    optionsVi: ['Nó chi trả phần lớn chi phí bác sĩ và bệnh viện.', 'Nó trả tiền thuê nhà.', 'Nó trả tiền đi nghỉ.', 'Nó chỉ dành cho trẻ em.'],
    answer: 0,
    explanation: 'Die Krankenversicherung bezahlt einen großen Teil der Kosten, wenn man krank ist. In Deutschland muss man krankenversichert sein.',
    explanationVi: 'Bảo hiểm y tế chi trả phần lớn chi phí khi bị bệnh. Ở Đức mọi người bắt buộc phải có bảo hiểm y tế.',
    terms: [{ de: 'die Krankenversicherung', vi: 'bảo hiểm y tế' }, { de: 'die Kosten', vi: 'chi phí' }]
  },
  {
    id: 'lid-d11', topic: 'demokratie',
    prompt: 'Welche Aufgabe hat der Bundesrat?',
    vi: 'Hội đồng Liên bang (Bundesrat) có nhiệm vụ gì?',
    options: ['Er wählt den Bundeskanzler.', 'Über ihn wirken die Bundesländer bei der Gesetzgebung mit.', 'Er ist das höchste Gericht.', 'Er ist eine Partei.'],
    optionsVi: ['Bầu Thủ tướng Liên bang.', 'Qua đó các bang tham gia vào việc làm luật.', 'Là tòa án cao nhất.', 'Là một đảng chính trị.'],
    answer: 1,
    explanation: 'Im Bundesrat sitzen Mitglieder der Landesregierungen. So wirken die Bundesländer an Gesetzen des Bundes mit.',
    explanationVi: 'Trong Bundesrat có thành viên của chính phủ các bang. Nhờ đó các bang cùng tham gia vào luật của liên bang.',
    terms: [{ de: 'der Bundesrat', vi: 'Hội đồng Liên bang' }, { de: 'mitwirken', vi: 'cùng tham gia' }]
  },
  {
    id: 'lid-d12', topic: 'demokratie',
    prompt: 'Wer ist das Staatsoberhaupt der Bundesrepublik Deutschland?',
    vi: 'Ai là nguyên thủ quốc gia của nước Cộng hòa Liên bang Đức?',
    options: ['der Bundeskanzler oder die Bundeskanzlerin', 'der Bundespräsident oder die Bundespräsidentin', 'der Präsident oder die Präsidentin des Bundestages', 'der Präsident oder die Präsidentin des Bundesverfassungsgerichts'],
    optionsVi: ['Thủ tướng Liên bang', 'Tổng thống Liên bang', 'Chủ tịch Quốc hội Liên bang', 'Chánh án Tòa án Hiến pháp Liên bang'],
    answer: 1,
    explanation: 'Staatsoberhaupt ist der Bundespräsident oder die Bundespräsidentin. Die Regierung leitet der Bundeskanzler oder die Bundeskanzlerin.',
    explanationVi: 'Nguyên thủ quốc gia là Tổng thống Liên bang. Người lãnh đạo chính phủ là Thủ tướng Liên bang.',
    terms: [{ de: 'das Staatsoberhaupt', vi: 'nguyên thủ quốc gia' }]
  },
  {
    id: 'lid-d13', topic: 'demokratie',
    prompt: 'Was bedeutet „Rechtsstaat“?',
    vi: '„Nhà nước pháp quyền“ (Rechtsstaat) có nghĩa là gì?',
    options: ['Die Polizei entscheidet allein über Strafen.', 'Gesetze gelten nur für Ausländer.', 'Alle Menschen und auch der Staat müssen sich an die Gesetze halten.', 'Nur Richterinnen und Richter dürfen wählen.'],
    optionsVi: ['Cảnh sát tự quyết định hình phạt.', 'Luật chỉ áp dụng cho người nước ngoài.', 'Mọi người và cả nhà nước đều phải tuân theo luật.', 'Chỉ thẩm phán mới được bầu cử.'],
    answer: 2,
    explanation: 'Im Rechtsstaat gelten die Gesetze für alle, auch für den Staat. Unabhängige Gerichte kontrollieren das.',
    explanationVi: 'Trong nhà nước pháp quyền, luật áp dụng cho tất cả, kể cả nhà nước. Các tòa án độc lập kiểm soát điều đó.',
    terms: [{ de: 'der Rechtsstaat', vi: 'nhà nước pháp quyền' }, { de: 'unabhängig', vi: 'độc lập' }]
  },
  {
    id: 'lid-d14', topic: 'demokratie',
    prompt: 'Was ist die Opposition im Parlament?',
    vi: 'Phe đối lập (Opposition) trong quốc hội là gì?',
    options: ['die Parteien im Parlament, die nicht zur Regierung gehören', 'eine verbotene Partei', 'die Parteien, die die Regierung bilden', 'eine Gruppe von Richtern'],
    optionsVi: ['các đảng trong quốc hội không thuộc chính phủ', 'một đảng bị cấm', 'các đảng thành lập chính phủ', 'một nhóm thẩm phán'],
    answer: 0,
    explanation: 'Die Opposition gehört nicht zur Regierung. Sie kontrolliert und kritisiert die Regierung. Das ist in einer Demokratie wichtig.',
    explanationVi: 'Phe đối lập không thuộc chính phủ. Họ giám sát và phê bình chính phủ. Điều này rất quan trọng trong nền dân chủ.',
    terms: [{ de: 'die Opposition', vi: 'phe đối lập' }, { de: 'kontrollieren', vi: 'giám sát, kiểm soát' }]
  },
  {
    id: 'lid-d15', topic: 'demokratie',
    prompt: 'Welches Recht ist in Deutschland ein Grundrecht?',
    vi: 'Quyền nào là một quyền cơ bản ở Đức?',
    options: ['das Recht auf ein Auto', 'das Recht, sich friedlich zu versammeln', 'das Recht, keine Steuern zu zahlen', 'die Pflicht, Mitglied in einer Partei zu sein'],
    optionsVi: ['quyền có ô tô', 'quyền hội họp ôn hòa', 'quyền không đóng thuế', 'nghĩa vụ phải vào một đảng'],
    answer: 1,
    explanation: 'Die Versammlungsfreiheit ist ein Grundrecht. Menschen dürfen sich friedlich und ohne Waffen versammeln, zum Beispiel bei einer Demonstration.',
    explanationVi: 'Tự do hội họp là một quyền cơ bản. Mọi người được tụ họp ôn hòa và không mang vũ khí, ví dụ khi biểu tình.',
    terms: [{ de: 'das Grundrecht', vi: 'quyền cơ bản' }, { de: 'die Demonstration', vi: 'cuộc biểu tình' }]
  },
  {
    id: 'lid-d16', topic: 'demokratie',
    prompt: 'Wie heißt das Parlament der Bundesrepublik Deutschland?',
    vi: 'Quốc hội của nước Cộng hòa Liên bang Đức tên là gì?',
    options: ['das Bundesamt', 'der Bundestag', 'das Bundeskanzleramt', 'das Bundesgericht'],
    optionsVi: ['Cục Liên bang', 'Bundestag (Quốc hội Liên bang)', 'Phủ Thủ tướng', 'Tòa án Liên bang'],
    answer: 1,
    explanation: 'Das Parlament heißt Bundestag. Es tagt im Reichstagsgebäude in Berlin.',
    explanationVi: 'Quốc hội gọi là Bundestag. Quốc hội họp ở tòa nhà Reichstag tại Berlin.',
    terms: [{ de: 'das Parlament', vi: 'quốc hội' }]
  },
  {
    id: 'lid-d17', topic: 'demokratie',
    prompt: 'Wer beschließt die Gesetze des Bundes?',
    vi: 'Ai thông qua các đạo luật của liên bang?',
    options: ['die Polizei', 'der Bundespräsident allein', 'der Bundestag, bei vielen Gesetzen zusammen mit dem Bundesrat', 'das Bundesverfassungsgericht'],
    optionsVi: ['cảnh sát', 'một mình Tổng thống Liên bang', 'Bundestag, với nhiều đạo luật thì cùng với Bundesrat', 'Tòa án Hiến pháp Liên bang'],
    answer: 2,
    explanation: 'Der Bundestag beschließt die Bundesgesetze. Der Bundesrat wirkt mit; bei manchen Gesetzen muss er zustimmen.',
    explanationVi: 'Bundestag thông qua luật liên bang. Bundesrat cùng tham gia; với một số đạo luật thì Bundesrat phải đồng ý.',
    terms: [{ de: 'beschließen', vi: 'quyết định, thông qua' }]
  },
  {
    id: 'lid-g11', topic: 'geschichte',
    prompt: 'Wann endete der Zweite Weltkrieg in Europa?',
    vi: 'Chiến tranh thế giới thứ hai ở châu Âu kết thúc khi nào?',
    options: ['1918', '1933', '1945', '1949'],
    optionsVi: ['1918', '1933', '1945', '1949'],
    answer: 2,
    explanation: 'Der Zweite Weltkrieg endete in Europa am 8. Mai 1945. Deutschland hatte den Krieg 1939 mit dem Angriff auf Polen begonnen.',
    explanationVi: 'Chiến tranh thế giới thứ hai ở châu Âu kết thúc ngày 8 tháng 5 năm 1945. Đức đã gây ra cuộc chiến năm 1939 bằng việc tấn công Ba Lan.',
    terms: [{ de: 'der Krieg', vi: 'chiến tranh' }]
  },
  {
    id: 'lid-g12', topic: 'geschichte',
    prompt: 'Was geschah am 17. Juni 1953 in der DDR?',
    vi: 'Điều gì đã xảy ra ở Đông Đức ngày 17 tháng 6 năm 1953?',
    options: ['ein Aufstand vieler Menschen gegen die Regierung', 'der Bau der Mauer', 'die Wiedervereinigung', 'die Gründung der DDR'],
    optionsVi: ['nhiều người nổi dậy chống chính phủ', 'xây bức tường', 'tái thống nhất', 'thành lập Đông Đức'],
    answer: 0,
    explanation: 'Am 17. Juni 1953 protestierten in der DDR sehr viele Menschen gegen die Regierung. Sowjetische Panzer beendeten den Aufstand.',
    explanationVi: 'Ngày 17 tháng 6 năm 1953, rất nhiều người ở Đông Đức phản đối chính phủ. Xe tăng Liên Xô đã dập tắt cuộc nổi dậy.',
    terms: [{ de: 'der Aufstand', vi: 'cuộc nổi dậy' }]
  },
  {
    id: 'lid-g13', topic: 'geschichte',
    prompt: 'Was gründeten Deutschland, Frankreich, Italien, Belgien, die Niederlande und Luxemburg 1957?',
    vi: 'Năm 1957, Đức, Pháp, Ý, Bỉ, Hà Lan và Luxembourg đã thành lập tổ chức gì?',
    options: ['die Europäische Wirtschaftsgemeinschaft', 'die Vereinten Nationen', 'den Warschauer Pakt', 'den Bundesrat'],
    optionsVi: ['Cộng đồng Kinh tế châu Âu', 'Liên Hợp Quốc', 'Khối Hiệp ước Warszawa', 'Hội đồng Liên bang'],
    answer: 0,
    explanation: 'Mit den Römischen Verträgen gründeten sechs Staaten 1957 die Europäische Wirtschaftsgemeinschaft. Daraus entstand später die Europäische Union.',
    explanationVi: 'Với Hiệp ước Roma năm 1957, sáu nước thành lập Cộng đồng Kinh tế châu Âu. Sau này từ đó hình thành Liên minh châu Âu.',
    terms: [{ de: 'die Europäische Union', vi: 'Liên minh châu Âu' }]
  },
  {
    id: 'lid-g14', topic: 'geschichte',
    prompt: 'Wie heißt die erste deutsche Demokratie von 1919 bis 1933?',
    vi: 'Nền dân chủ đầu tiên của Đức từ năm 1919 đến 1933 tên là gì?',
    options: ['das Kaiserreich', 'die Bonner Republik', 'die Weimarer Republik', 'die DDR'],
    optionsVi: ['Đế quốc Đức', 'Cộng hòa Bonn', 'Cộng hòa Weimar', 'Đông Đức'],
    answer: 2,
    explanation: 'Die Weimarer Republik war die erste Demokratie in Deutschland. 1933 übernahmen die Nationalsozialisten die Macht.',
    explanationVi: 'Cộng hòa Weimar là nền dân chủ đầu tiên ở Đức. Năm 1933 Đảng Quốc xã lên nắm quyền.',
    terms: [{ de: 'die Republik', vi: 'nền cộng hòa' }]
  },
  {
    id: 'lid-g15', topic: 'geschichte',
    prompt: 'Welche Stadt war von 1949 bis 1990 die Hauptstadt der Bundesrepublik Deutschland?',
    vi: 'Thành phố nào là thủ đô của Cộng hòa Liên bang Đức từ năm 1949 đến 1990?',
    options: ['Berlin', 'Frankfurt am Main', 'Bonn', 'München'],
    optionsVi: ['Berlin', 'Frankfurt am Main', 'Bonn', 'München'],
    answer: 2,
    explanation: 'Bis zur Wiedervereinigung war Bonn die Hauptstadt der Bundesrepublik. Heute ist Berlin die Hauptstadt.',
    explanationVi: 'Cho đến khi tái thống nhất, Bonn là thủ đô của Tây Đức. Ngày nay thủ đô là Berlin.',
    terms: [{ de: 'die Hauptstadt', vi: 'thủ đô' }]
  },
  {
    id: 'lid-m11', topic: 'gesellschaft',
    prompt: 'Dürfen in Deutschland zwei Frauen oder zwei Männer heiraten?',
    vi: 'Ở Đức hai người phụ nữ hoặc hai người đàn ông có được kết hôn không?',
    options: ['Nein, das ist verboten.', 'Ja, seit 2017 ist das erlaubt.', 'Nur im Ausland.', 'Nur mit Erlaubnis einer Religionsgemeinschaft.'],
    optionsVi: ['Không, điều đó bị cấm.', 'Có, từ năm 2017 điều đó được phép.', 'Chỉ ở nước ngoài.', 'Chỉ khi một cộng đồng tôn giáo cho phép.'],
    answer: 1,
    explanation: 'Seit 2017 dürfen in Deutschland auch zwei Frauen oder zwei Männer heiraten.',
    explanationVi: 'Từ năm 2017, ở Đức hai người phụ nữ hoặc hai người đàn ông cũng được kết hôn.',
    terms: [{ de: 'erlaubt', vi: 'được phép' }]
  },
  {
    id: 'lid-m12', topic: 'gesellschaft',
    prompt: 'Sie bekommen einen Bescheid von einer Behörde und sind nicht einverstanden. Was können Sie tun?',
    vi: 'Bạn nhận được một quyết định (Bescheid) của cơ quan nhà nước và không đồng ý. Bạn có thể làm gì?',
    options: ['Widerspruch einlegen', 'dem Beamten Geld geben', 'den Brief wegwerfen', 'Nichts, man kann nichts tun.'],
    optionsVi: ['nộp đơn khiếu nại (Widerspruch)', 'đưa tiền cho công chức', 'vứt lá thư đi', 'Không gì cả, không thể làm gì.'],
    answer: 0,
    explanation: 'Gegen viele Bescheide kann man innerhalb einer Frist Widerspruch einlegen. Wie das geht, steht im Brief. Beamte zu bestechen ist strafbar.',
    explanationVi: 'Với nhiều quyết định, có thể nộp đơn khiếu nại trong một thời hạn nhất định. Cách làm được ghi trong thư. Hối lộ công chức là phạm pháp.',
    terms: [{ de: 'der Bescheid', vi: 'quyết định hành chính' }, { de: 'der Widerspruch', vi: 'đơn khiếu nại' }, { de: 'die Frist', vi: 'thời hạn' }]
  },
  {
    id: 'lid-m13', topic: 'gesellschaft',
    prompt: 'Was ist die Rente?',
    vi: 'Lương hưu (Rente) là gì?',
    options: ['Geld vom Vermieter für die Wohnung', 'Geld, das man im Alter aus der Rentenversicherung bekommt', 'eine Strafe für Arbeitslose', 'ein Kredit von der Bank'],
    optionsVi: ['tiền chủ nhà trả cho căn hộ', 'tiền nhận được khi về già từ bảo hiểm hưu trí', 'một hình phạt cho người thất nghiệp', 'một khoản vay ngân hàng'],
    answer: 1,
    explanation: 'Wer arbeitet, zahlt in die Rentenversicherung ein. Im Alter bekommt man dann eine Rente.',
    explanationVi: 'Người đi làm đóng tiền vào bảo hiểm hưu trí. Khi về già sẽ nhận được lương hưu.',
    terms: [{ de: 'die Rente', vi: 'lương hưu' }, { de: 'die Rentenversicherung', vi: 'bảo hiểm hưu trí' }]
  },
  {
    id: 'lid-m14', topic: 'gesellschaft',
    prompt: 'Welcher Feiertag ist der 1. Mai in Deutschland?',
    vi: 'Ngày 1 tháng 5 ở Đức là ngày lễ gì?',
    options: ['der Tag der Deutschen Einheit', 'der Tag der Arbeit', 'Weihnachten', 'der Muttertag'],
    optionsVi: ['Ngày Thống nhất nước Đức', 'Ngày Quốc tế Lao động', 'Lễ Giáng sinh', 'Ngày của Mẹ'],
    answer: 1,
    explanation: 'Der 1. Mai ist der Tag der Arbeit und in allen Bundesländern ein Feiertag.',
    explanationVi: 'Ngày 1 tháng 5 là Ngày Quốc tế Lao động và là ngày lễ ở tất cả các bang.',
    terms: [{ de: 'die Arbeit', vi: 'lao động, công việc' }]
  },
  {
    id: 'lid-m15', topic: 'gesellschaft',
    prompt: 'Wohin gehören alte Zeitungen und Pappe?',
    vi: 'Báo cũ và bìa các-tông bỏ vào đâu?',
    options: ['in die Biotonne', 'in die Papiertonne', 'in den Glascontainer', 'auf die Straße'],
    optionsVi: ['vào thùng rác hữu cơ', 'vào thùng rác giấy', 'vào thùng thu gom thủy tinh', 'ra đường'],
    answer: 1,
    explanation: 'In Deutschland trennt man den Müll. Papier und Pappe kommen in die Papiertonne. Die Farben der Tonnen können je nach Ort verschieden sein.',
    explanationVi: 'Ở Đức người ta phân loại rác. Giấy và bìa các-tông bỏ vào thùng rác giấy. Màu của các thùng rác có thể khác nhau tùy nơi.',
    terms: [{ de: 'der Müll', vi: 'rác' }, { de: 'trennen', vi: 'phân loại, tách riêng' }]
  },
  {
    id: 'lid-m16', topic: 'gesellschaft',
    prompt: 'Was ist ein Betriebsrat?',
    vi: 'Hội đồng người lao động (Betriebsrat) là gì?',
    options: ['die Chefin oder der Chef einer Firma', 'eine Vertretung der Beschäftigten in einem Betrieb', 'eine Behörde für Steuern', 'ein Gericht für Arbeit'],
    optionsVi: ['giám đốc của một công ty', 'cơ quan đại diện cho người lao động trong một doanh nghiệp', 'cơ quan thuế', 'tòa án lao động'],
    answer: 1,
    explanation: 'Der Betriebsrat wird von den Beschäftigten gewählt. Er vertritt ihre Interessen gegenüber der Firmenleitung.',
    explanationVi: 'Betriebsrat do người lao động bầu ra. Họ đại diện cho quyền lợi của người lao động trước ban lãnh đạo công ty.',
    terms: [{ de: 'die Beschäftigten', vi: 'người lao động' }, { de: 'vertreten', vi: 'đại diện' }]
  },
  {
    id: 'lid-m17', topic: 'gesellschaft',
    prompt: 'Sie haben Streit mit Ihrem Vermieter über die Nebenkosten. Wo können Sie sich beraten lassen?',
    vi: 'Bạn có tranh chấp với chủ nhà về chi phí phụ (Nebenkosten). Bạn có thể được tư vấn ở đâu?',
    options: ['beim Standesamt', 'beim Finanzamt', 'bei einem Mieterverein', 'bei der Feuerwehr'],
    optionsVi: ['ở văn phòng hộ tịch', 'ở sở thuế', 'ở hội người thuê nhà', 'ở đội cứu hỏa'],
    answer: 2,
    explanation: 'Ein Mieterverein berät Mieterinnen und Mieter bei Fragen zu Miete und Nebenkosten. Meist zahlt man dafür einen Mitgliedsbeitrag.',
    explanationVi: 'Hội người thuê nhà tư vấn cho người thuê về tiền thuê và chi phí phụ. Thường phải đóng phí hội viên.',
    terms: [{ de: 'der Vermieter', vi: 'chủ nhà cho thuê' }, { de: 'die Nebenkosten', vi: 'chi phí phụ (nước, sưởi, rác …)' }]
  },
  {
    id: 'lid-m18', topic: 'gesellschaft',
    prompt: 'Welche Behörde beurkundet Geburten, Ehen und Sterbefälle?',
    vi: 'Cơ quan nào đăng ký khai sinh, kết hôn và khai tử?',
    options: ['das Standesamt', 'das Arbeitsamt', 'das Gesundheitsamt', 'das Finanzamt'],
    optionsVi: ['văn phòng hộ tịch (Standesamt)', 'sở lao động', 'sở y tế', 'sở thuế'],
    answer: 0,
    explanation: 'Das Standesamt beurkundet Geburten, Eheschließungen und Sterbefälle.',
    explanationVi: 'Standesamt (văn phòng hộ tịch) đăng ký khai sinh, kết hôn và khai tử.',
    terms: [{ de: 'das Standesamt', vi: 'văn phòng hộ tịch' }, { de: 'die Geburt', vi: 'sự ra đời' }]
  }
];

// Stable constitutional facts only (no office holders, no election results that change).
// Capital, name of the parliament and title of the head of government per Land.
const MP = 'der Ministerpräsident oder die Ministerpräsidentin';
export const bundeslaender = [
  { id: 'baden-wuerttemberg', name: 'Baden-Württemberg', capital: 'Stuttgart', parliament: 'der Landtag', head: MP },
  { id: 'bayern', name: 'Bayern', capital: 'München', parliament: 'der Landtag', head: MP },
  { id: 'berlin', name: 'Berlin', capital: null, parliament: 'das Abgeordnetenhaus', head: 'der Regierende Bürgermeister oder die Regierende Bürgermeisterin' },
  { id: 'brandenburg', name: 'Brandenburg', capital: 'Potsdam', parliament: 'der Landtag', head: MP },
  { id: 'bremen', name: 'Bremen', capital: null, parliament: 'die Bürgerschaft', head: 'der Präsident oder die Präsidentin des Senats', note: 'Zum Land Bremen gehören die Städte Bremen und Bremerhaven.', noteVi: 'Bang Bremen gồm hai thành phố Bremen và Bremerhaven.' },
  { id: 'hamburg', name: 'Hamburg', capital: null, parliament: 'die Bürgerschaft', head: 'der Erste Bürgermeister oder die Erste Bürgermeisterin' },
  { id: 'hessen', name: 'Hessen', capital: 'Wiesbaden', parliament: 'der Landtag', head: MP },
  { id: 'mecklenburg-vorpommern', name: 'Mecklenburg-Vorpommern', capital: 'Schwerin', parliament: 'der Landtag', head: MP },
  { id: 'niedersachsen', name: 'Niedersachsen', capital: 'Hannover', parliament: 'der Landtag', head: MP },
  { id: 'nordrhein-westfalen', name: 'Nordrhein-Westfalen', capital: 'Düsseldorf', parliament: 'der Landtag', head: MP },
  { id: 'rheinland-pfalz', name: 'Rheinland-Pfalz', capital: 'Mainz', parliament: 'der Landtag', head: MP },
  { id: 'saarland', name: 'Saarland', capital: 'Saarbrücken', parliament: 'der Landtag', head: MP },
  { id: 'sachsen', name: 'Sachsen', capital: 'Dresden', parliament: 'der Landtag', head: MP },
  { id: 'sachsen-anhalt', name: 'Sachsen-Anhalt', capital: 'Magdeburg', parliament: 'der Landtag', head: MP },
  { id: 'schleswig-holstein', name: 'Schleswig-Holstein', capital: 'Kiel', parliament: 'der Landtag', head: MP },
  { id: 'thueringen', name: 'Thüringen', capital: 'Erfurt', parliament: 'der Landtag', head: MP }
];

const parliaments = [['der Landtag', 'Landtag (quốc hội bang)'], ['die Bürgerschaft', 'Bürgerschaft (quốc hội của thành phố-bang)'], ['das Abgeordnetenhaus', 'Abgeordnetenhaus (viện dân biểu)'], ['der Bundesrat', 'Bundesrat (Hội đồng Liên bang)']];
const heads = [[MP, 'Thủ hiến bang (Ministerpräsident)'], ['der Regierende Bürgermeister oder die Regierende Bürgermeisterin', 'Thị trưởng điều hành (Regierender Bürgermeister)'], ['der Erste Bürgermeister oder die Erste Bürgermeisterin', 'Thị trưởng thứ nhất (Erster Bürgermeister)'], ['der Präsident oder die Präsidentin des Senats', 'Chủ tịch Thượng viện (Präsident des Senats)']];
const capitals = bundeslaender.filter(land => land.capital).map(land => land.capital);
const cityState = [['ein Stadtstaat: Stadt und Bundesland zugleich', 'một thành phố-bang: vừa là thành phố vừa là bang'], ['eine Stadt in einem anderen Bundesland', 'một thành phố thuộc bang khác'], ['eine Gemeinde ohne eigenes Parlament', 'một xã không có quốc hội riêng'], ['ein Stadtteil von Berlin', 'một quận của Berlin']];

// Option order is shuffled at display time; the stored solution index only needs to be valid.
function landQuestions(land, index) {
  const pick = (pairs, correct) => ({ options: pairs.map(pair => pair[0]), optionsVi: pairs.map(pair => pair[1]), answer: pairs.findIndex(pair => pair[0] === correct) });
  const others = capitals.filter(city => city !== land.capital);
  const first = land.capital
    ? {
        id: `lid-l-${land.id}-hauptstadt`,
        prompt: `Wie heißt die Landeshauptstadt von ${land.name}?`,
        vi: `Thủ phủ của bang ${land.name} là thành phố nào?`,
        ...pick([land.capital, others[index % others.length], others[(index + 4) % others.length], others[(index + 8) % others.length]].map(city => [city, city]), land.capital),
        explanation: `Die Landeshauptstadt von ${land.name} ist ${land.capital}. Dort arbeiten die Landesregierung und das Landesparlament.`,
        explanationVi: `Thủ phủ của bang ${land.name} là ${land.capital}. Chính phủ bang và quốc hội bang làm việc ở đó.`,
        terms: [{ de: 'die Landeshauptstadt', vi: 'thủ phủ của bang' }]
      }
    : {
        id: `lid-l-${land.id}-stadtstaat`,
        prompt: `Was ist ${land.name}?`,
        vi: `${land.name} là gì?`,
        ...pick(land.id === 'berlin' ? cityState.slice(0, 3).concat([['ein Teil von Brandenburg', 'một phần của bang Brandenburg']]) : cityState, cityState[0][0]),
        explanation: `${land.name} ist ein Stadtstaat: Stadt und Bundesland zugleich.${land.note ? ` ${land.note}` : ''}`,
        explanationVi: `${land.name} là một thành phố-bang: vừa là thành phố vừa là bang.${land.noteVi ? ` ${land.noteVi}` : ''}`,
        terms: [{ de: 'der Stadtstaat', vi: 'thành phố-bang' }]
      };
  return [first, {
    id: `lid-l-${land.id}-parlament`,
    prompt: `Wie heißt das Parlament von ${land.name}?`,
    vi: `Quốc hội của bang ${land.name} tên là gì?`,
    ...pick(parliaments, land.parliament),
    explanation: `Das Parlament von ${land.name} heißt ${land.parliament.replace(/^\S+ /u, '')}. Die Bürgerinnen und Bürger des Landes wählen es.`,
    explanationVi: `Quốc hội của bang ${land.name} gọi là ${land.parliament.replace(/^\S+ /u, '')}. Người dân của bang bầu ra quốc hội này.`,
    terms: [{ de: 'das Landesparlament', vi: 'quốc hội bang' }]
  }, {
    id: `lid-l-${land.id}-regierung`,
    prompt: `Wer leitet die Landesregierung von ${land.name}?`,
    vi: `Ai đứng đầu chính phủ bang ${land.name}?`,
    ...pick(heads, land.head),
    explanation: `In ${land.name} leitet ${land.head} die Landesregierung. Die Person kann nach einer Wahl wechseln, der Titel bleibt.`,
    explanationVi: `Ở ${land.name}, người đứng đầu chính phủ bang được gọi là: ${heads.find(head => head[0] === land.head)[1]}. Người giữ chức có thể thay đổi sau bầu cử, nhưng tên chức danh vẫn giữ nguyên.`,
    terms: [{ de: 'die Landesregierung', vi: 'chính phủ bang' }]
  }].map(question => ({ ...question, topic: 'bundesland', land: land.id }));
}

export const civicsQuestions = [...generalQuestions, ...extendedQuestions, ...bundeslaender.flatMap(landQuestions)];

// Official sources for the real catalogue and practice test. Re-check before each content release.
export const civicsSources = {
  checked: 'November 2026',
  catalog: 'https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.html',
  trainer: 'https://oet.bamf.de/ords/oetut/f?p=514',
  info: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html',
  law: 'https://www.gesetze-im-internet.de/stag/__10.html'
};
