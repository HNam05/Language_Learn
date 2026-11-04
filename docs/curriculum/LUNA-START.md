# Startauftrag für 5.6 Luna

Stand 27.09.2026. Dieser Auftrag startet eine kleine Umsetzungseinheit, nicht den gesamten Kurs in einem Durchlauf. Im Modellwähler 5.6 Luna auswählen; diese Datei ändert das Modell nicht selbst.

## Diesen Text in einen neuen Implementierungsauftrag kopieren

> Implementiere genau das nächste offene Paket aus `docs/curriculum/IMPLEMENTATION-STATUS.md` für unseren Deutschkurs. Lies zuerst `AGENTS.md`, diese Startdatei und die Statusdatei. Lies anschließend nur die für dieses Paket notwendigen Abschnitte aus `docs/curriculum/A1-B1-MASTERPLAN.md` sowie die betroffenen Code- und Testdateien. Prüfe vor Änderungen `git status` und erhalte vorhandene fremde Änderungen. Halte dich an den Vanilla-JS-/Offline-Rahmen, stabile IDs und Backup-Kompatibilität. Keine zusätzlichen Features oder Refactorings. Führe die Paketprüfungen sowie `node --test` und `npm run check` aus. Prüfe geänderte Bedienabläufe im isolierten Browserkontext. Dokumentiere tatsächliche Ergebnisse, offene fachliche/technische Punkte und genau das nächste Paket in der Statusdatei; aktualisiere den Ist-Stand in `docs/tasks/current.md`, ohne alte Tests als neu ausgeführt auszugeben. Wenn alle Kriterien erfüllt sind, beende den Auftrag mit einer knappen Übergabe. Bei einem Blocker dokumentiere die konkrete Ursache und sichere Teilfortschritte. Nicht eigenständig committen oder pushen.

## Navigation ohne unnötigen Kontext

| Auftrag | Masterplan-Abschnitte |
| --- | --- |
| T00–T04 | 7, 8, 9, 11, 12 |
| Neue Modullektion | 4, genau die relevante Zeile in 5, 7, 8.2/8.3, 10, 12 |
| Neues Modulblatt | 3, 4, relevante Niveautabelle in 5, 10 |
| T05 Wiederholung | 4, 8, 9, 12 |
| T06 Migration | 6, 8.4, 9, 12 |
| T07/T08 und Checkinhalte | 6, 8.4, 9, 10, 12 |
| Niveauabnahme | 3, 5, 6, 12 |

## Regeln gegen teure Fehlentwicklungen

- Genau ein Paket bearbeiten. Bei Inhalt: eine Lektion, nicht ein ganzes Niveau.
- Referenzmodul A1-M01 fertig prüfen, bevor Serienproduktion beginnt.
- `sourceText`, `free.mode`, Kursregistry und State v2 sind im Masterplan geplante Erweiterungen. Vor Nutzung prüfen, ob ihr Vorbereitungspaket tatsächlich abgeschlossen ist.
- Fremde Änderungen nicht verwerfen; bestehende IDs und aktive Schrittindizes nicht unbemerkt verändern.
- Keine erfundenen Testergebnisse, Audiodateien, Übersetzungsfreigaben oder B1-Zertifizierung.
- Vollständiger Kursplan bedeutet nicht, dass der Kurs bereits existiert.
- Fachliche Unsicherheit genau benennen und als Reviewpunkt erhalten; Grammatik nicht nach Bauchgefühl vereinfachen.
- Nach zwei erfolglosen Reparaturansätzen denselben Fehler nicht endlos neu versuchen: Ursache, Log und kleinste notwendige Entscheidung dokumentieren.

Weiterarbeit: denselben Auftrag erneut verwenden. Der Status enthält die nächste Paket-ID und die nötigen Dateien; alte Chats müssen dafür nicht komplett mitgegeben werden.
