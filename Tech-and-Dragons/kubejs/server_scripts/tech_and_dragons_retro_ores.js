// Руды в старых чанках.
// Industrial Upgrade раньше убирал всю обычную генерацию руд, поэтому в уже открытых чанках
// нет алмазов, редстоуна, лазурита и почти нет железа/меди/угля/золота. Новые чанки генерируются
// правильно, а этот скрипт понемногу дополняет СТАРЫЕ чанки вокруг игроков (радиус 6 чанков,
// только Верхний мир): по одному чанку за 4 тика. Чанк, где руды уже есть, не трогается.
var TD_RETRO = { tick: 0, queue: [], done: {}, fixed: 0 }
var TD_RETRO_RADIUS = 6

// руда: [обычный вариант, глубинный вариант, жил на чанк, блоков в жиле, yMin, yMax]
var TD_RETRO_ORES = [
  ['minecraft:diamond_ore', 'minecraft:deepslate_diamond_ore', 6, 5, -62, 14],
  ['minecraft:redstone_ore', 'minecraft:deepslate_redstone_ore', 8, 7, -62, 14],
  ['minecraft:lapis_ore', 'minecraft:deepslate_lapis_ore', 3, 6, -32, 32],
  ['minecraft:gold_ore', 'minecraft:deepslate_gold_ore', 3, 8, -62, 30],
  ['minecraft:iron_ore', 'minecraft:deepslate_iron_ore', 10, 8, -24, 72],
  ['minecraft:copper_ore', 'minecraft:deepslate_copper_ore', 8, 9, -16, 100],
  ['minecraft:coal_ore', 'minecraft:deepslate_coal_ore', 10, 10, 0, 140]
]

function tdRetroBlocks() {
  if (TD_RETRO.blocks) return TD_RETRO.blocks
  let HashSet = Java.loadClass('java.util.HashSet')
  let b = { stone: new HashSet(), deep: new HashSet(), marks: new HashSet(), ores: [] }
  let stone = ['minecraft:stone', 'minecraft:granite', 'minecraft:diorite', 'minecraft:andesite']
  let deep = ['minecraft:deepslate', 'minecraft:tuff']
  for (let i = 0; i < stone.length; i++) b.stone.add(Block.getBlock(stone[i]))
  for (let i = 0; i < deep.length; i++) b.deep.add(Block.getBlock(deep[i]))
  // по этим блокам видно, что в чанке уже была обычная генерация руд (или скрипт уже отработал)
  b.marks.add(Block.getBlock('minecraft:deepslate_redstone_ore'))
  b.marks.add(Block.getBlock('minecraft:deepslate_diamond_ore'))
  for (let i = 0; i < TD_RETRO_ORES.length; i++) {
    let o = TD_RETRO_ORES[i]
    b.ores.push({ a: Block.getBlock(o[0]).defaultBlockState(), d: Block.getBlock(o[1]).defaultBlockState(), n: o[2], size: o[3], y0: o[4], y1: o[5] })
  }
  b.mark = Block.getBlock('minecraft:deepslate_redstone_ore').defaultBlockState()
  TD_RETRO.blocks = b
  return b
}

// true — чанк дополнен; false — уже был в порядке или не загружен
function tdRetroChunk(level, cx, cz) {
  let ch = level.getChunkSource().getChunkNow(cx, cz)
  if (!ch) return null
  let B = tdRetroBlocks()
  let secs = ch.getSections(), has = false
  for (let i = 0; i < secs.length && !has; i++) {
    let sec = secs[i]
    if (sec.hasOnlyAir()) continue
    if (sec.maybeHas(s => B.marks.contains(s.getBlock()))) has = true
  }
  if (has) return false
  let minY = level.getMinBuildHeight() + 1
  let x0 = cx << 4, z0 = cz << 4
  let rnd = n => Math.floor(Math.random() * n)
  let placedMark = false
  for (let k = 0; k < B.ores.length; k++) {
    let o = B.ores[k]
    for (let v = 0; v < o.n; v++) {
      let x = rnd(16), z = rnd(16), y = Math.max(minY, o.y0) + rnd(o.y1 - Math.max(minY, o.y0) + 1)
      for (let s = 0; s < o.size; s++) {
        let pos = new BlockPos(x0 + x, y, z0 + z)
        let blk = level.getBlockState(pos).getBlock()
        if (B.stone.contains(blk)) level.setBlock(pos, o.a, 2)
        else if (B.deep.contains(blk)) { level.setBlock(pos, o.d, 2); if (k == 1) placedMark = true }
        let dir = rnd(6)
        if (dir == 0 && x < 15) x++
        else if (dir == 1 && x > 0) x--
        else if (dir == 2 && z < 15) z++
        else if (dir == 3 && z > 0) z--
        else if (dir == 4) y++
        else if (y > minY) y--
      }
    }
  }
  // метка «чанк дополнен»: хотя бы одна глубинная редстоуновая руда
  for (let t = 0; t < 80 && !placedMark; t++) {
    let pos = new BlockPos(x0 + rnd(16), minY + rnd(50), z0 + rnd(16))
    if (B.deep.contains(level.getBlockState(pos).getBlock())) { level.setBlock(pos, B.mark, 2); placedMark = true }
  }
  return true
}
global.tdRetroChunk = tdRetroChunk

ServerEvents.tick(event => {
  TD_RETRO.tick++
  if (TD_RETRO.tick % 4 != 0) return
  let server = event.server
  if (TD_RETRO.queue.length == 0) {
    if (TD_RETRO.tick % 100 != 0) return
    server.players.forEach(p => {
      if (String(p.level.dimension) != 'minecraft:overworld') return
      let pcx = Math.floor(p.x) >> 4, pcz = Math.floor(p.z) >> 4
      for (let r = 0; r <= TD_RETRO_RADIUS; r++) {
        for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) != r) continue
          let key = (pcx + dx) + ',' + (pcz + dz)
          if (!TD_RETRO.done[key]) { TD_RETRO.done[key] = 1; TD_RETRO.queue.push([pcx + dx, pcz + dz]) }
        }
      }
    })
    return
  }
  let c = TD_RETRO.queue.shift()
  try {
    let r = tdRetroChunk(server.overworld(), c[0], c[1])
    if (r === null) delete TD_RETRO.done[c[0] + ',' + c[1]]   // чанк не загружен — попробуем позже
    else if (r) TD_RETRO.fixed++
  } catch (e) {
    console.error('tdRetroChunk ' + c + ': ' + e)
  }
})
