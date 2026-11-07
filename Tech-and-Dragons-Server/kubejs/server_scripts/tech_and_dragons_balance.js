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
})
