# Oberfläche – Schritt für Schritt

Referenz: [generiertes Konzept](home-concept.png), 25.09.2026. Mit dem integrierten Image-Gen-Werkzeug erstellt; als Arbeitsentwurf gewählt, noch kein Nutzertest.

Prompt-Zusammenfassung: vollständige lokale Deutschlern-App für ältere vietnamesischsprachige Erwachsene, ruhige cremefarbene Oberfläche, waldgrüne Hauptaktion, feste Seitennavigation, eine hervorgehobene nächste Lektion, drei offene Zeilen im Lernweg, große beschriftete Bedienelemente, keine erfundenen Erfolgsdaten oder Abos.

## System vor Implementierung

- Hintergrund #f7f6f2, Navigation #f0efe9, Text #102923, Sekundärtext #59605e, Grün #244c3d, Hervorhebung #e1e7da.
- Systemschrift Segoe UI/Arial ohne externe Fonts. Grundtext 20 px, Überschrift ca. 48 px, Zwischenüberschrift 30 px. Größere Schrift über Einstellung und Browserzoom.
- Feste linke Navigation, großzügiger Hauptbereich, ein hervorgehobener nächster Lernschritt mit Dialog rechts. Offene nummerierte Liste darunter, keine Kartenkacheln.
- Einfache konsistente 24-px-SVG-Icons für Navigation und Pfeile. Text bleibt primär. Buttons mindestens 48 px hoch.
- Erlaubte Haupttexte wie im Konzept: Marke, Deutsch im Alltag, Heute, Mein Lernweg, Wiederholen, Einstellungen, Hilfe auf Vietnamesisch, Schön, dass Sie da sind., Ein kleiner Schritt. Mehr Sicherheit im Alltag., Ihre nächste Übung, Jetzt üben, Ihr Weg zu mehr Sicherheit, Lektion öffnen, Abschlusszeile.
- Zustandsabhängige Abweichungen sind funktional nötig: „Weiterüben“ bei unterbrochener Lektion, tatsächlich abgeschlossene Lektionen, fällige Wiederholungen, Lern- und Einstellungsansichten. Keine erfundenen Stände.
- Auf schmalen Ansichten Navigation als umbrochene obere Leiste, Dialog unter der Hauptaktion. Keine horizontale Scrollpflicht.
- Lernansicht nutzt dieselben Farben und Komponenten: Fortschritt innerhalb der Lektion, Aufgabe, optionale vietnamesische Hilfe, Audio, Feedback und Weiter/Pause.
- Alle Texte/Controls sind HTML; das Konzeptbild ist kein Bestandteil der Laufzeitoberfläche.
