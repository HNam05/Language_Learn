# Leitfaden für KI-Assistenten (AGENTS.md)

Dieses Dokument dient als gemeinsame Wissensbasis und Richtlinie für die Entwicklungsarbeit mit **Codex** und **Antigravity**.

---

## 1. Projektziel & Zielgruppe

- **Projekt**: „Schritt für Schritt“ – eine ruhige, alltagsnahe Deutschlern-App für ältere Erwachsene.
- **Ausgangspunkt**: A1-Kenntnisse festigen, zielgerichteter Aufbau von A2 bis B1 (später Erweiterung Richtung B2).
- **Erstsprache**: Vietnamesisch (Tiếng Việt).
- **Didaktik**:
  - Deutsch ist die Lernsprache; Vietnamesisch dient als zuschaltbare Stütz- und Erklärsprache.
  - Kontrastive Schwerpunkte: Nomen mit Artikel/Plural (*der/die/das*), Kasus (*Akkusativ/Dativ*), Satzklammer/Perfekt (*habe eingekauft / bin gegangen*), Verbposition.
  - Alltagssituationen statt isolierter Regeltabellen: Jede Lektion beginnt mit einer Handlung (z. B. Termin vereinbaren, Einkaufen) und endet mit einer eigenen Formulierung.
  - Spaced Repetition (aktives Abrufen mit zeitlich verteilter Wiederholung) ohne Zwang oder Strafen.

---

## 2. UX- & Barrierefreiheitsregeln (Senior-gerecht)

- **Schriftgröße**: Mindestens 20 px Fließtext als Standard; zuschaltbarer Modus „Schrift vergrößern“ (24 px).
- **Bedienelemente**: Alle klickbaren Buttons und Eingabefelder mindestens 48 × 48 px groß.
- **Kontraste**: WCAG 2.2 AA (mind. 4,5:1 für Fließtext, mind. 3:1 für Überschriften).
- **Stressfreiheit**: Keine Countdown-Timer, keine Ranglisten, keine Bestrafung bei Fehlversuchen oder Lernpausen.
- **Audio**: Klare Wiedergabe, verlangsamtes Tempo wählbar (0.8x / 1.0x), Transkript einblendbar.

---

## 3. Technischer Rahmen (Zero-Dependency)

- **Frontend**: Standardisiertes HTML5, CSS3 und Vanilla JavaScript (ES Modules).
- **Keine npm-Laufzeitpakete**: Die App läuft direkt im Browser ohne Build-Schritt (`node_modules` wird zur Ausführung nicht benötigt).
- **Lokaler Server**: Windows PowerShell TCP-Server unter `scripts/start.ps1` (Bindung an `127.0.0.1:8765`).
- **Start**: Doppelklick auf `Start-Lernen.cmd` im Projekt-Root.
- **Audio-Synthese**: `scripts/generate-audio.ps1` generiert aus `app/content/audio-manifest.json` `.wav`-Dateien via `System.Speech` (z. B. `Microsoft Hedda Desktop - de-DE`).
- **Lernstand**: Vollständig lokal (`localStorage`) mit Quota-Schutz, Validierung und JSON-Export/Import für Datensicherung.

---

## 4. Befehle & Qualitätssicherung

Vor jedem Abschluss eines Arbeitspakets ausführen:

| Zweck | Befehl |
| --- | --- |
| **Unit-Tests** | `node --test` (prüft Zustand, Wiederholung, Import/Export) |
| **Syntax-Check** | `node --check app/src/*.js app/content/*.js tests/*.js` |
| **Audio generieren** | `npm run audio` *(bzw. `powershell -ExecutionPolicy Bypass -File scripts/generate-audio.ps1`)* |
| **App starten** | `Start-Lernen.cmd` *(oder `npm start`)* |

---

## 5. Arbeitsverteilung & Zusammenarbeit

1. **Paketweise arbeiten**: Jeweils genau ein Assistent bearbeitet ein definiertes Paket im Workspace.
2. **Git ist maßgeblich**: Saubere Commits mit sprechenden Beschreibungen; vor Beginn `git status` prüfen.
3. **Trennung von Inhalt und Code**:
   - Lerninhalte liegen strukturiert in `app/content/lessons.js`.
   - Audiodaten liegen in `app/assets/audio/` und sind im `audio-manifest.json` dokumentiert.
   - Kernlogik liegt in `app/src/state.js` und ist durch Tests in `tests/state.test.js` abzusichern.
   - UI und Views liegen in `app/src/ui.js` und `app/src/views.js`.
