// Tech & Dragons — книга-путеводитель (мод tdguide, Patchouli).
// Выдаётся каждому игроку один раз при первом входе; потерянную можно скрафтить.
const GUIDE_NBT = '{"patchouli:book":"tdguide:guide"}'

PlayerEvents.loggedIn(event => {
  const player = event.player
  if (player.persistentData.getBoolean('td_guide_given')) return
  player.give(Item.of('patchouli:guide_book', GUIDE_NBT))
  player.persistentData.putBoolean('td_guide_given', true)
  player.tell(Text.gold('Путеводитель Tech & Dragons у вас в инвентаре. Начните с раздела «Путь развития».'))
})

ServerEvents.recipes(event => {
  event.shapeless(Item.of('patchouli:guide_book', GUIDE_NBT), ['minecraft:book', 'minecraft:copper_ingot'])
    .id('kubejs:tdguide_book')
})
