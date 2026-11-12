// Сканер блоков (kubejs:block_scanner).
// Shift+ПКМ в воздух — листать список ВСЕХ руд сборки (алмазы, незерит, лазурит, кварц, моды...).
// Shift+ПКМ по блоку — запомнить любой блок. Если в левой руке блок — ищется он.
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

function tdScan(level, px, py, pz, block, givenSet) {
  let set = givenSet || tdScanTargets(block)
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

// ---- список всех руд сборки (строится при первом использовании, когда теги уже загружены)
// Все руды из тега forge:ores, сгруппированные по металлу: обычная, глубинная, адская, с планет и астероидов — одна группа.
var TD_ORE_ORDER = ['diamond', 'netherite', 'emerald', 'lapis', 'quartz', 'redstone', 'gold', 'iron', 'copper', 'coal',
  'zinc', 'tin', 'lead', 'osmium', 'uranium', 'nickel', 'silver', 'yellorite', 'draconium', 'certus_quartz', 'fluorite',
  'ostrum', 'desh', 'calorite', 'aluminium', 'iridium', 'platinum', 'titanium', 'tungsten', 'sulfur', 'ruby', 'sapphire']
var TD_ORE_PREFIX = /^(deepslate|nether|end|stone|sand|red_sand|netherrack|endstone|deep|asteroid|overworld|moon|mars|venus|mercury|glacio|everbright|everdawn|callisto|ceres|charon|deimos|dione|enceladus|eris|europa|ganymede|haumea|io|makemake|mimas|miranda|oberon|phobos|pluto|proteus|rhea|tethys|titan|titania|triton|umbriel|ariel)_/
var TD_ORE_ALIAS = { bor: 'boron', theoprastite: 'theophrastite' }
function tdOreBase(id) {
  let path = id.split(':')[1]
  if (path === 'ancient_debris') return { base: 'netherite', plain: true }
  let b = path.split('/').pop().replace(/_ore$/, '').replace(/^ore_?/, '')
  let plain = true
  while (TD_ORE_PREFIX.test(b)) { b = b.replace(TD_ORE_PREFIX, ''); plain = false }
  return { base: TD_ORE_ALIAS[b] || b || path, plain: plain }
}
function tdOreGroups() {
  if (global.tdOres) return global.tdOres
  let HashSet = Java.loadClass('java.util.HashSet')
  let groups = {}
  Ingredient.of('#forge:ores').getItemIds().forEach(id => {
    id = String(id)
    let ob = tdOreBase(id)
    let b = Block.getBlock(id)
    if (!b || String(b.builtInRegistryHolder().key().location()) == 'minecraft:air') return
    let g = groups[ob.base]
    if (!g) g = groups[ob.base] = { key: ob.base, blocks: new HashSet(), first: b, rank: 9 }
    g.blocks.add(b)
    let rank = id.startsWith('minecraft:') && ob.plain ? 0 : ob.plain ? 1 : 5
    if (rank < g.rank) { g.rank = rank; g.first = b }
  })
  let list = Object.keys(groups).map(k => groups[k])
  list.sort((a, b) => {
    let ia = TD_ORE_ORDER.indexOf(a.key), ib = TD_ORE_ORDER.indexOf(b.key)
    if (ia < 0) ia = 999
    if (ib < 0) ib = 999
    return ia != ib ? ia - ib : (a.key < b.key ? -1 : 1)
  })
  global.tdOres = list
  return list
}
global.tdOreGroups = tdOreGroups
function tdOreByKey(key) { let l = tdOreGroups(); for (let i = 0; i < l.length; i++) if (l[i].key == key) return { g: l[i], i: i }; return null }

// Поиск и сообщение в чат
function tdRunScan(player, level, block, set) {
  let px = Math.floor(player.x), py = Math.floor(player.y), pz = Math.floor(player.z)
  let name = Text.translate(block.getDescriptionId()).yellow()
  let r = tdScan(level, px, py, pz, block, set)
  if (!r) {
    player.tell(Text.gold('Не найдено: ').append(name).append(Text.gray(' (радиус 4 чанка вокруг вас).')))
    return
  }
  let x = r.pos[0], y = r.pos[1], z = r.pos[2]
  let dy = y - py
  let h = dy > 0 ? ('выше на ' + dy) : dy < 0 ? ('ниже на ' + (-dy)) : 'на вашем уровне'
  player.tell(Text.gold('Ближайший ').append(name).append(Text.gold(': ')).append(Text.white(x + ' ' + y + ' ' + z))
    .append(Text.gray(' — ' + Math.round(r.dist) + ' бл., ' + tdDir(x - px, z - pz) + ', ' + h)))
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
  item.getOrCreateTag().putString('td_target', String(block.id)); item.getOrCreateTag().remove('td_ore')
  player.tell(Text.gold('Сканер запомнил: ').append(Text.translate(block.blockState.getBlock().getDescriptionId()).yellow()))
  event.cancel()
})

