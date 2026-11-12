Патч Сканера руд Industrial Upgrade 3.4.0.11 (Tech & Dragons)
=============================================================
Industrial Upgrade распространяется под GPL-3.0; это изменённая версия, исходники изменений — здесь.

Что изменено в mods/IndustrialUpgrade-1.20.1-3.4.0.11.jar (класс com.denfop.items.ItemVeinSensor):
1. getDataChunk: сканирование идёт от дна мира (getMinBuildHeight, −64), а не от высоты 0 —
   теперь видны глубинные руды (алмазы, редстоун и т. д. ниже нуля).
2. computeOreColor: вместо «return -1» вызывается TdOreColors.color(state) — на карте появляются
   ВСЕ блоки из тега forge:ores (руды всех модов), древние обломки (незерит), спавнеры, будлинг-аметист.
3. getDataChunk: вместо Map.replace — TdOreColors.replace: в столбце показывается самая ценная руда
   (алмаз, незерит, спавнер, изумруд… важнее железа и угля), а не самая верхняя.
Новый класс: com.denfop.items.TdOreColors (TdOreColors.java). Патчер — Patch.java (ASM 9.6).
Сборка: javac TdOreColors.java против server-1.20.1-srg.jar; java Patch ItemVeinSensor.class out.class;
обе .class положить в jar с заменой.
