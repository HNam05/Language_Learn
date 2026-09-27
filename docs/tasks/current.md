# Aktueller Entwicklungsstand

Stand: 26.09.2026 · Bearbeitung: Codex nach Gemini/Antigravity-Übergabe

Basis der Überprüfung: Commit `a2ddf7c` auf `main`. Die nachfolgenden Änderungen liegen zunächst im Arbeitsverzeichnis; noch kein neuer Commit oder Push.

## Produkt und Arbeitsweise

Lokale Deutschlern-Hilfe für eine ältere vietnamesischsprachige Person. A1 festigen, anschließend A2/B1 aufbauen; ergänzend zum Sprachkurs. Drei Pilotlektionen plus die neue A1-Lektion `vorstellen`, kein fertiger B1-Kurs. Windows-Start ohne zusätzliche Laufzeitpakete. Obsidian dient ausschließlich der internen Zusammenarbeit. `AGENTS.md` und diese Datei sind die aktuellen Einstiegspunkte im Repository.

## Korrigiertes Verhalten

- Kontrastive Grammatik beibehalten, aber irreführende Universalregeln korrigiert: Zeitangaben im jeweiligen Satzmuster, unbestimmte Artikel im Nominativ/Akkusativ Singular, Verbzweitstellung in Aussagesätzen und Perfektformen mit haben/sein. Einheitliche Sie-Anrede.
- Längere Erklärungen aufklappbar. Vietnamesische Überschriften und Erklärungen folgen dem Hilfeschalter. Beispiele behalten Zeilenumbrüche.
- Beim Umschalten der Hilfe bleiben Audio, Tempo und geöffnete Erklärungen innerhalb desselben Lernschritts erhalten. Ein Schrittwechsel stoppt das vorige Audio.
- Geänderte Antworten entfernen alte Rückmeldungen; auch nach einem Fehlversuch bleibt ein Hinweis auf eine leere Eingabe möglich. Feedback erhält den Tastaturfokus, ohne zum Seitenanfang zu springen.
- Eigene freie Antworten werden bei Abschluss in `notes` gespeichert, im Lernweg angezeigt und exportiert. Ältere v1-Sicherungen ohne diesen optionalen Bereich werden eingelesen. Eine leere mündliche Wiederholung löscht keinen früheren Text. Bereits vor dieser Änderung verworfene Texte können nicht rekonstruiert werden.
- „Wörter ansehen“ öffnet nach Abschluss direkt die freiwillige Wiederholung. Ihr Hinweis erklärt, dass diese Vorschau keine Fälligkeiten verschiebt.
- Der erste Besuch zeigt eine kurze Willkommenskarte mit drei klaren Schritten. Ein kompakter Überblick zeigt geübte Lektionen und fällige Wörter; die Karte kann dauerhaft ausgeblendet werden und bleibt in alten v1-Sicherungen kompatibel.
- Lokaler Server unterstützt einzelne Byte-Range-Anfragen (206/416); damit funktioniert das Springen in WAV-Aufnahmen. Bindung weiterhin ausschließlich an 127.0.0.1.
- Schriftgröße auch auf schmalen Ansichten 20 px, Vergrößerung 24 px. Umbrüche in Grammatikkarten verbessert.

## Prüfung und Befehle

- `npm test`: 27 Tests, einschließlich echtem Windows-PowerShell-Server, gültigen/ungültigen Audio-Bereichsabrufen, gespeicherten eigenen Texten, erster Besuchskarte und älteren Sicherungen.
- `npm run check`: Syntaxprüfung aller JS-Dateien einzeln; ersetzt den unter Windows ungeeigneten Wildcard-Aufruf.
- Browserprüfung mit isoliertem Edge-/Playwright-Kontext und Testport 8876. Drei Lektionen, falsche/leere/richtige Antworten, Pause und Neuladen, Hilfeschalter, Audio, eigene Sätze, Download und Import einer Sicherung. Desktop sowie 390-/320-px-Ansichten und große Schrift wurden geprüft.
- Keine Laufzeit-Abhängigkeiten ergänzt. Die neue Lektion `vorstellen` nutzt zunächst Text/Transkript ohne neue WAV-Datei, weil die Windows-Synthese in dieser Entwicklungsumgebung keine Stimme liefert. Bestehende WAV-Dateien blieben unverändert.

## Nächste sinnvolle Pakete

1. Vietnamesische Übersetzungen mit einer muttersprachlichen DaF-Fachperson gegenlesen; insbesondere Verständlichkeit der neuen Lektion `vorstellen` mit der Zielperson erproben. Siehe [Roadmap](../roadmap.md).
2. Für `vorstellen` deutsche WAV-Dateien auf einem Windows-Rechner mit installierter deutscher Stimme erzeugen und anschließend `npm test` ausführen.
3. Tastatur/Screenreader systematisch prüfen. Die bisherigen Browserprüfungen sind keine WCAG-Konformitätszertifizierung.
4. Weitere A1/A2-Lektionen nach `docs/sprachlern-app/05-curriculum.md` als getrennte Pakete entwickeln; IDs und Speicherkompatibilität erhalten.

## Fachliche Belege zur Korrektur

- [IDS: Verbzweitsatz](https://grammis.ids-mannheim.de/terminologie/939) – gebeugtes Verb an zweiter Satzposition, keine allgemeine Regel für jede Satzart.
- [IDS: Perfekt mit sein oder haben](https://grammis.ids-mannheim.de/fragen/86) – die Wahl hängt von Verb und Verwendung ab; „sein nur bei Ortswechsel“ ist zu eng.
- [Goethe: Deutsche Grammatik](https://www.goethe.de/ins/de/de/m/prf/grm.html) – Kasus-/Artikelformen und Satzbau.
- [Goethe: A1-Zeitangaben](https://lernen.goethe.de/deutschonline/A1/PDF/DE/deutschonline_Redemittel_und_Grammatik_3.pdf) – unter anderem am Morgen und in der Nacht; keine pauschale am-Regel für alle Tageszeiten.
