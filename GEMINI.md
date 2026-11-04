# Übergabe für Gemini / Antigravity

Lies diese Dateien in dieser Reihenfolge, bevor du Änderungen machst:

1. `AGENTS.md` – verbindliche Produkt-, UX- und Technikregeln.
2. `docs/tasks/current.md` – geprüfter Ist-Stand und offene Risiken.
3. `docs/roadmap.md` – priorisierte nächste Arbeitspakete.

Für den durchgängigen A1–B1-Kurs: `docs/curriculum/LUNA-START.md` und `docs/curriculum/IMPLEMENTATION-STATUS.md` lesen. Der vollständige Kurs- und Paketvertrag steht in `docs/curriculum/A1-B1-MASTERPLAN.md`. Dieser Plan ist noch nicht implementiert; er gilt auch für Gemini/Antigravity. Pro Durchlauf genau das nächste Paket bearbeiten.

## Aktueller Stand

Die Anwendung ist ein lokaler, zero-dependency MVP für ältere vietnamesischsprachige Deutschlernende. Sie beginnt bei A1 und unterstützt den Weg Richtung A2/B1; sie ersetzt keinen Sprachkurs und vergibt kein Zertifikat. Der aktuelle Stand enthält drei Pilotlektionen und die A1-Lektion „Sich vorstellen“, lokale Lernstände, zweisprachige Erstkonfiguration, optionale vietnamesische Hilfe, Audio, freiwillige Wortwiederholung, Export/Import und Druck eigener Sätze für den Unterricht. Prüfe `git status` und Remote-Stand selbst; der lokale Checkout kann vom veröffentlichten GitHub-Stand abweichen.

Obsidian liegt lokal unter `C:\Users\Nam\Documents\Obsidian Vault\Sprachlern-App`. Das Vault ist Wissens- und Übergabeablage, aber keine automatisch synchronisierte Quelle. Implementiertes Verhalten und Tests im Repository sind maßgeblich. Datiere neue Vault-Kopien und erkläre ausdrücklich, wenn sie nur ein Snapshot sind.

## Arbeitsregeln

- Vor jeder Änderung `git status` prüfen und genau ein Paket bearbeiten.
- `app/content/lessons.js` ist der zentrale Export; Pilotinhalte in `legacy-lessons.js`, Kursmetadaten in `course.js`. IDs und lokales Speicherformat nicht unbedacht ändern. Bei Inhaltsänderungen zusätzlich `npm run content:check` ausführen.
- Nach Codeänderungen `npm test` und `npm run check` ausführen; Audio nur bei geänderten Audiotexten neu erzeugen.
- Bei UI-Prüfungen isolierten Port und Browserkontext verwenden; keine echten Lernstände zurücksetzen.
- Keine neuen Laufzeitpakete, Konten, Cloud-APIs oder Abos einführen, solange dies nicht ausdrücklich beschlossen ist.
- Fachliche Regeln auf ihren Geltungsbereich begrenzen und keine pauschalen Aussagen über vietnamesischsprachige Menschen machen.

Am Ende des Pakets `docs/tasks/current.md` aktualisieren und in der Übergabe kurz nennen: Dateien, Tests, offene Fragen und nächster sinnvoller Schritt.
