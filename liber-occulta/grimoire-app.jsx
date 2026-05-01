// 主应用 — 终端 OS 外壳 + 章节路由 + 全部样式

const { useState, useEffect, useRef } = React;
const Pages = window.GrimoirePages;
const D = window.GRIMOIRE_DATA;

function App() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const [active, setActive] = useState("praefatio");
  const [booting, setBooting] = useState(true);
  const [bootLines, setBootLines] = useState([]);
  const [time, setTime] = useState(new Date());

  // 应用 tweaks 到 CSS vars
  useEffect(() => {
    document.body.style.setProperty("--scan-opacity", String(tweaks.scanlines));
    document.body.style.setProperty("--noise-opacity", String(tweaks.noise));
  }, [tweaks.scanlines, tweaks.noise]);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // 启动序列
  useEffect(() => {
    const seq = [
      "[ OK ] codex.kernel · 0.93b loaded",
      "[ OK ] mounting /vellum at /dev/sda0",
      "[ OK ] cryptographic seal verified · SHA-256",
      "[ .. ] consulting tabula planetarum",
      "[ OK ] tabula loaded · 7 corpora caelestia",
      "[ OK ] arbor vitae · 10 sephiroth · 22 paths",
      "[ OK ] ars goetia · 72 spiritus indexed",
      "[ OK ] arcana maiora · 22 imagines",
      "[ !! ] daemon.invocatio listening on :0xAEON",
      "[ OK ] codex ready · attende",
    ];
    let i = 0;
    const id = setInterval(() => {
      setBootLines(s => [...s, seq[i]]);
      i++;
      if (i >= seq.length) {
        clearInterval(id);
        setTimeout(() => setBooting(false), 600);
      }
    }, 130);
    return () => clearInterval(id);
  }, []);

  const Page = Pages[active] || (() => null);
  const activeChap = D.liber.find(c => c.id === active);

  return (
    <div className="os">
      {/* 顶部状态栏 */}
      <div className="os-bar">
        <div className="os-bar-l">
          <span className="os-glyph">⛧</span>
          <span className="os-title">CODEX · CYBERNETICVS</span>
          <span className="os-ver">v0.93b</span>
        </div>
        <div className="os-bar-c">
          <span className="os-mono">FOLIVM / {activeChap?.number || "—"} · {activeChap?.latin}</span>
        </div>
        <div className="os-bar-r">
          <span className="os-mono dim">{time.toISOString().replace("T"," ").slice(0,19)}Z</span>
          <span className="led ok"></span>
          <span className="led amber"></span>
          <span className="led cinnabar"></span>
        </div>
      </div>

      <div className="os-body">
        {/* 左侧目录 */}
        <aside className="os-toc">
          <div className="toc-head">
            <div className="lbl">INDEX · 目录</div>
            <div className="caption">IX capita</div>
          </div>
          <ul className="toc-list">
            {D.liber.map(c => (
              <li key={c.id} className={active===c.id?"on":""}>
                <button onClick={() => setActive(c.id)}>
                  <span className="toc-num">{c.number}</span>
                  <span className="toc-mid">
                    <span className="toc-zh">{c.title}</span>
                    <span className="toc-lat">{c.latin}</span>
                  </span>
                  <span className="toc-tick">{active===c.id ? "▸" : ""}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="toc-foot">
            <div className="caption">CRT/ {tweaks.scanlines >= 0.4 ? "ON" : "DIM"}</div>
            <div className="caption blink">▌</div>
          </div>
        </aside>

        {/* 主区 */}
        <main className="os-main">
          <div className="vellum">
            <div className="vellum-folio">
              <span>FOL · {activeChap?.number}</span>
              <span>{activeChap?.latin}</span>
            </div>
            <Page/>
            <div className="vellum-folio bot">
              <span>— {activeChap?.title} —</span>
            </div>
          </div>
        </main>
      </div>

      {/* 启动覆盖层 */}
      {booting && (
        <div className="boot">
          <div className="boot-inner">
            <div className="boot-mark">
              <SummoningCircle size={140} points={7} color="var(--ink-0)" inner="א" label="LOADING CODEX CYBERNETICUS GRIMOIRE"/>
            </div>
            <div className="boot-title">CODEX · CYBERNETICVS</div>
            <div className="boot-sub">— Inicializatio —</div>
            <pre className="boot-log">
              {bootLines.map((l, i) => (
                <div key={i} className={l.includes("[ !! ]") ? "amber" : (l.includes("[ .. ]") ? "dim" : "")}>{l}</div>
              ))}
              <span className="cursor">▌</span>
            </pre>
          </div>
        </div>
      )}

      <TweaksPanel>
        <TweakSection label="CRT 效果"/>
        <TweakSlider label="扫描线强度" value={tweaks.scanlines} min={0} max={1} step={0.05}
          onChange={v => setTweak("scanlines", v)}/>
        <TweakSlider label="噪点" value={tweaks.noise} min={0} max={0.6} step={0.02}
          onChange={v => setTweak("noise", v)}/>
        <TweakToggle label="字体闪烁" value={tweaks.flicker} onChange={v => setTweak("flicker", v)}/>
        <TweakSection label="文本"/>
        <TweakToggle label="显示拉丁/希伯来术语" value={tweaks.showLatin} onChange={v => setTweak("showLatin", v)}/>
      </TweaksPanel>

      {/* 全局样式 */}
      <style>{`
        .os { width: 100vw; height: 100vh; display: flex; flex-direction: column;
          ${tweaks.flicker ? "animation: flicker 7s infinite;" : ""}
          color: var(--ink-bone);
        }

        .os-bar {
          height: 32px; flex: none;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 14px;
          background: linear-gradient(to bottom, var(--bg-2), var(--bg-1));
          border-bottom: 1px solid var(--rule);
          font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--ink-0);
        }
        .os-bar-l, .os-bar-c, .os-bar-r { display: flex; align-items: center; gap: 12px; }
        .os-glyph { font-size: 14px; color: var(--ink-amber); }
        .os-title { color: var(--ink-bone); }
        .os-ver { color: var(--ink-dim); }
        .os-mono { font-family: var(--mono); }
        .dim { color: var(--ink-dim); }
        .led { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 6px currentColor; }
        .led.ok { background: var(--ink-0); color: var(--ink-0); animation: blink 2s infinite;}
        .led.amber { background: var(--ink-amber); color: var(--ink-amber); }
        .led.cinnabar { background: var(--ink-cinnabar); color: var(--ink-cinnabar); }

        .os-body { flex: 1; display: flex; min-height: 0; }

        /* TOC */
        .os-toc {
          width: 250px; flex: none;
          background: var(--bg-1);
          border-right: 1px solid var(--rule);
          display: flex; flex-direction: column;
          padding: 14px 0;
        }
        .toc-head { padding: 0 16px 12px; border-bottom: 1px dashed var(--rule); }
        .lbl { font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
          color: var(--ink-amber-dim); text-transform: uppercase; }
        .caption { font-family: var(--mono); font-size: 9.5px; color: var(--ink-dim); letter-spacing: 0.12em; margin-top: 4px;}
        .toc-list { list-style: none; padding: 8px 0; margin: 0; flex: 1; overflow-y: auto; }
        .toc-list li button {
          width: 100%; background: transparent; border: 0;
          padding: 9px 16px; cursor: pointer; text-align: left;
          display: grid; grid-template-columns: 28px 1fr 14px; gap: 8px; align-items: center;
          color: var(--ink-bone); border-left: 2px solid transparent;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .toc-list li button:hover { background: oklch(0.22 0.015 75 / 0.5); color: var(--ink-0); }
        .toc-list li.on button { background: oklch(0.24 0.018 75 / 0.55); border-left-color: var(--ink-0); color: var(--ink-0); }
        .toc-num { font-family: var(--mono); font-size: 11px; color: var(--ink-amber-dim); letter-spacing: 0.08em; }
        .toc-mid { display: flex; flex-direction: column; gap: 1px; }
        .toc-zh { font-family: var(--serif); font-size: 16px; }
        .toc-lat { font-family: var(--serif); font-style: italic; font-size: 10.5px; color: var(--ink-dim); letter-spacing: 0.06em; }
        .toc-tick { color: var(--ink-amber); font-family: var(--mono); }
        .toc-foot { padding: 12px 16px; border-top: 1px dashed var(--rule); display: flex; justify-content: space-between; }
        .blink { animation: blink 1.2s infinite; }

        /* MAIN */
        .os-main { flex: 1; min-width: 0; padding: 20px; overflow: hidden; }
        .vellum {
          width: 100%; height: 100%;
          background:
            radial-gradient(ellipse at 30% 20%, oklch(0.22 0.02 75 / 0.5), transparent 60%),
            radial-gradient(ellipse at 70% 90%, oklch(0.18 0.025 28 / 0.4), transparent 60%),
            var(--bg-vellum);
          border: 1px solid var(--rule-strong);
          box-shadow: inset 0 0 80px oklch(0.08 0.01 60 / 0.7), 0 0 30px oklch(0.05 0 0 / 0.6);
          position: relative;
          overflow-y: auto;
        }
        .vellum::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.13 0 0 0 0 0.08 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          opacity: 0.18; mix-blend-mode: multiply;
        }
        .vellum-folio { position: sticky; top: 0; z-index: 2;
          display: flex; justify-content: space-between;
          padding: 10px 24px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
          color: var(--ink-amber-dim);
          border-bottom: 1px dashed var(--rule);
          background: oklch(0.19 0.018 75 / 0.94); backdrop-filter: blur(2px);
        }
        .vellum-folio.bot { border-top: 1px dashed var(--rule); border-bottom: 0; position: static; justify-content: center; }

        .page { padding: 28px 56px 48px; max-width: 1100px; margin: 0 auto; position: relative; z-index: 1;}

        /* Chapter header */
        .chap-head { text-align: center; padding: 20px 0 28px; border-bottom: 1px solid var(--rule); margin-bottom: 32px; }
        .chap-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-amber-dim); }
        .chap-latin { font-family: var(--serif); font-style: italic; font-size: 22px; color: var(--ink-amber); margin: 6px 0 4px; letter-spacing: 0.12em;}
        .chap-title { font-family: var(--serif); font-weight: 600; font-size: 56px; color: var(--ink-bone); letter-spacing: 0.04em; line-height: 1.1; margin: 6px 0; }
        .chap-sub { font-family: var(--serif-body); font-style: italic; font-size: 14px; color: var(--ink-dim); margin: 8px 0 14px; letter-spacing: 0.08em; }

        .cinnabar { color: var(--ink-cinnabar) !important; }
        .hebrew { font-family: var(--serif); font-size: 1.05em; }

        /* PRAEFATIO */
        .page-praef { display: flex; flex-direction: column; min-height: calc(100% - 80px); padding: 24px 56px; }
        .praef-mono-top, .praef-mono-bot {
          display: flex; justify-content: space-between;
          font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.15em;
          color: var(--ink-amber-dim);
          padding: 10px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
        }
        .praef-mono-top em { font-style: normal; color: var(--ink-cinnabar); }
        .praef-center { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px 0; gap: 14px;}
        .praef-overline { font-family: var(--mono); font-size: 12px; letter-spacing: 0.5em; color: var(--ink-amber); }
        .praef-title { font-family: var(--serif); font-weight: 600; font-size: 110px; letter-spacing: 0.18em; color: var(--ink-bone);
          margin: 6px 0; text-shadow: 0 0 24px oklch(0.78 0.08 150 / 0.3); }
        .praef-sub { font-family: var(--serif); font-style: italic; font-size: 17px; color: var(--ink-amber); letter-spacing: 0.08em; }
        .praef-circle { color: var(--ink-0); margin: 18px 0; }
        .praef-quote { text-align: center; font-family: var(--serif); font-size: 18px; color: var(--ink-amber); max-width: 600px; margin-top: 4px; }
        .praef-quote-zh { font-family: var(--serif-body); color: var(--ink-bone); font-style: normal; margin-top: 6px; font-size: 15px; opacity: 0.9; }

        /* PLANETS */
        .planets-row { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-bottom: 26px;}
        .planet-pill {
          background: var(--bg-1); border: 1px solid var(--rule); cursor: pointer;
          padding: 12px 8px; display: flex; flex-direction: column; align-items: center; gap: 4px;
          color: var(--ink-bone); transition: all 0.15s;
        }
        .planet-pill:hover { border-color: var(--ink-amber-dim); background: var(--bg-2); }
        .planet-pill.on { border-color: var(--ink-amber); background: oklch(0.22 0.02 75); box-shadow: 0 0 14px oklch(0.74 0.11 78 / 0.25); }
        .planet-pill-glyph { font-size: 26px; color: var(--ink-amber); line-height: 1;}
        .planet-pill-zh { font-family: var(--serif); font-size: 14px; }
        .planet-pill-lat { font-family: var(--serif); font-style: italic; font-size: 10px; color: var(--ink-dim); letter-spacing: 0.08em;}

        .planet-detail { display: grid; grid-template-columns: 240px 1fr 1fr; gap: 30px; align-items: start;}
        .planet-detail-left { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
        .big-glyph { font-size: 90px; line-height: 1; text-shadow: 0 0 30px currentColor; }
        .planet-name-zh { font-family: var(--serif); font-size: 36px; line-height: 1; }
        .planet-name-lat { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-amber); letter-spacing: 0.1em; margin-bottom: 6px;}
        .kv { font-family: var(--mono); font-size: 11.5px; border-collapse: collapse; width: 100%; }
        .kv td { padding: 4px 0; border-bottom: 1px dashed var(--rule); }
        .kv td:first-child { color: var(--ink-amber-dim); letter-spacing: 0.16em; padding-right: 12px; width: 90px; }
        .kv td:last-child { color: var(--ink-bone); }
        .planet-virtus { margin-top: 8px; }
        .planet-virtus p { font-family: var(--serif-body); font-size: 14px; line-height: 1.5; color: var(--ink-bone); margin: 4px 0 12px;}

        .lbl.center { text-align: center; }
        .planet-detail-mid, .planet-detail-right { display: flex; flex-direction: column; align-items: center; gap: 10px;}
        .planet-detail-mid > svg { color: var(--ink-amber); }
        .sigil-frame {
          padding: 20px;
          border: 1px solid var(--rule);
          background: radial-gradient(circle, oklch(0.16 0.012 60), transparent 70%);
        }
        .caption.center { text-align: center; }

        /* ELEMENTS */
        .elementa-cross {
          position: relative; height: 540px; max-width: 720px; margin: 12px auto 0;
        }
        .elementa-bg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .el-card {
          position: absolute; min-width: 160px; text-align: center;
          background: oklch(0.17 0.012 60 / 0.85); border: 1px solid var(--rule);
          padding: 14px 16px; backdrop-filter: blur(2px);
        }
        .el-zh { font-family: var(--serif); font-size: 30px; color: inherit; line-height: 1.1; margin-top: 4px;}
        .el-lat { font-family: var(--serif); font-style: italic; font-size: 13px; color: var(--ink-amber); letter-spacing: 0.08em;}
        .el-q { font-family: var(--mono); font-size: 10px; color: var(--ink-dim); letter-spacing: 0.12em; margin-top: 4px;}
        .el-meta { font-family: var(--serif-body); font-size: 12px; color: var(--ink-bone); margin-top: 4px;}
        .el-arch { font-family: var(--serif); font-style: italic; font-size: 11px; color: var(--ink-amber-dim); margin-top: 2px; letter-spacing: 0.1em;}
        .elementa-center {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 110px; height: 110px; border-radius: 50%;
          background: radial-gradient(circle, oklch(0.25 0.04 80) 0%, oklch(0.15 0.01 60) 70%);
          border: 1px solid var(--ink-amber);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          box-shadow: 0 0 24px oklch(0.74 0.11 78 / 0.3);
        }
        .azoth { font-family: var(--serif); font-style: italic; font-size: 22px; color: var(--ink-amber); letter-spacing: 0.1em;}
        .azoth-zh { font-family: var(--serif-body); font-size: 11px; color: var(--ink-bone); margin-top: 2px;}

        /* EMERALD */
        .emerald-frame { display: grid; grid-template-columns: 1fr 280px; gap: 36px; align-items: start; }
        .emerald-attribution { grid-column: 1 / -1; text-align: center; padding-bottom: 14px; border-bottom: 1px dashed var(--rule); margin-bottom: 8px;}
        .big-name { font-family: var(--serif); font-size: 36px; color: var(--ink-amber); margin: 4px 0; letter-spacing: 0.06em; }
        .zh-name { font-family: var(--serif-body); font-size: 16px; color: var(--ink-bone); }
        .emerald-text { list-style: none; padding: 0; margin: 0; font-family: var(--serif-body); font-size: 17px; line-height: 1.85; }
        .emerald-text li { display: grid; grid-template-columns: 36px 1fr; gap: 12px; padding: 8px 0; border-bottom: 1px dotted var(--rule); }
        .verse-n { font-family: var(--mono); color: var(--ink-amber); font-size: 12px; padding-top: 5px;}
        .verse-text { color: var(--ink-bone); }
        .emerald-seal { display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--ink-amber); position: sticky; top: 60px;}
        .vitriol { font-family: var(--mono); font-size: 16px; letter-spacing: 0.4em; color: var(--ink-amber); }
        .vitriol-zh { font-family: var(--serif-body); font-size: 12px; color: var(--ink-bone); text-align: center; max-width: 240px;}

        /* TREE */
        .tree-row { display: grid; grid-template-columns: auto 1fr; gap: 30px; align-items: start;}
        .tree-svg { color: var(--ink-amber); }
        .tree-list { display: flex; flex-direction: column; gap: 4px; }
        .seph-row { display: grid; grid-template-columns: 32px 60px 100px 70px 1fr; gap: 12px;
          padding: 8px 12px; border-bottom: 1px dotted var(--rule); cursor: default;
          font-family: var(--serif-body); font-size: 14px; transition: background 0.12s; }
        .seph-row:hover, .seph-row.on { background: oklch(0.22 0.02 75 / 0.5); color: var(--ink-amber); }
        .seph-n { font-family: var(--mono); color: var(--ink-amber); }
        .seph-he { font-size: 18px; color: var(--ink-bone); }
        .seph-lat { font-family: var(--serif); font-style: italic; color: var(--ink-amber); }
        .seph-zh { font-family: var(--serif); font-weight: 500; }
        .seph-meaning { font-size: 13px; color: var(--ink-dim); }

        /* GOETIA */
        .goetia-warn { font-family: var(--mono); font-size: 11px; padding: 8px 12px;
          border: 1px solid var(--ink-cinnabar); margin-bottom: 20px; letter-spacing: 0.06em;
          background: oklch(0.18 0.04 28 / 0.4);}
        .goetia-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; }
        .goetia-list { display: flex; flex-direction: column; }
        .goetia-row { width: 100%; background: transparent; border: 0; cursor: pointer;
          display: grid; grid-template-columns: 36px 90px 70px 80px 1fr; gap: 10px;
          padding: 10px 8px; text-align: left; align-items: center;
          color: var(--ink-bone); border-bottom: 1px dotted var(--rule); transition: background 0.12s; }
        .goetia-row:hover { background: oklch(0.22 0.02 75 / 0.4); }
        .goetia-row.on { background: oklch(0.25 0.04 75 / 0.6); color: var(--ink-amber); border-left: 2px solid var(--ink-amber); padding-left: 6px;}
        .g-rank { font-family: var(--mono); font-size: 11px; color: var(--ink-amber-dim); }
        .g-name { font-family: var(--serif); font-weight: 600; letter-spacing: 0.1em; font-size: 14px; }
        .g-zh { font-family: var(--serif); font-size: 14px; }
        .g-title { font-family: var(--mono); font-size: 10px; color: var(--ink-dim); letter-spacing: 0.1em;}
        .g-leg { font-family: var(--mono); font-size: 10px; color: var(--ink-amber-dim); text-align: right; }

        .goetia-detail { padding: 20px; border: 1px solid var(--rule); background: oklch(0.16 0.012 60 / 0.6); position: sticky; top: 60px;}
        .g-d-rank { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.2em; color: var(--ink-amber-dim);}
        .g-d-name { font-family: var(--serif); font-weight: 600; font-size: 38px; letter-spacing: 0.16em; color: var(--ink-amber); margin-top: 4px; line-height: 1;}
        .g-d-zh { font-family: var(--serif); font-size: 24px; color: var(--ink-bone); margin-top: 4px;}
        .g-d-title { font-family: var(--serif); font-style: italic; font-size: 13px; color: var(--ink-dim); letter-spacing: 0.06em; margin-top: 2px;}
        .g-d-sigil { display: flex; justify-content: center; padding: 18px 0; }
        .g-d-sec { margin-top: 10px; }
        .g-d-sec p { font-family: var(--serif-body); font-size: 14px; line-height: 1.55; color: var(--ink-bone); margin: 4px 0 0;}

        /* ARCANA */
        .arcana-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
        .arc-card { aspect-ratio: 5/8; padding: 12px 10px;
          border: 1px solid var(--rule-strong); background: linear-gradient(170deg, oklch(0.2 0.02 75), oklch(0.14 0.01 60));
          display: flex; flex-direction: column; justify-content: space-between; text-align: center;
          position: relative; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;}
        .arc-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px oklch(0.05 0 0 / 0.6); border-color: var(--ink-amber);}
        .arc-roman { font-family: var(--serif); font-size: 22px; color: var(--ink-amber); letter-spacing: 0.1em;}
        .arc-mid { display: flex; justify-content: center; align-items: center; gap: 12px; flex: 1;}
        .arc-planet { font-size: 28px; color: var(--ink-amber); }
        .arc-letter { font-size: 36px; color: var(--ink-bone); text-shadow: 0 0 8px oklch(0.78 0.08 150 / 0.4);}
        .arc-zh { font-family: var(--serif); font-weight: 600; font-size: 19px; }
        .arc-lat { font-family: var(--serif); font-style: italic; font-size: 12px; color: var(--ink-amber); letter-spacing: 0.06em;}
        .arc-letter-name { font-family: var(--mono); font-size: 9.5px; color: var(--ink-dim); letter-spacing: 0.18em; margin-top: 2px;}

        /* ALCHEMIA */
        .alch-stages { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 0 0 28px; }
        .alch-stage {
          padding: 18px 14px; text-align: center; border: 1px solid var(--rule);
          position: relative; overflow: hidden;
          background: linear-gradient(170deg, var(--phase-color), oklch(0.13 0.01 60));
        }
        .alch-stage::before { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.4); z-index: 0;}
        .alch-stage > * { position: relative; z-index: 1; }
        .alch-num { font-family: var(--mono); font-size: 10px; color: var(--ink-amber-dim); letter-spacing: 0.3em; }
        .alch-glyph { font-size: 48px; line-height: 1; margin: 8px 0; color: var(--ink-amber);}
        .alch-lat { font-family: var(--serif); font-weight: 600; font-size: 17px; color: var(--ink-bone); letter-spacing: 0.18em;}
        .alch-zh { font-family: var(--serif); font-size: 22px; color: var(--ink-amber); margin-top: 2px; }
        .alch-phase { font-family: var(--mono); font-size: 10px; color: var(--ink-dim); letter-spacing: 0.14em; margin: 6px 0;}
        .alch-motto { font-family: var(--serif); font-style: italic; color: var(--ink-amber); font-size: 14px; }
        .alch-desc { font-family: var(--serif-body); font-size: 13px; color: var(--ink-bone); margin-top: 6px; line-height: 1.5;}

        .alch-formula { text-align: center; padding: 20px 0; border-top: 1px dashed var(--rule); border-bottom: 1px dashed var(--rule); }
        .formula-line { display: flex; justify-content: center; gap: 16px; align-items: baseline;}
        .big-lat { font-family: var(--serif); font-size: 56px; color: var(--ink-amber); letter-spacing: 0.18em; text-shadow: 0 0 20px oklch(0.74 0.11 78 / 0.4);}
        .amp { font-family: var(--serif); font-size: 32px; color: var(--ink-dim);}
        .formula-zh { font-family: var(--serif-body); font-size: 16px; color: var(--ink-bone); margin-top: 6px;}

        /* INVOCATIO */
        .inv-grid { display: grid; grid-template-columns: 360px 1fr; gap: 36px; align-items: start;}
        .inv-form { display: flex; flex-direction: column; gap: 4px;}
        .inv-input { background: var(--bg-1); border: 1px solid var(--rule-strong);
          color: var(--ink-bone); font-family: var(--serif); font-size: 18px;
          padding: 10px 12px; outline: none; margin: 4px 0 14px; letter-spacing: 0.06em;}
        .inv-input.mono { font-family: var(--mono); }
        .inv-input:focus { border-color: var(--ink-amber); box-shadow: 0 0 0 1px var(--ink-amber); }
        .inv-btn { background: var(--bg-2); border: 1px solid var(--ink-amber);
          color: var(--ink-amber); font-family: var(--mono); font-size: 12px; letter-spacing: 0.3em;
          padding: 10px; cursor: pointer; transition: background 0.15s;}
        .inv-btn:hover:not(:disabled) { background: oklch(0.74 0.11 78 / 0.18); color: var(--ink-bone);}
        .inv-btn:disabled { opacity: 0.4; cursor: not-allowed;}
        .inv-console { font-family: var(--mono); font-size: 11.5px; color: var(--ink-0);
          background: oklch(0.1 0.005 60); padding: 10px 12px; margin: 12px 0 0; border-left: 2px solid var(--ink-0);
          white-space: pre-line; min-height: 90px;}
        .inv-console .cursor { animation: blink 1s infinite; color: var(--ink-0); margin-left: 4px;}
        .inv-readout { margin-top: 16px; padding-top: 14px; border-top: 1px dashed var(--rule); display: flex; flex-direction: column; gap: 2px; }
        .inv-readout .lbl { margin-top: 8px; }
        .big-result { font-family: var(--serif); font-size: 18px; color: var(--ink-bone); letter-spacing: 0.04em;}
        .big-result em { font-style: italic; color: var(--ink-amber); font-size: 14px; }
        .mono { font-family: var(--mono); }

        .inv-circle-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; padding-top: 10px;}
        .inv-resolved, .inv-empty { display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .inv-empty { color: var(--ink-dim); }
        .inv-empty .inv-hint { font-family: var(--serif); font-style: italic; color: var(--ink-dim); }
        .inv-name-render { text-align: center; padding-top: 4px; }
        .inv-rendered { font-family: var(--serif); font-size: 28px; color: var(--ink-amber); letter-spacing: 0.2em; text-shadow: 0 0 16px oklch(0.74 0.11 78 / 0.5);}
        .inv-date { font-family: var(--mono); font-size: 12px; color: var(--ink-dim); letter-spacing: 0.2em; margin-top: 4px;}

        /* BOOT */
        .boot { position: fixed; inset: 0; z-index: 9999;
          background: var(--bg-0);
          display: flex; align-items: center; justify-content: center;
          animation: flicker 3s infinite;
        }
        .boot-inner { text-align: center; color: var(--ink-0); max-width: 520px;}
        .boot-mark { display: flex; justify-content: center; }
        .boot-title { font-family: var(--serif); font-size: 38px; letter-spacing: 0.2em; color: var(--ink-bone); margin-top: 18px; text-shadow: 0 0 16px oklch(0.78 0.08 150 / 0.5);}
        .boot-sub { font-family: var(--serif); font-style: italic; color: var(--ink-amber); margin-top: 4px;}
        .boot-log { font-family: var(--mono); font-size: 11.5px; text-align: left; margin-top: 24px;
          background: oklch(0.1 0.005 60); padding: 14px; border-left: 2px solid var(--ink-0);}
        .boot-log .amber { color: var(--ink-amber); }
        .boot-log .dim { color: var(--ink-dim); }
        .boot-log .cursor { animation: blink 1s infinite; }

        @media (max-width: 1100px) {
          .planet-detail { grid-template-columns: 1fr; }
          .goetia-grid { grid-template-columns: 1fr; }
          .inv-grid { grid-template-columns: 1fr; }
          .tree-row { grid-template-columns: 1fr; }
          .emerald-frame { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
