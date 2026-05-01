// Liber — 章节内容组件

const L = window.LIBER;

// ─── 卷首 ────────────────────────────────────────────
function ChPraefatio() {
  return (
    <article className="ch ch-praef">
      <header className="ch-front">
        <div className="ch-overline">— Liber Operationis —</div>
        <h1 className="ch-disp">神 秘 学 手 册</h1>
        <div className="ch-sub"><em>Liber Operationis Magicae & Scientiae Occultae</em></div>
        <div className="ch-edition">Editio Sinica · MMXXVI</div>

        <div className="rule-orn">❦ &nbsp; ❦ &nbsp; ❦</div>

        <p className="ch-lead">
          <span className="dropcap">本</span>书集自二千年欧洲与近东神秘学之公共传承。其源有四：
          一曰希腊化埃及之 <em>Corpus Hermeticum</em>；二曰中世纪犹太之 <em>Kabbalah</em>；
          三曰文艺复兴 Agrippa、Picatrix 及所罗门钥匙诸抄本；四曰十九世纪末
          黄金黎明（Hermetic Order of the Golden Dawn）之总成。
        </p>
        <p>
          本书为参考与学习之用。卷一至卷四列哲学、宇宙、行星、字母诸基础；
          卷五至卷十一为实修与仪轨；卷十二、十三为对应表与原典书目。
          凡涉仪式者，皆引古典文本为据，注其出处。
        </p>

        <div className="praef-sigil">
          <SigilFrontispiece/>
        </div>

        <blockquote className="ch-quote">
          <em>«Quod est inferius, est sicut quod est superius;<br/>
          et quod est superius, est sicut quod est inferius,<br/>
          ad perpetranda miracula rei unius.»</em>
          <footer>— Tabula Smaragdina, II</footer>
          <div className="quote-zh">下者如同上者，上者如同下者；以此成就独一之奇迹。</div>
        </blockquote>
      </header>
    </article>
  );
}

// 卷首装饰图 — 双圆 + 七星 + 中央六芒
function SigilFrontispiece() {
  const cx=140, cy=140, r1=128, r2=110, r3=82, r4=42;
  const planets = L.planets;
  return (
    <svg width="280" height="280" viewBox="0 0 280 280">
      <defs>
        <path id="circ-front" d={`M ${cx-r2},${cy} a ${r2},${r2} 0 1,1 ${r2*2},0 a ${r2},${r2} 0 1,1 ${-r2*2},0`}/>
      </defs>
      <circle cx={cx} cy={cy} r={r1} fill="none" stroke="var(--ink)" strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r={r2} fill="none" stroke="var(--ink)" strokeWidth="0.5"/>
      <text fontFamily="EB Garamond" fontStyle="italic" fontSize="11" fill="var(--ink)" letterSpacing="3">
        <textPath href="#circ-front" startOffset="2">SAPIENTIA · OCCULTA · DEI · NATURAE · ET · ARTIS · ·</textPath>
      </text>
      {planets.map((p, i) => {
        const a = -Math.PI/2 + (i * 2 * Math.PI) / 7;
        const x = cx + r3 * Math.cos(a), y = cy + r3 * Math.sin(a);
        return <text key={p.id} x={x} y={y+7} textAnchor="middle" fontSize="22" fill="var(--ink)">{p.glyph}</text>;
      })}
      {/* 六芒 */}
      <g stroke="var(--ink)" strokeWidth="0.7" fill="none">
        <polygon points={[0,1,2].map(k => {
          const a = -Math.PI/2 + (k * 2 * Math.PI) / 3;
          return (cx + r4 * Math.cos(a)) + "," + (cy + r4 * Math.sin(a));
        }).join(" ")}/>
        <polygon points={[0,1,2].map(k => {
          const a = Math.PI/2 + (k * 2 * Math.PI) / 3;
          return (cx + r4 * Math.cos(a)) + "," + (cy + r4 * Math.sin(a));
        }).join(" ")}/>
      </g>
    </svg>
  );
}

// 通用：章节标题
function ChHeader({ num, latin, zh, sub }) {
  return (
    <header className="ch-head">
      <div className="ch-num">CAPVT · {num}</div>
      <h2 className="ch-latin">{latin}</h2>
      <div className="ch-zh">{zh}</div>
      {sub && <div className="ch-tagline">{sub}</div>}
      <div className="rule-orn">❦</div>
    </header>
  );
}

