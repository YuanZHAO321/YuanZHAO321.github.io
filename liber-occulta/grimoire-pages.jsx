// 各章节的页面组件 — 真实神秘学内容的赛博档案呈现

const D = window.GRIMOIRE_DATA;

// 公共：章节首页栏
function ChapterHeader({ number, latin, title, sub }) {
  return (
    <div className="chap-head">
      <div className="chap-num">CAPVT · {number}</div>
      <div className="chap-latin">{latin}</div>
      <div className="chap-title">{title}</div>
      <div className="chap-sub">— {sub} —</div>
      <VellumOrnament width={520} height={24} color="var(--ink-amber)"/>
    </div>
  );
}

// 卷首
function PagePraefatio() {
  const [hash, setHash] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      const chars = "0123456789ABCDEF";
      let s = "";
      for (let k = 0; k < 16; k++) s += chars[Math.floor(Math.random()*16)];
      setHash(s);
      i++;
    }, 120);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="page page-praef">
      <div className="praef-mono-top">
        <span>FILE/ codex.cybernetic.v0.93</span>
        <span>SHA-256/ {hash}…</span>
        <span>STATUS/ <em className="cinnabar">SEALED</em></span>
      </div>

      <div className="praef-center">
        <div className="praef-overline">CODEX · CYBERNETICVS</div>
        <h1 className="praef-title">赛博魔典</h1>
        <div className="praef-sub">Liber occultae sapientiae · in machina tradita</div>

        <div className="praef-circle">
          <SummoningCircle size={420} points={7} color="var(--ink-0)"
            inner="א" label="ALEPH BETH GIMEL DALETH HEH VAV ZAYIN CHETH TETH YOD KAPH LAMED MEM NUN SAMEKH AYIN"/>
        </div>

        <div className="praef-quote">
          <em>“Quod est inferius, est sicut quod est superius.”</em>
          <div className="praef-quote-zh">下者如同上者，以成独一之奇迹。</div>
        </div>
      </div>

      <div className="praef-mono-bot">
        <span>EDITIO/ MMXXVI</span>
        <span>CVRATOR/ ANONYMVS</span>
        <span>FOLIA/ IX · CAPITA</span>
        <span className="cinnabar blink">▌</span>
      </div>
    </div>
  );
}

// 七曜
function PagePlanets() {
  const [sel, setSel] = React.useState(D.planets[3]); // 太阳为默认
  return (
    <div className="page page-planets">
      <ChapterHeader number="I" latin="DE SEPTEM PLANETIS" title="七曜论" sub="Sigilla planetarum"/>

      <div className="planets-row">
        {D.planets.map(p => (
          <button key={p.id} className={`planet-pill ${sel.id===p.id?"on":""}`} onClick={() => setSel(p)}>
            <span className="planet-pill-glyph">{p.glyph}</span>
            <span className="planet-pill-zh">{p.zh}</span>
            <span className="planet-pill-lat">{p.latin}</span>
          </button>
        ))}
      </div>

      <div className="planet-detail">
        <div className="planet-detail-left">
          <div className="big-glyph" style={{ color: sel.color }}>{sel.glyph}</div>
          <div className="planet-name-zh">{sel.zh}</div>
          <div className="planet-name-lat">{sel.latin}</div>
          <table className="kv">
            <tbody>
              <tr><td>METALLVM</td><td>{sel.metal}</td></tr>
              <tr><td>DIES</td><td>{sel.day}</td></tr>
              <tr><td>NVMERVS</td><td>{sel.numerus} (□{sel.square})</td></tr>
              <tr><td>HEBR.</td><td className="hebrew">{sel.hebrew}</td></tr>
              <tr><td>INTELLIG.</td><td>{sel.intel}</td></tr>
              <tr><td>SPIRITVS</td><td>{sel.spirit}</td></tr>
            </tbody>
          </table>
          <div className="planet-virtus">
            <div className="lbl">VIRTVS · 主司</div>
            <p>{sel.virtus}</p>
            <div className="lbl">CAVTIO · 戒</div>
            <p className="cinnabar">{sel.cautio}</p>
          </div>
        </div>

        <div className="planet-detail-mid">
          <div className="lbl center">QVADRATVM · {sel.numerus}×{sel.numerus}</div>
          <KameaGrid planet={sel.id} size={300} color="var(--ink-amber)"/>
          <div className="caption">魔方阵 · 横竖斜数和恒为 {(sel.numerus*(sel.numerus**2+1))/2}</div>
        </div>

        <div className="planet-detail-right">
          <div className="lbl center">SIGILLVM</div>
          <div className="sigil-frame" style={{ color: sel.color }}>
            <PlanetSigil planet={sel.id} size={260}/>
          </div>
          <div className="caption">由数字序列 1 → {sel.square} 在魔方阵上连线生成</div>
        </div>
      </div>
    </div>
  );
}

