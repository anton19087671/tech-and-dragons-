// Сканер блоков: ищет ближайший блок ЛЮБОГО типа (руда, сундук, спавнер, что угодно).
// Логика поиска — kubejs/server_scripts/tech_and_dragons_block_scanner.js
StartupEvents.registry('item', event => {
  event.create('block_scanner')
    .maxStackSize(1)
    .rarity('uncommon')
    .tooltip(Text.gray('Shift+ПКМ по блоку — запомнить, что искать'))
    .tooltip(Text.gray('Блок в левой руке — искать его'))
    .tooltip(Text.gray('ПКМ — найти ближайший (радиус 4 чанка, вся высота)'))
})
