@echo off
title Smart Renewable Energy & IoT Learning Portal - Local Server
cd /d "%~dp0"

echo ==========================================================
echo  Starting Local Server for Renewable Energy Learning App
echo ==========================================================
echo.
echo Opening default web browser at http://localhost:8000 ...
echo Press Ctrl+C in this window when you want to stop the server.
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
    goto end
)

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python not found, using Node.js npx serve...
    start http://localhost:8000
    npx -y serve -l 8000 .
    goto end
)

echo Python or Node.js not detected in PATH.
echo Opening index.html directly in browser...
start "" "%~dp0index.html"

:end
pause
