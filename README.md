# Schritt für Schritt – Deutsch lernen im Alltag

Eine seniorengerechte, ruhige Deutschlern-App, speziell zugeschnitten auf **ältere vietnamesischsprachige Lernende** (Erstsprache Tiếng Việt). 
Ziel ist es, bestehende A1-Kenntnisse im Alltag zu festigen und Schritt für Schritt zu einem sicheren B1 (und später B2) aufzubauen.

---

## Schnelleinstieg

### Für Lernende (Doppelklick-Start)
1. **`Start-Lernen.cmd`** im Hauptverzeichnis per Doppelklick starten.
2. Der lokale Server startet und öffnet automatisch den Standardbrowser unter **`http://127.0.0.1:8765/`**.
3. Zum Beenden das schwarze Konsolenfenster schließen oder dort `Strg+C` drücken.

> **Hinweis**: Die App läuft 100 % lokal ohne Internetverbindung, ohne Nutzerkonto, ohne Werbung und ohne Abo.

---

## Besonderheiten für ältere vietnamesische Lernende

- **Vietnamesische Stützsprache (`Tiếng Việt`)**: Auf Knopfdruck ("Hilfe auf Vietnamesisch") einblendbare Erklärungen, Übersetzungen und Formulierungshilfen.
- **Kontrastive Schwerpunkte**: Gezielte Hilfen bei typischen Hürden (Artikel *der/die/das*, Akkusativ/Dativ, trennbare Verben, Perfekt mit *haben/sein*).
- **Barrierearme UX (WCAG 2.2 AA)**:
  - Große, ruhige Typografie (mindestens 20 px Grundschrift, Vergrößerung auf 24 px per Schalter).
  - Große Touch-/Klickflächen (mind. 48 × 48 px).
  - Hoher Kontrast, keine hektischen Timer oder Bestrafungen bei Pausen.
- **Audio-Unterstützung**: Alle Lektionsdialoge und Hörübungen sind vertont und können in normaler oder verlangsamter Geschwindigkeit (0.8x) wiederholt werden.
- **Spaced Repetition (Wiederholungsmanager)**: Gelernte Wörter werden in intelligenten zeitlichen Abständen (1, 3, 7, 14, 30 Tage) zur freiwilligen Wiederholung angeboten.
- **Sicherer lokaler Speicher**: Fortschritt bleibt im Browser gespeichert und kann über *Einstellungen* jederzeit als JSON-Datei gesichert und wiederhergestellt werden.

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
│   │   ├── lessons.js        # Lektionsinhalte (Dialoge, Regeln, Aufgaben)
│   │   └── audio-manifest.json
│   ├── assets/audio/         # WAV-Audiodateien für Dialoge & Hörübungen
│   └── src/
│       ├── main.js           # App-Initialisierung & Event-Handling
│       ├── state.js          # Zustand, Spaced Repetition & Storage-Sicherheit
│       ├── views.js          # UI-Ansichten (Heute, Lernweg, Lektion, Wiederholen)
│       ├── ui.js             # SVG-Icons, Komponenten & Formatierungshelfer
│       └── styles.css        # Seniorengerechtes CSS & Farbschema
├── scripts/
│   ├── start.ps1             # Minimaler PowerShell HTTP-Server (127.0.0.1:8765)
│   └── generate-audio.ps1    # Synthese der Audios via Windows System.Speech (de-DE)
├── tests/
│   └── state.test.js         # 18 automatisierte Tests (Node.js Test Runner)
└── docs/                     # Produktpläne, Curriculum, Wettbewerbsanalyse
```

---

## Für Entwickler & KI-Assistenten

- **Tests ausführen**: `npm test` *(oder `node --test`)*
- **Audiodateien neu generieren**: `npm run audio`
- **Server ohne Browser starten**: `npm start`
- **KI-Zusammenarbeit**: Siehe [AGENTS.md](AGENTS.md) und [Workflow-Dokumentation](docs/sprachlern-app/02-workflow.md).