// ─── 卷一 赫密士文集 ─────────────────────────────
function ChHermetica() {
  return (
    <article className="ch">
      <ChHeader num="I" latin="Corpus Hermeticum" zh="赫密士文集 · 论独一与万有"/>
      <p className="ch-lead">
        <span className="dropcap">所</span>谓"赫密士"（Hermes Trismegistus，三重伟大者）
        乃希腊化埃及托神 Thoth 之化名。其名下抄本编集于公元一至三世纪，
        论神、宇宙、人三者之关系，是西方神秘学之根基。
      </p>
      <h3 className="ch-h3">七大原则 · Septem Principia</h3>
      <p className="caption">本于现代赫密士派之概括，原典散见 Corpus Hermeticum 各卷。</p>
      <ol className="seven">
        <li><b>心智 · Mentalismus</b><span>万有皆为心；宇宙乃神之意念。</span></li>
        <li><b>对应 · Correspondentia</b><span>下者如上者；微观映宏观。</span></li>
        <li><b>振动 · Vibratio</b><span>万物皆动；唯频率与速度有别。</span></li>
        <li><b>极性 · Polaritas</b><span>万物有二极；对立者本同。</span></li>
        <li><b>节律 · Rhythmus</b><span>万物有潮汐；有出必有入。</span></li>
        <li><b>因果 · Causa et Effectus</b><span>无事偶然；皆有其因。</span></li>
        <li><b>性别 · Genus</b><span>万有皆兼阴阳之原。</span></li>
      </ol>
      <h3 className="ch-h3">独一之教 · 节自《论智慧》（Poimandres）</h3>
      <blockquote className="ch-quote long">
        <p>「父，万有之父，是光与生命；自其而生人。<br/>
        若汝自识己为光与生命所造，则汝复归于生命。」</p>
        <footer>— Corpus Hermeticum I, §21</footer>
      </blockquote>
    </article>
  );
}

