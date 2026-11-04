# Aktueller Entwicklungsstand

## Neu: Paket E-LID-01 · 04.11.2026 · Claude Code

Ziel neu eingeordnet: Einbürgerung. Rechtlich genügt B1 plus Test „Leben in Deutschland“; für frühere DDR-Vertragsarbeitnehmer (Einreise bis 13.06.1990) nur mündliches Alltagsdeutsch und kein Test (§ 10 Abs. 4 Satz 3, Abs. 6 StAG). Recherche, Lernstrategie und Pakete E0–E6: [EINBUERGERUNG-STRATEGIE.md](../curriculum/EINBUERGERUNG-STRATEGIE.md).

- Neu: `app/content/civics.js` (30 eigene Fragen, 3 Themen, IDs `lid-*`), `app/src/civics-views.js`, `tests/civics.test.js`, `.claude/launch.json` (isolierter Testport 8893).
- Geändert: `state.js` (optionales Feld `civics`, `civicsRound`, `answerCivics`, `civicsProgress`; v1-Sicherungen ohne `civics` lesbar), `main.js` (Navigation „Einbürgerungstest“, Runden, gemischte Antwortreihenfolge), `views.js` (Ziel auf Startseite, Lernweg-Stufe, Info-Text), `styles.css`, `validate-content.mjs` (`validateCivics`), README, AGENTS.md, Roadmap.
- Prüfungen: `node --test` 55/55, `npm run check` 16 Dateien, `npm run content:check` mit 30 Fragen. Browser (127.0.0.1:8893, eigener Speicher): Übersicht, leere Abgabe, falsche Antwort mit richtiger Lösung, Hilfe umschalten bei offenem Feedback, ganze Runde, Zusammenfassung, Neuladen mit gespeichertem Stand, Themenrunde, bestehender Lektionsstart. Nur DOM-Prüfung: Screenshots schlugen fehl (Fenster verdeckt); visuelle, 320-px- und Großschrift-Abnahme offen.
- Offen: muttersprachliche Prüfung der vietnamesischen Texte und Faktenprüfung aller Fragen; E0 mit der Lernperson; noch nicht committet.

### Nachtrag E-LID-02 · 04.11.2026

- E0 entschieden (Nutzerangabe): Regelweg B1-Zertifikat + Test „Leben in Deutschland“, keine Vertragsarbeiter-Sonderregel.
- E1 Vorlesen (`speakButtons`/`speak` in `ui.js`) und E2 teilweise: 50 allgemeine + 48 Bundeslandfragen (IDs `lid-l-<land>-…`), Bundesland-Auswahl (`settings.bundesland`, validiert, optional in Sicherungen).
- Prüfungen: `node --test` 59/59, `npm run check` 16 Dateien, `content:check` 98 Fragen/4 Themen. Browser 127.0.0.1:8893: Bundesland wählen (Fokus bleibt, Fragenzahl 50→53, Themenzeile „Mein Bundesland: Sachsen“, gespeichert), Bundeslandrunde, Vorlesen startet mit lokaler Stimme, Hinweis ohne deutsche Stimme (simuliert), Vorlesen in der Rückmeldung. Weiterhin keine Sichtprüfung (Screenshots nicht möglich).
- Nächstes: E2 fortsetzen (allgemeine Fragen auf 100–150), dann E3 Probetest; muttersprachliche Prüfung.

### Paket C-A1-M03-PLAN + L01–L06 · 04.11.2026 · Claude Code

- Modul A1-M03 „Dinge und Sprache“: neu `app/content/a1/m03.js`, `docs/curriculum/modules/a1-m03.md`; `course.js` (Ordnung 3, Voraussetzung a1-m02; a1-m04 setzt jetzt a1-m03 voraus), `lessons.js`. Themen: ein/eine mit Artikel (Vergleich mit vietnamesischen Zählwörtern), Farben, Schilder, kein/keine, Plural, „Ich verstehe das nicht“, Ja/Nein-Frage, nicht vs. kein, Fundbüro mit Verlustmeldung.
- Vier WAVs per `-Only`, 14 ältere bytegleich. Gegenprobe: „Kuli“ wird als „Kollege“ erkannt – Anhören nötig.
- Prüfungen und Browserabläufe siehe Modulblatt (71/71 Tests). Kein menschliches Anhören, kein fachliches Review; nicht committet.

