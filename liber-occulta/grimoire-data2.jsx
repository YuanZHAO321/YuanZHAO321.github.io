// 第二批数据 — 用于真正可用的法术书
// 全部来自公共领域文献：Agrippa《三书》、Crowley《777》、Golden Dawn材料、Picatrix等

window.GRIMOIRE_DATA2 = {
  // 行星时辰统御序列 (迦勒底序) — 用于行星时计算
  // 从日落或日出开始，每天第一小时由当日守护行星统治
  chaldean: ["saturn", "jupiter", "mars", "sol", "venus", "mercury", "luna"],
  // 七天的守护行星 — 周一=月,二=火,三=水,四=木,五=金,六=土,日=日
  // 索引 0..6 对应 周日..周六
  weekdayRulers: ["sol", "luna", "mars", "mercury", "jupiter", "venus", "saturn"],

  // Agrippa行星对应：草药、香料、宝石、金属（取自Three Books of Occult Philosophy 公共领域）
  planetCorr: {
    saturn:  { herbs: "黑藜芦、莨菪、毒堇、罂粟、紫杉", incense: "没药、苏合香、乳香之树脂沉者", stones: "黑曜石、缟玛瑙、玄武岩、铅", animals: "鼹鼠、蟾蜍、乌鸦、夜鸺", color: "黑、深褐", angel: "Cassiel · 卡西尔" },
    jupiter: { herbs: "白藜芦、薄荷、胭脂草、鼠尾草", incense: "雪松、芦荟木、肉豆蔻", stones: "蓝宝石、绿松石、紫水晶、青金石", animals: "鹰、鹿、麋", color: "深蓝、紫", angel: "Sachiel · 萨基尔" },
    mars:    { herbs: "山萝卜、艾草、芥、辣根", incense: "龙血、烟草、阿魏", stones: "红宝石、血石、磁石、碧玉", animals: "狼、马、秃鹫", color: "朱红、铁锈", angel: "Samael · 萨麦尔" },
    sol:     { herbs: "向日葵、月桂、藏红花、白屈菜、迷迭香", incense: "乳香、肉桂、檀香", stones: "黄玉、金刚石、琥珀", animals: "狮、公鸡、隼、天鹅", color: "金、橘、深黄", angel: "Michael · 米迦勒" },
    venus:   { herbs: "玫瑰、桃金娘、马鞭草、香豌豆", incense: "玫瑰、安息香、檀香", stones: "祖母绿、蓝铜矿、珊瑚", animals: "鸽、麻雀、鹿", color: "翠绿、铜青、玫粉", angel: "Anael · 安那尔" },
    mercury: { herbs: "马鞭草、莳萝、肉豆蔻、缬草", incense: "藏红花、肉桂、薰陆香", stones: "玛瑙、蛋白石、水晶", animals: "猿、鹤、朱鹭", color: "杂色、橙黄", angel: "Raphael · 拉斐尔" },
    luna:    { herbs: "白杨、月见草、莴苣、罂粟、椰菜", incense: "白檀、樟脑、茉莉", stones: "月长石、珍珠、银矿", animals: "猫、鹿、母牛、青蛙", color: "银、白、银灰", angel: "Gabriel · 加百列" },
  },

  // 22 希伯来字母 + 完整 Golden Dawn 大阿卡纳对应
  // Crowley《777》体系
  hebrewLetters: [
    { he: "א", name: "Aleph",  zh: "阿列夫", value: 1,   path: 11, tarot: "0 · 愚者",       attribution: "气元素 🜁",  sound: "‘" },
    { he: "ב", name: "Beth",   zh: "贝特",   value: 2,   path: 12, tarot: "I · 魔术师",      attribution: "水星 ☿",     sound: "B/V" },
    { he: "ג", name: "Gimel",  zh: "吉梅尔", value: 3,   path: 13, tarot: "II · 女祭司",     attribution: "月亮 ☽",      sound: "G" },
    { he: "ד", name: "Daleth", zh: "达莱特", value: 4,   path: 14, tarot: "III · 皇后",      attribution: "金星 ♀",      sound: "D" },
    { he: "ה", name: "Heh",    zh: "黑",     value: 5,   path: 15, tarot: "IV · 皇帝(★)",    attribution: "白羊 ♈",     sound: "H" },
    { he: "ו", name: "Vav",    zh: "瓦夫",   value: 6,   path: 16, tarot: "V · 教皇",        attribution: "金牛 ♉",     sound: "V/W" },
    { he: "ז", name: "Zayin",  zh: "扎因",   value: 7,   path: 17, tarot: "VI · 恋人",       attribution: "双子 ♊",     sound: "Z" },
    { he: "ח", name: "Cheth",  zh: "海特",   value: 8,   path: 18, tarot: "VII · 战车",      attribution: "巨蟹 ♋",     sound: "Ḥ" },
    { he: "ט", name: "Teth",   zh: "泰特",   value: 9,   path: 19, tarot: "XI · 力量(欲望)", attribution: "狮子 ♌",     sound: "Ṭ" },
    { he: "י", name: "Yod",    zh: "幽德",   value: 10,  path: 20, tarot: "IX · 隐者",       attribution: "处女 ♍",     sound: "Y/I" },
    { he: "כ", name: "Kaph",   zh: "卡夫",   value: 20,  path: 21, tarot: "X · 命运之轮",    attribution: "木星 ♃",      sound: "K" },
    { he: "ל", name: "Lamed",  zh: "拉梅德", value: 30,  path: 22, tarot: "VIII · 正义(调整)",attribution: "天秤 ♎",    sound: "L" },
    { he: "מ", name: "Mem",    zh: "梅姆",   value: 40,  path: 23, tarot: "XII · 倒吊人",    attribution: "水元素 🜄",  sound: "M" },
    { he: "נ", name: "Nun",    zh: "嫩",     value: 50,  path: 24, tarot: "XIII · 死神",     attribution: "天蝎 ♏",     sound: "N" },
    { he: "ס", name: "Samekh", zh: "撒美克", value: 60,  path: 25, tarot: "XIV · 节制(艺术)",attribution: "射手 ♐",    sound: "S" },
    { he: "ע", name: "Ayin",   zh: "阿因",   value: 70,  path: 26, tarot: "XV · 恶魔",       attribution: "摩羯 ♑",     sound: "‘" },
    { he: "פ", name: "Peh",    zh: "佩",     value: 80,  path: 27, tarot: "XVI · 塔",        attribution: "火星 ♂",      sound: "P/F" },
    { he: "צ", name: "Tzaddi", zh: "察迪",   value: 90,  path: 28, tarot: "XVII · 星(★)",   attribution: "宝瓶 ♒",     sound: "Ts" },
    { he: "ק", name: "Qoph",   zh: "库夫",   value: 100, path: 29, tarot: "XVIII · 月",      attribution: "双鱼 ♓",     sound: "Q" },
    { he: "ר", name: "Resh",   zh: "雷什",   value: 200, path: 30, tarot: "XIX · 太阳",      attribution: "太阳 ☉",      sound: "R" },
    { he: "ש", name: "Shin",   zh: "什",     value: 300, path: 31, tarot: "XX · 审判(永世)", attribution: "火/灵 🜂",   sound: "Sh" },
    { he: "ת", name: "Tav",    zh: "塔夫",   value: 400, path: 32, tarot: "XXI · 世界",      attribution: "土星/土 ♄/🜃",sound: "T/Th" },
  ],

  // 12 黄道宫
  zodiac: [
    { sign: "白羊", latin: "Aries",       glyph: "♈", element: "火", quality: "本位", ruler: "♂", from: "3.21", to: "4.19", angel: "Malchidael", he: "טלה" },
    { sign: "金牛", latin: "Taurus",      glyph: "♉", element: "土", quality: "固定", ruler: "♀", from: "4.20", to: "5.20", angel: "Asmodel",    he: "שור" },
    { sign: "双子", latin: "Gemini",      glyph: "♊", element: "气", quality: "变动", ruler: "☿", from: "5.21", to: "6.21", angel: "Ambriel",    he: "תאומים" },
    { sign: "巨蟹", latin: "Cancer",      glyph: "♋", element: "水", quality: "本位", ruler: "☽", from: "6.22", to: "7.22", angel: "Muriel",     he: "סרטן" },
    { sign: "狮子", latin: "Leo",         glyph: "♌", element: "火", quality: "固定", ruler: "☉", from: "7.23", to: "8.22", angel: "Verchiel",   he: "אריה" },
    { sign: "处女", latin: "Virgo",       glyph: "♍", element: "土", quality: "变动", ruler: "☿", from: "8.23", to: "9.22", angel: "Hamaliel",   he: "בתולה" },
    { sign: "天秤", latin: "Libra",       glyph: "♎", element: "气", quality: "本位", ruler: "♀", from: "9.23", to:"10.22", angel: "Zuriel",     he: "מאזנים" },
    { sign: "天蝎", latin: "Scorpio",     glyph: "♏", element: "水", quality: "固定", ruler: "♂", from:"10.23", to:"11.21", angel: "Barbiel",    he: "עקרב" },
    { sign: "射手", latin: "Sagittarius", glyph: "♐", element: "火", quality: "变动", ruler: "♃", from:"11.22", to:"12.21", angel: "Adnachiel",  he: "קשת" },
    { sign: "摩羯", latin: "Capricorn",   glyph: "♑", element: "土", quality: "本位", ruler: "♄", from:"12.22", to: "1.19", angel: "Hanael",     he: "גדי" },
    { sign: "宝瓶", latin: "Aquarius",    glyph: "♒", element: "气", quality: "固定", ruler: "♄", from: "1.20", to: "2.18", angel: "Cambiel",    he: "דלי" },
    { sign: "双鱼", latin: "Pisces",      glyph: "♓", element: "水", quality: "变动", ruler: "♃", from: "2.19", to: "3.20", angel: "Amnitziel",  he: "דגים" },
  ],

  // 黄金黎明的"小六芒星仪式" (LBRP) 节录式提纲，公共领域
  lbrp: [
    { step: "1", title: "卡巴拉十字", desc: "面东方，触额诵 Atah；触胸诵 Malkuth；触右肩诵 Ve-Geburah；触左肩诵 Ve-Gedulah；合掌于胸前诵 Le-Olam, Amen。" },
    { step: "2", title: "东·气", desc: "以剑或指划黄色驱散五芒星，对准星心诵神名 YHVH (יהוה) 振铃式发声。" },
    { step: "3", title: "南·火", desc: "面南，划朱红五芒星，诵 ADNI (אדני, Adonai)。" },
    { step: "4", title: "西·水", desc: "面西，划青五芒星，诵 AHIH (אהיה, Eheieh)。" },
    { step: "5", title: "北·土", desc: "面北，划深绿五芒星，诵 AGLA (אגלא)。" },
    { step: "6", title: "召请大天使", desc: "回东方，伸臂为十字。前·Raphael，后·Gabriel，右·Michael，左·Auriel；周遭燃焰，星照其上。" },
    { step: "7", title: "结尾·重复卡巴拉十字", desc: "如步骤一，封印仪式。" },
  ],

  // VITRIOL — 七元素隐语
  vitriol: [
    { l: "V", lat: "Visita",       zh: "游历" },
    { l: "I", lat: "Interiora",    zh: "内里" },
    { l: "T", lat: "Terrae",       zh: "于地" },
    { l: "R", lat: "Rectificando", zh: "纠正之" },
    { l: "I", lat: "Invenies",     zh: "汝将得" },
    { l: "O", lat: "Occultum",     zh: "隐藏之" },
    { l: "L", lat: "Lapidem",      zh: "石。" },
  ],

  // 行星时阶段名称
  hourLabels: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"],
};