ItemEvents.rightClicked('kubejs:block_scanner', event => {
  let { player, item, level } = event
  let tag = item.getOrCreateTag()
  let ores = tdOreGroups()
  if (player.isShiftKeyDown()) {
    // Shift+ПКМ в воздух — следующая руда из списка всех руд сборки
    let cur = tag.contains('td_ore') ? tdOreByKey(tag.getString('td_ore')) : null
    let i = cur ? (cur.i + 1) % ores.length : 0
    tag.putString('td_ore', ores[i].key); tag.remove('td_target')
    player.tell(Text.gold('Сканер ищет: ').append(Text.translate(ores[i].first.getDescriptionId()).yellow())
      .append(Text.gray('  (' + (i + 1) + ' из ' + ores.length + '; Shift+ПКМ — дальше, или команда /scan ' + ores[i].key + ')')))
    return
  }
  let BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
  let block = null, set = null
  let off = player.getOffhandItem()
  if (!off.isEmpty() && off.getItem() instanceof BlockItem) block = off.getItem().getBlock()
  if (!block && tag.contains('td_target')) block = Block.getBlock(tag.getString('td_target'))
  if (!block && tag.contains('td_ore')) { let f = tdOreByKey(tag.getString('td_ore')); if (f) { block = f.g.first; set = f.g.blocks } }
  if (!block) {
    player.tell(Text.red('Выберите, что искать: Shift+ПКМ в воздух — листать руды, команда /scan <руда>, Shift+ПКМ по блоку — любой блок, или блок в левой руке.'))
    return
  }
  player.getCooldowns().addCooldown(item.getItem(), 40)
  tdRunScan(player, level, block, set)
})

// Команда /scan <руда> — выбрать руду по названию (Tab подсказывает все руды) и сразу искать.
ServerEvents.commandRegistry(event => {
  let { commands: Commands } = event
  let SAT = Java.loadClass('com.mojang.brigadier.arguments.StringArgumentType')
  let SSP = Java.loadClass('net.minecraft.commands.SharedSuggestionProvider')
  event.register(Commands.literal('scan')
    .executes(ctx => {
      let p = ctx.source.getPlayerOrException()
      let l = tdOreGroups()
      p.tell(Text.gold('Руды для /scan (' + l.length + '): ').append(Text.gray(l.map(g => g.key).join(', '))))
      return 1
    })
    .then(Commands.argument('ore', SAT.word())
      .suggests((ctx, builder) => SSP.suggest(tdOreGroups().map(g => g.key), builder))
      .executes(ctx => {
        let p = ctx.source.getPlayerOrException()
        let key = String(SAT.getString(ctx, 'ore'))
        let f = tdOreByKey(key)
        if (!f) { p.tell(Text.red('Нет такой руды: ' + key + '. Наберите /scan и нажмите Tab.')); return 0 }
        let main = p.getMainHandItem()
        if (String(main.getItem().builtInRegistryHolder().key().location()) == 'kubejs:block_scanner') {
          main.getOrCreateTag().putString('td_ore', key); main.getOrCreateTag().remove('td_target')
        }
        tdRunScan(p, p.level(), f.g.first, f.g.blocks)
        return 1
      })))
})

ServerEvents.recipes(event => {
  event.shaped('kubejs:block_scanner', [' R ', 'ICI', ' I '], { R: 'minecraft:redstone', I: 'minecraft:iron_ingot', C: 'minecraft:compass' })
    .id('kubejs:block_scanner')
})
