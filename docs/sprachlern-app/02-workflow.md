# Gemeinsamer Workflow: Codex, Antigravity, Obsidian

Stand: 25.09.2026 · Vorschlag, noch keine automatische Synchronisation eingerichtet

## Rollen und Kontingent

Als Startverteilung etwa 70–80 % der klar abgegrenzten Umsetzungspakete mit Antigravity bearbeiten; Codex gezielt für schwierige Entscheidungen, knifflige Fehler und risikoreiche Reviews einsetzen. Diese Quote ist ein Versuch für die Aufgabenverteilung, keine Prognose zur Tokenersparnis. Verfügbare Modelle, Kontingente und studentische Leistungen im eigenen Konto prüfen; hier wurden keine konkreten Leistungen angenommen.

| Arbeit | Bevorzugter Startpunkt |
| --- | --- |
| Produktentscheidungen, Schnittstellen, Datenmodell | Gemeinsam festlegen; Codex gezielt hinzuziehen |
| Einzelne UI-Ansicht nach festem Auftrag | Antigravity |
| Kleine Inhaltsentwürfe im vereinbarten Format | Antigravity, danach fachliche Prüfung |
| Normale Fehlerkorrekturen und passende Tests | Das Werkzeug, das das Paket bearbeitet |
| Fortschrittsspeicherung, Wiederholungslogik, schwierige Fehler | Codex nach Bedarf |
| Routinemäßige Qualitätssicherung | Lokale Checks und CI, sobald vorhanden |
| Sprachliche Richtigkeit und Niveau | DaF-/DaZ-Fachperson; KI als Unterstützung |

Nicht jede Änderung durch beide Modelle schicken. Wichtige Übergänge und riskante Änderungen gezielt prüfen; bei einfachen Änderungen reichen geeignete automatisierte Checks und eine kurze Sichtprüfung.

## Gemeinsamer Wissensstand im Repository

Git ist die maßgebliche Quelle für Code, umsetzbare Spezifikationen und technische Entscheidungen. Beide Werkzeuge erhalten dieselben knappen Projektregeln. Aktuelle offizielle Dokumentationen nennen AGENTS.md sowohl für Codex als auch Antigravity [Q8, Q9]. Daher zunächst eine gemeinsame Datei vorsehen. GEMINI.md nur ergänzen, falls die konkret installierte Oberfläche dies braucht; keine duplizierten, auseinanderlaufenden Regelwerke.

Vorgeschlagene spätere Dateien:

- `AGENTS.md`: Zielgruppe, geltende Qualitätsregeln, Einstiegspunkte und tatsächlich vorhandene Prüfkommandos.
- `docs/decisions/`: knappe Entscheidungen mit Gründen und Status.
- `docs/tasks/`: konkrete Aufgaben und Übergaben.
- `content/`: versionierte, fachlich geprüfte Lerninhalte.

Die Agentenregeln kurz halten. Planungsdokumente als Vorschläge behandeln, bis Entscheidungen bestätigt sind. Keine erfundenen Build- oder Testbefehle eintragen, solange kein Stack eingerichtet ist.

## Ein Paket von Anfang bis Ende

1. Einen Auftrag mit Ergebnis, betroffenen Bereichen und Abnahmekriterien formulieren.
2. Genau ein Werkzeug übernimmt das Paket. Zunächst nacheinander im selben Checkout arbeiten.
3. Vor Änderungen Git-Status und bestehende Arbeiten prüfen.
4. Implementieren und relevante Prüfungen ausführen.
5. Ergebnis mit Änderungen, Prüfergebnissen, Grenzen und nächstem Schritt dokumentieren.
6. Bei Werkzeugwechsel denselben gespeicherten Stand und die Übergabe verwenden.

Falls später gleichzeitig gearbeitet wird: getrennte Branches und Worktrees, klare Dateizuständigkeit und Integration nacheinander. Zwei Editoren dürfen nicht parallel denselben Checkout verändern. Vor Branchwechseln Arbeit sichern; Änderungen nie durch einen harten Reset beseitigen.

Neue Aufgaben brauchen nur relevante Dateien und Entscheidungen als Kontext, nicht den ganzen bisherigen Chat. Nach zwei erfolglosen Versuchen am selben Hindernis eine kurze Diagnose mit reproduzierbarem Fehler schreiben und das Werkzeug gezielt wechseln.

## Vorlage für Auftrag und Übergabe

```markdown
# Aufgabe: <konkretes Ergebnis>
Status: offen | in Arbeit | Prüfung | fertig
Bearbeitung: Antigravity oder Codex
Basis: <Branch und Commit, sobald vorhanden>
Ziel und Nutzerbedarf:
Relevante Dateien / Entscheidungen:
Umfang:
Abnahmekriterien:
Ausgeführte Prüfungen und Ergebnisse:
Geänderte Dateien:
Offene Punkte / nächster Schritt:
```

Beispielauftrag für Antigravity nach der Planungsphase: „Erstelle anhand des bestätigten Lernziels eine Beispiel-Lektion mit Lösungen, akzeptablen Varianten und verständlichen Erklärungen. Markiere sie als ungeprüften Entwurf. Erstelle noch keinen vollständigen Kurs.“

Beispiel für gezielten Codex-Einsatz: „Prüfe den konkreten Diff der Fortschrittsspeicherung auf Datenverlust bei Unterbrechung und Wiederaufnahme; nutze die verlinkten Abnahmekriterien.“

## Obsidian

Vorschlag für den vorhandenen Vault:

```text
Sprachlern-App/
  00 Übersicht.md
  Recherche/
  Nutzerinterviews/
  Ideen/
  Entscheidungen.md
```

Im Vault sammeln wir Notizen, offene Ideen und Recherche. Bestätigte, für die Umsetzung relevante Entscheidungen werden ins Repository übertragen und im Vault verlinkt. Keine zwei unabhängig gepflegten Fassungen derselben Spezifikation. Falls Pläne in den Vault kopiert werden, die Kopien klar als datierten Stand mit Repository-Verweis kennzeichnen.

Der bestätigte Vault liegt unter `C:\Users\Nam\Documents\Obsidian Vault`. Im Projektbereich sind eine Übersicht und ein als Kopie gekennzeichneter Planungsstand vom 25.09.2026 vorgesehen. Das Repository bleibt maßgeblich für diese Spezifikationen; es gibt keine automatische Synchronisation. Private Interviewnotizen und persönliche Lerndaten gehören nicht ins öffentliche GitHub-Repository. Eine automatische Synchronisation erst einrichten, wenn Quelle, Ziel und Konfliktverhalten geklärt sind.

## Sparsamkeit prüfen

Nach den ersten zehn Aufgaben vergleichen: erledigte Arbeitspakete, Nacharbeit, Werkzeugwechsel, verbrauchtes Kontingent soweit sichtbar und Qualität. Die Aufgabenverteilung nach diesen Erfahrungen anpassen. Zusätzliche Laufzeit-APIs für die fertige App getrennt kalkulieren; ein Entwicklungsabo ist keine eingeplante Finanzierung dieser APIs.
