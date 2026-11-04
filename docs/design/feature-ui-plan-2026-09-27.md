# Produkt- und UI-Vorschlag – 27.09.2026

Status: Recherche und Konzept, nicht implementiert oder vom Nutzer freigegeben. Bestehende Design-Spezifikation bleibt gültig. Ziel: ältere vietnamesischsprachige Erwachsene von A1 über A2 zu B1 begleiten.

## Befund im aktuellen Code

Vier Lektionen sind ein Pilot, kein vollständiger A1–B1-Kurs. Wiederholung, vietnamesische Hilfen, gespeicherte eigene Sätze, große Schrift und Datensicherung sind bereits vorhanden; sie sollten verbessert statt doppelt gebaut werden.

Bei `vorstellen` fehlen Audiozuweisungen: Die Dialogansicht erzeugt trotzdem einen Player, die Höraufgabe zeigt ohne Audio auch ihr vorhandenes Transkript nicht. Die Regel enthält literale Backslash-n-Zeichen. Diese Codebefunde müssen vor Erweiterungen behoben und im Browser geprüft werden. Die A1-Lektion steht nach der A2-Lektion; eine explizite didaktische Reihenfolge soll bestehende IDs und Lernstände erhalten.

## Recherche und eigene Ableitungen

- [Babbel](https://www.babbel.com/how-babbel-works): kurze praktische Lektionen, geführte Gespräche und verteilte Wiederholung. Übernahme des Prinzips: jede Einheit verbindet Verstehen, gelenktes Abrufen und eine eigene Äußerung. Anbieterbeschreibungen sind keine unabhängige Wirksamkeitsprüfung.
- [Busuu Lernplan](https://help.busuu.com/hc/en-us/articles/16097312171153-What-s-a-Study-Plan-How-do-I-make-one): persönliche Lernziele und regelmäßiges Lernen. Unsere Ableitung: eine freiwillige kurze Tagesportion, jederzeit pausierbar, ohne verbindliches B1-Erreichungsdatum.
- [W3C: ältere Nutzer](https://www.w3.org/WAI/older-users/): etablierte Barrierefreiheitsanforderungen decken viele altersbezogene Bedürfnisse ab. Unsere Ableitung: Lesbarkeit, Tastaturbedienung, große Ziele und verständliche Rückmeldungen vor dekorativen Effekten prüfen.

Wir übernehmen allgemeine Lernprinzipien, entwickeln eigene Inhalte und Gestaltung. Keine Übernahme fremder Audios, Aufgaben oder Marken. Cloud-KI und Abos sind für die Kernfunktionen nicht erforderlich.

## Priorisierte Pakete

| Paket | Ergebnis | Abnahme |
| --- | --- | --- |
| 0: Verlässliche Basis | Fehlende Audios oder ehrlicher Lesemodus, sichtbare Textquelle, richtige Zeilenumbrüche, A1-Reihenfolge | Jede Aufgabe hat alle nötigen Informationen; alle vier Lektionen vollständig durchspielbar; Lernstand bleibt erhalten |
| 1: Ruhiger Einstieg | Heute zeigt genau eine nächste Übung, Wiederholung und Zugang zu eigenen Sätzen; Kursliste nur im Lernweg | Hauptaktion auf kleinem Laptop sichtbar; verständliche Tastaturreihenfolge; 200 % Zoom ohne verlorene Funktionen |
| 2: Zusammenhängender A1-Kurs | Module zu Person/Familie, Zeit/Terminen, Einkaufen, Wegen, Wohnen und Gesundheit | Pro Modul Lernziele, Dialog, Grammatik, Abruf, eigene Aussage und spätere Transferaufgabe; deutsche und vietnamesische Inhalte fachlich prüfen |
| 3: Aktiver Satzbau | Wörter durch Anklicken zu Sätzen ordnen; konkrete Erklärung zur Verbposition | Kein Drag-and-drop-Zwang; Tastatur funktioniert; alternative gültige Lösungen fachlich berücksichtigen |
| 4: Mein Wörterheft | Suchen, Artikel/Plural, Beispielsatz, vorhandenes Audio, freiwillig schwierig markieren | Markierung beeinflusst Wiederholung nachvollziehbar; Backup enthält neue Daten und liest alte Sicherungen |
| 5: Sprechen im Alltag | Kurze Rollenspiele: erst hören, dann selbst antworten, anschließend Muster vergleichen | Offline nutzbar; Aufnahme nur freiwillig mit Löschung, Größenlimit und verständlichem Mikrofonfehler; keine erfundene Aussprachebewertung |
| 6: Können sichtbar machen | Konkrete Ziele wie „Ich kann einen Termin verschieben“, spätere neue Aufgabe zum selben Ziel | Abschluss, Selbsteinschätzung und überprüfte Antworten getrennt darstellen; keine Gleichsetzung von Klicks mit B1 |

Danach: A2/B1-Lesetexte, Nachrichten schreiben, Meinungen begründen und längere Dialoge. Ein optionales Übungsblatt für den Sprachkurs kann eigene Sätze und offene Fragen bündeln. Ein KI-Tutor bleibt nachrangig: laufende Kosten, Onlinebedarf und Qualität der Rückmeldungen passen zunächst schlechter zum lokalen Produkt.

## UI-Richtung

Konzeptbild: im zugehörigen Codex-Chat vom 27.09.2026 angezeigt. Es ist eine generierte Gestaltungsidee, kein App-Screenshot und kein Nachweis der Barrierefreiheit. Das Kopieren der Grafik ins Repository und dieser Notiz ins Obsidian-Vault scheiterte an einem Dateisystemfehler; die Notiz liegt bislang nur im Repository.

- Vorhandene cremefarbene/waldgrüne Identität erhalten. Weniger Rahmen und konkurrierende Informationsblöcke; keine neuen Statistikkacheln.
- Heute: kurze Begrüßung, eine nächste Lektion mit „Jetzt üben“ oder „Weiterüben“, darunter zwei offene Zeilen für Wiederholung und eigene Sätze. Keine doppelte vollständige Kursliste.
- Navigation stabil: Heute, Mein Lernweg, Wiederholen, Einstellungen. Wörterheft zunächst in Wiederholen integrieren, damit nicht immer mehr Hauptpunkte entstehen.
- Hilfe auf Vietnamesisch bleibt gut auffindbar. Zustand eindeutig anzeigen; erste Einführung kurz und später über Einstellungen wieder aufrufbar.
- Lernansicht: eine Aufgabe, „Schritt 2 von 6“, große Antwortflächen, eine primäre Aktion. Erklärung erst bei Bedarf aufklappen; Pause immer erreichbar.
- Audio: große beschriftete Wiedergabe-/Pausebedienung, Tempo und Transkript; fehlende Datei mit verständlicher Meldung und verfügbarer Textalternative.
- Fließtext einschließlich Hilfstext tatsächlich mindestens 20 px, großer Modus 24 px; Controls mindestens 48 × 48 px. Kontrastwerte messen, Fokus und Fehlermeldungen nicht allein durch Farbe vermitteln.
- Auf schmalen Ansichten Elemente untereinander; Navigation beschriftet und ohne horizontale Scrollpflicht. Das Desktop-Konzept ersetzt keinen mobilen Entwurf oder Browsertest.
- Das Bild hat illustrative Icons und einen Verlauf; für eine Umsetzung innerhalb des vorhandenen Systems sind flache Farbflächen und bestehende SVGs vorgesehen. Keine pixelgenaue Umsetzung dieses Entwurfs behaupten.

## Zusammenarbeit und Prüfung

Jeweils ein Assistent bearbeitet ein Paket. Vorschlag: Gemini erstellt Inhalte anhand eines verbindlichen Lektionsschemas; Codex prüft Integration, Zustand und Bedienabläufe; anschließend gegenseitige Prüfung anhand konkreter Abnahmekriterien. Keine gleichzeitigen Änderungen derselben Dateien.

Jedes Codepaket: `node --test`, `npm run check`, relevante Browserabläufe auf isoliertem Port. Besonders Antwortänderung, Hilfesprache, Pause/Neuladen, echte Audioausgabe, eigene Sätze und Export/Import. Audiodateien nur bei Textänderungen neu erzeugen. Zusätzlich ein kurzer Nutzertest mit der Zielperson: ohne Erklärung eine Übung starten, Hilfe finden, pausieren und fortsetzen. Beobachtungen dokumentieren; keine pauschale Aussage „intuitiv“ ohne diesen Test.

Diese Runde ändert nur Planung und Konzept; keine neuen Laufzeittests durchgeführt. Git-Stand und frühere Prüfergebnisse nicht aus dieser Notiz ableiten.
