// Общий список всех руд сборки (тег forge:ores, сгруппировано по металлу) — для Сканера блоков.
// Сами руды на карте Сканера руд IU добавлены патчем мода (com/denfop/items/TdOreColors).
global.tdOreOrder = ['diamond', 'netherite', 'emerald', 'lapis', 'quartz', 'redstone', 'gold', 'iron', 'copper', 'coal',
  'zinc', 'tin', 'lead', 'osmium', 'uranium', 'nickel', 'silver', 'yellorite', 'draconium', 'certus_quartz', 'fluorite',
  'ostrum', 'desh', 'calorite', 'aluminium', 'iridium', 'platinum', 'titanium', 'tungsten', 'sulfur', 'ruby', 'sapphire']
global.tdOrePrefix = /^(deepslate|nether|end|stone|sand|red_sand|netherrack|endstone|deep|asteroid|overworld|moon|mars|venus|mercury|glacio|everbright|everdawn|callisto|ceres|charon|deimos|dione|enceladus|eris|europa|ganymede|haumea|io|makemake|mimas|miranda|oberon|phobos|pluto|proteus|rhea|tethys|titan|titania|triton|umbriel|ariel)_/
global.tdOreBase = id => {
  let path = String(id).split(':')[1]
  if (path === 'ancient_debris') return { base: 'netherite', plain: true }
  let b = path.split('/').pop().replace(/_ore$/, '').replace(/^ore_?/, '')
  let plain = true
  while (global.tdOrePrefix.test(b)) { b = b.replace(global.tdOrePrefix, ''); plain = false }
  let alias = { bor: 'boron', theoprastite: 'theophrastite' }
  return { base: alias[b] || b || path, plain: plain }
}
global.tdBuildOreGroups = () => {
  let HashSet = Java.loadClass('java.util.HashSet')
  let groups = {}
  Ingredient.of('#forge:ores').getItemIds().forEach(id => {
    id = String(id)
    let ob = global.tdOreBase(id)
    let b = Block.getBlock(id)
    if (!b || String(b.builtInRegistryHolder().key().location()) == 'minecraft:air') return
    let g = groups[ob.base]
    if (!g) g = groups[ob.base] = { key: ob.base, blocks: new HashSet(), first: b, rank: 9 }
    g.blocks.add(b)
    let rank = id.startsWith('minecraft:') && ob.plain ? 0 : ob.plain ? 1 : 5
    if (rank < g.rank) { g.rank = rank; g.first = b }
  })
  let order = global.tdOreOrder
  let list = Object.keys(groups).map(k => groups[k])
  list.sort((a, b) => {
    let ia = order.indexOf(a.key), ib = order.indexOf(b.key)
    if (ia < 0) ia = 999
    if (ib < 0) ib = 999
    return ia != ib ? ia - ib : (a.key < b.key ? -1 : 1)
  })
  return list
}
