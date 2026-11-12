package com.denfop.items;

import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.tags.TagKey;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockState;
import java.util.HashMap;
import java.util.Map;

/** Tech & Dragons: цвета для руд, которых нет в списке Сканера руд IU (все блоки из тега forge:ores + древние обломки). */
public final class TdOreColors {
    private static final TagKey<Block> ORES = TagKey.m_203882_(Registries.f_256747_, new ResourceLocation("forge", "ores"));
    private static final Map<String, Integer> NAMED = new HashMap<>();
    static {
        put("netherite", 110, 66, 50); put("yellorite", 214, 232, 40); put("draconium", 140, 50, 210);
        put("ostrum", 160, 90, 110); put("desh", 222, 128, 60); put("calorite", 190, 40, 70);
        put("fluorite", 120, 190, 230); put("apatite", 70, 160, 210); put("cinnabar", 205, 45, 45);
        put("niter", 235, 235, 210); put("certus_quartz", 180, 210, 250); put("ice_shard", 170, 220, 255);
        put("aquite", 90, 200, 220); put("moonstone", 200, 200, 240); put("pyrope", 220, 60, 90);
        put("charoite", 150, 90, 200); put("diopside", 80, 200, 120); put("horizonite", 240, 140, 40);
        put("falsite", 120, 220, 200); put("ventium", 150, 150, 170); put("galena_iron", 120, 110, 130);
        put("spawner", 255, 40, 40); put("budding_amethyst", 170, 90, 230);
    }
    private static void put(String k, int r, int g, int b) { NAMED.put(k, 0xFF000000 | (r << 16) | (g << 8) | b); }

    private static final String PREFIX = "^(deepslate|nether|end|stone|sand|red_sand|netherrack|endstone|deep|asteroid|overworld|moon|mars|venus|mercury|glacio|everbright|everdawn|callisto|ceres|charon|deimos|dione|enceladus|eris|europa|ganymede|haumea|io|makemake|mimas|miranda|oberon|phobos|pluto|proteus|rhea|tethys|titan|titania|triton|umbriel|ariel)_";

    public static String base(Block block) {
        String path = BuiltInRegistries.f_256975_.m_7981_(block).m_135815_();
        if (path.equals("ancient_debris")) return "netherite";
        String b = path.substring(path.lastIndexOf('/') + 1).replaceAll("_ore$", "").replaceAll("^ore_?", "");
        String prev;
        do { prev = b; b = b.replaceAll(PREFIX, ""); } while (!b.equals(prev));
        return b.isEmpty() ? path : b;
    }

    private static final Map<String, Integer> PRIO = new HashMap<>();
    static {
        String[] top = {"diamond", "netherite", "spawner", "emerald", "ancient_debris", "draconium", "lapis", "quartz", "gold", "redstone", "ostrum", "calorite", "desh", "yellorite", "uranium", "osmium"};
        for (int i = 0; i < top.length; i++) PRIO.put(top[i], 100 - i);
        PRIO.put("coal", 1);
    }
    private static int prio(BlockState s) { Integer p = PRIO.get(base(s.m_60734_())); return p == null ? 10 : p; }

    /** Вместо map.replace в сканере: в одном столбце показываем самую ценную руду, а не самую верхнюю. */
    @SuppressWarnings({"unchecked", "rawtypes"})
    public static Object replace(Map m, Object key, Object value) {
        DataOres old = (DataOres) m.get(key);
        DataOres now = (DataOres) value;
        if (old == null || prio(now.getBlockState()) >= prio(old.getBlockState())) return m.put(key, value);
        return old;
    }

    /** Возвращает цвет руды или -1, если блок не руда. */
    public static int color(BlockState state) {
        Block block = state.m_60734_();
        String id = BuiltInRegistries.f_256975_.m_7981_(block).toString();
        boolean extra = id.equals("minecraft:ancient_debris") || id.equals("minecraft:spawner") || id.equals("minecraft:budding_amethyst");
        if (!extra && !state.m_204336_(ORES)) return -1;
        String key = base(block);
        Integer named = NAMED.get(key);
        if (named != null) return named;
        int h = 0;
        for (int i = 0; i < key.length(); i++) h = (h * 31 + key.charAt(i)) & 0xffff;
        float hue = (h % 360) / 60f, c = 0.75f, x = c * (1 - Math.abs(hue % 2 - 1));
        int seg = (int) hue % 6;
        float[] r = {c, x, 0, 0, x, c}, g = {x, c, c, x, 0, 0}, b = {0, 0, x, c, c, x};
        int R = Math.round((r[seg] + 0.2f) * 255), G = Math.round((g[seg] + 0.2f) * 255), B = Math.round((b[seg] + 0.2f) * 255);
        return 0xFF000000 | (Math.min(R, 255) << 16) | (Math.min(G, 255) << 8) | Math.min(B, 255);
    }
}
