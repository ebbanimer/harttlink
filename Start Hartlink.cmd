@echo off
setlocal
cd /d "%~dp0"
title Hartlink Preview
echo.
echo Open the Local address printed below in your browser.
echo Keep this window open while using the app. Press Ctrl+C to stop.
echo.
set "CLOSEBY_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%CLOSEBY_NODE%" (
  "%CLOSEBY_NODE%" "node_modules\vite\bin\vite.js" preview --host 0.0.0.0 --port 63472
) else (
  node "node_modules\vite\bin\vite.js" preview --host 0.0.0.0 --port 63472
)
echo.
echo The preview server has stopped. Any error is shown above.
pause