### Paket C-A1-M02-PLAN + L01–L06 · 04.11.2026 · Claude Code

- Modul A1-M02 „Person und Familie“: neu `app/content/a1/m02.js`, `docs/curriculum/modules/a1-m02.md`; `course.js` (Ordnung 2, Voraussetzung a1-m01, Ziele g01–g04), `lessons.js` bindet es ein. Themen: mein/meine, er/sie, haben/sein, Zahlen bis 100 (Einer vor Zehner, 13/30), Alter, Telefonnummer, Adresse/E-Mail, Angehörige vorstellen, Nummer weitergeben.
- Fünf WAVs per `generate-audio.ps1 -Only`; Manifest-Einträge per Skript aus dem Inhalt erzeugt; neun ältere WAVs bytegleich. Nur reservierte Rufnummern (Bundesnetzagentur 030 23125 / 040 66969) und `example.com`, per Test abgesichert.
- Prüfungen und Browserabläufe: siehe Modulblatt (70/70 Tests). Kein menschliches Anhören, kein fachliches Review; nicht committet.

### Paket E4 / C-A1-M01-PLAN + L02–L06 · 04.11.2026 · Claude Code

- Erstes vollständiges Kursmodul A1-M01 „Kontakt aufnehmen“: neu `app/content/a1/m01.js` (L02 Formular lesen, L03 Höflich fragen, L04 Namen buchstabieren, L05 Kurze Nachricht, L06 Neue Nachbarin), `docs/curriculum/modules/a1-m01.md`. `course.js`: Ziele g01–g05, sechs Lektions-IDs, Fertigkeiten inkl. Hören und Sprachmittlung; `lessons.js` bindet die Moduldatei ein. `vorstellen` und alle Alt-IDs unverändert.
- Audio: `a1-m01-l04-dialog.wav`, `a1-m01-l04-hoeren.wav`, `a1-m01-l06-dialog.wav` mit Microsoft Hedda Desktop erzeugt; Manifest nur ergänzt; die sechs alten WAVs sind bytegleich (Hash geprüft). `generate-audio.ps1` hat neu `-Only` (auch kommagetrennt), damit nicht alle Dateien neu entstehen. Maschinelle Gegenprobe per Windows-Spracherkennung, **kein menschliches Anhören**.
- Tests: `node --test` 67/67 (Inhaltstests auf IDs statt Positionen umgestellt, neue Modultests), `npm run check` 18 Dateien, `content:check` 9 Lektionen / 9 Audios / 148 Testfragen. Browserablauf siehe Modulblatt.
- Offen: C-A1-M01-QA (Anhören, Durchspielen mit der Lernperson, fachliches Review); `.hint`-Schriftgröße 18 px; nicht committet.

### Nachtrag E-LID-03 · 04.11.2026

- E2 abgeschlossen: 100 allgemeine Fragen (neu `app/content/civics-extended.js`, IDs `lid-d18…d34`, `lid-g16…g32`, `lid-m19…m34`) + 48 Landesfragen = 148.
- E3 Probeprüfung (`mockTestIds`, Modus `mock`): 30 + 3 Fragen, Lösungen erst am Ende, Fehlerliste, nur Fehler beeinflussen die Wiederholung.
- Laufende Runden jetzt in `state.civicsSession` (validiert, Richtigkeit neu berechnet, ältere Sicherungen ohne Feld lesbar); `startCivicsSession`, `answerCivicsSession`, `advanceCivicsSession` in `state.js`. `civicsQuizView` nimmt jetzt ein Datenobjekt.
- Prüfungen: `node --test` 64/64, `npm run check`, `content:check` 148 Fragen. Browser 127.0.0.1:8893: Probeprüfung mit Sachsen-Fragen, falsche Antwort ohne Lösungsanzeige, Pause → Neuladen → „Fortsetzen“ bei Frage 4, Neustart-Rückfrage abgelehnt, 33 Fragen beendet (26/33, 7 Fehlerfragen aufklappbar), Session nach Verlassen gelöscht; Übungsrunde mit Rückmeldung und Hilfeschalter weiter in Ordnung. Sichtprüfung weiterhin offen.
- Offen: muttersprachliche/fachliche Prüfung aller 148 Fragen, Sichtprüfung, Nutzertest mit der Lernperson; nicht committet.

