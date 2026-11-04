#requires -Version 5.1
[CmdletBinding()]
param(
    [ValidateRange(1024, 65535)]
    [int]$Port = 8765,
    [switch]$NoBrowser
)

# ASCII source keeps messages readable in Windows PowerShell 5.1 without a BOM.
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$appRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\app'))
$rootPrefix = $appRoot.TrimEnd('\') + '\'
$address = 'http://127.0.0.1:' + $Port + '/'
$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css' = 'text/css; charset=utf-8'
    '.js' = 'text/javascript; charset=utf-8'
    '.mjs' = 'text/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.webmanifest' = 'application/manifest+json; charset=utf-8'
    '.svg' = 'image/svg+xml'
    '.png' = 'image/png'
    '.jpg' = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.webp' = 'image/webp'
    '.ico' = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2' = 'font/woff2'
    '.mp3' = 'audio/mpeg'
    '.wav' = 'audio/wav'
    '.ogg' = 'audio/ogg'
}

function Send-Response {
    param($Stream, [int]$Status, [string]$Reason, [byte[]]$Body,
        [string]$ContentType = 'text/plain; charset=utf-8', [bool]$HeadOnly = $false,
        [string]$ExtraHeaders = '')
    $header = "HTTP/1.1 $Status $Reason`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`n"
    $header += "Connection: close`r`nCache-Control: no-store`r`nX-Content-Type-Options: nosniff`r`n"
    $header += "Referrer-Policy: no-referrer`r`nCross-Origin-Resource-Policy: same-origin`r`n"
    $header += $ExtraHeaders
    if ($Status -eq 405) { $header += "Allow: GET, HEAD`r`n" }
    $headerBytes = [Text.Encoding]::ASCII.GetBytes($header + "`r`n")
    $Stream.Write($headerBytes, 0, $headerBytes.Length)
    if (-not $HeadOnly -and $Body.Length -gt 0) { $Stream.Write($Body, 0, $Body.Length) }
}

function Send-ErrorResponse {
    param($Stream, [int]$Status, [string]$Reason, [bool]$HeadOnly = $false)
    Send-Response $Stream $Status $Reason ([Text.Encoding]::UTF8.GetBytes("$Status $Reason`n")) 'text/plain; charset=utf-8' $HeadOnly
}

