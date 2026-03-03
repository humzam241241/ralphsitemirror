@echo off
title Ryan's Roofing Platform — Dev Servers
echo.
echo ==========================================
echo   Ryan's Roofing — Dev Environment
echo ==========================================
echo.
echo  Starting 3 services...
echo.

echo [1/3] Backend (Express) on :8000 ...
start "Backend" cmd /k "cd backend && npm install && npm run dev"

timeout /t 2 /nobreak >nul

echo [2/3] Frontend (Vite) on :5173 ...
start "Frontend" cmd /k "cd frontend && npm install && npm run dev"

timeout /t 1 /nobreak >nul

echo [3/3] Widget Dev (Vite) on :5174 ...
start "Widget" cmd /k "cd widget && npm install && npm run dev"

echo.
echo ==========================================
echo   All services starting:
echo.
echo   Backend:    http://localhost:8000
echo   API Docs:   http://localhost:8000/api/health
echo   Frontend:   http://localhost:5173
echo   Widget Dev: http://localhost:5174
echo   Admin:      cd admin ^&^& npm run dev  (port 3001)
echo ==========================================
echo.
echo  Admin dashboard runs separately:
echo    cd admin ^&^& npm install ^&^& npm run dev
echo.
pause
