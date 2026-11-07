@echo off
chcp 65001 >nul
for /f "usebackq delims=" %%f in ("client-only-mods.txt") do if exist "mods\%%f" (del "mods\%%f" & echo Удалён клиентский мод: %%f)
echo Готово.
pause