// 四元素
function PageElementa() {
  return (
    <div className="page page-elementa">
      <ChapterHeader number="II" latin="DE QVATTVOR ELEMENTIS" title="四元素" sub="土水气火 · 四方守护"/>
      <div className="elementa-cross">
        <svg className="elementa-bg" viewBox="-200 -200 400 400">
          <circle cx="0" cy="0" r="180" fill="none" stroke="var(--ink-dim)" strokeWidth="0.6"/>
          <circle cx="0" cy="0" r="150" fill="none" stroke="var(--ink-dim)" strokeWidth="0.4" strokeDasharray="2 4"/>
          <line x1="-180" y1="0" x2="180" y2="0" stroke="var(--ink-dim)" strokeWidth="0.4"/>
          <line x1="0" y1="-180" x2="0" y2="180" stroke="var(--ink-dim)" strokeWidth="0.4"/>
        </svg>
        {D.elements.map((el, i) => {
          const pos = [{top:"6%",left:"50%"},{right:"6%",top:"50%"},{bottom:"6%",left:"50%"},{left:"6%",top:"50%"}];
          // 北土西水南火东气 → terra:N, aqua:W, ignis:S, aer:E
          const map = { terra:0, aqua:3, ignis:2, aer:1 };
          return (
            <div key={el.id} className="el-card" style={{...pos[map[el.id]], transform:"translate(-50%,-50%)", color: el.color }}>
              <ElementGlyph id={el.id} size={84} color={el.color}/>
              <div className="el-zh">{el.zh}</div>
              <div className="el-lat">{el.latin}</div>
              <div className="el-q">{el.quality}</div>
              <div className="el-meta">
                <span>{el.direction}方</span> · <span className="hebrew">{el.hebrew}</span>
              </div>
              <div className="el-arch">{el.archangel}</div>
            </div>
          );
        })}
        <div className="elementa-center">
          <div className="azoth">AZOTH</div>
          <div className="azoth-zh">第五元素 · 精气</div>
        </div>
      </div>
    </div>
  );
}

// 翠玉录
function PageEmerald() {
  return (
    <div className="page page-emerald">
      <ChapterHeader number="III" latin="TABVLA SMARAGDINA" title="翠玉录" sub="Hermes Trismegistus"/>
      <div className="emerald-frame">
        <div className="emerald-attribution">
          <div className="lbl">ATTRIBVITVR / 传为</div>
          <div className="big-name">Hermes Trismegistus</div>
          <div className="zh-name">赫密士 · 三重伟大者</div>
        </div>
        <ol className="emerald-text">
          {D.emerald.map((line, i) => (
            <li key={i}>
              <span className="verse-n">{String(i+1).padStart(2,"0")}</span>
              <span className="verse-text">{line}</span>
            </li>
          ))}
        </ol>
        <div className="emerald-seal">
          <SummoningCircle size={180} points={5} color="var(--ink-amber)" inner="🜍" label="VITRIOL VISITA INTERIORA TERRAE RECTIFICANDO INVENIES OCCVLTVM LAPIDEM" spin={false}/>
          <div className="vitriol">V·I·T·R·I·O·L</div>
          <div className="vitriol-zh">游历地之内里，纠正之，汝将得隐之石。</div>
        </div>
      </div>
    </div>
  );
}

