@echo off
setlocal
title Deutsch lernen
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start.ps1" %*
set "APP_EXIT_CODE=%errorlevel%"
if not "%APP_EXIT_CODE%"=="0" (
  echo.
  echo Die App konnte nicht gestartet werden. Bitte die Meldung oben lesen.
  pause
)
endlocal & exit /b %APP_EXIT_CODE%
