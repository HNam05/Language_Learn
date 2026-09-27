#requires -Version 5.1
[CmdletBinding()]
param(
    [string]$ManifestPath,
    [string]$OutputDir
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ManifestPath)) {
    $ManifestPath = [IO.Path]::GetFullPath((Join-Path $scriptDir '..\app\content\audio-manifest.json'))
}
if ([string]::IsNullOrWhiteSpace($OutputDir)) {
    $OutputDir = [IO.Path]::GetFullPath((Join-Path $scriptDir '..\app\assets\audio'))
}

if (-not (Test-Path $ManifestPath)) {
    Write-Error "Manifest-Datei nicht gefunden: $ManifestPath"
    exit 1
}

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Suchen einer deutschen Stimme (z.B. Microsoft Hedda oder beliebige de-DE Stimme)
$germanVoice = $synth.GetInstalledVoices() | Where-Object { 
    $_.Enabled -and $_.VoiceInfo.Culture.TwoLetterISOLanguageName -eq 'de' 
} | Select-Object -First 1

if ($null -ne $germanVoice) {
    $synth.SelectVoice($germanVoice.VoiceInfo.Name)
    Write-Host "Verwende deutsche Stimme: $($germanVoice.VoiceInfo.Name)" -ForegroundColor Green
} else {
    Write-Warning "Keine deutsche Stimme gefunden. Verwende Standardsystemstimme: $($synth.Voice.Name)"
}

# Leicht verlangsamtes, ruhiges Sprechtempo für ältere Sprachlernende (-1)
$synth.Rate = -1

$manifest = Get-Content -Raw -Path $ManifestPath -Encoding UTF8 | ConvertFrom-Json

Write-Host "Generiere Audio-Dateien nach $OutputDir ..."
foreach ($item in $manifest) {
    $targetFile = Join-Path $OutputDir $item.file
    Write-Host "  -> Erzeuge $($item.file) ..."
    $synth.SetOutputToWaveFile($targetFile)
    $synth.Speak($item.text)
    $synth.SetOutputToNull()
}

$synth.Dispose()
Write-Host "Fertig! Alle Audio-Dateien erfolgreich generiert." -ForegroundColor Green
