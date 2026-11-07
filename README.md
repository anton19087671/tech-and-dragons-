# Tech & Dragons — Balanced Edition

Сборка для **Minecraft 1.20.1** на **Forge 47.4.28** (Java 17) для игры вдвоём: технологии, автоматизация, подземелья, боссы, космос и Draconic Evolution. Прохождение ведут **207 квестов** на русском.

Состав: **73 мода + 33 библиотеки**. Все версии проверены на совместимость, сервер с полной сборкой запускался и тестировался.

---

## 1. Скачивание

1. На главной странице репозитория нажмите зелёную кнопку **Code → Download ZIP** (нужно войти в свой аккаунт GitHub с доступом к репозиторию).
2. Скачается один архив `tech-and-dragons--main.zip` (~500 МБ).

## 2. Распаковка

1. Правый клик по архиву → **«Извлечь всё…»** → например, в `C:\Сборка`.
2. Внутри будут папки:
   - `Tech-and-Dragons` — **клиентская сборка** (`mods` — 106 файлов, `config`, `kubejs`, `shaderpacks`, `extra`, документы);
   - `Tech-and-Dragons-Server` — только для отдельного сервера, для игры через Porthole не нужна.

## 3. Установка в TLauncher

1. **Настройки** TLauncher → включите **«Использовать отдельные папки для версий»**.
2. Память — **7168 МБ** (минимум 6144, больше 8192 не ставьте). Аргументы Java — в файле `extra/jvm-args-client.txt`.
3. Выберите версию **Forge 1.20.1** (`47.4.28`, подойдёт любая `47.3.0` и новее) → «Войти в игру» → дождитесь главного меню → закройте игру.
4. Найдите папку игры: запустите версию → **Настройки → Пакеты ресурсов → «Открыть папку пакетов»** → поднимитесь на уровень выше (там лежит `saves`). Закройте игру.
5. Скопируйте туда из `Tech-and-Dragons` папки **`mods`, `config`, `kubejs`, `shaderpacks`** (с заменой).
6. *(По желанию)* скопируйте туда же `extra/options.txt` — русский язык и оптимальная графика.
7. Запустите. **Первый запуск — 3–6 минут**, не закрывайте игру.

> У обоих игроков папки `mods`, `config` и `kubejs` должны быть одинаковыми.

## 4. Игра вдвоём

**Через Porthole (рекомендуется):** хост заходит в мир → `Esc` → «Открыть для сети» → делится портом через Porthole. Второй игрок подключается по адресу из Porthole. Мир хранится у хоста — делайте копию папки `saves` раз в неделю.

**Отдельный сервер:** используйте папку `Tech-and-Dragons-Server` и следуйте `README_SERVER.txt` внутри (нужна Java 17).

## 5. Шейдеры

Уже лежат в `shaderpacks` (внутренние `.zip` не распаковывать). Включение: **Настройки → Настройки графики → Пакеты шейдеров**.

| Шейдер | Нагрузка | Совет |
|---|---|---|
| MakeUp Ultra Fast | низкая | для больших баз |
| Complementary Reimagined | средняя | профиль Low/Medium, тени 1024 |
| Sildur's Vibrant Lite | средняя | — |

С шейдерами ставьте дальность прорисовки 8, симуляцию 6. Обновите драйвер видеокарты.

## 6. Если что-то не так

| Проблема | Решение |
|---|---|
| Вылет при запуске | пришлите файл из `crash-reports` и `logs/latest.log` |
| Не пускает к другу / «Missing mods» | у игроков разные `mods` — скопируйте одинаковые |
| `OutOfMemoryError` | память 7–8 ГБ |
| Белые линии на стыках блоков | выключите принудительное сглаживание в драйвере видеокарты |

## 7. Особенности сборки

- **Руды объединены** (Almost Unified): олово, свинец, серебро, никель, уран, осмий, цинк, бронза, сталь — по одному предмету.
- **Зачарование:** Enchanting Infuser — выбор зачарования; Easy Anvils — без «Слишком дорого!»; Enchantment Transfer — снятие чар на книгу через наковальню.
- **Баланс (KubeJS):** ядро дракония требует остриум (Марс), ядро слияния — калорит (Венера); реакторы Extreme Reactors и Flux Networks — схемы Mekanism.
- **Industrial Upgrade** — наследник IndustrialCraft 2, отдельная ветка квестов.

