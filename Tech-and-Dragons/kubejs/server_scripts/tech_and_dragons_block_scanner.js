// Сканер блоков (kubejs:block_scanner).
// Shift+ПКМ по блоку — запомнить цель. Если в левой руке блок — ищется он.
// ПКМ — ближайший такой блок в радиусе 4 чанков (9×9 чанков), по всей высоте мира.
// Руды ищутся вместе со всеми вариантами (обычная + глубинная + из других модов) по тегу forge:ores/*.
var TD_SCAN_RADIUS = 4

function tdScanTargets(block) {
  // Набор блоков, которые считаем «тем же самым»: сам блок + все руды того же металла
  // (diamond_ore и deepslate_diamond_ore → тег forge:ores/diamond).
  let HashSet = Java.loadClass('java.util.HashSet')
  let TagKey = Java.loadClass('net.minecraft.tags.TagKey')
  let Registries = Java.loadClass('net.minecraft.core.registries.Registries')
  let BR = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
  let RL = Java.loadClass('net.minecraft.resources.ResourceLocation')
  let set = new HashSet()
  set.add(block)
  let path = String(BR.BLOCK.getKey(block).getPath())
  if (path.indexOf('ore') >= 0) {
    let base = path.split('/').pop().replace(/^(deepslate_|nether_|end_|stone_)/, '').replace(/_ore$/, '').replace(/^ore_/, '')
    let opt = BR.BLOCK.getTag(TagKey.create(Registries.BLOCK, new RL('forge', 'ores/' + base)))
    if (opt.isPresent()) {
      let hs = opt.get()
      let inTag = false
      for (let i = 0; i < hs.size(); i++) if (hs.get(i).value() == block) inTag = true
      if (inTag) for (let i = 0; i < hs.size(); i++) set.add(hs.get(i).value())
    }
  }
  return set
}

function tdScan(level, px, py, pz, block) {
  let set = tdScanTargets(block)
  let match = s => set.contains(s.getBlock())
  let cs = level.getChunkSource()
  let pcx = px >> 4, pcz = pz >> 4
  let secs = []
  for (let cx = pcx - TD_SCAN_RADIUS; cx <= pcx + TD_SCAN_RADIUS; cx++) {
    for (let cz = pcz - TD_SCAN_RADIUS; cz <= pcz + TD_SCAN_RADIUS; cz++) {
      let ch = cs.getChunkNow(cx, cz)
      if (!ch) continue
      let arr = ch.getSections()
      for (let i = 0; i < arr.length; i++) {
        let sec = arr[i]
        if (sec.hasOnlyAir()) continue
        if (!sec.maybeHas(s => match(s))) continue
        let sy = ch.getSectionYFromSectionIndex(i) << 4
        // минимальное расстояние от игрока до этой секции
        let bx = cx << 4, bz = cz << 4
        let dx = Math.max(bx - px, 0, px - (bx + 15)), dy = Math.max(sy - py, 0, py - (sy + 15)), dz = Math.max(bz - pz, 0, pz - (bz + 15))
        secs.push({ sec: sec, x: bx, y: sy, z: bz, d: dx * dx + dy * dy + dz * dz })
      }
    }
  }
  secs.sort((a, b) => a.d - b.d)
  let best = null, bestD = 1e18, found = 0
  for (let k = 0; k < secs.length; k++) {
    let e = secs[k]
    if (e.d > bestD) break
    for (let y = 0; y < 16; y++) for (let z = 0; z < 16; z++) for (let x = 0; x < 16; x++) {
      if (!match(e.sec.getBlockState(x, y, z))) continue
      found++
      let wx = e.x + x, wy = e.y + y, wz = e.z + z
      let d = (wx - px) * (wx - px) + (wy - py) * (wy - py) + (wz - pz) * (wz - pz)
      if (d < bestD) { bestD = d; best = [wx, wy, wz] }
    }
  }
  return best ? { pos: best, dist: Math.sqrt(bestD), sections: secs.length } : null
}

function tdDir(dx, dz) {
  if (Math.abs(dx) < 1 && Math.abs(dz) < 1) return 'прямо здесь'
  let a = Math.atan2(dx, -dz) * 180 / Math.PI   // 0 = север (−Z), 90 = восток (+X)
  let names = ['север', 'северо-восток', 'восток', 'юго-восток', 'юг', 'юго-запад', 'запад', 'северо-запад']
  return names[Math.round(((a + 360) % 360) / 45) % 8]
}

global.tdScan = tdScan

BlockEvents.rightClicked(event => {
  let { player, item, block } = event
  if (item.id != 'kubejs:block_scanner' || !player.isShiftKeyDown()) return
  item.getOrCreateTag().putString('td_target', String(block.id))
  player.tell(Text.gold('Сканер запомнил: ').append(Text.translate(block.blockState.getBlock().getDescriptionId()).yellow()))
  event.cancel()
})

ItemEvents.rightClicked('kubejs:block_scanner', event => {
  let { player, item, level } = event
  if (player.isShiftKeyDown()) return
  let BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
  let block = null
  let off = player.getOffhandItem()
  if (!off.isEmpty() && off.getItem() instanceof BlockItem) block = off.getItem().getBlock()
  if (!block) {
    let tag = item.getTag()
    if (tag && tag.contains('td_target')) block = Block.getBlock(tag.getString('td_target'))
  }
  if (!block) {
    player.tell(Text.red('Сначала выберите, что искать: Shift+ПКМ сканером по блоку или возьмите блок в левую руку.'))
    return
  }
  let px = Math.floor(player.x), py = Math.floor(player.y), pz = Math.floor(player.z)
  let name = Text.translate(block.getDescriptionId()).yellow()
  let r = tdScan(level, px, py, pz, block)
  player.getCooldowns().addCooldown(item.getItem(), 40)
  if (!r) {
    player.tell(Text.gold('Не найдено: ').append(name).append(Text.gray(' (радиус 4 чанка вокруг вас).')))
    return
  }
  let [x, y, z] = r.pos
  let dy = y - py
  let h = dy > 0 ? ('выше на ' + dy) : dy < 0 ? ('ниже на ' + (-dy)) : 'на вашем уровне'
  player.tell(Text.gold('Ближайший ').append(name).append(Text.gold(': ')).append(Text.white(x + ' ' + y + ' ' + z))
    .append(Text.gray(' — ' + Math.round(r.dist) + ' бл., ' + tdDir(x - px, z - pz) + ', ' + h)))
})

ServerEvents.recipes(event => {
  event.shaped('kubejs:block_scanner', [' R ', 'ICI', ' I '], { R: 'minecraft:redstone', I: 'minecraft:iron_ingot', C: 'minecraft:compass' })
    .id('kubejs:block_scanner')
})
