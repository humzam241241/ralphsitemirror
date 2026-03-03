@echo off
title Ryan's Roofing - Local Development Server
echo.
echo ==========================================
echo   Ryan's Roofing - Starting Local Server
echo ==========================================
echo.
echo Starting server at http://localhost:3000
echo Press Ctrl+C to stop the server.
echo.
npx serve site -l 3000 --no-clipboard
pause