## Vorheriger Stand (27.09.2026)

Stand: 27.09.2026 · Bearbeitung: Codex nach Gemini/Antigravity-Übergabe

Basis der Überprüfung: Commit `a2ddf7c` auf `main`. Die nachfolgenden Änderungen liegen zunächst im Arbeitsverzeichnis; noch kein neuer Commit oder Push.

## Produkt und Arbeitsweise

Reviewkorrektur vom 27.09.2026: Gemeinsamer Export in `app/content/lessons.js`, echte Auslagerung nach `legacy-lessons.js`, verschärfter Inhaltsvalidator mit negativen Tests und unabhängige Hilfe für mündliche Aufgaben. Aktuell 46/46 Tests, 13 JS-Dateien syntaxgeprüft, Inhaltsprüfung erfolgreich. Isolierter Browsertest bestätigt den Hilfe-Aufklapper vor Übungsbestätigung; keine neue vollständige End-to-End- oder Audioabnahme. Nächster Auftrag ist C-A1-M01-PLAN gemäß [Paketstatus](../curriculum/IMPLEMENTATION-STATUS.md), vor T05. Die älteren Prüfangaben unten beschreiben frühere Runden.

Lokale Deutschlern-Hilfe für eine ältere vietnamesischsprachige Person. A1 festigen, anschließend A2/B1 aufbauen; ergänzend zum Sprachkurs. Drei Pilotlektionen plus die neue A1-Lektion `vorstellen`, kein fertiger B1-Kurs. Windows-Start ohne zusätzliche Laufzeitpakete. Obsidian dient ausschließlich der internen Zusammenarbeit. `AGENTS.md` und diese Datei sind die aktuellen Einstiegspunkte im Repository.

## Korrigiertes Verhalten

- Kontrastive Grammatik beibehalten, aber irreführende Universalregeln korrigiert: Zeitangaben im jeweiligen Satzmuster, unbestimmte Artikel im Nominativ/Akkusativ Singular, Verbzweitstellung in Aussagesätzen und Perfektformen mit haben/sein. Einheitliche Sie-Anrede.
- Längere Erklärungen aufklappbar. Vietnamesische Überschriften und Erklärungen folgen dem Hilfeschalter. Beispiele behalten Zeilenumbrüche.
- Beim Umschalten der Hilfe bleiben Audio, Tempo und geöffnete Erklärungen innerhalb desselben Lernschritts erhalten. Ein Schrittwechsel stoppt das vorige Audio.
- Geänderte Antworten entfernen alte Rückmeldungen; auch nach einem Fehlversuch bleibt ein Hinweis auf eine leere Eingabe möglich. Feedback erhält den Tastaturfokus, ohne zum Seitenanfang zu springen.
- Eigene freie Antworten werden bei Abschluss in `notes` gespeichert, im Lernweg angezeigt und exportiert. Ältere v1-Sicherungen ohne diesen optionalen Bereich werden eingelesen. Eine leere mündliche Wiederholung löscht keinen früheren Text. Bereits vor dieser Änderung verworfene Texte können nicht rekonstruiert werden.
- „Wörter ansehen“ öffnet nach Abschluss direkt die freiwillige Wiederholung. Ihr Hinweis erklärt, dass diese Vorschau keine Fälligkeiten verschiebt.
- Der erste Besuch erklärt die drei Übungsschritte zweisprachig und lässt zwischen vietnamesischer Hilfe und reinem Deutsch wählen. Ein kompakter Überblick zeigt geübte Lektionen und fällige Wörter; die Wahl bleibt in den lokalen Einstellungen erhalten.
- Eigene Sätze im Lernweg lassen sich über eine druckfreundliche Ansicht zum Sprachkurs mitnehmen.
- Lokaler Server unterstützt einzelne Byte-Range-Anfragen (206/416); damit funktioniert das Springen in WAV-Aufnahmen. Bindung weiterhin ausschließlich an 127.0.0.1.
- Schriftgröße auch auf schmalen Ansichten 20 px, Vergrößerung 24 px. Umbrüche in Grammatikkarten verbessert.