// ─── 卷二 四元素 ─────────────────────────────────
function ChElementa() {
  return (
    <article className="ch">
      <ChHeader num="II" latin="De Elementis" zh="四元素与三本原"/>
      <p className="ch-lead">
        <span className="dropcap">古</span>典宇宙学以四元素构成月下世界，第五元素以太
        构成天界。中世纪炼金术更立硫·汞·盐"三本原"，言其性而非其质。
      </p>

      <table className="grand-table">
        <thead><tr><th>符</th><th>拉丁</th><th>名</th><th>性</th><th>方</th><th>季</th><th>体液</th><th>大天使</th><th>三宫</th></tr></thead>
        <tbody>
          {L.elementa.map(e => (
            <tr key={e.id}>
              <td className="g">{e.glyph}</td>
              <td><em>{e.latin}</em></td>
              <td>{e.zh}</td>
              <td>{e.quality}</td>
              <td>{e.direction}</td>
              <td>{e.season}</td>
              <td>{e.humor}</td>
              <td>{e.arch}</td>
              <td>{e.tri}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="ch-h3">三本原 · Tria Prima</h3>
      <table className="grand-table">
        <thead><tr><th>符</th><th>拉丁</th><th>名</th><th>义</th></tr></thead>
        <tbody>
          {L.tria_prima.map(p => (
            <tr key={p.id}><td className="g">{p.glyph}</td><td><em>{p.latin}</em></td><td>{p.zh}</td><td>{p.sense}</td></tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

// ─── 卷三 卡巴拉 ─────────────────────────────────
function ChKabbalah() {
  const [hi, setHi] = useState(5);
  return (
    <article className="ch">
      <ChHeader num="III" latin="Arbor Sephirothica" zh="生命之树 · 十质点 · 二十二径"/>
      <p className="ch-lead">
        <span className="dropcap">生</span>命之树（<em>Etz Chaim</em>）乃卡巴拉宇宙观之总图。
        十质点（Sephiroth）为神之十重显现，由 Kether 至 Malkuth；
        二十二径连接各质点，与希伯来字母及塔罗大阿卡纳一一对应。
      </p>

      <div className="tree-layout">
        <TreeOfLifeSVG highlight={hi} onSelect={setHi}/>
        <div className="tree-detail">
          <div className="td-rank">N° {L.sephiroth[hi].n}</div>
          <div className="td-he">{L.sephiroth[hi].he}</div>
          <div className="td-lat">{L.sephiroth[hi].latin}</div>
          <div className="td-zh">{L.sephiroth[hi].zh}</div>
          <p className="td-meaning">{L.sephiroth[hi].meaning}</p>
          <table className="kv">
            <tbody>
              <tr><td>神名</td><td>{L.sephiroth[hi].god}</td></tr>
              <tr><td>大天使</td><td>{L.sephiroth[hi].arch}</td></tr>
              <tr><td>天使品</td><td>{L.sephiroth[hi].order}</td></tr>
              <tr><td>对应</td><td>{L.sephiroth[hi].planet}</td></tr>
              <tr><td>色</td><td>{L.sephiroth[hi].color}</td></tr>
              <tr><td>身位</td><td>{L.sephiroth[hi].body}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

function TreeOfLifeSVG({ highlight, onSelect }) {
  const W = 360, H = 540;
  const sx = x => W * (0.5 + x), sy = y => H * y;
  const nodes = [
    [0,0.06],[0.22,0.16],[-0.22,0.16],[0.22,0.32],[-0.22,0.32],
    [0,0.42],[0.22,0.55],[-0.22,0.55],[0,0.66],[0,0.86],
  ].map(([x,y]) => [sx(x), sy(y)]);
  const paths = [[1,2],[1,3],[1,6],[2,3],[2,6],[2,4],[3,5],[3,6],[4,5],[4,6],[4,7],[5,6],[5,8],[6,7],[6,8],[6,9],[7,8],[7,9],[7,10],[8,9],[8,10],[9,10]];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="tree-svg">
      {paths.map(([a,b],i)=>(
        <line key={i} x1={nodes[a-1][0]} y1={nodes[a-1][1]} x2={nodes[b-1][0]} y2={nodes[b-1][1]} stroke="var(--ink)" strokeWidth="0.6" opacity="0.7"/>
      ))}
      {nodes.map(([x,y],i)=>(
        <g key={i} onMouseEnter={()=>onSelect(i)} style={{cursor:"pointer"}}>
          <circle cx={x} cy={y} r="22" fill="var(--paper)" stroke="var(--ink)" strokeWidth={highlight===i?2:1}/>
          <text x={x} y={y+1} textAnchor="middle" fontFamily="EB Garamond" fontSize="13" fill="var(--ink)">{L.sephiroth[i].n}</text>
          <text x={x} y={y+38} textAnchor="middle" fontFamily="EB Garamond" fontStyle="italic" fontSize="11" fill="var(--ink)">{L.sephiroth[i].latin}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── 卷四 占星 ───────────────────────────────────
function ChAstrologia() {
  return (
    <article className="ch">
      <ChHeader num="IV" latin="Astrologia" zh="占星基本对应"/>
      <p className="ch-lead">
        <span className="dropcap">占</span>星之体系建于三柱：<em>十二宫</em>（Signa）、<em>七曜</em>（Planetae，
        现代加三外行星）、<em>十二位</em>（Domus）。三者交织为本命盘。
      </p>
      <h3 className="ch-h3">十二宫 · Signa Zodiaci</h3>
      <table className="grand-table">
        <thead><tr><th>符</th><th>名</th><th>期</th><th>元</th><th>态</th><th>主</th><th>旺</th><th>身</th></tr></thead>
        <tbody>
          {L.zodiac.map(z => (
            <tr key={z.id}>
              <td className="g">{z.glyph}</td>
              <td>{z.zh} <em>{z.latin}</em></td>
              <td className="mono">{z.date}</td>
              <td>{z.el}</td>
              <td>{z.mode}</td>
              <td>{z.ruler}</td>
              <td>{z.exalt}</td>
              <td>{z.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="ch-h3">十二宫位 · Domus</h3>
      <table className="grand-table">
        <thead><tr><th>位</th><th>拉丁</th><th>名</th><th>主题</th></tr></thead>
        <tbody>
          {L.houses.map(h => (
            <tr key={h.n}><td className="g">{h.n}</td><td><em>{h.latin}</em></td><td>{h.zh}</td><td>{h.theme}</td></tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

// ─── 卷五 行星魔法 ───────────────────────────────
function ChPlanetae() {
  const [sel, setSel] = useState(L.planets[3]);
  return (
    <article className="ch">
      <ChHeader num="V" latin="De Planetis" zh="七曜行星魔法 · Agrippa Liber II"/>
      <p className="ch-lead">
        <span className="dropcap">每</span>颗古典行星统摄一日、一天使、一灵、一金属、一草、一石、
        及无数对应物。下表列其全谱。点击切换。
      </p>
      <div className="planet-tabs">
        {L.planets.map(p => (
          <button key={p.id} className={"pt-tab"+(sel.id===p.id?" on":"")} onClick={()=>setSel(p)}>
            <span className="pt-glyph">{p.glyph}</span>
            <span className="pt-zh">{p.zh}</span>
          </button>
        ))}
      </div>
      <div className="planet-sheet">
        <div className="ps-head">
          <div className="ps-glyph">{sel.glyph}</div>
          <div>
            <h3 className="ps-name">{sel.zh} · <em>{sel.latin}</em></h3>
            <div className="ps-day">{sel.dayZh}</div>
          </div>
        </div>
        <table className="kv full">
          <tbody>
            <tr><td>大天使</td><td>{sel.angel}</td></tr>
            <tr><td>智者</td><td>{sel.intel}</td></tr>
            <tr><td>灵</td><td>{sel.spirit}</td></tr>
            <tr><td>金属</td><td>{sel.metal}</td></tr>
            <tr><td>色</td><td>{sel.color}</td></tr>
            <tr><td>数 / 方阵和</td><td>{sel.number} / {sel.kameaSum}</td></tr>
            <tr><td>香</td><td>{sel.incense}</td></tr>
            <tr><td>石</td><td>{sel.stone}</td></tr>
            <tr><td>草木</td><td>{sel.herb}</td></tr>
            <tr><td>动物</td><td>{sel.animal}</td></tr>
            <tr><td>诵咏</td><td>{sel.psalm}</td></tr>
          </tbody>
        </table>
        <div className="ps-block">
          <h4>主司 · Virtutes</h4>
          <p>{sel.virtues}</p>
        </div>
        <div className="ps-block">
          <h4>用时之宜忌 · Electio</h4>
          <p>{sel.hours}</p>
        </div>
      </div>
    </article>
  );
}

// ─── 卷六 行星时计算器 ───────────────────────────
function ChHorae() {
  return (
    <article className="ch">
      <ChHeader num="VI" latin="Horae Planetariae" zh="行星时计算器"/>
      <p className="ch-lead">
        <span className="dropcap">行</span>星时（horae planetariae）以日出至日落为白昼，
        平分十二份；日落至次日日出为夜，亦十二份。每一时辰由一颗行星统摄，
        按迦勒底序循环。仪式宜择该行星之时辰行之，效力倍增。
      </p>
      <PlanetaryHours/>
    </article>
  );
}

// ─── 卷七 塔罗 ───────────────────────────────────
function ChTarot() {
  return (
    <article className="ch">
      <ChHeader num="VII" latin="Tarocchi" zh="大阿卡纳与希伯来字母对应（黄金黎明系）"/>
      <p className="ch-lead">
        <span className="dropcap">塔</span>罗大阿卡纳二十二张，与希伯来字母二十二个一一对应；
        映入生命之树二十二径。下表为黄金黎明学派之标准排列。
      </p>
      <div className="arcana-table-grid">
        {L.arcana.map(a => (
          <div key={a.n} className="arc-cell">
            <div className="ac-rom">{a.rom}</div>
            <div className="ac-zh">{a.zh}</div>
            <div className="ac-lat"><em>{a.latin}</em></div>
            <div className="ac-foot">
              <span className="ac-he">{a.he}</span>
              <span className="ac-attr">{a.attr}</span>
            </div>
            <div className="ac-letter">{a.letter}</div>
            <div className="ac-path">径 {a.path}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

// ─── 卷八 塔罗占卜工具 ───────────────────────────
function ChDivinatio() {
  return (
    <article className="ch">
      <ChHeader num="VIII" latin="Divinatio per Cartas" zh="塔罗占卜"/>
      <p className="ch-lead">
        <span className="dropcap">占</span>卜之要在凝神。先以问辞确定意向，
        屏息片刻，再行抽牌。所现之牌乃供凝视与省思之像，非命数之必然。
      </p>
      <TarotDraw/>
    </article>
  );
}

// ─── 卷九 所罗门钥匙 ─────────────────────────────
function ChGoetia() {
  const [sel, setSel] = useState(0);
  const cur = L.goetia[sel];
  return (
    <article className="ch">
      <ChHeader num="IX" latin="Ars Goetia" zh="所罗门钥匙之灵 · Lemegeton 上卷选录"/>
      <div className="warning">
        <strong>Monitum · 提示</strong>：本卷据十七世纪 Lemegeton 抄本节录，
        以历史与象征研究为目的。原书属仪式魔法之极端文献，
        现代多以心理与原型方式解读（如 Lon Milo DuQuette）。所列权能、形象、神名
        皆引自原典；现代实践者可不拘其字面义。
      </div>
      <div className="goetia-flex">
        <ul className="goetia-list">
          {L.goetia.map((g, i) => (
            <li key={g.rank} className={sel===i?"on":""} onClick={()=>setSel(i)}>
              <span className="gl-rank">{String(g.rank).padStart(2,"0")}</span>
              <span className="gl-name">{g.name}</span>
              <span className="gl-title">{g.title}</span>
            </li>
          ))}
        </ul>
        <div className="goetia-detail">
          <div className="gd-rank">N° {String(cur.rank).padStart(2,"0")} / 72</div>
          <h3 className="gd-name">{cur.name}</h3>
          <div className="gd-title">{cur.title} · {cur.legions} 军团</div>
          <div className="gd-block"><div className="lbl">权能 · Potestas</div><p>{cur.power}</p></div>
          <div className="gd-block"><div className="lbl">显现 · Forma</div><p>{cur.form}</p></div>
          <div className="gd-block"><div className="lbl">神名 · Nomen Divinum</div><p className="mono">{cur.divine}</p></div>
        </div>
      </div>
    </article>
  );
}

// ─── 卷十 LBRP 仪轨 ───────────────────────────────
function ChRituale() {
  return (
    <article className="ch">
      <ChHeader num="X" latin="Rituale Pentagrammi Minus Banniens" zh="小五芒星驱逐仪 · LBRP"/>
      <p className="ch-lead">
        <span className="dropcap">小</span>五芒星驱逐仪（Lesser Banishing Ritual of the Pentagram）
        乃黄金黎明所定之基础仪轨，为净化场所、平衡气场、入定前之准备。
        每日一行，可习其用。
      </p>
      <ol className="rite">
        {L.lbrp.map(s => (
          <li key={s.step}>
            <div className="rite-step">§ {s.step}</div>
            <div className="rite-title">{s.title}</div>
            <p className="rite-action">{s.action}</p>
          </li>
        ))}
      </ol>
      <p className="caption">
        所引神名皆为犹太教传统至高神之四重表现：YHVH（天主之四字圣名）、
        ADONAI（"主"）、EHEIEH（"我是"）、AGLA（缩略）。
      </p>
    </article>
  );
}

// ─── 卷十一 翠玉录与炼金 ─────────────────────────
function ChAlchemia() {
  return (
    <article className="ch">
      <ChHeader num="XI" latin="Tabula Smaragdina & Opus Magnum" zh="翠玉录 与 炼金大业"/>
      <h3 className="ch-h3">翠玉录全文 · Tabula Smaragdina</h3>
      <p className="caption">公共领域 · 据牛顿英译之常见中译</p>
      <ol className="emerald-ol">
        {L.emerald.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
      <h3 className="ch-h3">炼金七步 · Opus in Septem Operationibus</h3>
      <p className="caption">外炼为金，内炼为我。每一步既为化学操作，亦为心灵阶段。</p>
      <ol className="opus-ol">
        {L.opus.map(o => (
          <li key={o.id}>
            <div className="opus-head">
              <span className="opus-lat"><em>{o.lat}</em></span>
              <span className="opus-zh">{o.zh}</span>
              <span className="opus-phase">{o.phase}</span>
            </div>
            <p>{o.desc}</p>
          </li>
        ))}
      </ol>
      <blockquote className="ch-quote">
        <em>«Solve et Coagula»</em>
        <div className="quote-zh">先溶解之，后凝合之。</div>
      </blockquote>
    </article>
  );
}

// ─── 卷十二 对应表汇编 ───────────────────────────
function ChTabulae() {
  return (
    <article className="ch">
      <ChHeader num="XII" latin="Tabulae Correspondentiarum" zh="对应表汇编 · 速查"/>
      <h3 className="ch-h3">行星 · 元素 · 字母 · 塔罗 · 七天</h3>
      <table className="grand-table master">
        <thead><tr><th>符</th><th>行星</th><th>天</th><th>字母</th><th>大牌</th><th>金属</th><th>香</th><th>色</th></tr></thead>
        <tbody>
          {L.planets.map(p => {
            const arc = L.arcana.find(a => a.attr.includes(p.glyph));
            const he = arc ? arc.he : "—";
            return (
              <tr key={p.id}>
                <td className="g">{p.glyph}</td>
                <td>{p.zh} <em>{p.latin}</em></td>
                <td>{p.dayZh}</td>
                <td className="hb">{he}</td>
                <td>{arc ? `${arc.rom} · ${arc.zh}` : "—"}</td>
                <td>{p.metal}</td>
                <td>{p.incense}</td>
                <td>{p.color}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3 className="ch-h3">十二宫 · 元素 · 主管</h3>
      <table className="grand-table">
        <thead><tr><th>符</th><th>宫</th><th>元</th><th>态</th><th>主</th><th>原型</th></tr></thead>
        <tbody>
          {L.zodiac.map(z => (
            <tr key={z.id}><td className="g">{z.glyph}</td><td>{z.zh}</td><td>{z.el}</td><td>{z.mode}</td><td>{z.ruler}</td><td>{z.archetype}</td></tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

// ─── 卷十三 书目 ─────────────────────────────────
function ChBibliographia() {
  const refs = [
    { era:"古典", items:[
      "Corpus Hermeticum（公元 1–3 世纪）— 赫密士文集",
      "Tabula Smaragdina — 翠玉录（中世纪传抄）",
      "Sepher Yetzirah — 创造之书（公元 2–6 世纪）",
      "Picatrix（Ghāyat al-Ḥakīm，约 11 世纪）— 中古魔法大全",
    ]},
    { era:"文艺复兴", items:[
      "Heinrich Cornelius Agrippa, De Occulta Philosophia (1533)",
      "Marsilio Ficino, De Vita Libri Tres (1489)",
      "Lemegeton Clavicula Salomonis (17 世纪抄本) — 包括 Goetia",
      "Clavicula Salomonis — 所罗门钥匙",
    ]},
    { era:"近代 · 黄金黎明", items:[
      "S. L. MacGregor Mathers, The Kabbalah Unveiled (1887)",
      "Aleister Crowley, 777 and Other Qabalistic Writings",
      "Israel Regardie, The Golden Dawn (1937–40)",
      "Dion Fortune, The Mystical Qabalah (1935)",
    ]},
    { era:"现代实修", items:[
      "Lon Milo DuQuette, Low Magick / Understanding Aleister Crowley's Thoth Tarot",
      "Donald Michael Kraig, Modern Magick",
      "Frater U∴D∴, High Magic",
      "Stephen Skinner, Techniques of Solomonic Magic",
    ]},
  ];
  return (
    <article className="ch">
      <ChHeader num="XIII" latin="Bibliographia" zh="书目与原典指引"/>
      <p className="ch-lead">
        <span className="dropcap">本</span>书所引皆公共领域之经典文本。欲深入者，按下列书目依次而读。
      </p>
      {refs.map(r => (
        <div key={r.era} className="bib-section">
          <h3 className="ch-h3">{r.era}</h3>
          <ul className="bib-list">
            {r.items.map(i => <li key={i}>{i}</li>)}
          </ul>
        </div>
      ))}
    </article>
  );
}

window.Chapters = {
  praefatio: ChPraefatio,
  hermetica: ChHermetica,
  elementa: ChElementa,
  kabbalah: ChKabbalah,
  astrologia: ChAstrologia,
  planetae: ChPlanetae,
  horae: ChHorae,
  tarot: ChTarot,
  divinatio: ChDivinatio,
  goetia: ChGoetia,
  rituale: ChRituale,
  alchemia: ChAlchemia,
  tabulae: ChTabulae,
  bibliographia: ChBibliographia,
};
