# Umsetzungsstand des A1–B1-Kursplans

Stand: 27.09.2026, nach Korrektur des Luna-Reviews. Vier Pilotlektionen sind verfügbar; der vollständige Kurs ist weiterhin geplant. Vertrag: [Masterplan](A1-B1-MASTERPLAN.md). Einstieg: [Luna-Start](LUNA-START.md).

## Stand Version 1.0 (04.11.2026, Claude Code)

Alle zwölf A1-Module sind mit je sechs Lektionen umgesetzt (72 Lektionen; Modulblätter `modules/a1-m01.md`, `a1-m02.md`, `a1-m03.md`, `a1-m04-bis-m12.md`). Status aller Module: `pilot` = technisch geprüft, fachlich offen. T04 (Lernweg nach Niveau/Modul) und T05 (Wiederholung in Portionen) sind in Version 1.0 umgesetzt.

**Genau nächstes Paket: C-A1-QA** – alle 51 Audios anhören, Module mit der Lernperson erproben, deutsch/vietnamesisches Review. Danach T06 (State v2 für Checks), T07 (Check-Renderer), Checks A1-C01 bis C03, dann A2-M01.

## Stand 04.11.2026 (Claude Code, vorher)

C-A1-M01-PLAN und C-A1-M01-L02 bis L06 umgesetzt: [Modulblatt](modules/a1-m01.md), Inhalte in `app/content/a1/m01.js`, Kursregistry mit fünf Zielen und sechs Lektionen, drei neue WAVs (nur diese erzeugt: `generate-audio.ps1 -Only …`). Modulstatus bleibt `pilot`: technisch geprüft, fachlich offen, Audio von keinem Menschen angehört.

Ebenfalls 04.11.2026: C-A1-M02-PLAN und L01–L06 („Person und Familie“, [Modulblatt](modules/a1-m02.md), `app/content/a1/m02.js`, fünf WAVs). Status `pilot`, technisch geprüft, fachlich offen.

Ebenfalls 04.11.2026: C-A1-M03-PLAN und L01–L06 („Dinge und Sprache“, [Modulblatt](modules/a1-m03.md), `app/content/a1/m03.js`, vier WAVs). `a1-m04` setzt jetzt `a1-m03` voraus. Status `pilot`.

**Genau nächstes Paket: C-A1-M01-QA bis C-A1-M03-QA** (vor allem Anhören; „Kuli“ in `a1-m03-l01-dialog.wav`). Danach A1-M04 mit `termine` als L01; vor Check A1-C01 die Engine-Pakete T05–T07. – drei Audios anhören, alle sechs Lektionen mit der Lernperson durchspielen, Lösungsreview und deutsch/vietnamesisches Gegenlesen einarbeiten. Danach T05.

## Früher genanntes nächstes Paket (erledigt)

**C-A1-M01-PLAN – Referenzmodul Kontakt aufnehmen spezifizieren.**

Masterplan Abschnitte 4, A1-M01 in 5, 7 und 10 lesen. Mit [Modulvorlage](modules/TEMPLATE.md) das Blatt `modules/a1-m01.md` erstellen. Sechs Slots, Ziele, Wortschatz, Medien und Transfer festlegen. `vorstellen` bleibt L01 mit unveränderten IDs. Danach L01 prüfen und L02–L06 einzeln implementieren, jeweils testen; anschließend Modul-QA und fachliches Gegenlesen. Erst danach T05. Kein vollständiges Referenzmodul ist derzeit vorhanden.

## Geprüfte Korrekturen

- T00: leere Player verhindert, sichtbare Lesetextquelle, tatsächliche Zeilenumbrüche. Auch die erste Dialoganweisung sagt jetzt ausdrücklich „Lesen“. Keine neue WAV-Datei.
- T01: Inhalte tatsächlich in `legacy-lessons.js` ausgelagert; `course.js` enthält nur Metadaten. `lessons.js` ist der gemeinsame geordnete Export für App, Tests und Inhaltsvalidator. IDs und Schrittfolge erhalten. Module als Pilot gekennzeichnet.
- T02: Sprech-/Gesprächs-/Sprachmittlungsmodi haben ein unabhängig aufklappbares Beispiel. Öffnen der Hilfe bestätigt keine Übung. Schreiben behält sein bisheriges Verhalten; die Bestätigung löscht keinen vorhandenen Entwurf.
- T03: Validator prüft u. a. Textfelder und Lösungen, doppelte Antworten/IDs, Lesequellen, Hörquellen, Manifest-/Transkriptgleichheit, WAV-Header, Ziel-/Modulverweise und Pilot-/Vollständigkeitsstatus. Negative Tests sichern die Reviewbefunde ab. Die Prüfung beurteilt nicht automatisch sprachliche Richtigkeit oder Niveau.
- T04 bleibt teilweise umgesetzt: Modulgruppen und verfügbare Lektionen vorhanden. Vollständige Niveaugliederung sowie systematische Zoom-/Tastaturabnahme beim Kursausbau noch offen. Nicht als vollständig abgenommen behandeln.

## Prüfungen dieser Korrekturrunde

- `node --test`: 46/46 erfolgreich. Darunter defekte Lösungen, fehlende Quellen, ungültige Ziele, doppelte IDs und bisherige eigene Sätze/aktive Aufgaben nach der Aggregation.
- `npm run check`: 13 JavaScript-Dateien erfolgreich.
- `npm run content:check`: 4 Lektionen, 52 IDs einschließlich Modul-/Ziel-IDs, 6 Audios, 4 Module.
- Browser: isolierte Renderer-Testansicht unter 127.0.0.1:8891, echte `lessonView` und Styles mit einem nur im Arbeitsspeicher gesetzten Sprechmodus. Hilfe vor Bestätigung per Tastatur geöffnet; Modell und Prüfliste sichtbar, kein Abschlussknopf freigeschaltet. Screenshot visuell geprüft.
- Browser plugin/Playwright nicht verfügbar; Prüfung über CUA/In-App-Browser. Keine neue vollständige End-to-End-, Konsolen-, mobile oder Audioabnahme behaupten. Die Testansicht prüft den nativen Aufklapper, nicht sämtliche App-Events.
- Fachliche deutsche/vietnamesische Prüfung weiterhin offen. Der frühere System.Speech-Aufruf war mit NullReferenceException gescheitert; daraus folgt nicht, dass sicher keine deutsche Stimme installiert ist.

## Restliche Reihenfolge

Referenzmodul A1-M01 → T05 → T06 → T07 → T08 → A1-M02 bis M04 und A1-C01. Weitere Module und Checks gemäß Masterplan. T09–T11 sind spätere Niveauabnahmen. T04-Restarbeit vor Ausbau auf weitere Niveaus erledigen.

216 Kernlektionen und neun Checks mit je zwei Varianten sind geplant. Vier vorhandene Pilotlektionen zählen dazu. Es gibt noch keine neue vollständige Modulserie, keine Checkvarianten und kein fachlich freigegebenes Modul.

## Übergabeformat

Paket-ID, Datum, Bearbeiter; geänderte Dateien; ausgeführte Prüfungen; konkrete offene Punkte; genau nächstes Paket. Vor Änderungen `git status` prüfen. Bestehende uncommittete Arbeit bewahren. Diese Korrekturrunde wurde nicht gepusht.
