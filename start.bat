@echo off
echo ========================================
echo        Starting QwixAI Platform
echo ========================================
echo.
echo Starting Backend on http://localhost:3000...
start "QwixAI Backend" cmd /k "cd /d "%~dp0server" && npm run server"

echo Starting Frontend on http://localhost:5173...
start "QwixAI Frontend" cmd /k "cd /d "%~dp0client" && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo.
pause
