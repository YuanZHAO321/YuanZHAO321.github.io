// 真实可用的法术书各章节页

const D = window.GRIMOIRE_DATA;
const D2 = window.GRIMOIRE_DATA2;

// 共享：章节首页
function ChapterTitle({ liber, latin, zh, sub }) {
  return (
    <div className="ch-title">
      <div className="ch-liber">— LIBER · {liber} —</div>
      <div className="ch-latin">{latin}</div>
      <h1 className="ch-zh">{zh}</h1>
      {sub && <div className="ch-sub">{sub}</div>}
      <HeaderBand width={520} height={28}/>
    </div>
  );
}

// 共享：边注
function Margin({ children }) {
  return <aside className="margin-note"><MarginalRule/>{children}</aside>;
}

// 0 · 卷首
function PageFront() {
  return (
    <div className="folio folio-front">
      <div className="front-overline">EX · ANTIQVIS · FONTIBVS</div>
      <h1 className="front-title">神秘学法术书</h1>
      <div className="front-latin">Liber Occvltæ Sapientiæ</div>
      <div className="front-sub">— 据公共领域之古典文献辑成 · 在线读本 —</div>
      <div className="front-piece"><Frontispiece size={360}/></div>
      <div className="front-byline">
        <div className="bl-row">据 Hermes Trismegistus · Cornelius Agrippa</div>
        <div className="bl-row">Athanasius Kircher · Eliphas Lévi</div>
        <div className="bl-row">S. L. MacGregor Mathers · Aleister Crowley</div>
        <div className="bl-row">Israel Regardie · 等家所传之文</div>
      </div>
      <ChapterRule glyph="❦"/>
      <p className="front-note">
        本书所辑，皆已入公共领域之西方神秘学传统文献。其中所及之祈祷、印记、对应表，
        乃为 <em>研读、记诵与历史参考</em> 之用。诸君读之，宜以审慎之心、独立之判断为之。
      </p>
    </div>
  );
}

// I · 翠玉录 — 移到首位，因其为整个传统的根基
function PageEmerald() {
  return (
    <div className="folio">
      <ChapterTitle liber="I" latin="Tabvla Smaragdina" zh="翠玉录" sub="Hermetis Trismegisti — 据 Newton 译本中译"/>
      <div className="emerald-attr">
        <em>传为</em> <strong>Hermes Trismegistus</strong>（赫密士·三重伟大者）所书，
        埃及—希腊化神秘传统之根基文献。十二节短句，构成西方一切炼金、占星、魔法之纲领。
      </div>
      <ol className="verse-list">
        {D.emerald.map((line, i) => (
          <li key={i}>
            <span className="v-n">{String(i+1).padStart(2,"0")}</span>
            <span className="v-t"><DropCap letter={line[0]} size={i===0?64:0}/>{i===0?line.slice(1):line}</span>
          </li>
        ))}
      </ol>
      <ChapterRule glyph="✦"/>
      <h3 className="sub-h">VITRIOL · 七字隐语</h3>
      <div className="vitriol-grid">
        {D2.vitriol.map((v, i) => (
          <div key={i} className="vit-cell">
            <div className="vit-letter">{v.l}</div>
            <div className="vit-lat"><em>{v.lat}</em></div>
            <div className="vit-zh">{v.zh}</div>
          </div>
        ))}
      </div>
      <p className="vit-trans">"游历地之内里，纠正之，汝将得隐藏之石。"——黄金黎明 · 内殿训。</p>
    </div>
  );
}

