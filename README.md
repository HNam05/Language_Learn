# Schritt für Schritt – Deutsch lernen im Alltag

Eine seniorengerechte, ruhige Deutschlern-App, speziell zugeschnitten auf **ältere vietnamesischsprachige Lernende** (Erstsprache Tiếng Việt).
Ziel ist es, bestehende A1-Kenntnisse im Alltag zu festigen und Schritt für Schritt zu einem sicheren B1 (und später B2) aufzubauen.

---

## Schnelleinstieg

### Für Lernende (Doppelklick-Start)
1. **`Start-Lernen.cmd`** im Hauptverzeichnis per Doppelklick starten.
2. Der lokale Server startet und öffnet automatisch den Standardbrowser unter **`http://127.0.0.1:8765/`**.
3. Zum Beenden das schwarze Konsolenfenster schließen oder dort `Strg+C` drücken.

> **Hinweis**: Nach dem Herunterladen läuft die App lokal ohne Internetverbindung, Nutzerkonto, Werbung oder Abo. Ein aktueller Browser und Windows PowerShell 5.1 sind erforderlich. `git clone` lädt die Dateien; gestartet wird anschließend per Doppelklick.

---

## Besonderheiten für ältere vietnamesische Lernende

- **Vietnamesische Stützsprache (`Tiếng Việt`)**: Auf Knopfdruck ("Hilfe auf Vietnamesisch") einblendbare Erklärungen, Übersetzungen und Formulierungshilfen.
- **Kontrastive Schwerpunkte**: Gezielte Hilfen bei typischen Hürden (Artikel *der/die/das*, Akkusativ/Dativ, trennbare Verben, Perfekt mit *haben/sein*).
- **Barrierearme UX (Qualitätsziel WCAG 2.2 AA, noch keine vollständige Konformitätsprüfung)**:
  - Große, ruhige Typografie (mindestens 20 px Grundschrift, Vergrößerung auf 24 px per Schalter).
  - Große Touch-/Klickflächen (mind. 48 × 48 px).
  - Hoher Kontrast, keine hektischen Timer oder Bestrafungen bei Pausen.
- **Audio-Unterstützung**: Die Pilotlektionen enthalten vertonte Dialoge und Hörübungen; weitere Lektionen können zunächst mit Text/Transkript starten und erhalten Audio nach der Sprachprüfung.
- **Einbürgerungstest üben (`Leben in Deutschland`)**: 100 eigene Übungsfragen zu Demokratie, Geschichte und Gesellschaft plus 3 Fragen je gewähltem Bundesland und eine Probeprüfung mit 33 Fragen (pausierbar, Auswertung mit Lösungen), mit vietnamesischer Hilfe, gemischten Antworten, Erklärung, wichtigen Wörtern und Vorlesen (lokale deutsche Browserstimme, auch langsam). Ohne Zeitdruck; Fehler kommen am nächsten Tag wieder. Dazu eine Übersicht der Einbürgerungsvoraussetzungen (inkl. Sonderregel für frühere DDR-Vertragsarbeitnehmer) und Links zum offiziellen BAMF-Katalog. Hintergrund: [docs/curriculum/EINBUERGERUNG-STRATEGIE.md](docs/curriculum/EINBUERGERUNG-STRATEGIE.md).
- **Spaced Repetition (Wiederholungsmanager)**: Gelernte Wörter werden in intelligenten zeitlichen Abständen (1, 3, 7, 14, 30 Tage) zur freiwilligen Wiederholung angeboten.
- **Ruhiger Einstieg**: Beim ersten Besuch erklärt eine zweisprachige Willkommenskarte den Ablauf und fragt, ob Vietnamesisch als Hilfe angezeigt werden soll. Die Startseite zeigt außerdem geübte Lektionen und fällige Wörter.
- **Lokaler Speicher**: Fortschritt bleibt im Browser gespeichert und kann über *Einstellungen* als JSON-Datei gesichert und wiederhergestellt werden. Eigene Übungssätze bleiben nach dem Abschluss unter *Mein Lernweg → Meine Sätze für den Sprachkurs* erhalten. Bei gesperrtem oder vollem Speicher zeigt die App eine Warnung. Alte v1-Sicherungen bleiben lesbar.
- **Sätze für den Unterricht**: Gespeicherte eigene Formulierungen können als übersichtliche Druckseite mit in den Sprachkurs genommen werden.