function Serve-Request {
    param($Stream, [string]$Request)
    $lines = $Request.Split(@("`r`n"), [StringSplitOptions]::None)
    if ($lines[0] -notmatch '^(\S+) (\S+) HTTP/1\.[01]$') {
        Send-ErrorResponse $Stream 400 'Bad Request'
        return
    }
    $method = $Matches[1]
    $target = $Matches[2]
    $headOnly = $method -ceq 'HEAD'
    if ($method -cne 'GET' -and -not $headOnly) {
        Send-ErrorResponse $Stream 405 'Method Not Allowed'
        return
    }

    # A fixed Host prevents other web origins/DNS rebinding from addressing this server.
    $hostHeaders = @($lines | Where-Object { $_ -match '^Host:' })
    if ($hostHeaders.Count -ne 1 -or $hostHeaders[0].Substring(5).Trim() -cne "127.0.0.1:$Port") {
        Send-ErrorResponse $Stream 400 'Bad Request' $headOnly
        return
    }
    if (-not $target.StartsWith('/') -or $target.StartsWith('//') -or $target -match '%(?![0-9a-fA-F]{2})') {
        Send-ErrorResponse $Stream 400 'Bad Request' $headOnly
        return
    }
    $urlPath = [Uri]::UnescapeDataString(($target -split '\?', 2)[0])
    # Reject Windows paths, NTFS streams, hidden/private paths, and traversal before normalization.
    if ($urlPath -match '[\\:\x00-\x1f\x7f%#]' -or $urlPath -match '(^|/)[._]' -or $urlPath -match '[ .]($|/)') {
        Send-ErrorResponse $Stream 403 'Forbidden' $headOnly
        return
    }
    if ($urlPath -eq '/') { $urlPath = '/index.html' }
    $filePath = [IO.Path]::GetFullPath((Join-Path $appRoot $urlPath.TrimStart('/').Replace('/', '\')))
    $extension = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
    if (-not $filePath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase) -or -not $mimeTypes.ContainsKey($extension)) {
        Send-ErrorResponse $Stream 403 'Forbidden' $headOnly
        return
    }
    if (-not [IO.File]::Exists($filePath)) {
        Send-ErrorResponse $Stream 404 'Not Found' $headOnly
        return
    }
    # Junctions and symlinks must never expose files outside app/.
    $inspectPath = $filePath
    while ($inspectPath.Length -ge $appRoot.Length) {
        if (([IO.File]::GetAttributes($inspectPath) -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
            Send-ErrorResponse $Stream 403 'Forbidden' $headOnly
            return
        }
        if ($inspectPath -eq $appRoot) { break }
        $inspectPath = [IO.Path]::GetDirectoryName($inspectPath)
    }
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $fileHeaders = "Accept-Ranges: bytes`r`n"
    $rangeHeaders = @($lines | Where-Object { $_ -match '^Range:' })
    # Browsers need byte ranges to seek in local WAV recordings. HEAD ignores Range.
    if (-not $headOnly -and $rangeHeaders.Count -gt 0) {
        [long]$rangeStart = 0
        [long]$rangeEnd = $bytes.LongLength - 1
        $validRange = $rangeHeaders.Count -eq 1 -and $rangeHeaders[0] -match '^Range:\s*bytes=(\d*)-(\d*)\s*$'
        if ($validRange) {
            $first = $Matches[1]
            $last = $Matches[2]
            if ($first -eq '') {
                [long]$suffixLength = 0
                $validRange = [long]::TryParse($last, [ref]$suffixLength) -and $suffixLength -gt 0
                if ($validRange) { $rangeStart = [Math]::Max(0, $bytes.LongLength - $suffixLength) }
            } else {
                $validRange = [long]::TryParse($first, [ref]$rangeStart)
                if ($last -ne '') { $validRange = $validRange -and [long]::TryParse($last, [ref]$rangeEnd) }
                $rangeEnd = [Math]::Min($rangeEnd, $bytes.LongLength - 1)
            }
            $validRange = $validRange -and $rangeStart -le $rangeEnd -and $rangeStart -lt $bytes.LongLength
        }
        if (-not $validRange) {
            Send-Response $Stream 416 'Range Not Satisfiable' ([byte[]]@()) 'text/plain; charset=utf-8' $false ("Content-Range: bytes */$($bytes.Length)`r`n" + $fileHeaders)
            return
        }
        $partial = New-Object byte[] ($rangeEnd - $rangeStart + 1)
        [Array]::Copy($bytes, $rangeStart, $partial, 0, $partial.Length)
        Send-Response $Stream 206 'Partial Content' $partial $mimeTypes[$extension] $false ("Content-Range: bytes $rangeStart-$rangeEnd/$($bytes.Length)`r`n" + $fileHeaders)
        return
    }
    Send-Response $Stream 200 'OK' $bytes $mimeTypes[$extension] $headOnly $fileHeaders
}

if (-not [IO.File]::Exists((Join-Path $appRoot 'index.html'))) {
    Write-Host 'Die App-Dateien fehlen. Bitte das vollstaendige Repository herunterladen.' -ForegroundColor Red
    exit 1
}

$listener = New-Object Net.Sockets.TcpListener([Net.IPAddress]::Loopback, $Port)
$listener.Server.ExclusiveAddressUse = $true
try {
    $listener.Start(16)
} catch {
    Write-Host "Die App kann die Adresse $address nicht oeffnen." -ForegroundColor Red
    Write-Host 'Moeglicherweise ist die App bereits in einem anderen Startfenster geoeffnet.'
    Write-Host 'Bitte das vorhandene Fenster verwenden oder schliessen und erneut starten.'
    Write-Host 'Es werden keine anderen Programme beendet und keine Firewall-Regeln geaendert.'
    $listener.Stop()
    exit 1
}

$clients = New-Object 'System.Collections.Generic.List[object]'
try {
    Write-Host ''
    Write-Host 'Deutsch lernen ist bereit.' -ForegroundColor Green
    Write-Host "Adresse: $address"
    Write-Host 'Dieses Fenster waehrend des Lernens geoeffnet lassen.'
    Write-Host 'Zum Beenden hier Strg+C druecken oder dieses Fenster schliessen.'
    if (-not $NoBrowser) {
        try { Start-Process -FilePath $address }
        catch { Write-Host "Bitte den Browser oeffnen und diese Adresse eingeben: $address" }
    }

    # Poll several connections together so browser preconnections cannot block real requests.
    while ($true) {
        while ($listener.Pending() -and $clients.Count -lt 16) {
            $client = $listener.AcceptTcpClient()
            $client.ReceiveTimeout = 1000
            $client.SendTimeout = 2000
            $clients.Add(@{ Client = $client; Stream = $client.GetStream(); Header = ''; Started = [DateTime]::UtcNow })
        }
        for ($i = $clients.Count - 1; $i -ge 0; $i--) {
            $connection = $clients[$i]
            $finished = $false
            try {
                if ($connection.Stream.DataAvailable) {
                    $buffer = New-Object byte[] 4096
                    $count = $connection.Stream.Read($buffer, 0, $buffer.Length)
                    if ($count -eq 0) { $finished = $true }
                    else {
                        $connection.Header += [Text.Encoding]::ASCII.GetString($buffer, 0, $count)
                        if ($connection.Header.Length -gt 16384) {
                            Send-ErrorResponse $connection.Stream 431 'Request Header Fields Too Large'
                            $finished = $true
                        } elseif ($connection.Header.Contains("`r`n`r`n")) {
                            Serve-Request $connection.Stream ($connection.Header -split "`r`n`r`n", 2)[0]
                            $finished = $true
                        }
                    }
                }
                if (([DateTime]::UtcNow - $connection.Started).TotalSeconds -gt 5) { $finished = $true }
            } catch {
                # A closed browser socket or malformed path must not stop the app.
                try { Send-ErrorResponse $connection.Stream 400 'Bad Request' ($connection.Header.StartsWith('HEAD ')) } catch { }
                $finished = $true
            }
            if ($finished) {
                $connection.Stream.Dispose()
                $connection.Client.Close()
                $clients.RemoveAt($i)
            }
        }
        Start-Sleep -Milliseconds 15
    }
} finally {
    foreach ($connection in $clients) {
        $connection.Stream.Dispose()
        $connection.Client.Close()
    }
    $listener.Stop()
    Write-Host 'Deutsch lernen wurde beendet.'
}