## Prüfung und Befehle

- `npm test`: 27 Tests, einschließlich echtem Windows-PowerShell-Server, gültigen/ungültigen Audio-Bereichsabrufen, gespeicherten eigenen Texten, zweisprachigem Ersteinstieg und älteren Sicherungen.
- `npm run check`: Syntaxprüfung aller JS-Dateien einzeln; ersetzt den unter Windows ungeeigneten Wildcard-Aufruf.
- Interaktive Browserprüfung auf isolierten lokalen Testports 8876/8877: Ersteinstieg und Sprachwahl, Pause/Fortsetzen, Hilfeschalter, Grammatik-Aufklapper, falsche→richtige Antwort, Tempo/Transkript, leere und richtige Eingabe, eigener Satz, Abschluss, Lernweg, freiwillige Wiederholung und Lernstand-Export.
- Große Schrift wurde visuell geprüft. Die automatisierten Tests decken Server, Medienbereiche, State und Import/Export ab. Ein echter Import über den Dateiauswahldialog, systematische Kontrastmessung und Screenreader-Prüfung bleiben offen. Browser-Konsolenlogs konnten über den verwendeten In-App-Accessibility-Zugang nicht ausgelesen werden.
- Keine Laufzeit-Abhängigkeiten ergänzt. Die neue Lektion `vorstellen` nutzt zunächst Text/Transkript ohne neue WAV-Datei, weil die Windows-Synthese in dieser Entwicklungsumgebung keine Stimme liefert. Bestehende WAV-Dateien blieben unverändert.

## Nächste sinnvolle Pakete

Neuer Planungsstand vom 27.09.2026: [A1–B1-Masterplan](../curriculum/A1-B1-MASTERPLAN.md), [Luna-Startauftrag](../curriculum/LUNA-START.md) und [Paketstatus](../curriculum/IMPLEMENTATION-STATUS.md). Nur Planung, keine Kursimplementierung. Für den Kursausbau zuerst T00 aus dem Paketstatus: fehlende Audio-/Textquelle bei `vorstellen` und literale Zeilenumbrüche beheben; frühere Aussage „Text/Transkript nutzbar“ nicht ungeprüft übernehmen. Danach folgen kleine technische und inhaltliche Pakete. Die bisherigen Punkte unten bleiben fachliche Aufgaben.

1. Vietnamesische Übersetzungen mit einer muttersprachlichen DaF-Fachperson gegenlesen; insbesondere Verständlichkeit der neuen Lektion `vorstellen` mit der Zielperson erproben. Siehe [Roadmap](../roadmap.md).
2. Für `vorstellen` deutsche WAV-Dateien auf einem Windows-Rechner mit installierter deutscher Stimme erzeugen und anschließend `npm test` ausführen.
3. Tastatur/Screenreader systematisch prüfen. Die bisherigen Browserprüfungen sind keine WCAG-Konformitätszertifizierung.
4. Weitere A1/A2-Lektionen nach `docs/sprachlern-app/05-curriculum.md` als getrennte Pakete entwickeln; IDs und Speicherkompatibilität erhalten.

## Fachliche Belege zur Korrektur

- [IDS: Verbzweitsatz](https://grammis.ids-mannheim.de/terminologie/939) – gebeugtes Verb an zweiter Satzposition, keine allgemeine Regel für jede Satzart.
- [IDS: Perfekt mit sein oder haben](https://grammis.ids-mannheim.de/fragen/86) – die Wahl hängt von Verb und Verwendung ab; „sein nur bei Ortswechsel“ ist zu eng.
- [Goethe: Deutsche Grammatik](https://www.goethe.de/ins/de/de/m/prf/grm.html) – Kasus-/Artikelformen und Satzbau.
- [Goethe: A1-Zeitangaben](https://lernen.goethe.de/deutschonline/A1/PDF/DE/deutschonline_Redemittel_und_Grammatik_3.pdf) – unter anderem am Morgen und in der Nacht; keine pauschale am-Regel für alle Tageszeiten.