// 生命之树
function PageTree() {
  const [hi, setHi] = React.useState(5);
  return (
    <div className="page page-tree">
      <ChapterHeader number="IV" latin="ARBOR VITAE" title="生命之树" sub="十质点 · 二十二径"/>
      <div className="tree-row">
        <div className="tree-svg">
          <TreeOfLife size={420} color="var(--ink-amber)" highlight={hi}/>
        </div>
        <div className="tree-list">
          <div className="lbl">SEPHIROTH</div>
          {D.sephiroth.map((s, i) => (
            <div key={i} className={`seph-row ${hi===i?"on":""}`} onMouseEnter={()=>setHi(i)}>
              <span className="seph-n">{s.n}</span>
              <span className="seph-he hebrew">{s.he}</span>
              <span className="seph-lat">{s.latin}</span>
              <span className="seph-zh">{s.zh}</span>
              <span className="seph-meaning">{s.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 所罗门72灵
function PageGoetia() {
  const [sel, setSel] = React.useState(0);
  const cur = D.goetia[sel];
  return (
    <div className="page page-goetia">
      <ChapterHeader number="V" latin="ARS GOETIA" title="所罗门七十二灵" sub="Lemegeton — Liber Primus"/>

      <div className="goetia-warn cinnabar">
        ⚠ MONITVM · 此节录自 17 世纪手稿，仅作历史档案展示。不为召唤之用。
      </div>

      <div className="goetia-grid">
        <div className="goetia-list">
          {D.goetia.map((g, i) => (
            <button key={i} className={`goetia-row ${sel===i?"on":""}`} onClick={() => setSel(i)}>
              <span className="g-rank">{String(g.rank).padStart(2,"0")}</span>
              <span className="g-name">{g.name}</span>
              <span className="g-zh">{g.zh}</span>
              <span className="g-title">{g.title}</span>
              <span className="g-leg">{g.legions} legio</span>
            </button>
          ))}
        </div>

        <div className="goetia-detail">
          <div className="g-d-rank">N° {String(cur.rank).padStart(2,"0")} / 72</div>
          <div className="g-d-name">{cur.name}</div>
          <div className="g-d-zh">{cur.zh}</div>
          <div className="g-d-title">{cur.title} · {cur.legions} 军团</div>

          <div className="g-d-sigil">
            <GoetiaSigil rank={cur.rank} name={cur.name} size={220} color="var(--ink-amber)"/>
          </div>

          <div className="g-d-sec">
            <div className="lbl">DOMINIVM · 主司</div>
            <p>{cur.domain}</p>
          </div>
          <div className="g-d-sec">
            <div className="lbl">FORMA · 显现</div>
            <p>{cur.appearance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 大阿卡纳
function PageArcana() {
  return (
    <div className="page page-arcana">
      <ChapterHeader number="VI" latin="ARCANA MAIORA" title="大阿卡纳" sub="二十二张大牌 · 与希伯来字母对应"/>
      <div className="arcana-grid">
        {D.arcana.map((a, i) => (
          <div key={i} className="arc-card">
            <div className="arc-roman">{a.roman}</div>
            <div className="arc-mid">
              <span className="arc-planet">{a.planet}</span>
              <span className="arc-letter hebrew">{a.hebrew}</span>
            </div>
            <div className="arc-zh">{a.zh}</div>
            <div className="arc-lat">{a.latin}</div>
            <div className="arc-letter-name">{a.letter}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 炼金大业
function PageAlchemia() {
  return (
    <div className="page page-alchemia">
      <ChapterHeader number="VII" latin="OPVS MAGNVM" title="炼金大业" sub="Solve et Coagula · 溶解与凝合"/>
      <div className="alch-stages">
        {D.alchemy.map((s, i) => (
          <div key={s.id} className="alch-stage" style={{"--phase-color": s.color}}>
            <div className="alch-num">{i+1}</div>
            <div className="alch-glyph">{s.glyph}</div>
            <div className="alch-lat">{s.latin}</div>
            <div className="alch-zh">{s.zh}</div>
            <div className="alch-phase">{s.phase}</div>
            <div className="alch-motto">— {s.motto} —</div>
            <div className="alch-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="alch-formula">
        <div className="formula-line">
          <span className="big-lat">SOLVE</span>
          <span className="amp">·</span>
          <span className="big-lat">ET</span>
          <span className="amp">·</span>
          <span className="big-lat">COAGVLA</span>
        </div>
        <div className="formula-zh">先溶解之，后凝合之</div>
      </div>
    </div>
  );
}

// 召唤台 — 据姓名/出生年月生成印记 + 占星归属
function PageInvocatio() {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [result, setResult] = React.useState(null);
  const [computing, setComputing] = React.useState(false);
  const [computeText, setComputeText] = React.useState("");

  const compute = () => {
    if (!name) return;
    setComputing(true);
    setResult(null);
    const lines = [
      "> INPVT VERIFIED",
      "> hashing nomen…",
      "> consulting tabula planetarum…",
      "> aligning sephiroth…",
      "> rendering sigillum…",
    ];
    let i = 0;
    setComputeText("");
    const id = setInterval(() => {
      setComputeText(lines.slice(0, i+1).join("\n"));
      i++;
      if (i >= lines.length) {
        clearInterval(id);
        // 计算结果
        const sum = [...name].reduce((a,c) => a + c.charCodeAt(0), 0) + (date ? date.split("-").reduce((a,b)=>a+parseInt(b||"0"),0) : 0);
        const planet = D.planets[sum % 7];
        const seph = D.sephiroth[sum % 10];
        const arc = D.arcana[sum % 22];
        const goe = D.goetia[sum % D.goetia.length];
        const elt = D.elements[sum % 4];
        setTimeout(() => {
          setComputing(false);
          setResult({ planet, seph, arc, goe, elt, sum });
        }, 600);
      }
    }, 320);
  };

  return (
    <div className="page page-invocatio">
      <ChapterHeader number="VIII" latin="INVOCATIO" title="召唤台" sub="Sigillum ex Nomine · 由名生印"/>

      <div className="inv-grid">
        <div className="inv-form">
          <div className="lbl">NOMEN · 姓名</div>
          <input className="inv-input" value={name} onChange={e=>setName(e.target.value)} placeholder="ANONYMVS" maxLength={32}/>
          <div className="lbl">NATALIS · 出生 (YYYY-MM-DD)</div>
          <input className="inv-input mono" value={date} onChange={e=>setDate(e.target.value)} placeholder="1993-04-21"/>
          <button className="inv-btn" onClick={compute} disabled={!name || computing}>
            {computing ? "INVOCO…" : "▶ INVOCARE"}
          </button>

          {(computing || computeText) && (
            <pre className="inv-console">{computeText}{computing && <span className="cursor">▌</span>}</pre>
          )}

          {result && (
            <div className="inv-readout">
              <div className="lbl">CHECKSUM</div>
              <div className="mono">0x{result.sum.toString(16).toUpperCase().padStart(6,"0")}</div>

              <div className="lbl" style={{marginTop:14}}>PLANETA · 守护行星</div>
              <div className="big-result" style={{color: result.planet.color}}>{result.planet.glyph} {result.planet.zh} <em>· {result.planet.latin}</em></div>

              <div className="lbl">SEPHIRA · 应位质点</div>
              <div className="big-result">{result.seph.n} · {result.seph.latin} · {result.seph.zh}</div>

              <div className="lbl">ARCANVM · 对应大牌</div>
              <div className="big-result">{result.arc.roman} · {result.arc.zh} · <em>{result.arc.latin}</em></div>

              <div className="lbl">ELEMENTVM · 主元素</div>
              <div className="big-result" style={{color: result.elt.color}}>{result.elt.zh} · {result.elt.latin}</div>
            </div>
          )}
        </div>

        <div className="inv-circle-wrap">
          {result ? (
            <div className="inv-resolved">
              <SummoningCircle size={420} points={result.planet.numerus < 5 ? 5 : 7} color={result.planet.color}
                inner={result.planet.glyph} label={result.goe.name + " " + result.seph.latin + " " + result.arc.latin}/>
              <div className="inv-name-render">
                <div className="inv-rendered">{name.toUpperCase()}</div>
                <div className="inv-date">{date || "————"}</div>
              </div>
            </div>
          ) : (
            <div className="inv-empty">
              <SummoningCircle size={420} points={7} color="var(--ink-dim)" inner="?" label="ATTENDE NOMEN ATTENDE NATALEM"/>
              <div className="inv-hint">输入姓名以生成印记</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.GrimoirePages = {
  praefatio: PagePraefatio,
  "septem-planetae": PagePlanets,
  elementa: PageElementa,
  "tabula-smaragdina": PageEmerald,
  "arbor-vitae": PageTree,
  goetia: PageGoetia,
  arcana: PageArcana,
  alchemia: PageAlchemia,
  invocatio: PageInvocatio,
};
