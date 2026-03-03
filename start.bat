@echo off
title Ryan's Roofing - Development Servers
echo.
echo ==========================================
echo   Ryan's Roofing - Dev Environment
echo ==========================================
echo.
echo Starting backend (FastAPI) on :8000 ...
echo Starting frontend (Vite)   on :5173 ...
echo.

start "Backend" cmd /k "cd backend && pip install -r requirements.txt && python -m uvicorn app.main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

start "Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:5173
echo  API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit this launcher...
pause >nul
