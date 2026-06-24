@echo off
title Subiendo cambios a GitHub

echo Iniciando guardado automatico en Git...

:: Agregar todos los archivos nuevos y modificados
git add .

:: Generar fecha y hora actual
for /f "tokens=1-4 delims=/ " %%a in ("%date%") do (
    set DIA=%%a
    set MES=%%b
    set ANIO=%%c
)

for /f "tokens=1 delims=." %%a in ("%time%") do set HORA=%%a

set FECHA=%DIA%/%MES%/%ANIO% %HORA%

:: Crear commit automatico con fecha y hora
git commit -m "Actualizacion automatica - %FECHA%"

:: Subir cambios a GitHub
:: Si tu rama se llama master, cambia main por master
git push origin main

echo.
echo =====================================
echo Cambios subidos correctamente a GitHub
echo =====================================
echo.

pause