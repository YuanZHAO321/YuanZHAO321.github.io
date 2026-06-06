# 风水计算器 · Feng Shui Calculator

A self-contained, client-side implementation of four Chinese-metaphysics
(玄学) calculators.
reference pages found in the parent folders. **No server or build step** — just
open `FengShuiCalculators.html` in a browser.

## Modules

| Module | 中文 | What it computes |
|---|---|---|
| **Ba Zi** | 八字 / 四柱 | Four Pillars, hidden stems, Ten Gods, Na Yin, 12 life stages, five-element balance, Luck Pillars (大运) |
| **Flying Stars** | 玄空飞星 | Period/base, Mountain (山) & Water (向) star charts, annual star, chart-type classification |
| **Tong Shu** | 通书 | 12 Officers, 28 Constellations, Yellow/Black day-god, Na Yin, solar term, moon phase, zodiac horoscope |
| **Qi Men Dun Jia** | 奇门遁甲 | Hour-based 时家 chart (转盘/拆补法): 局 number, 三奇六仪, 九星, 八门, 八神 across the nine palaces |

## Architecture

```
app/
├── FengShuiCalculators.html          UI: tabbed forms for the 4 calculators
├── css/style.css       styling (matches the original #B93430 red theme)
└── js/
    ├── data.js         constants (stems, branches, Na Yin, mansions, QMDJ tables…)
    ├── astro.js        astronomy/calendar core — the foundation of everything
    ├── bazi.js         Ba Zi module
    ├── flyingstars.js  Xuan Kong Flying Stars module
    ├── tongshu.js      Tong Shu almanac module
    ├── qimen.js        Qi Men Dun Jia module
    └── app.js          UI controller (tabs, forms, rendering)
```

### `astro.js` — the engine

All four modules rest on a shared calendar/astronomy core:

- **Julian Day** conversions (civil ↔ JD/JDN) with timezone offset.
- **Apparent solar longitude** via Meeus' low-precision solar theory (~0.01°),
  including ΔT. This drives **solar terms** and the **month pillar** directly
  (the month branch is read straight from the sun's ecliptic longitude, so 节
  boundaries are exact to the minute).
- **Lunar longitude / phase / illumination** via a truncated Meeus lunar series
  (for the Tong Shu moon data).
- **GanZhi (干支)** for year (立春 boundary), month (五虎遁), day (JDN, 23:00
  day-change), and hour (五鼠遁) pillars.

## Validation

The algorithms were reverse-engineered from the saved reference pages and then
checked against their rendered output:

- **Four Pillars** — 2026-06-06 19:39 (CST) → 年 丙午 / 月 甲午 / 日 辛亥 / 时 戊戌 ✓
- **Tong Shu** — same date → 12 Officers `6 执 Initiate`, 28 Mansions `10 女`,
  Yellow/Black `4 朱雀`, Na Yin `钗钏金`, moon `廿壹 Waning Gibbous ~70%` ✓
- **Flying Stars** — Period 8 facing N2 (子) → every one of the 9 palaces
  (Mountain/Water/Base stars) matches the reference chart exactly ✓

The Qi Men chart is produced with the standard 转盘 时家奇门 method and was
hand-verified for internal consistency (局 selection via 符头/三元, 值符/值使
placement, star/door/god rotation).

## Notes & conventions

- Times are reckoned in a configurable UTC offset, defaulting to **+8 (China
  Standard Time)**, as is traditional for Chinese metaphysics.
- The day pillar advances at **23:00** (late 子时 → next day).
- Hidden stems are listed main-qi (本气) first.
- The moon's western zodiac sign uses tropical ecliptic longitude; near a sign
  boundary it can differ from sources that round differently.
- This is an educational/reference implementation of the underlying algorithms.
