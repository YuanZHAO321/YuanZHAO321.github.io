// 真实神秘学语料 — 来自公共领域的经典文本
// 所罗门小钥匙、赫密士主义、行星魔法、炼金术、卡巴拉生命之树

const GRIMOIRE_DATA = {
  // 章节目录
  liber: [
    {
      id: "praefatio",
      number: "0",
      latin: "PRAEFATIO",
      title: "卷首",
      sub: "Codex Cyberneticus",
      kind: "frontispiece",
    },
    {
      id: "septem-planetae",
      number: "I",
      latin: "DE SEPTEM PLANETIS",
      title: "七曜论",
      sub: "古典七星之印",
      kind: "planets",
    },
    {
      id: "elementa",
      number: "II",
      latin: "DE QVATTVOR ELEMENTIS",
      title: "四元素",
      sub: "土水气火",
      kind: "elements",
    },
    {
      id: "tabula-smaragdina",
      number: "III",
      latin: "TABVLA SMARAGDINA",
      title: "翠玉录",
      sub: "Hermes Trismegistus",
      kind: "emerald",
    },
    {
      id: "arbor-vitae",
      number: "IV",
      latin: "ARBOR VITAE",
      title: "生命之树",
      sub: "十质点 · 二十二径",
      kind: "tree",
    },
    {
      id: "goetia",
      number: "V",
      latin: "ARS GOETIA",
      title: "所罗门七十二灵",
      sub: "Lemegeton — Liber Primus",
      kind: "goetia",
    },
    {
      id: "arcana",
      number: "VI",
      latin: "ARCANA MAIORA",
      title: "大阿卡纳",
      sub: "二十二张大牌",
      kind: "tarot",
    },
    {
      id: "alchemia",
      number: "VII",
      latin: "OPVS MAGNVM",
      title: "炼金大业",
      sub: "黑化 · 白化 · 红化",
      kind: "alchemy",
    },
    {
      id: "invocatio",
      number: "VIII",
      latin: "INVOCATIO",
      title: "召唤台",
      sub: "Sigillum ex Nomine",
      kind: "summoner",
    },
  ],

  // 古典七星 — 行星、金属、日、希伯来名、性格、印记符号
  planets: [
    { id: "saturn",  glyph: "♄", latin: "Saturnus",  zh: "土星", metal: "铅",   day: "土曜",   hebrew: "שבתאי",  intel: "Agiel",     spirit: "Zazel",     hue: 270, color: "#6e6a8a", numerus: 3, square: 9,
      virtus: "时间、限制、纪律、终结。", cautio: "不可与浮躁之事相召。" },
    { id: "jupiter", glyph: "♃", latin: "Iuppiter",  zh: "木星", metal: "锡",   day: "木曜",   hebrew: "צדק",   intel: "Iophiel",   spirit: "Hismael",   hue: 60, color: "#c8a04a", numerus: 4, square: 16,
      virtus: "扩张、慷慨、君权、合法。", cautio: "不可贪滥，过则成腐。" },
    { id: "mars",    glyph: "♂", latin: "Mars",      zh: "火星", metal: "铁",   day: "火曜",   hebrew: "מאדים",  intel: "Graphiel",  spirit: "Bartzabel", hue: 25, color: "#a23a2c", numerus: 5, square: 25,
      virtus: "战斗、勇气、外科、切割。", cautio: "血气过盛者勿近。" },
    { id: "sol",     glyph: "☉", latin: "Sol",       zh: "太阳", metal: "金",   day: "日曜",   hebrew: "שמש",   intel: "Nakhiel",   spirit: "Sorath",    hue: 75, color: "#d8b347", numerus: 6, square: 36,
      virtus: "中心、王权、健康、辉光。", cautio: "正午勿直视其印。" },
    { id: "venus",   glyph: "♀", latin: "Venus",     zh: "金星", metal: "铜",   day: "金曜",   hebrew: "נוגה",   intel: "Hagiel",    spirit: "Kedemel",   hue: 150, color: "#5fa888", numerus: 7, square: 49,
      virtus: "和合、艺术、丰饶、爱欲。", cautio: "勿用于挟人意志。" },
    { id: "mercury", glyph: "☿", latin: "Mercurius", zh: "水星", metal: "汞",   day: "水曜",   hebrew: "כוכב",   intel: "Tiriel",    spirit: "Taphthartharath", hue: 195, color: "#5a8aa6", numerus: 8, square: 64,
      virtus: "信使、词语、商贸、巧术。", cautio: "言辞之印，反噬最易。" },
    { id: "luna",    glyph: "☽", latin: "Luna",      zh: "月亮", metal: "银",   day: "月曜",   hebrew: "לבנה",  intel: "Malka",     spirit: "Hasmodai",  hue: 220, color: "#9aa6c2", numerus: 9, square: 81,
      virtus: "梦境、潮汐、孕育、阴影。", cautio: "新月与蚀时勿召。" },
  ],

  // 四元素
  elements: [
    { id: "terra",  glyph: "🜃", latin: "Terra",  zh: "土", quality: "冷·干", direction: "北", color: "#6b5a3a", archangel: "Auriel",  hebrew: "ארץ" },
    { id: "aqua",   glyph: "🜄", latin: "Aqua",   zh: "水", quality: "冷·湿", direction: "西", color: "#4f7a8a", archangel: "Gabriel", hebrew: "מים" },
    { id: "aer",    glyph: "🜁", latin: "Aer",    zh: "气", quality: "热·湿", direction: "东", color: "#a8a48a", archangel: "Raphael", hebrew: "רוח" },
    { id: "ignis",  glyph: "🜂", latin: "Ignis",  zh: "火", quality: "热·干", direction: "南", color: "#c25a3a", archangel: "Michael", hebrew: "אש" },
  ],

  // 翠玉录全文（公共领域，传说为赫密士所书；此处采Newton英译之常见中译节录）
  emerald: [
    "真实不虚，确凿无疑，最真之实。",
    "下者如同上者，上者如同下者；以此成就独一之奇迹。",
    "万物本于独一，经独一之冥思而生；故万物皆由此独一，经化育而出。",
    "其父为日，其母为月；风承之于其腹，地为之乳母。",
    "此乃举世之全能之父。其能完整，若化为地。",
    "汝当以巧分土于火，分细于粗，缓而精审。",
    "其升自地而至天，复降于地，纳上下之力。",
    "由此汝得举世之荣耀；一切晦暗将自汝远遁。",
    "此为强中之强，能胜万物精微，能透坚固之物。",
    "世界既如此造。由此万象奇变，皆依此道。",
    "故吾名曰赫密士·三重伟大者，备具三部之哲学。",
    "凡吾所言关于太阳之造作者，至此尽矣。",
  ],

  // 卡巴拉生命之树 十质点
  sephiroth: [
    { n: 1,  he: "כתר",     latin: "Kether",    zh: "王冠",   meaning: "至高之冠", color: "#f4ede0" },
    { n: 2,  he: "חכמה",    latin: "Chokmah",   zh: "智慧",   meaning: "原始男性",  color: "#7a8aa6" },
    { n: 3,  he: "בינה",    latin: "Binah",     zh: "理解",   meaning: "原始女性",  color: "#3a3a4a" },
    { n: 4,  he: "חסד",     latin: "Chesed",    zh: "慈悲",   meaning: "扩展之爱",  color: "#4a78a4" },
    { n: 5,  he: "גבורה",   latin: "Geburah",   zh: "严厉",   meaning: "正义之火",  color: "#a23a2c" },
    { n: 6,  he: "תפארת",  latin: "Tiphareth", zh: "美",     meaning: "和谐中心",  color: "#d8b347" },
    { n: 7,  he: "נצח",     latin: "Netzach",   zh: "胜利",   meaning: "情感",      color: "#5fa888" },
    { n: 8,  he: "הוד",     latin: "Hod",       zh: "辉煌",   meaning: "理智",      color: "#c87a3a" },
    { n: 9,  he: "יסוד",    latin: "Yesod",     zh: "基础",   meaning: "潜意识",    color: "#9aa6c2" },
    { n: 10, he: "מלכות",   latin: "Malkuth",   zh: "王国",   meaning: "物质界",    color: "#6b5a3a" },
  ],

  // 所罗门72灵 — 节选12位主要灵
  goetia: [
    { rank: 1,  name: "BAEL",      title: "国王",   legions: 66, zh: "巴尔",     domain: "隐身之术，统御东方",          appearance: "三首：猫·人·蟾蜍" },
    { rank: 2,  name: "AGARES",    title: "公爵",   legions: 31, zh: "阿加雷斯", domain: "教授语言，使逃者归来",        appearance: "骑鳄之老者，臂立鹰" },
    { rank: 3,  name: "VASSAGO",   title: "君主",   legions: 26, zh: "瓦沙克",   domain: "言过去与未来，寻失物",        appearance: "性温和，与巴尔同等" },
    { rank: 4,  name: "SAMIGINA",  title: "侯爵",   legions: 30, zh: "萨米基纳", domain: "教文艺，召死者之魂",          appearance: "小马或驴，声嘶哑" },
    { rank: 5,  name: "MARBAS",    title: "总裁",   legions: 36, zh: "玛巴斯",   domain: "揭隐秘，治愈疾病，授机巧",    appearance: "大狮，应召化人" },
    { rank: 6,  name: "VALEFOR",   title: "公爵",   legions: 10, zh: "瓦勒佛",   domain: "亲善但教人盗术",              appearance: "狮身驴首" },
    { rank: 9,  name: "PAIMON",    title: "国王",   legions: 200,zh: "派蒙",     domain: "授一切艺术与隐秘之学",        appearance: "戴冠男子骑骆驼" },
    { rank: 27, name: "RONOVE",    title: "侯爵伯爵",legions: 19,zh: "罗诺夫",   domain: "授修辞、语言学与仆从",        appearance: "持杖之异兽" },
    { rank: 32, name: "ASMODAY",   title: "国王",   legions: 72, zh: "阿斯莫德", domain: "授算术、几何、天文、机械",    appearance: "三首：牛·人·羊，足如鹅" },
    { rank: 45, name: "VINE",      title: "国王伯爵",legions: 36,zh: "拜恩",     domain: "揭巫术，识隐者，造塔倾墙",    appearance: "狮持蛇骑黑马" },
    { rank: 56, name: "GREMORY",   title: "公爵",   legions: 26, zh: "格莫瑞",   domain: "言过去现在未来，寻宝藏",      appearance: "骑骆驼之美妇人" },
    { rank: 72, name: "ANDROMALIUS",title: "伯爵",  legions: 36, zh: "安杜马利", domain: "擒贼追赃，惩处不义",          appearance: "持大蛇之男子" },
  ],

  // 大阿卡纳22张
  arcana: [
    { n: 0,   roman: "0",     latin: "Stultus",        zh: "愚者",       hebrew: "א", letter: "Aleph",  planet: "♅" },
    { n: 1,   roman: "I",     latin: "Magus",          zh: "魔术师",     hebrew: "ב", letter: "Beth",   planet: "☿" },
    { n: 2,   roman: "II",    latin: "Sacerdotissa",   zh: "女祭司",     hebrew: "ג", letter: "Gimel",  planet: "☽" },
    { n: 3,   roman: "III",   latin: "Imperatrix",     zh: "皇后",       hebrew: "ד", letter: "Daleth", planet: "♀" },
    { n: 4,   roman: "IV",    latin: "Imperator",      zh: "皇帝",       hebrew: "ה", letter: "Heh",    planet: "♈" },
    { n: 5,   roman: "V",     latin: "Hierophanta",    zh: "教皇",       hebrew: "ו", letter: "Vav",    planet: "♉" },
    { n: 6,   roman: "VI",    latin: "Amantes",        zh: "恋人",       hebrew: "ז", letter: "Zayin",  planet: "♊" },
    { n: 7,   roman: "VII",   latin: "Currus",         zh: "战车",       hebrew: "ח", letter: "Cheth",  planet: "♋" },
    { n: 8,   roman: "VIII",  latin: "Iustitia",       zh: "正义",       hebrew: "ל", letter: "Lamed",  planet: "♎" },
    { n: 9,   roman: "IX",    latin: "Eremita",        zh: "隐者",       hebrew: "י", letter: "Yod",    planet: "♍" },
    { n: 10,  roman: "X",     latin: "Rota Fortunae",  zh: "命运之轮",   hebrew: "כ", letter: "Kaph",   planet: "♃" },
    { n: 11,  roman: "XI",    latin: "Fortitudo",      zh: "力量",       hebrew: "ט", letter: "Teth",   planet: "♌" },
    { n: 12,  roman: "XII",   latin: "Suspensus",      zh: "倒吊人",     hebrew: "מ", letter: "Mem",    planet: "🜄" },
    { n: 13,  roman: "XIII",  latin: "Mors",           zh: "死神",       hebrew: "נ", letter: "Nun",    planet: "♏" },
    { n: 14,  roman: "XIV",   latin: "Temperantia",    zh: "节制",       hebrew: "ס", letter: "Samekh", planet: "♐" },
    { n: 15,  roman: "XV",    latin: "Diabolus",       zh: "恶魔",       hebrew: "ע", letter: "Ayin",   planet: "♑" },
    { n: 16,  roman: "XVI",   latin: "Turris",         zh: "塔",         hebrew: "פ", letter: "Peh",    planet: "♂" },
    { n: 17,  roman: "XVII",  latin: "Stellae",        zh: "星",         hebrew: "צ", letter: "Tzaddi", planet: "♒" },
    { n: 18,  roman: "XVIII", latin: "Luna",           zh: "月",         hebrew: "ק", letter: "Qoph",   planet: "♓" },
    { n: 19,  roman: "XIX",   latin: "Sol",            zh: "太阳",       hebrew: "ר", letter: "Resh",   planet: "☉" },
    { n: 20,  roman: "XX",    latin: "Iudicium",       zh: "审判",       hebrew: "ש", letter: "Shin",   planet: "🜂" },
    { n: 21,  roman: "XXI",   latin: "Mundus",         zh: "世界",       hebrew: "ת", letter: "Tav",    planet: "♄" },
  ],

  // 炼金大业三阶段
  alchemy: [
    { id: "nigredo",  latin: "NIGREDO",  zh: "黑化", color: "#0f0e0c", phase: "腐败 · 溶解",  motto: "Solve",      desc: "原质之死。物在沉降中显其本相。", glyph: "🜔" },
    { id: "albedo",   latin: "ALBEDO",   zh: "白化", color: "#cfc7b4", phase: "净化 · 升华",  motto: "Purifica",   desc: "灵魂自身洗濯，灰中浮白。",       glyph: "☽" },
    { id: "citrinitas",latin:"CITRINITAS",zh: "黄化", color: "#c8a04a", phase: "破晓 · 显照",  motto: "Illumina",   desc: "黎明之金；常并入红化。",         glyph: "☉" },
    { id: "rubedo",   latin: "RUBEDO",   zh: "红化", color: "#9b2a1a", phase: "完成 · 凝合",  motto: "Coagula",    desc: "贤者之石。神圣婚姻。",           glyph: "🜍" },
  ],
};

window.GRIMOIRE_DATA = GRIMOIRE_DATA;
