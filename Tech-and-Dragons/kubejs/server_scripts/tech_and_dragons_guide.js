// Tech & Dragons — книга-путеводитель (мод tdguide, Patchouli).
// Выдаётся каждому игроку один раз при первом входе; потерянную можно скрафтить.
const GUIDE_NBT = '{"patchouli:book":"tdguide:guide"}'

PlayerEvents.loggedIn(event => {
  const player = event.player
  if (player.persistentData.getBoolean('td_guide_given')) return
  player.give(Item.of('patchouli:guide_book', GUIDE_NBT))
  player.persistentData.putBoolean('td_guide_given', true)
  player.tell(Text.gold('Путеводитель Tech & Dragons у вас в инвентаре. Начните с раздела «Прохождение».'))
})

ServerEvents.recipes(event => {
  event.shapeless(Item.of('patchouli:guide_book', GUIDE_NBT), ['minecraft:book', 'minecraft:copper_ingot'])
    .id('kubejs:tdguide_book')
})

// Пластинка «Кто пчёлок уважает»: любой маленький цветок + палка
ServerEvents.recipes(event => {
  event.shapeless('kubejs:bees_song_disc', ['#minecraft:small_flowers', 'minecraft:stick']).id('kubejs:bees_song_disc')
})