---

## 8. Список модов

Если какой-то файл повредился, его можно скачать вручную по ссылке (нужна **точно эта версия** под Forge 1.20.1).

### Промышленность и энергия (13)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [Ad Astra](https://modrinth.com/mod/ad-astra) | 1.15.21 | `ad_astra-forge-1.20.1-1.15.21.jar` | клиент + сервер |
| [Create](https://modrinth.com/mod/create) | mc1.20.1-6.0.8 | `create-1.20.1-6.0.8.jar` | клиент + сервер |
| [Create Crafts & Additions](https://modrinth.com/mod/createaddition) | forge-1.20.1-1.3.3 | `createaddition-1.20.1-1.3.3.jar` | клиент + сервер |
| [Draconic Evolution](https://modrinth.com/mod/draconic-evolution) | 3.1.2.621 | `Draconic-Evolution-1.20.1-3.1.2.621-universal.jar` | клиент + сервер |
| [Extreme Reactors](https://modrinth.com/mod/extreme-reactors) | 1.20.1-2.0.84 | `ExtremeReactors2-1.20.1-2.0.84.jar` | клиент + сервер |
| [Industrial Foregoing](https://modrinth.com/mod/industrial-foregoing) | 1.20.1-3.5.22 | `industrial-foregoing-1.20.1-3.5.22.jar` | клиент + сервер |
| [Industrial Upgrade](https://modrinth.com/mod/industrialupgrade) | 3.4.0.11 | `IndustrialUpgrade-1.20.1-3.4.0.11.jar` | клиент + сервер |
| [Mekanism](https://modrinth.com/mod/mekanism) | 10.4.16.80 | `Mekanism-1.20.1-10.4.16.80.jar` | клиент + сервер |
| [Mekanism Additions](https://modrinth.com/mod/mekanism-additions) | 10.4.16.80 | `MekanismAdditions-1.20.1-10.4.16.80.jar` | клиент + сервер |
| [Mekanism Generators](https://modrinth.com/mod/mekanism-generators) | 10.4.16.80 | `MekanismGenerators-1.20.1-10.4.16.80.jar` | клиент + сервер |
| [Mekanism Tools](https://modrinth.com/mod/mekanism-tools) | 10.4.16.80 | `MekanismTools-1.20.1-10.4.16.80.jar` | клиент + сервер |
| [Thermal Expansion](https://modrinth.com/mod/thermal-expansion) | 11.0.1 | `thermal_expansion-1.20.1-11.0.1.29.jar` | клиент + сервер |
| [Thermal Foundation](https://modrinth.com/mod/thermal-foundation) | 11.0.6 | `thermal_foundation-1.20.1-11.0.6.70.jar` | клиент + сервер |

### Хранение и логистика (9)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [AE2 Things](https://www.curseforge.com/projects/609977) | AE2 Things v1.2.1 | `AE2-Things-1.2.1.jar` | клиент + сервер |
| [Applied Energistics 2](https://modrinth.com/mod/ae2) | 15.4.12 | `appliedenergistics2-forge-15.4.12.jar` | клиент + сервер |
| [CC: Tweaked](https://modrinth.com/mod/cc-tweaked) | 1.121.0 | `cc-tweaked-1.20.1-forge-1.121.0.jar` | клиент + сервер |
| [ExtendedAE](https://www.curseforge.com/projects/892005) | ExtendedAE-1.20-1.4.22-forge.jar | `ExtendedAE-1.20-1.4.22-forge.jar` | клиент + сервер |
| [Flux Networks](https://www.curseforge.com/projects/248020) | Flux-Networks-1.20.1-7.2.1 | `FluxNetworks-1.20.1-7.2.1.15.jar` | клиент + сервер |
| [Functional Storage](https://modrinth.com/mod/functional-storage) | 1.20.1-1.2.14 | `functionalstorage-1.20.1-1.2.14.jar` | клиент + сервер |
| [LaserIO](https://www.curseforge.com/projects/626839) | LaserIO-1.6.8 | `laserio-1.6.8.jar` | клиент + сервер |
| [Sophisticated Backpacks](https://modrinth.com/mod/sophisticated-backpacks) | 1.20.1-3.26.19.2239 | `sophisticatedbackpacks-1.20.1-3.26.19.2239.jar` | клиент + сервер |
| [Sophisticated Storage](https://modrinth.com/mod/sophisticated-storage) | 1.20.1-1.5.15.2220 | `sophisticatedstorage-1.20.1-1.5.15.2220.jar` | клиент + сервер |

### Приключения и мир (13)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [Alex's Caves](https://modrinth.com/mod/alexs-caves) | 2.0.2 | `alexscaves-2.0.2.jar` | клиент + сервер |
| [Alex's Mobs](https://modrinth.com/mod/alexs-mobs) | 1.22.9 | `alexsmobs-1.22.9.jar` | клиент + сервер |
| [Artifacts](https://modrinth.com/mod/artifacts) | 9.5.19 | `artifacts-forge-9.5.19.jar` | клиент + сервер |
| [Biomes O' Plenty](https://modrinth.com/mod/biomes-o-plenty) | 18.0.0.592 | `BiomesOPlenty-1.20.1-18.0.0.592.jar` | клиент + сервер |
| [Blue Skies](https://modrinth.com/mod/blue-skies) | 1.3.31 | `blue_skies-1.20.1-1.3.31.jar` | клиент + сервер |
| [L_Ender's Cataclysm](https://modrinth.com/mod/l_enders-cataclysm) | 3.31 | `L_Enders_Cataclysm-3.31.jar` | клиент + сервер |
| [Mowzie's Mobs](https://modrinth.com/mod/mowzies-mobs) | 1.8.2 | `mowziesmobs-1.8.2.jar` | клиент + сервер |
| [Terralith](https://modrinth.com/mod/terralith) | 2.5.4 | `Terralith_1.20.x_v2.5.4.jar` | клиент + сервер |
| [When Dungeons Arise](https://modrinth.com/mod/when-dungeons-arise) | 2.1.58-1.20.x | `DungeonsArise-1.20.x-2.1.58-release.jar` | клиент + сервер |
| [YUNG's Better Dungeons](https://modrinth.com/mod/yungs-better-dungeons) | 1.20-Forge-4.0.4 | `YungsBetterDungeons-1.20-Forge-4.0.4.jar` | клиент + сервер |
| [YUNG's Better Mineshafts](https://modrinth.com/mod/yungs-better-mineshafts) | 1.20-Forge-4.0.4 | `YungsBetterMineshafts-1.20-Forge-4.0.4.jar` | клиент + сервер |
| [YUNG's Better Nether Fortresses](https://modrinth.com/mod/yungs-better-nether-fortresses) | 1.20-Forge-2.0.6 | `YungsBetterNetherFortresses-1.20-Forge-2.0.6.jar` | клиент + сервер |
| [YUNG's Better Strongholds](https://modrinth.com/mod/yungs-better-strongholds) | 1.20-Forge-4.0.3 | `YungsBetterStrongholds-1.20-Forge-4.0.3.jar` | клиент + сервер |

### Зачарование (3)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [Easy Anvils](https://modrinth.com/mod/easy-anvils) | v8.0.2-1.20.1-Forge | `EasyAnvils-v8.0.2-1.20.1-Forge.jar` | клиент + сервер |
| [Enchanting Infuser](https://modrinth.com/mod/enchanting-infuser) | v8.0.3-1.20.1-Forge | `EnchantingInfuser-v8.0.3-1.20.1-Forge.jar` | клиент + сервер |
| [Enchantment Transfer](https://modrinth.com/mod/enchantment-transfer) | 0.0.6 | `enchantmenttransfer-0.0.6-1.20.1.jar` | клиент + сервер |

### Удобство и квесты (16)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [AppleSkin](https://modrinth.com/mod/appleskin) | 2.5.1+mc1.20.1 | `appleskin-forge-mc1.20.1-2.5.1.jar` | клиент + сервер |
| [Controlling](https://modrinth.com/mod/controlling) | 12.0.2 | `Controlling-forge-1.20.1-12.0.2.jar` | только клиент |
| [Explorer's Compass](https://modrinth.com/mod/explorers-compass) | 1.20.1-1.4.0-forge | `ExplorersCompass-1.20.1-1.4.0-forge.jar` | клиент + сервер |
| [FTB Chunks](https://www.curseforge.com/projects/314906) | ftb-chunks-forge-2001.3.8.jar | `ftb-chunks-forge-2001.3.8.jar` | клиент + сервер |
| [FTB Library](https://www.curseforge.com/projects/404465) | ftb-library-forge-2001.2.13.jar | `ftb-library-forge-2001.2.13.jar` | клиент + сервер |
| [FTB Quests](https://www.curseforge.com/projects/289412) | ftb-quests-forge-2001.4.22.jar | `ftb-quests-forge-2001.4.22.jar` | клиент + сервер |
| [FTB Teams](https://www.curseforge.com/projects/404468) | ftb-teams-forge-2001.3.2.jar | `ftb-teams-forge-2001.3.2.jar` | клиент + сервер |
| [Inventory Profiles Next](https://modrinth.com/mod/inventory-profiles-next) | forge-1.20.1-1.10.20 | `InventoryProfilesNext-forge-1.20-1.10.20.jar` | только клиент |
| [Jade](https://modrinth.com/mod/jade) | 11.13.3+forge | `Jade-1.20.1-Forge-11.13.3.jar` | клиент + сервер |
| [JourneyMap](https://modrinth.com/mod/journeymap) | 1.20.1-6.0.7+forge | `journeymap-forge-1.20.1-6.0.7.jar` | клиент + сервер |
| [Just Enough Items](https://modrinth.com/mod/jei) | 15.56.0.205 | `jei-1.20.1-forge-15.56.0.205.jar` | клиент + сервер |
| [Lootr](https://modrinth.com/mod/lootr) | 0.7.35.94 | `lootr-forge-1.20-0.7.35.94.jar` | клиент + сервер |
| [Mouse Tweaks](https://modrinth.com/mod/mouse-tweaks) | 1.20.1-2.25.1-forge | `MouseTweaks-forge-mc1.20.1-2.25.1.jar` | только клиент |
| [Nature's Compass](https://modrinth.com/mod/natures-compass) | 1.20.1-1.12.0-forge | `NaturesCompass-1.20.1-1.12.0-forge.jar` | клиент + сервер |
| [Patchouli](https://modrinth.com/mod/patchouli) | 1.20.1-85-forge | `Patchouli-1.20.1-85-FORGE.jar` | клиент + сервер |
| [Waystones](https://modrinth.com/mod/waystones) | 14.1.21+forge-1.20.1 | `waystones-forge-1.20.1-14.1.21.jar` | клиент + сервер |

### Оптимизация, графика, звук (10)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [AmbientSounds](https://modrinth.com/mod/ambientsounds) | 6.3.11 | `AmbientSounds_FORGE_v6.3.11_mc1.20.1.jar` | только клиент |
| [Clumps](https://modrinth.com/mod/clumps) | 12.0.0.4 | `Clumps-forge-1.20.1-12.0.0.4.jar` | клиент + сервер |
| [Dynamic FPS](https://modrinth.com/mod/dynamic-fps) | 3.11.4 | `dynamic-fps-3.11.4+minecraft-1.20.0-forge.jar` | только клиент |
| [Embeddium](https://modrinth.com/mod/embeddium) | 0.3.31+mc1.20.1 | `embeddium-0.3.31+mc1.20.1.jar` | только клиент |
| [Entity Culling](https://modrinth.com/mod/entityculling) | 1.11.3 | `entityculling-forge-1.11.3-mc1.20.1.jar` | только клиент |
| [FerriteCore](https://modrinth.com/mod/ferrite-core) | 6.0.1 | `ferritecore-6.0.1-forge.jar` | клиент + сервер |
| [ImmediatelyFast](https://modrinth.com/mod/immediatelyfast) | 1.5.5+1.20.4-forge | `ImmediatelyFast-Forge-1.5.5+1.20.4.jar` | только клиент |
| [ModernFix](https://modrinth.com/mod/modernfix) | 5.27.91+mc1.20.1 | `modernfix-forge-5.27.91+mc1.20.1.jar` | клиент + сервер |
| [Oculus](https://modrinth.com/mod/oculus) | 1.20.1-1.8.0 | `oculus-mc1.20.1-1.8.0.jar` | только клиент |
| [Sound Physics Remastered](https://modrinth.com/mod/sound-physics-remastered) | forge-1.20.1-1.5.1 | `sound-physics-remastered-forge-1.20.1-1.5.1.jar` | только клиент |

### Дополнительно (9)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [Almost Unified](https://modrinth.com/mod/almostunified) | 1.20.1-0.11.0+forge | `almostunified-forge-1.20.1-0.11.0.jar` | клиент + сервер |
| [Chunky](https://modrinth.com/mod/chunky) | 1.3.146 | `Chunky-1.3.146.jar` | клиент + сервер |
| [Construction Wand](https://modrinth.com/mod/construction-wand) | 1.20.1-2.11 | `constructionwand-1.20.1-2.11.jar` | клиент + сервер |
| [ElevatorMod](https://modrinth.com/mod/elevatormod) | 1.20.1-1.9.1-forge | `elevatorid-1.20.1-1.9.1-forge.jar` | клиент + сервер |
| [Jade Addons (Neo/Forge)](https://modrinth.com/mod/jade-addons-forge) | 5.5.1+forge | `JadeAddons-1.20.1-Forge-5.5.1.jar` | клиент + сервер |
| [Just Enough Resources](https://modrinth.com/mod/just-enough-resources-jer) | 1.4.0.247 | `JustEnoughResources-1.20.1-1.4.0.247.jar` | клиент + сервер |
| [KubeJS](https://modrinth.com/mod/kubejs) | 2001.6.5-build.26+forge | `kubejs-forge-2001.6.5-build.26.jar` | клиент + сервер |
| [spark](https://modrinth.com/mod/spark) | 1.10.53-forge | `spark-1.10.53-forge.jar` | клиент + сервер |
| [Trash Cans](https://modrinth.com/mod/trash-cans) | 1.1.2-forge-mc1.20.4 | `trashcans-1.1.2-forge-mc1.20.4.jar` | клиент + сервер |

### Библиотека (зависимость) (33)

| Мод | Версия | Файл | Где ставить |
|---|---|---|---|
| [Kotlin for Forge](https://modrinth.com/mod/kotlin-for-forge) | 4.12.0 | `kotlinforforge-4.12.0-all.jar` | клиент + сервер |
| [architectury](https://modrinth.com/mod/architectury-api) | 9.2.14+forge | `architectury-9.2.14-forge.jar` | клиент + сервер |
| [balm](https://modrinth.com/mod/balm) | 7.3.44+forge-1.20.1 | `balm-forge-1.20.1-7.3.44.jar` | клиент + сервер |
| [botarium](https://modrinth.com/mod/botarium) | 2.3.4 | `botarium-forge-1.20.1-2.3.4.jar` | клиент + сервер |
| [brandonscore](https://modrinth.com/mod/brandons-core) | 3.2.1.302 | `BrandonsCore-1.20.1-3.2.1.302-universal.jar` | клиент + сервер |
| [citadel](https://modrinth.com/mod/citadel) | 2.6.3 | `citadel-2.6.3-1.20.1.jar` | клиент + сервер |
| [cloth_config](https://modrinth.com/mod/cloth-config) | 11.1.136+forge | `cloth-config-11.1.136-forge.jar` | клиент + сервер |
| [codechickenlib](https://modrinth.com/mod/codechicken-lib) | 4.4.0.528 | `CodeChickenLib-1.20.1-4.4.0.528-universal.jar` | клиент + сервер |
| [cofh_core](https://modrinth.com/mod/cofh-core) | 11.0.2 | `cofh_core-1.20.1-11.0.2.56.jar` | клиент + сервер |
| [creativecore](https://modrinth.com/mod/creativecore) | 2.12.40 | `CreativeCore_FORGE_v2.12.40_mc1.20.1.jar` | клиент + сервер |
| [curios](https://modrinth.com/mod/curios) | 5.14.1+1.20.1 | `curios-forge-5.14.1+1.20.1.jar` | клиент + сервер |
| [expandability](https://www.curseforge.com/minecraft/mc-mods/expandability/files/5301414) | ExpandAbility [Forge 1.20-1.20.1] v9.0.4 | `expandability-9.0.4.jar` | клиент + сервер |
| [geckolib](https://modrinth.com/mod/geckolib) | 4.8.4 | `geckolib-forge-1.20.1-4.8.4.jar` | клиент + сервер |
| [glodium](https://modrinth.com/mod/glodium) | 1.20-1.5-forge | `Glodium-1.20-1.5-forge.jar` | клиент + сервер |
| [guideme](https://modrinth.com/mod/guideme) | 20.1.15 | `guideme-20.1.15.jar` | клиент + сервер |
| [libipn](https://modrinth.com/mod/libipn) | forge-1.20-4.0.2 | `libIPN-forge-1.20-4.0.2.jar` | только клиент |
| [lionfishapi](https://modrinth.com/mod/lionfish-api) | 3.0 | `lionfishapi-3.0.jar` | клиент + сервер |
| [Power Utilities](https://modrinth.com/mod/power-utilities) | 1.8 | `powerutils-1.8.jar` | клиент + сервер |
| [puzzleslib](https://modrinth.com/mod/puzzles-lib) | 8.1.36 | `PuzzlesLib-v8.1.36-1.20.1-Forge.jar` | клиент + сервер |
| [Quantum Generators](https://modrinth.com/mod/quantum-generators) | 1.7 | `quantumgenerators-1.7.jar` | клиент + сервер |
| [resourcefulconfig](https://modrinth.com/mod/resourceful-config) | 2.1.3 | `resourcefulconfig-forge-1.20.1-2.1.3.jar` | клиент + сервер |
| [resourcefullib](https://modrinth.com/mod/resourceful-lib) | 2.1.29 | `resourcefullib-forge-1.20.1-2.1.29.jar` | клиент + сервер |
| [rhino](https://modrinth.com/mod/rhino) | 2001.2.3-build.10+forge | `rhino-forge-2001.2.3-build.10.jar` | клиент + сервер |
| [searchables](https://modrinth.com/mod/searchables) | 1.0.3 | `Searchables-forge-1.20.1-1.0.3.jar` | только клиент |
| [Simply Quarries](https://modrinth.com/mod/simply-quarries) | 1.7 | `simplyquarries-1.7.jar` | клиент + сервер |
| [sophisticatedcore](https://modrinth.com/mod/sophisticated-core) | 1.20.1-1.5.29.2459 | `sophisticatedcore-1.20.1-1.5.29.2459.jar` | клиент + сервер |
| [structure_gel](https://modrinth.com/mod/structure-gel-api) | 2.16.2 | `structure_gel-1.20.1-2.16.2.jar` | клиент + сервер |
| [supermartijn642configlib](https://modrinth.com/mod/supermartijn642s-config-lib) | 1.1.8-forge-mc1.20 | `supermartijn642configlib-1.1.8-forge-mc1.20.jar` | клиент + сервер |
| [supermartijn642corelib](https://modrinth.com/mod/supermartijn642s-core-lib) | 1.1.26a-forge-mc1.20.1 | `supermartijn642corelib-1.1.26a-forge-mc1.20.1.jar` | клиент + сервер |
| [terrablender](https://modrinth.com/mod/terrablender) | 3.0.1.11 | `TerraBlender-forge-1.20.1-3.0.1.11.jar` | клиент + сервер |
| [titanium](https://modrinth.com/mod/titanium) | 1.20.1-3.8.37 | `titanium-1.20.1-3.8.37.jar` | клиент + сервер |
| [yungsapi](https://modrinth.com/mod/yungs-api) | 1.20-Forge-4.0.6 | `YungsApi-1.20-Forge-4.0.6.jar` | клиент + сервер |
| [zerocore](https://modrinth.com/mod/zerocore) | 1.20.1-2.1.45 | `ZeroCore2-1.20.1-2.1.45.jar` | клиент + сервер |

---

*Файлы модов принадлежат их авторам. Репозиторий приватный и предназначен только для личного использования участниками. Не публикуйте файлы модов в открытом доступе.*