// II · 七曜
function PagePlanets() {
  const [sel, setSel] = React.useState(D.planets[3]);
  const corr = D2.planetCorr[sel.id];
  return (
    <div className="folio">
      <ChapterTitle liber="II" latin="De Septem Planetis" zh="七曜论" sub="行星之德、印记、对应"/>
      <p className="lead">
        <DropCap letter="七" size={88}/><em>曜</em>者，古典占星与魔法之根本。
        日月并五星，统辖人间之时序、金属、草木、宝石、香料、神圣之名。
        Agrippa《三书》记其德、其仪、其阶。下表所录，皆据其卷一卷二，并参以黄金黎明之系统。
      </p>

      <div className="planet-tabs">
        {D.planets.map(p => (
          <button key={p.id} className={"pt " + (sel.id===p.id?"on":"")} onClick={()=>setSel(p)}>
            <span className="pt-g" style={{color:p.color}}>{p.glyph}</span>
            <span className="pt-z">{p.zh}</span>
          </button>
        ))}
      </div>

      <div className="planet-detail">
        <div className="pd-head">
          <div className="pd-glyph" style={{color:sel.color}}>{sel.glyph}</div>
          <div>
            <div className="pd-zh">{sel.zh}</div>
            <em className="pd-lat">{sel.latin}</em>
            <div className="pd-day">{sel.day} · {sel.metal}</div>
          </div>
          <div className="pd-sigil">
            <PlanetSigil planet={sel.id} size={140} stroke="var(--ink)"/>
          </div>
        </div>

        <div className="pd-cols">
          <div>
            <h3 className="sub-h">主司 · Virtus</h3>
            <p>{sel.virtus}</p>
            <h3 className="sub-h">戒 · Cautio</h3>
            <p className="rubric-text">{sel.cautio}</p>
            <h3 className="sub-h">守护大天使</h3>
            <p>{corr.angel}</p>
          </div>
          <div>
            <h3 className="sub-h">对应表 · Correspondentiæ</h3>
            <table className="corr-tbl">
              <tbody>
                <tr><th>金属</th><td>{sel.metal}</td></tr>
                <tr><th>颜色</th><td>{corr.color}</td></tr>
                <tr><th>香料</th><td>{corr.incense}</td></tr>
                <tr><th>草木</th><td>{corr.herbs}</td></tr>
                <tr><th>宝石</th><td>{corr.stones}</td></tr>
                <tr><th>动物</th><td>{corr.animals}</td></tr>
                <tr><th>智者</th><td className="mono">{sel.intel}</td></tr>
                <tr><th>魂灵</th><td className="mono">{sel.spirit}</td></tr>
                <tr><th>希伯来</th><td className="hebrew">{sel.hebrew}</td></tr>
                <tr><th>数序</th><td>{sel.numerus} · 魔方阵 {sel.numerus}×{sel.numerus}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pd-kamea">
          <h3 className="sub-h center">魔方阵 · Quadratum {sel.zh}</h3>
          <div className="kamea-row">
            <div className="kamea-pane">
              <KameaGrid planet={sel.id} size={280} color="var(--ink)"/>
              <div className="caption">魔方阵 · 横竖斜数和恒为 {(sel.numerus*(sel.numerus**2+1))/2}</div>
            </div>
            <div className="kamea-pane">
              <PlanetSigil planet={sel.id} size={260} stroke="var(--rubric)"/>
              <div className="caption">行星印记 · 由 1 至 {sel.square} 在魔方阵上连线</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// III · 行星时
function PageHours() {
  return (
    <div className="folio">
      <ChapterTitle liber="III" latin="Horæ Planetariæ" zh="行星时" sub="迦勒底序 · 日昼夜各分十二"/>
      <p className="lead">
        <DropCap letter="行" size={88}/><em>星时</em>者，自日出至日落分为十二等份谓之"昼时"，自日落至次日日出分为十二等份谓之"夜时"，
        每时由一行星按 <em>迦勒底序</em>（土·木·火·日·金·水·月）轮值。当日第一昼时由当日守护行星统治
        ——故周日始于太阳，周一始于月亮，依此推。择时行事，宜与所求之事性质相合。
      </p>
      <Margin>
        <strong>例</strong>：欲行金钱、贸易、文书之事，择水星时；欲行情爱、艺事、和合，择金星时；
        欲行勇决、对抗、外科，择火星时；欲求律法、扩张、慈悲，择木星时。
      </Margin>
      <PlanetaryHours/>
    </div>
  );
}

// IV · 四元素
function PageElements() {
  return (
    <div className="folio">
      <ChapterTitle liber="IV" latin="De Qvattvor Elementis" zh="四元素与精气" sub="土·水·气·火 + 第五元素"/>
      <p className="lead">
        <DropCap letter="自" size={88}/>恩培多克勒以下，西方传统以四元素为物之根本：
        <em> 土 </em>主稳固，<em> 水 </em>主流变，<em> 气 </em>主散布，<em> 火 </em>主转化。
        四者两两组合冷热干湿四性。第五者曰 <em>Azoth · 精气</em>，为四元素之贯通。
      </p>
      <table className="el-table">
        <thead><tr><th>元素</th><th>拉丁</th><th>性质</th><th>方位</th><th>大天使</th><th>希伯来</th><th>颜色</th></tr></thead>
        <tbody>
          {D.elements.map(el => (
            <tr key={el.id}>
              <td><span style={{color:el.color, fontSize:"1.4em"}}>{el.glyph}</span> {el.zh}</td>
              <td><em>{el.latin}</em></td>
              <td>{el.quality}</td>
              <td>{el.direction}方</td>
              <td>{el.archangel}</td>
              <td className="hebrew">{el.hebrew}</td>
              <td>{el.color}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Margin>
        <strong>炼金术之记号</strong>：火🜂 = 上正三角；气🜁 = 上正三角加横线；水🜄 = 下倒三角；土🜃 = 下倒三角加横线。
        横线即"地"——气因尘而显，土因水之离去而成。
      </Margin>
    </div>
  );
}

// V · 生命之树
function PageTree() {
  const [hi, setHi] = React.useState(5);
  return (
    <div className="folio">
      <ChapterTitle liber="V" latin="Arbor Vitæ" zh="生命之树" sub="十质点 · 二十二径 · 卡巴拉之骨"/>
      <p className="lead">
        <DropCap letter="生" size={88}/><em>命之树</em>，犹太卡巴拉之核心图式。
        十质点（Sephiroth）为神之十重显化，从顶端 Kether（王冠）向下流溢至底部 Malkuth（王国）。
        其间二十二径，与希伯来字母一一对应——亦即塔罗大阿卡纳之路径。
      </p>
      <div className="tree-row">
        <div className="tree-svg"><TreeOfLife size={420} color="var(--ink)" highlight={hi}/></div>
        <div>
          <h3 className="sub-h">十质点 · Sephiroth</h3>
          <table className="seph-tbl">
            <tbody>
              {D.sephiroth.map((s, i) => (
                <tr key={i} className={hi===i?"on":""} onMouseEnter={()=>setHi(i)}>
                  <td className="rubric-text">{s.n}</td>
                  <td className="hebrew">{s.he}</td>
                  <td><em>{s.latin}</em></td>
                  <td>{s.zh}</td>
                  <td className="dim">{s.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// VI · 希伯来字母 + 大阿卡纳
function PageLetters() {
  return (
    <div className="folio">
      <ChapterTitle liber="VI" latin="Litteræ Hebraicæ et Arcana" zh="希伯来字母 与 大阿卡纳" sub="据 Crowley《777》及黄金黎明对应"/>
      <p className="lead">
        <DropCap letter="二" size={88}/><em>十二字母</em>，据《Sefer Yetzirah》(创造之书)分为：
        <em>三母字</em>（Aleph气·Mem水·Shin火）、
        <em>七复字</em>（对应七行星）、
        <em>十二单字</em>（对应黄道十二宫）。其与塔罗大阿卡纳之配对，乃黄金黎明传统之核心。
      </p>
      <table className="hebrew-tbl">
        <thead><tr><th>字</th><th>名</th><th>中</th><th>数</th><th>径</th><th>对应</th><th>大阿卡纳</th></tr></thead>
        <tbody>
          {D2.hebrewLetters.map(l => (
            <tr key={l.he}>
              <td className="hebrew big">{l.he}</td>
              <td><em>{l.name}</em></td>
              <td>{l.zh}</td>
              <td className="mono">{l.value}</td>
              <td className="mono dim">{l.path}</td>
              <td>{l.attribution}</td>
              <td className="rubric-text">{l.tarot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// VII · 黄道十二宫
function PageZodiac() {
  return (
    <div className="folio">
      <ChapterTitle liber="VII" latin="Zodiacvs" zh="黄道十二宫" sub="元素·性质·守护·大天使"/>
      <p className="lead">
        <DropCap letter="十" size={88}/><em>二宫</em>者，黄道带平分，每宫三十度。
        三正（本位·固定·变动）与四元素相错合而成十二，每宫各有守护行星与大天使。
      </p>
      <div className="zodiac-grid">
        {D2.zodiac.map(z => (
          <div key={z.sign} className="z-card">
            <div className="z-glyph">{z.glyph}</div>
            <div className="z-name">{z.sign}</div>
            <em className="z-lat">{z.latin}</em>
            <div className="z-meta">
              <div><span>元素</span> {z.element}</div>
              <div><span>性质</span> {z.quality}</div>
              <div><span>守护</span> {z.ruler}</div>
              <div><span>日期</span> {z.from}–{z.to}</div>
              <div><span>天使</span> {z.angel}</div>
              <div><span>希伯来</span> <span className="hebrew">{z.he}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// VIII · 所罗门72灵 (节录)
function PageGoetia() {
  const [sel, setSel] = React.useState(0);
  const cur = D.goetia[sel];
  return (
    <div className="folio">
      <ChapterTitle liber="VIII" latin="Ars Goetia" zh="所罗门七十二灵" sub="Lemegeton · Liber Primus · 节录"/>
      <p className="lead">
        <DropCap letter="此" size={88}/>节录《所罗门小钥匙》第一卷十二位代表性灵之记述。
        Mathers 与 Crowley 之译本（1904）已入公共领域。
        所列形貌、统辖、军团数皆出自原典；所附印记为程序化几何重绘，非复印原图。
      </p>
      <div className="goetia-warning">
        <strong>戒</strong>：原典属仪式魔法之一支，其法严，其禁多。在不解其哲学背景与防护体系前，
        不可贸然依其文字操作。本节作 <em>历史与文献</em> 之参考。
      </div>
      <div className="goe-row">
        <div className="goe-list">
          {D.goetia.map((g, i) => (
            <button key={i} className={"goe-item " + (sel===i?"on":"")} onClick={()=>setSel(i)}>
              <span className="goe-r">{String(g.rank).padStart(2,"0")}</span>
              <span className="goe-n"><strong>{g.name}</strong> · {g.zh}</span>
              <span className="goe-t">{g.title}</span>
            </button>
          ))}
        </div>
        <div className="goe-detail">
          <div className="goe-d-rank">N° {cur.rank} / 72 · {cur.legions} 军团</div>
          <h2 className="goe-d-name">{cur.name}</h2>
          <div className="goe-d-zh">{cur.zh} · {cur.title}</div>
          <div className="goe-d-sigil"><GoetiaSigil rank={cur.rank} name={cur.name} size={200} color="var(--ink)"/></div>
          <h3 className="sub-h">主司 · Dominium</h3>
          <p>{cur.domain}</p>
          <h3 className="sub-h">显现 · Forma</h3>
          <p>{cur.appearance}</p>
        </div>
      </div>
    </div>
  );
}

// IX · 黄金黎明 · 小六芒星仪式
function PageRitual() {
  return (
    <div className="folio">
      <ChapterTitle liber="IX" latin="Ritus Pentagrammi Minor" zh="小五芒星驱散仪" sub="Lesser Banishing Ritual of the Pentagram · LBRP"/>
      <p className="lead">
        <DropCap letter="小" size={88}/><em>五芒星驱散仪</em>，黄金黎明初阶必修，为日常清场与定心之仪。
        Israel Regardie《The Golden Dawn》(1937, 已入公共领域之版本) 完整记录。下为提纲。
      </p>
      <Margin>
        <strong>所需</strong>：安静之处一隅；可有可无之短刀或仪式剑；面东方而立。
        振铃式（vibration）发声：胸腔共鸣，缓慢、明晰。
      </Margin>
      <ol className="ritual-list">
        {D2.lbrp.map(s => (
          <li key={s.step}>
            <div className="rit-h"><span className="rit-n">{s.step}</span><strong>{s.title}</strong></div>
            <div className="rit-d">{s.desc}</div>
          </li>
        ))}
      </ol>
      <div className="rit-names">
        <h3 className="sub-h">四方神名 · 振铃发声</h3>
        <div className="names-grid">
          <div><span className="hebrew big">יהוה</span><div className="nm">YHVH · 东 · 气</div></div>
          <div><span className="hebrew big">אדני</span><div className="nm">Adonai · 南 · 火</div></div>
          <div><span className="hebrew big">אהיה</span><div className="nm">Eheieh · 西 · 水</div></div>
          <div><span className="hebrew big">אגלא</span><div className="nm">AGLA · 北 · 土</div></div>
        </div>
      </div>
    </div>
  );
}

// X · 塔罗工具
function PageTarot() {
  return (
    <div className="folio">
      <ChapterTitle liber="X" latin="Liber Tarot" zh="塔罗" sub="二十二大阿卡纳 · 抽牌"/>
      <p className="lead">
        <DropCap letter="塔" size={88}/><em>罗</em>之大阿卡纳二十二张，与希伯来二十二字母一一相系，
        合为生命之树之二十二径。下方为抽牌工具，所抽即与卷六之字母对应表互查。
      </p>
      <TarotDraw/>
    </div>
  );
}

// XI · 炼金大业
function PageAlchemia() {
  return (
    <div className="folio">
      <ChapterTitle liber="XI" latin="Opvs Magnvm" zh="炼金大业" sub="Solve et Coagula · 三阶段四色"/>
      <p className="lead">
        <DropCap letter="炼" size={88}/><em>金大业</em>非以铅为金之事，而是灵魂之化变。
        <em>溶解 · 凝合</em>（Solve et Coagula）为其总纲。中世纪以来分四色阶段。
      </p>
      <div className="alch-grid">
        {D.alchemy.map((s, i) => (
          <div key={s.id} className="alch-cell">
            <div className="alch-num">PHASIS · {i+1}</div>
            <div className="alch-glyph" style={{background: s.color}}>{s.glyph}</div>
            <h3 className="alch-lat">{s.latin}</h3>
            <div className="alch-zh">{s.zh}</div>
            <div className="alch-phase">{s.phase}</div>
            <p>{s.desc}</p>
            <div className="alch-motto"><em>{s.motto}</em></div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.LiberPages = {
  front: PageFront,
  emerald: PageEmerald,
  planets: PagePlanets,
  hours: PageHours,
  elements: PageElements,
  tree: PageTree,
  letters: PageLetters,
  zodiac: PageZodiac,
  goetia: PageGoetia,
  ritual: PageRitual,
  tarot: PageTarot,
  alchemia: PageAlchemia,
};

window.LIBER_TOC = [
  { id: "front",     n: "0",    latin: "Praefatio",            zh: "卷首" },
  { id: "emerald",   n: "I",    latin: "Tabvla Smaragdina",    zh: "翠玉录" },
  { id: "planets",   n: "II",   latin: "De Septem Planetis",   zh: "七曜论" },
  { id: "hours",     n: "III",  latin: "Horæ Planetariæ",      zh: "行星时" },
  { id: "elements",  n: "IV",   latin: "Qvattvor Elementa",    zh: "四元素" },
  { id: "tree",      n: "V",    latin: "Arbor Vitæ",            zh: "生命之树" },
  { id: "letters",   n: "VI",   latin: "Litteræ Hebraicæ",     zh: "希伯来字母" },
  { id: "zodiac",    n: "VII",  latin: "Zodiacvs",              zh: "黄道十二宫" },
  { id: "goetia",    n: "VIII", latin: "Ars Goetia",            zh: "所罗门七十二灵" },
  { id: "ritual",    n: "IX",   latin: "Ritus Pentagrammi",    zh: "小五芒星仪" },
  { id: "tarot",     n: "X",    latin: "Liber Tarot",           zh: "塔罗" },
  { id: "alchemia",  n: "XI",   latin: "Opvs Magnvm",           zh: "炼金大业" },
];
