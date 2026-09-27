# Übergabe für Gemini / Antigravity

Lies diese Dateien in dieser Reihenfolge, bevor du Änderungen machst:

1. `AGENTS.md` – verbindliche Produkt-, UX- und Technikregeln.
2. `docs/tasks/current.md` – geprüfter Ist-Stand und offene Risiken.
3. `docs/roadmap.md` – priorisierte nächste Arbeitspakete.

## Aktueller Stand

Die Anwendung ist ein lokaler, zero-dependency Prototyp für ältere vietnamesischsprachige Deutschlernende. Sie beginnt bei A1 und unterstützt den Weg Richtung A2/B1; sie ersetzt keinen Sprachkurs und vergibt kein Zertifikat. Der aktuelle Stand enthält drei Pilotlektionen, lokale Lernstände, optionale vietnamesische Hilfe, Audio sowie Export/Import. Die Änderungen nach Commit `a2ddf7c` sind noch nicht committed oder gepusht.

Obsidian liegt lokal unter `C:\Users\Nam\Documents\Obsidian Vault\Sprachlern-App`. Das Vault ist Wissens- und Übergabeablage, aber keine automatisch synchronisierte Quelle. Implementiertes Verhalten und Tests im Repository sind maßgeblich. Datiere neue Vault-Kopien und erkläre ausdrücklich, wenn sie nur ein Snapshot sind.

## Arbeitsregeln

- Vor jeder Änderung `git status` prüfen und genau ein Paket bearbeiten.
- IDs in `app/content/lessons.js` und das lokale Speicherformat nicht unbedacht ändern.
- Nach Codeänderungen `npm test` und `npm run check` ausführen; Audio nur bei geänderten Audiotexten neu erzeugen.
- Bei UI-Prüfungen isolierten Port und Browserkontext verwenden; keine echten Lernstände zurücksetzen.
- Keine neuen Laufzeitpakete, Konten, Cloud-APIs oder Abos einführen, solange dies nicht ausdrücklich beschlossen ist.
- Fachliche Regeln auf ihren Geltungsbereich begrenzen und keine pauschalen Aussagen über vietnamesischsprachige Menschen machen.

Am Ende des Pakets `docs/tasks/current.md` aktualisieren und in der Übergabe kurz nennen: Dateien, Tests, offene Fragen und nächster sinnvoller Schritt.