---

## Technische Struktur (Zero-Dependency)

Die Anwendung benötigt keine externen npm-Pakete (`node_modules` ist nicht erforderlich):

```text
├── Start-Lernen.cmd          # Ein-Klick-Starter für Windows
├── AGENTS.md                 # Gemeinsame Richtlinien für Codex & Antigravity
├── package.json              # Befehle für Tests, Audio & Start
├── app/
│   ├── index.html            # Haupteinstiegspunkt
│   ├── content/
│   │   ├── lessons.js        # Gemeinsamer geordneter Lektions-Export
│   │   ├── legacy-lessons.js # Pilotinhalte (Dialoge, Regeln, Aufgaben)
│   │   ├── course.js         # Kursmodule, Lernziele, Pilotstatus
│   │   ├── civics.js         # Eigene Übungsfragen „Leben in Deutschland“, Bundesländer
│   │   ├── civics-extended.js # Zweite Charge allgemeiner Übungsfragen
│   │   └── audio-manifest.json
│   ├── assets/audio/         # WAV-Audiodateien für Dialoge & Hörübungen
│   └── src/
│       ├── main.js           # App-Initialisierung & Event-Handling
│       ├── state.js          # Zustand, Spaced Repetition & Storage-Sicherheit
│       ├── views.js          # UI-Ansichten (Heute, Lernweg, Lektion, Wiederholen)
│       ├── civics-views.js   # Einbürgerungstest-Training und Infobereich
│       ├── ui.js             # SVG-Icons, Komponenten & Formatierungshelfer
│       └── styles.css        # Seniorengerechtes CSS & Farbschema
├── scripts/
│   ├── start.ps1             # Minimaler PowerShell HTTP-Server (127.0.0.1:8765)
│   └── generate-audio.ps1    # Synthese der Audios via Windows System.Speech (de-DE)
├── tests/
│   ├── state.test.js         # Lernstand, Antworten, Wiederholungen, Sicherungen
│   ├── content.test.js       # Lektionsdaten, Audio und Hilfesprache
│   └── server.test.js        # Echter Windows-Start und Audio-Bereichsabrufe
└── docs/                     # Produktpläne, Curriculum, Wettbewerbsanalyse
```

---

## Für Entwickler & KI-Assistenten

- **Tests ausführen**: `npm test` *(oder `node --test`)*
- **Syntax prüfen**: `npm run check` (jede JavaScript-Datei einzeln; funktioniert auch unter Windows)
- **Audiodateien neu generieren**: `npm run audio` (alle) bzw. nur neue: `powershell -ExecutionPolicy Bypass -File scripts/generate-audio.ps1 -Only datei1.wav,datei2.wav`
- **Server ohne Browser starten**: `npm start`
- **KI-Zusammenarbeit**: Siehe [AGENTS.md](AGENTS.md) und [Workflow-Dokumentation](docs/sprachlern-app/02-workflow.md).
- **Aktueller Stand und Übergabe**: [docs/tasks/current.md](docs/tasks/current.md).

Die Module „Kontakt aufnehmen“, „Person und Familie“ und „Dinge und Sprache“ (je sechs Lektionen) und drei weitere Pilotlektionen sind noch kein vollständiger B1-Kurs. Die kontrastiven Erklärungen wurden auf die geübten Satzmuster begrenzt. Deutsche Inhalte und vietnamesische Formulierungen benötigen vor verlässlichem Unterrichtseinsatz weiterhin eine fachliche bzw. muttersprachliche Prüfung.
