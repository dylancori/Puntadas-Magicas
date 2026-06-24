@echo off
title Subiendo cambios a GitHub

echo ==============================
echo Iniciando guardado automatico
echo ==============================

echo.
echo [1/3] Agregando archivos...
git add .

echo.
echo [2/3] Creando commit...

for /f "tokens=1-3 delims=/ " %%a in ("%date%") do (
    set FECHA=%%a-%%b-%%c
)

for /f "tokens=1 delims=." %%a in ("%time%") do (
    set HORA=%%a
)

git commit -m "Actualizacion automatica - %FECHA% %HORA%"

echo.
echo [3/3] Subiendo a GitHub...

:: Si tu rama es master cambia main por master
git push origin main

echo.
echo ==============================
echo LISTO - Cambios enviados
echo ==============================

pause