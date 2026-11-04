# Modulblätter A1-M04 bis A1-M12

Status aller neun Module: **technisch umgesetzt und im Browser durchgespielt, fachlich offen** (kein Deutsch- oder Vietnamesischreview, kein menschliches Anhören). Modulstatus in `course.js`: `pilot`. Datum: 04.11.2026, Bearbeiter: Claude Code. Inhalte: `app/content/a1/m04.js` … `m12.js`, geschrieben mit den Bausteinen aus `app/content/a1/build.js` (Schritt-/Wort-IDs nach Position: Reihenfolge veröffentlichter Schritte nie ändern).

Gemeinsame Regeln: je Lektion 6–8 Schritte, höchstens sechs neue Einträge, kontrastive Erklärung („Warum ist das so?“) auf das geübte Satzmuster begrenzt, L05 mit getrenntem Schreiben und Sprechen, L06 neues Szenario mit Wiederaufnahme früherer Module und Interaktion. Rufnummern nur aus dem reservierten Bereich der Bundesnetzagentur (030 23125 / 040 66969), E-Mail nur `example.com`, Postpreise als „Preisbeispiele“ gekennzeichnet. Gesundheit: Verständigung, keine Diagnosen.

## Übersicht

| Modul | Ziele (Kurzform) | L01 | L02 | L03 (Grammatik) | L04 (Hören, Audio) | L05 (Schreiben + Sprechen) | L06 (Transfer) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M04 Zeit und Termine | Termin, Öffnungszeiten, am/um/im, bestätigen | `termine` (Alt) | Öffnungszeiten lesen | am/um/im + Verb an Position 2 | „halb elf“, Terminänderung | formelle E-Mail, telefonisch bestätigen | freien Termin mit Nachbarin finden |
| M05 Tagesablauf | Tagesablauf, Wochenplan, trennbare Verben | Mein Tag | Wochenplan, Häufigkeit | trennbare Verben | Verabredung, Absage wegen Regen | Plan für morgen | zwei Pläne abstimmen, Sprachmittlung |
| M06 Essen und Einkauf | Preise, Akkusativ, Mengen, Ersatz | `einkaufen` (Alt) | Prospekt lesen, Preise sagen | einen/keinen | Markt, Durchsage | Einkaufsliste, Bitte „mitbringen“ | Ersatzprodukt im Asia-Laden |
| M07 Wohnen | Räume, Anzeige, es gibt, Ortsangaben | Meine Wohnung | Wohnungsanzeige | es gibt + Akkusativ | Ortswendungen, Hausmeister | Wohnung vorstellen, aber | Besuch: Stock, Klingel, buchstabieren |
| M08 Wege und Verkehr | Weg, Fahrplan, können, Fahrt planen | Nach dem Weg fragen | Fahrplan | können + Infinitiv | Straßenbahn, aussteigen | Weg aufschreiben/erklären | Fahrt zum Klinik-Termin, Sprachmittlung |
| M09 Gesundheit | Befinden, Praxisinfo, müssen/sollen, Termin | Wie geht es Ihnen? | Praxisschild, 116 117 | müssen / sollen | Apotheke, Rezept | Termin per E-Mail/Telefon, seit | Nachfragen beim Arzt, Sprachmittlung |
| M10 Freizeit und Einladungen | gern/lieber, Einladung, wollen, zu-/absagen | Was machen Sie gern? | Einladung lesen, Datum | wollen; und/aber/oder | Zusage/Absage | Einladung schreiben, einladen | Fest in der Pagode vereinbaren |
| M11 Dienstleistungen | Café, Post, mir/Ihnen, Anliegen | Im Café | Post: Preise, Adresse | mir/Ihnen, für | Paket abholen | Anfrage an Bibliothek | Anmeldung am Bürgeramt mit fehlendem Dokument |
| M12 Gestern und morgen | war/hatte, Perfekt, Bericht, Plan | `gestern` (Alt) | Nachricht: war/hatte | Perfekt haben/sein | Wochenendbericht | Erlebtes und Pläne | Familienbesuch planen, A1-Rückblick |

Die genauen Kann-Ziele (je vier) stehen in `app/content/course.js`.

## Grammatischer Geltungsbereich und bewusste Vereinfachungen

- Dativ nur als feste Wendung: auf dem Tisch, im Schrank, mir/Ihnen, seit drei Tagen, bis zur Ampel. Vollständige Regel ab A2-M03.
- Perfekt mit sein nur für die geübten Bewegungsverben (gehen, fahren); keine Universalregel „sein bei Ortswechsel“ (vgl. IDS-Hinweis in `docs/tasks/current.md`).
- müssen/sollen: sollen als „eine andere Person sagt/empfiehlt es“, auf Arzt-Hinweise begrenzt.
- „Ich hätte gern“ als feste höfliche Wendung, Konjunktiv II erst in A2-M08.

## Audio

33 neue WAVs (`a1-m04-…` bis `a1-m12-…`), erzeugt mit Microsoft Hedda Desktop, Rate −1; Manifest automatisch aus dem Inhalt (`npm run audio:sync`). Maschinelle Gegenprobe mit der Windows-Spracherkennung de-DE: Sätze, Uhrzeiten („halb elf“ wird als 10.30 Uhr erkannt), Preise, Linien und Zahlen werden erkannt. **Beim menschlichen Anhören besonders prüfen:** „Fischsoße“ (M06-L06), „Pagode“ (M10-L06), „Phở“ (M12-L06), „U fünf / U neun“ (M08-L06), Namen (Pham, Le, Hoang). Gesamtgröße aller 51 WAVs etwa 45 MB.

## Lösungsreview (Auswahl)

- M05-L01 „___ gehe ich spazieren“: „Dann“ und „Danach“ akzeptiert.
- M11-L01 „Wir möchten bitte ___“: „zahlen“ und „bezahlen“ akzeptiert.
- M12-L03: nur „gemacht“, „habe“; Perfekt mit sein nur bei fahren/gehen abgefragt.
- Einzelne Eingaben sind bewusst einwortig; Groß-/Kleinschreibung wird nicht geprüft.

## Review

Deutschreview: **offen**. Vietnamesischreview: **offen**. Anhören: **offen**.

## Technische Prüfung (04.11.2026)

`node --test` 85/85, `npm run check`, `npm run content:check` (72 Lektionen, 959 IDs, 51 Audios). Browser 127.0.0.1:8893 mit frischem Lernstand: alle 72 Lektionen nacheinander vollständig durchgespielt (518 Schritte, 112 Audio-Ladevorgänge, 71 Starts über „Weiter: …“ auf der Abschlussseite, 308 Wörter, 38 eigene Texte, 0 Fehler).

## Nächstes Paket

C-A1-QA (alle Module anhören und mit der Lernperson erproben), danach Engine T06/T07 (Lernstandschecks A1-C01 bis C03) und A2-M01.
