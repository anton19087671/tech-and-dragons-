// Tech & Dragons — Balanced Edition: прогрессия
// Меняются только "ворота" между этапами, остальные рецепты модов не трогаются.

ServerEvents.recipes(event => {
  // Этап 5: Draconic Evolution открывается после космоса.
  // Ядро дракония: золото заменено на остриум (Марс, ракета 2-го уровня).
  event.replaceInput({ id: 'draconicevolution:components/draconium_core' }, '#forge:ingots/gold', 'ad_astra:ostrum_ingot')
  // Ядро слияния (Fusion Crafting): алмазы заменены на калоритовые пластины (Венера, ракета 3-го уровня).
  event.replaceInput({ id: 'draconicevolution:machines/crafting_core' }, '#forge:gems/diamond', 'ad_astra:calorite_plate')

  // Этап 4: реакторы Extreme Reactors требуют схем Mekanism.
  event.replaceInput({ id: /^bigreactors:reactor\/basic\/controller_.*/ }, '#forge:gems/diamond', '#forge:circuits/advanced')
  event.replaceInput({ id: /^bigreactors:reactor\/reinforced\/controller_.*/ }, '#forge:storage_blocks/diamond', '#forge:circuits/elite')
  event.replaceInput({ id: 'bigreactors:turbine/reinforced/controller' }, '#forge:storage_blocks/diamond', '#forge:circuits/elite')

  // Беспроводная энергия Flux Networks — только после элитных схем.
  event.replaceInput({ id: 'fluxnetworks:fluxcore' }, 'minecraft:ender_eye', '#forge:circuits/elite')
  // Андезит редкий (Terralith и BOP вытеснили его из генерации).
  // Андезитовый сплав можно делать и из обычного камня: булыжник в печи → камень.
  event.shaped('create:andesite_alloy', ['NS', 'SN'], { S: 'minecraft:stone', N: '#forge:nuggets/iron' }).id('kubejs:andesite_alloy_from_stone')
  event.shaped('create:andesite_alloy', ['NS', 'SN'], { S: 'minecraft:stone', N: '#forge:nuggets/zinc' }).id('kubejs:andesite_alloy_from_stone_zinc')
  event.custom({ type: 'create:mixing', ingredients: [{ item: 'minecraft:stone' }, { tag: 'forge:nuggets/iron' }], results: [{ item: 'create:andesite_alloy' }] }).id('kubejs:mixing/andesite_alloy_from_stone')
  event.custom({ type: 'create:mixing', ingredients: [{ item: 'minecraft:stone' }, { tag: 'forge:nuggets/zinc' }], results: [{ item: 'create:andesite_alloy' }] }).id('kubejs:mixing/andesite_alloy_from_stone_zinc')
})
