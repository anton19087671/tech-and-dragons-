// Загадочная пластинка. Звук: kubejs/assets/kubejs/sounds/music/bees_song.ogg
// (файл у каждого игрока свой, в репозиторий не загружается).
// Второе число в .song(...) — длина трека в секундах.
StartupEvents.registry('sound_event', event => {
  event.create('music.bees_song')
})
StartupEvents.registry('item', event => {
  event.create('bees_song_disc', 'music_disc')
    .song('kubejs:music.bees_song', 254)
    .analogOutput(15)
    .rarity('rare')
    .maxStackSize(1)
})
