# Roadmap und Paketplan

Stand: 27.09.2026. Diese Roadmap ergänzt `docs/tasks/current.md`; sie beschreibt geplante Arbeit, nicht bereits implementierte Funktionen.

## Reihenfolge

**Neu ab 04.11.2026:** Übergeordnetes Ziel ist die Einbürgerung (B1 + Test „Leben in Deutschland“ bzw. Sonderregel). Priorisierung der Einbürgerungspakete E0–E6 in [EINBUERGERUNG-STRATEGIE.md](curriculum/EINBUERGERUNG-STRATEGIE.md). E0 (Weg der Lernperson klären) vor allen weiteren Inhaltspaketen.

Für den systematischen Kursausbau gilt jetzt der [A1–B1-Masterplan](curriculum/A1-B1-MASTERPLAN.md) mit 36 Modulen und kleinen Implementierungspaketen. Einstieg für 5.6 Luna: [Startauftrag](curriculum/LUNA-START.md), Fortschritt: [Paketstatus](curriculum/IMPLEMENTATION-STATUS.md). Die folgenden älteren Pakete bleiben Hintergrund; die konkrete Reihenfolge des Kursausbaus steht im Paketstatus.

Ergänzender [Feature- und UI-Vorschlag vom 27.09.2026](design/feature-ui-plan-2026-09-27.md): Recherche, konkrete Codebefunde, priorisierte Pakete und visueller Entwurf. Vorschlag, noch nicht umgesetzt; zuerst die dort beschriebenen Audio-/Textprobleme der neuen Lektion beheben.

### Paket 1 – fachlicher Inhalt (begonnen)

Eine muttersprachliche DaF-Prüfung der drei Pilotlektionen und ihrer vietnamesischen Hilfen. Eine erste neue A1-Lektion „Sich vorstellen“ ist als vertikaler Schnitt (Handlung, Dialog, Grammatik, Abruf, eigener Satz) ergänzt. Die deutsche WAV-Erzeugung ist wegen einer fehlenden Windows-Stimme noch offen. Lernziel, Lösung und typische Fehler vor jeder weiteren UI-Arbeit festlegen. Bestehende IDs bleiben erhalten.

### Paket 2 – Bedienbarkeit

Tastaturablauf, Fokusreihenfolge, sichtbarer Fokus, semantische Überschriften und Screenreader-Ausgabe systematisch prüfen. Kontrast ist ein Qualitätsziel nach WCAG 2.2 AA; bis zu einer vollständigen Prüfung keine Konformität behaupten. Große Schrift und 320-px-Ansicht erneut mit der neuen Lektion prüfen.

### Paket 3 – Lernpfad

Lektionen nach Alltagssituationen staffeln: sich vorstellen, Termine, Einkaufen, Wege/Verkehr, Wohnen, Gesundheit und Arbeit. Jede Lektion verbindet Wortschatz, Hörverstehen, gelenkte Grammatik, freies Formulieren und freiwillige Wiederholung. B1-Inhalte erst nach ausreichender A1/A2-Abdeckung ausbauen.

### Paket 4 – Installation und Übergabe

Auf einem sauberen Windows-10/11-Konto testen: klonen, `Start-Lernen.cmd` doppelklicken, offline öffnen, Lernstand exportieren/importieren und Audio abspielen. Dabei keine automatische Ausführung beim `git clone` versprechen; der Start erfolgt ausdrücklich über die Startdatei.

## Zusammenarbeit Codex und Gemini/Antigravity

Beide Werkzeuge lesen `AGENTS.md`, `docs/tasks/current.md` und diese Datei. Pro Paket gibt es eine führende Änderung, danach prüft das zweite Werkzeug gezielt Inhalt, UX oder Tests. Der gemeinsame Vertrag ist Git: erst `git status`, dann kleine nachvollziehbare Änderungen, Tests, Übergabe. Das Obsidian-Vault dokumentiert Entscheidungen und Recherche; es synchronisiert sich nicht automatisch mit dem Repository.

## Definition of Done

Ein Paket ist erst übergabefertig, wenn die betroffenen Dateien genannt, `npm test` und `npm run check` erfolgreich ausgeführt, UI-Risiken beschrieben und `docs/tasks/current.md` aktualisiert wurden. Nicht geprüfte Punkte bleiben als offene Aufgabe stehen.
