# Start auf einem privaten Windows-Rechner

Stand: 25. September 2026. Zielplattform: Windows 10/11 mit Windows PowerShell 5.1 und einem aktuellen Browser (beispielsweise Edge). Kein Node.js, Python, Administratorzugriff, Konto oder API-Schlüssel für den App-Start erforderlich.

## Einmal bereitstellen, dann per Doppelklick starten

1. Das gesamte Repository mit Git klonen oder als ZIP herunterladen und vollständig entpacken. Git wird nur zum Klonen und Aktualisieren benötigt.
2. `Start-Lernen.cmd` doppelt anklicken. Der lokale Server und anschließend der Standardbrowser starten. Es werden keine Pakete heruntergeladen und keine systemweiten Einstellungen verändert.
3. Das Startfenster während des Lernens geöffnet lassen. Zum Beenden dort **Strg+C** drücken oder das Fenster schließen. Nur den Browser-Tab zu schließen beendet den Server nicht.

`git clone` startet aus Sicherheitsgründen keine Programme automatisch. Der einmalige Doppelklick ist bewusst erforderlich. Die laufende App ist unter **http://127.0.0.1:8765/** erreichbar, auch ohne Internet. Die Verfügbarkeit von Sprachausgabe hängt von den im Browser bzw. Windows verfügbaren Stimmen ab.

Lernstände im Browser sind an Browserprofil und Adresse gebunden. Deshalb bleibt der Standardport **8765** fest. Ein anderer Browser, der Inkognito-Modus, ein anderer Port oder das Löschen der Websitedaten können einen anderen bzw. leeren Lernstand zeigen. Vor einem Gerätewechsel die Exportfunktion der App benutzen, sobald verfügbar.

## Start für Entwicklung und Tests

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\start.ps1 -NoBrowser
# Isolierter Testport; nicht für den normalen Lernstand verwenden:
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\start.ps1 -NoBrowser -Port 18765
```

`-NoBrowser` verhindert das Öffnen eines Browsers. `-Port` akzeptiert 1024–65535. Ohne Parameter startet die CMD-Datei immer den gleichen, im Projekt enthaltenen Server; ihr Pfad darf Leerzeichen enthalten.

## Fehler verstehen

- **Adresse kann nicht geöffnet werden:** Oft läuft die App bereits. Das erste Startfenster weiterverwenden oder schließen. Ein fremder Dienst auf Port 8765 wird weder beendet noch als eigene App geöffnet; es erfolgt kein stiller Portwechsel.
- **Browser öffnet sich nicht:** Die im Startfenster angezeigte Adresse manuell im Browser eingeben.
- **App-Dateien fehlen:** Das ganze Repository herunterladen; `Start-Lernen.cmd` und `scripts/start.ps1` allein reichen nicht.
- **PowerShell durch Organisationsrichtlinie gesperrt:** Eine übergeordnete Richtlinie wird nicht verändert. Auf verwalteten Rechnern ist gegebenenfalls die zuständige Administration nötig. Der Starter ändert keine dauerhaft gespeicherte Ausführungsrichtlinie.

## Technische Grenzen und Schutzmaßnahmen

Der kleine HTTP-Server verwendet die vorhandenen .NET-Klassen `TcpListener` und `NetworkStream`. Er bindet ausschließlich an IPv4-Loopback `127.0.0.1` und dient nur der lokalen Einzelplatznutzung. Es gibt kein öffentliches Hosting, keine Anmeldung, kein HTTPS, keinen Upload-Endpunkt und keine serverseitige Speicherung von Lernständen. Für eine spätere öffentliche Bereitstellung muss ein dafür geeigneter Webserver eingesetzt werden.

Ausgeliefert werden nur vorhandene, erlaubte Webdateitypen innerhalb von `app/`. Das Repository, Dokumentation, Skripte, Punktdateien, private Pfade mit `_` am Segmentanfang, Pfadwechsel (`..`), NTFS-Datenströme und symbolische Verknüpfungen/Junctions sind nicht erreichbar. **Alle erlaubten Dateien in `app/` sind dennoch öffentliche App-Assets: Dort dürfen keine Geheimnisse oder privaten Exporte liegen.**

Nur `GET` und `HEAD` sind erlaubt. Der Host-Header muss zur festen Loopback-Adresse passen. Antworten enthalten korrekte MIME-Typen, eine Byte-basierte Inhaltslänge, `nosniff`, `no-store` sowie Schutz gegen das direkte Einbetten von Ressourcen durch andere Ursprünge. Der Server setzt keine CORS-Freigabe. Anfragen sind auf 16 KiB Header und fünf Sekunden bis zur Bearbeitung begrenzt. Bis zu 16 Verbindungen werden verwaltet, damit Browser-Vorabverbindungen den Start nicht blockieren.

Dateien werden vollständig in den Arbeitsspeicher gelesen. Byte-Range-Anfragen, Streaming, Komprimierung, Verzeichnislisten, bedingte Cache-Anfragen und produktive Lastverteilung sind bewusst nicht implementiert. Das passt zum kleinen lokalen Pilot; große Audiobibliotheken benötigen später einen angepassten Server. Untergeordnete Verknüpfungen werden gesperrt, die Repository-Elternordner gelten als vertrauenswürdige Installation.

## Offizielle Grundlagen

Vor der Implementierung geprüft:

- [Microsoft: TCP mit TcpClient und TcpListener](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/sockets/tcp-classes) – lokale Bindung, Verbindungen und Streams.
- [Microsoft: IPAddress.Loopback](https://learn.microsoft.com/en-us/dotnet/api/system.net.ipaddress.loopback?view=netframework-4.8.1) – Bindung an `127.0.0.1`.
- [Microsoft: TcpListener.Start](https://learn.microsoft.com/en-us/dotnet/api/system.net.sockets.tcplistener.start?view=netframework-4.8.1) – Start, Fehlerbehandlung und Schließen akzeptierter Verbindungen.
- [Microsoft: PowerShell.exe in Windows PowerShell 5.1](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_exe?view=powershell-5.1) – Startparameter, `-File` und Pfade in CMD-Dateien.
- [Microsoft: Ausführungsrichtlinien in Windows PowerShell 5.1](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-5.1) – die Startoption `-ExecutionPolicy Bypass` gilt nur für diesen Prozess; Gruppenrichtlinien behalten Vorrang.
