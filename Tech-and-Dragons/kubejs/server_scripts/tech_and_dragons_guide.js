// Tech & Dragons — книга-путеводитель (мод tdguide, Patchouli).
// Выдаётся каждому игроку один раз при первом входе; потерянную можно скрафтить.
const GUIDE_NBT = '{"patchouli:book":"tdguide:guide"}'

// Версия сборки у ХОСТА мира (скрипты выполняются на том компьютере, где лежит мир).
// Если здесь не 1.6.0 — хост не поставил обновление, и руды в старых чанках не появятся.
const TD_PACK_VERSION = '1.6.0'

PlayerEvents.loggedIn(event => {
  const player = event.player
  let guideVer = 'нет'
  try { if (Platform.isLoaded('tdguide')) guideVer = String(Platform.getInfo('tdguide').version) } catch (e) {}
  player.tell(Text.green('Tech & Dragons ' + TD_PACK_VERSION + ' (у хоста мира). Книга: ' + guideVer + '. Руды в старых чанках дополняются сами.'))
  if (player.persistentData.getBoolean('td_guide_given')) return
  player.give(Item.of('patchouli:guide_book', GUIDE_NBT))
  player.persistentData.putBoolean('td_guide_given', true)
  player.tell(Text.gold('Путеводитель Tech & Dragons у вас в инвентаре. Откройте раздел «Путь развития» и идите по шагам.'))
})

ServerEvents.recipes(event => {
  event.shapeless(Item.of('patchouli:guide_book', GUIDE_NBT), ['minecraft:book', 'minecraft:copper_ingot'])
    .id('kubejs:tdguide_book')
})

// Загадочная пластинка: любой маленький цветок + палка
ServerEvents.recipes(event => {
  event.shapeless('kubejs:bees_song_disc', ['#minecraft:small_flowers', 'minecraft:stick']).id('kubejs:bees_song_disc')
})

// Без этого тега проигрыватель (1.20.1) не принимает пластинку
ServerEvents.tags('item', event => {
  event.add('minecraft:music_discs', 'kubejs:bees_song_disc')
})
