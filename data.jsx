/* ============ Content data ============ */
const PROFILE = {
  name_en: "Yuan Zhao",
  name_cn: "赵元",
  role_en: "Earth Sciences Undergraduate",
  role_cn: "地球科学本科生",
  school_en: "The University of Manchester",
  school_cn: "曼彻斯特大学",
  year_en: "Second-year",
  year_cn: "大二",
  location: "Manchester, UK",
  location_cn: "英国 · 曼彻斯特",
  email: "",
  github: "https://github.com/YuanZHAO321",
};

const TYPED_LINES = [
  "Earth & Planetary Science · Energy & Resources",
  "I move between the outcrop and the terminal window.",
  "野外与终端之间，来回。",
  "Currently: fourteen days in Scotland, reading Caledonian structure.",
];

const SKILLS = [
  {
    title_en: "Field & Lab",
    title_cn: "野外 / 实验",
    items: [
      ["Geological mapping", "地质填图", 4],
      ["Structural geology · stereonet", "构造地质 · 赤平投影", 4],
      ["Sedimentary logging", "沉积剖面", 4],
      ["Field navigation · compass · Strike/Dip", "野外导航 · 罗盘 · 产状测量", 4],
      ["Wilderness survival & outdoor skills", "野外生存与户外技能", 4],
      ["Thin section analysis", "薄片分析", 3],
      ["Chemical lab techniques", "化学实验技术", 3],
      ["Field photography & documentation", "野外摄影与记录", 3],
    ],
  },
  {
    title_en: "Computation & Data",
    title_cn: "计算 / 数据",
    items: [
      ["Python (NumPy, Pandas, APIs)", "Python · 科学计算 / 自动化", 4],
      ["Linux · CLI · remote server", "Linux · 命令行 · 远程服务器", 4],
      ["HTML / CSS / JavaScript", "Web 开发", 4],
      ["ArcGIS Pro / ArcGIS Online", "ArcGIS", 3],
      ["Remote sensing", "卫星遥感", 3],
      ["GeoMapApp", "GeoMapApp", 3],
      ["LaTeX", "LaTeX", 3],
      ["MATLAB", "MATLAB", 2],
    ],
  },
  {
    title_en: "Communication",
    title_cn: "表达",
    items: [
      ["Technical writing (EN / 中)", "中英学术写作", 4],
      ["Scientific illustration & cartography", "科学图示 · 地图制作", 4],
      ["Photography (landscape · architecture)", "摄影 · 风景 / 建筑", 3],
      ["Public speaking", "学术演讲", 3],
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    title_en: "Oceanic Heat Loss & Seafloor Depth vs. Crustal Age",
    title_cn: "海洋热损失与洋壳年龄—水深关系",
    year: "2025–26",
    type: "Tutorial project",
    type_cn: "导师课程项目",
    summary_en:
      "A data-driven scientific report investigating how Earth's interior heat loss governs ocean basin geometry. Generated cross-section datasets using GeoMapApp across the East Pacific Rise, Mid-Atlantic Ridge and Reykjanes Ridge, then tested Parsons–Sclater (1977), Parsons–McKenzie (1978) and Stein–Stein (1992) subsidence models against observed depth–age trends using log-linearisation in Excel and Python. Awarded an Upper Second-class mark.",
    summary_cn:
      "探究地球内部热损失如何控制洋盆形态的数据驱动科学报告。通过 GeoMapApp 在东太平洋隆、中大西洋脊和雷克雅内斯脊提取剖面数据集，使用对数线性化方法检验 Parsons–Sclater (1977)、Parsons–McKenzie (1978) 与 Stein–Stein (1992) 沉降模型与观测深度—年龄趋势的拟合程度。获得二等一成绩。",
    tags: ["Geophysics", "GeoMapApp", "Python", "Heat flow", "Subsidence models"],
    preview: "depth–age cross-sections · log-linear model fitting",
  },
  {
    num: "02",
    title_en: "Titanium Mine Expansion: Geological & Environmental Impact Assessment",
    title_cn: "钛矿扩建：地质与环境影响评估",
    year: "2025",
    type: "Economic geology report",
    type_cn: "经济地质报告",
    summary_en:
      "A consultant-style report for a simulated South African titanium placer mine expansion, covering exploration techniques (geophysics, drilling, remote sensing), a graphical market analysis of titanium supply chains and critical raw material status, and a colour-coded risk matrix of economic, environmental and societal impacts with mitigation strategies. Awarded a First-class mark.",
    summary_cn:
      "模拟南非钛砂矿扩建项目的顾问式报告，涵盖勘探技术（地球物理、钻探、遥感）、钛供应链图形化市场分析及关键原材料评估，以及经济、环境与社会影响的色码风险矩阵与缓解策略。获得一等成绩。",
    tags: ["Economic geology", "Environmental impact", "Remote sensing", "Market analysis"],
    preview: "risk matrix · market analysis · exploration assessment",
  },
  {
    num: "03",
    title_en: "Acid Rock Drainage at Mam Tor: Water Quality Assessment",
    title_cn: "Mam Tor 酸性岩石排水与水质评估",
    year: "2024",
    type: "Field report",
    type_cn: "野外报告",
    summary_en:
      "A scientific field report assessing the extent to which acid rock drainage (ARD) affects water quality around Mam Tor, Derbyshire. Combined field water sampling with geological context — Carboniferous shales and Coal Measures — to interpret pH, conductivity and metal ion distributions across the catchment. Awarded an Upper Second-class mark.",
    summary_cn:
      "评估德比郡 Mam Tor 地区酸性岩石排水对水质影响程度的野外科学报告。结合野外水样采集与地质背景——石炭系页岩和煤系地层——解释流域内 pH 值、电导率与金属离子分布规律。获得二等一成绩。",
    tags: ["Hydrogeology", "Field sampling", "ARD", "Geochemistry", "Carboniferous"],
    preview: "water chemistry profiles · geological map",
  },
  {
    num: "04",
    title_en: "Scotland Advanced Field Course — Fort William & Dundee",
    title_cn: "苏格兰高级野外实习 · Fort William & Dundee",
    year: "2026",
    type: "Field course",
    type_cn: "野外实习",
    summary_en:
      "A 14-day advanced field course across two contrasting Scottish terranes. The first week in Fort William focused on Caledonian metamorphic and structural geology; the second week in Dundee examined Devonian sedimentary sequences and landscape evolution. Skills applied: geological mapping, structural measurement, sedimentary logging, field photography and daily field notebook documentation.",
    summary_cn:
      "为期 14 天的高级野外实习，跨越苏格兰两个对比鲜明的地体。Fort William 一周聚焦加里东期变质与构造地质；Dundee 一周研究泥盆系沉积序列与地貌演化。综合运用地质填图、构造测量、沉积剖面、野外摄影与日志记录等技能。",
    tags: ["Field mapping", "Metamorphic geology", "Structural geology", "Sedimentology", "Scotland"],
    preview: "geological maps · field notebooks · structural analysis",
  },
];

const EXPERIENCE = [
  // 暂无正式经历条目，待填充
];

const WRITING = [
  {
    date: "2026 · 04",
    title_en: "那时候你还不知道",
    title_cn: "那时候你还不知道",
    subtitle_en: "Scotland field course · Spring 2026",
    url: "writing/field-2026.html",
  },
];

const LINKS = [
  { name: "GitHub", handle: "@YuanZHAO321", url: "https://github.com/YuanZHAO321" },
  { name: "GitHub Pages", handle: "yuanzhao321.github.io", url: "https://yuanzhao321.github.io" },
  { name: "UoM Profile", handle: "personalpages.manchester.ac.uk", url: "https://personalpages.manchester.ac.uk/student/yuan.zhao-8/" },
];

window.PROFILE = PROFILE;
window.TYPED_LINES = TYPED_LINES;
window.SKILLS = SKILLS;
window.PROJECTS = PROJECTS;
window.EXPERIENCE = EXPERIENCE;
window.WRITING = WRITING;
window.LINKS = LINKS;
