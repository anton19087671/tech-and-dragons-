// Пластинка «Сыновья России — Кто пчёлок уважает» (раздел «Андрей и пчёлки»).
// Звук: kubejs/assets/kubejs/sounds/music/bees_song.ogg — файл кладёт каждый игрок сам
// (в репозиторий не загружается: это чужая песня). Без файла пластинка играет тишину.
// Длина песни в секундах — второе число в .song(...): влияет только на то, когда
// проигрыватель «закончит» и выдаст сигнал компаратору.
StartupEvents.registry('sound_event', event => {
  event.create('music.bees_song')
})
StartupEvents.registry('item', event => {
  event.create('bees_song_disc', 'music_disc')
    .song('kubejs:music.bees_song', 240)
    .analogOutput(15)
    .rarity('rare')
    .maxStackSize(1)
})
