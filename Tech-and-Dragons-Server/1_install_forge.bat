@echo off
chcp 65001 >nul
echo Установка сервера Forge 1.20.1-47.4.28...
java -jar forge-1.20.1-47.4.28-installer.jar --installServer
echo Готово. Теперь скопируйте папку mods из клиентского архива и запустите 2_remove_client_mods.bat
pause
