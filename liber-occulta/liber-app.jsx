// Liber app — 真实手稿在线版

const { useState, useEffect } = React;
const Pages = window.LiberPages;
const TOC = window.LIBER_TOC;

function App() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const [active, setActive] = useState("front");
  const Page = Pages[active];
  const cur = TOC.find(t => t.id === active);
  const idx = TOC.findIndex(t => t.id === active);

  useEffect(() => {
    document.documentElement.style.setProperty("--user-fontsize", tweaks.fontSize + "px");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active, tweaks.fontSize]);

  return (
    <div className="liber" style={{ fontSize: tweaks.fontSize }}>
      <header className="liber-running">
        <span>LIBER OCCVLTÆ SAPIENTIÆ</span>
        <span>·</span>
        <span>{cur?.latin}</span>
      </header>

      <div className="liber-shell">
        <aside className="liber-toc">
          <div className="toc-h">
            <em>INDEX · 目录</em>
            <span>XI capita</span>
          </div>
          <ol className="toc-ol">
            {TOC.map(t => (
              <li key={t.id} className={active===t.id?"on":""}>
                <button onClick={()=>setActive(t.id)}>
                  <span className="toc-n">{t.n}</span>
                  <span className="toc-mid">
                    <span className="toc-lat"><em>{t.latin}</em></span>
                    <span className="toc-zh">{t.zh}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <main className="liber-page">
          <CornerVine corner="tl" size={70}/>
          <CornerVine corner="tr" size={70}/>
          <Page/>
          <CornerVine corner="bl" size={70}/>
          <CornerVine corner="br" size={70}/>

          <nav className="folio-nav">
            {idx > 0 && (
              <button className="fnav prev" onClick={()=>setActive(TOC[idx-1].id)}>
                ◂ {TOC[idx-1].zh}
              </button>
            )}
            <span className="folio-pn">— folium {cur?.n} —</span>
            {idx < TOC.length-1 && (
              <button className="fnav next" onClick={()=>setActive(TOC[idx+1].id)}>
                {TOC[idx+1].zh} ▸
              </button>
            )}
          </nav>
        </main>
      </div>

      <TweaksPanel>
        <TweakSection label="阅读"/>
        <TweakSlider label="字号" value={tweaks.fontSize} min={14} max={22} step={1} unit="px"
          onChange={v => setTweak("fontSize", v)}/>
      </TweaksPanel>

      <style>{`
        .liber { color: var(--ink); }
        .liber-running { display: flex; gap: 14px; justify-content: center; align-items: baseline;
          font-family: var(--sc); font-size: 11px; letter-spacing: 0.4em;
          color: var(--ink-faded); padding: 14px 0 6px; border-bottom: 1px solid var(--rule-soft);
          margin: 0 64px 12px; }

        .liber-shell { display: grid; grid-template-columns: 240px 1fr; gap: 28px; max-width: 1240px; margin: 0 auto; padding: 0 28px 60px; }

        /* TOC */
        .liber-toc { position: sticky; top: 16px; align-self: start; padding: 16px 8px 16px 0;
          border-right: 1px solid var(--rule-soft); }
        .toc-h { display: flex; justify-content: space-between; padding: 0 14px 10px;
          border-bottom: 1px solid var(--rule-soft); margin-bottom: 8px;
          font-family: var(--sc); font-size: 10px; letter-spacing: 0.3em; color: var(--ink-faded);}
        .toc-ol { list-style: none; padding: 0; margin: 0; }
        .toc-ol li button { width: 100%; background: transparent; border: 0; cursor: pointer;
          padding: 9px 14px; display: grid; grid-template-columns: 32px 1fr; gap: 10px;
          text-align: left; color: var(--ink); border-left: 2px solid transparent;
          transition: background 0.15s, border-color 0.15s; align-items: center;}
        .toc-ol li button:hover { background: rgba(184,166,116,0.12); }
        .toc-ol li.on button { background: rgba(184,166,116,0.22); border-left-color: var(--rubric); }
        .toc-n { font-family: var(--serif-old); font-size: 14px; color: var(--rubric); font-style: italic;}
        .toc-mid { display: flex; flex-direction: column; gap: 1px; line-height: 1.2;}
        .toc-lat { font-family: var(--serif-old); font-size: 12px; color: var(--ink-faded); font-style: italic;}
        .toc-zh { font-family: var(--serif); font-size: 16px; }
        .toc-ol li.on .toc-lat { color: var(--ink); }

        /* PAGE */
        .liber-page {
          position: relative; padding: 30px 56px 60px; min-height: 80vh;
          background: linear-gradient(to right, transparent 0, rgba(184,166,116,0.05) 100%);
        }

        /* Chapter title */
        .ch-title { text-align: center; padding: 18px 0 28px; margin-bottom: 32px; border-bottom: 1px solid var(--rule-soft);}
        .ch-liber { font-family: var(--sc); font-size: 11px; letter-spacing: 0.4em; color: var(--ink-faded);}
        .ch-latin { font-family: var(--serif-display); font-style: italic; font-size: 26px; color: var(--ink-soft); margin: 6px 0 2px; letter-spacing: 0.04em;}
        .ch-zh { font-family: var(--serif-display); font-weight: 600; font-size: 56px; line-height: 1.05; margin: 4px 0 8px; letter-spacing: 0.06em;}
        .ch-sub { font-family: var(--serif); font-style: italic; color: var(--ink-faded); font-size: 14px; margin-bottom: 14px;}

        .sub-h { font-family: var(--sc); font-size: 12px; letter-spacing: 0.3em; color: var(--ink-faded);
          border-bottom: 1px solid var(--rule-soft); padding-bottom: 4px; margin: 22px 0 10px;}
        .sub-h.center { text-align: center; border: 0; }
        .lead { font-family: var(--serif); font-size: 1.04em; line-height: 1.7; }
        .dim { color: var(--ink-faded); }
        .rubric-text { color: var(--rubric); }
        .mono { font-family: var(--mono); font-size: 0.9em; }
        .small { font-size: 0.88em; }

        /* DropCap */
        .drop-cap { position: relative; float: left; margin: 4px 10px 0 0; line-height: 1; }
        .drop-cap .dc-bg { display: block; }
        .drop-cap .dc-letter {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          font-family: var(--serif-display); font-weight: 600; font-size: calc(var(--dc-size) * 0.7);
          color: #f5ecd6; text-shadow: 1px 1px 0 rgba(0,0,0,0.3);
        }

        /* Chapter rule */
        .chapter-rule { display: flex; align-items: center; gap: 14px; margin: 28px auto; max-width: 460px;}
        .chapter-rule .rule-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--ink-faded), transparent); }
        .chapter-rule .rule-orn { font-family: var(--serif-display); color: var(--rubric); font-size: 22px; }

        /* Margin notes */
        .margin-note { background: rgba(184,166,116,0.12); border-left: 3px solid var(--rubric);
          padding: 10px 14px; margin: 16px 0; font-size: 0.92em; line-height: 1.55;
          font-family: var(--serif); position: relative; }
        .marginal-rule { display: block; width: 26px; height: 1px; background: var(--ink-faded); margin-bottom: 6px; }

        /* Front page */
        .folio-front { text-align: center; padding-top: 30px; max-width: 720px; margin: 0 auto;}
        .front-overline { font-family: var(--sc); font-size: 12px; letter-spacing: 0.55em; color: var(--ink-faded);}
        .front-title { font-family: var(--serif-display); font-weight: 600; font-size: 86px; letter-spacing: 0.16em; margin: 12px 0 0;}
        .front-latin { font-family: var(--serif-display); font-style: italic; font-size: 28px; color: var(--rubric); letter-spacing: 0.06em; margin-top: 4px;}
        .front-sub { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-faded); margin: 10px 0 22px;}
        .front-piece { display: flex; justify-content: center; padding: 8px 0; }
        .front-byline { font-family: var(--serif-display); font-style: italic; font-size: 17px; color: var(--ink-soft); margin-top: 18px;}
        .bl-row { padding: 2px 0; }
        .front-note { font-family: var(--serif); font-style: italic; font-size: 14px; max-width: 540px; margin: 22px auto 0; color: var(--ink-soft); line-height: 1.65;}

        /* Verse list */
        .verse-list { list-style: none; padding: 0; margin: 16px 0; counter-reset: verse;}
        .verse-list li { display: grid; grid-template-columns: 40px 1fr; gap: 14px;
          padding: 8px 0; border-bottom: 1px dotted var(--rule-soft);
          font-family: var(--serif); font-size: 1.05em; line-height: 1.7;}
        .v-n { font-family: var(--serif-old); font-style: italic; color: var(--rubric); padding-top: 5px; text-align: right;}

        /* Vitriol */
        .vitriol-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin: 14px 0;}
        .vit-cell { text-align: center; padding: 10px 4px; border: 1px solid var(--rule-soft); background: rgba(245,236,214,0.5);}
        .vit-letter { font-family: var(--serif-display); font-weight: 600; font-size: 38px; color: var(--rubric); line-height: 1;}
        .vit-lat { font-family: var(--serif); font-style: italic; font-size: 13px; margin-top: 4px; color: var(--ink);}
        .vit-zh { font-family: var(--serif); font-size: 13px; color: var(--ink-soft); margin-top: 2px;}
        .vit-trans { font-family: var(--serif); font-style: italic; text-align: center; color: var(--ink-soft); margin-top: 12px;}

        .emerald-attr { font-family: var(--serif); font-style: italic; padding: 14px 18px;
          background: rgba(184,166,116,0.1); border-top: 1px solid var(--rule-soft); border-bottom: 1px solid var(--rule-soft);
          margin: 0 0 22px; color: var(--ink-soft); line-height: 1.65;}

        /* Planet */
        .planet-tabs { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin: 16px 0 22px;}
        .pt { background: transparent; border: 1px solid var(--rule-soft); cursor: pointer;
          padding: 10px 4px; display: flex; flex-direction: column; align-items: center; gap: 4px;
          color: var(--ink); transition: background 0.15s; }
        .pt:hover { background: rgba(184,166,116,0.15); }
        .pt.on { background: rgba(138,28,28,0.1); border-color: var(--rubric); }
        .pt-g { font-size: 24px; line-height: 1;}
        .pt-z { font-family: var(--serif); font-size: 14px;}
        .planet-detail { padding: 0; }
        .pd-head { display: grid; grid-template-columns: auto 1fr auto; gap: 22px; align-items: center; padding: 14px 0 22px; border-bottom: 1px solid var(--rule-soft);}
        .pd-glyph { font-size: 76px; line-height: 1; }
        .pd-zh { font-family: var(--serif-display); font-weight: 600; font-size: 44px; line-height: 1;}
        .pd-lat { font-family: var(--serif-display); font-size: 18px; color: var(--rubric); letter-spacing: 0.04em;}
        .pd-day { font-family: var(--sc); font-size: 11px; letter-spacing: 0.25em; color: var(--ink-faded); margin-top: 4px;}
        .pd-sigil { color: var(--ink); }
        .pd-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; margin-top: 18px;}
        .pd-cols p { font-family: var(--serif); }
        .corr-tbl { width: 100%; border-collapse: collapse; font-family: var(--serif); }
        .corr-tbl th { text-align: left; font-family: var(--sc); font-size: 11px; letter-spacing: 0.2em;
          color: var(--ink-faded); padding: 6px 8px 6px 0; vertical-align: top; width: 70px;}
        .corr-tbl td { padding: 6px 0; border-bottom: 1px dotted var(--rule-soft); font-size: 0.96em;}
        .pd-kamea { margin-top: 26px; }
        .kamea-row { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; align-items: flex-start; padding-top: 12px;}
        .kamea-pane { display: flex; flex-direction: column; align-items: center; gap: 8px;}
        .caption { font-family: var(--serif); font-style: italic; font-size: 13px; color: var(--ink-faded); text-align: center; max-width: 280px;}

        /* Tools */
        .tool-block { padding: 18px 0; }
        .tool-controls { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end; padding: 14px 16px; background: rgba(184,166,116,0.1); border: 1px solid var(--rule-soft); margin-bottom: 18px;}
        .tool-row { display: flex; flex-direction: column; gap: 4px; }
        .tool-row label { font-family: var(--sc); font-size: 10px; letter-spacing: 0.25em; color: var(--ink-faded);}
        .tool-row input, .tool-row select { font-family: var(--serif); font-size: 15px; padding: 6px 10px;
          background: var(--paper-2); border: 1px solid var(--rule); color: var(--ink); outline: none;}
        .tool-row input:focus, .tool-row select:focus { border-color: var(--rubric); }
        .tool-btn { font-family: var(--sc); font-size: 13px; letter-spacing: 0.3em;
          background: var(--rubric); color: #f5ecd6; border: 0; padding: 10px 22px; cursor: pointer;
          transition: background 0.15s;}
        .tool-btn:hover { background: var(--rubric-deep); }

        .tool-summary { display: flex; gap: 24px; flex-wrap: wrap; padding: 12px 16px; border-top: 1px dotted var(--rule-soft); border-bottom: 1px dotted var(--rule-soft); margin-bottom: 14px;}
        .ts-row { display: flex; flex-direction: column; gap: 2px; }
        .ts-row em { font-family: var(--sc); font-style: normal; font-size: 10px; letter-spacing: 0.25em; color: var(--ink-faded);}
        .ts-row strong { font-family: var(--serif-display); font-weight: 600; font-size: 18px; }

        .hour-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .hour-col-h { font-family: var(--sc); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-faded); padding-bottom: 6px; border-bottom: 1px solid var(--rule-soft); margin-bottom: 6px;}
        .hour-row { display: grid; grid-template-columns: 30px 1fr auto 60px; gap: 10px; padding: 6px 8px; align-items: center;
          font-family: var(--serif); font-size: 0.96em; border-bottom: 1px dotted var(--rule-soft);}
        .hour-row.now { background: rgba(138,28,28,0.12); border-left: 2px solid var(--rubric); padding-left: 6px;}
        .h-n { font-family: var(--serif-old); font-style: italic; color: var(--rubric);}
        .h-time { font-family: var(--mono); font-size: 0.88em; color: var(--ink-soft);}
        .h-glyph { font-size: 18px; }

        /* Tarot */
        .tarot-spread { display: flex; gap: 14px; padding: 24px 0; flex-wrap: wrap; justify-content: center; }
        .spread-cross { display: grid; grid-template-columns: repeat(3, 130px); gap: 12px; justify-content: center; }
        .tarot-card { width: 130px; aspect-ratio: 5/8; padding: 10px 8px; text-align: center;
          background: linear-gradient(170deg, var(--paper-2), var(--paper-1));
          border: 1px solid var(--rule); display: flex; flex-direction: column; justify-content: space-between;
          opacity: 0; transform: translateY(8px); transition: opacity 0.5s, transform 0.5s, box-shadow 0.2s;
          box-shadow: 1px 2px 6px rgba(0,0,0,0.18);}
        .tarot-card.on { opacity: 1; transform: translateY(0); }
        .tarot-card.reversed .tc-roman, .tarot-card.reversed .tc-glyph, .tarot-card.reversed .tc-zh { transform: rotate(180deg); }
        .tarot-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.25); }
        .tc-pos { font-family: var(--sc); font-size: 9.5px; letter-spacing: 0.3em; color: var(--rubric);}
        .tc-roman { font-family: var(--serif-display); font-size: 20px; color: var(--rubric); letter-spacing: 0.06em;}
        .tc-glyph { font-size: 30px; color: var(--ink);}
        .tc-zh { font-family: var(--serif-display); font-weight: 600; font-size: 18px; }
        .tc-lat { font-family: var(--serif); font-style: italic; font-size: 11px; color: var(--ink-soft);}
        .tc-letter { font-size: 22px; color: var(--ink);}
        .tc-rev { font-family: var(--sc); font-size: 9px; letter-spacing: 0.3em; color: var(--rubric);}

        /* Elements */
        .el-table { width: 100%; border-collapse: collapse; font-family: var(--serif); margin-top: 16px;}
        .el-table th { text-align: left; font-family: var(--sc); font-size: 11px; letter-spacing: 0.25em; color: var(--ink-faded); padding: 8px 10px; border-bottom: 2px solid var(--ink-faded);}
        .el-table td { padding: 10px; border-bottom: 1px dotted var(--rule-soft); }

        /* Tree */
        .tree-row { display: grid; grid-template-columns: auto 1fr; gap: 30px; align-items: start;}
        .tree-svg { color: var(--ink); }
        .seph-tbl { width: 100%; border-collapse: collapse; font-family: var(--serif); }
        .seph-tbl tr { transition: background 0.15s; }
        .seph-tbl tr.on, .seph-tbl tr:hover { background: rgba(184,166,116,0.18);}
        .seph-tbl td { padding: 7px 10px 7px 0; border-bottom: 1px dotted var(--rule-soft);}
        .hebrew.big { font-size: 1.3em; }

        /* Hebrew letters */
        .hebrew-tbl { width: 100%; border-collapse: collapse; font-family: var(--serif); margin-top: 14px;}
        .hebrew-tbl th { text-align: left; font-family: var(--sc); font-size: 10.5px; letter-spacing: 0.25em; color: var(--ink-faded); padding: 8px 8px; border-bottom: 2px solid var(--ink-faded);}
        .hebrew-tbl td { padding: 8px; border-bottom: 1px dotted var(--rule-soft); font-size: 0.95em;}

        /* Zodiac */
        .zodiac-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-top: 14px;}
        .z-card { padding: 14px; border: 1px solid var(--rule-soft); background: rgba(245,236,214,0.5);}
        .z-glyph { font-size: 38px; line-height: 1; color: var(--rubric);}
        .z-name { font-family: var(--serif-display); font-weight: 600; font-size: 24px; margin-top: 4px;}
        .z-lat { font-family: var(--serif-display); font-size: 14px; color: var(--ink-faded);}
        .z-meta { font-family: var(--serif); font-size: 0.92em; margin-top: 8px; line-height: 1.7;}
        .z-meta span:first-child { font-family: var(--sc); font-size: 9.5px; letter-spacing: 0.2em; color: var(--ink-faded); margin-right: 6px;}

        /* Goetia */
        .goetia-warning { background: rgba(138,28,28,0.08); border-left: 3px solid var(--rubric); padding: 10px 14px; margin: 12px 0 18px; font-family: var(--serif); font-style: italic; }
        .goe-row { display: grid; grid-template-columns: 320px 1fr; gap: 24px; align-items: start; }
        .goe-list { max-height: 540px; overflow-y: auto; padding-right: 4px;}
        .goe-item { width: 100%; background: transparent; border: 0; cursor: pointer;
          display: grid; grid-template-columns: 30px 1fr auto; gap: 10px; align-items: center;
          padding: 8px 8px; text-align: left; color: var(--ink); border-bottom: 1px dotted var(--rule-soft);}
        .goe-item:hover { background: rgba(184,166,116,0.15); }
        .goe-item.on { background: rgba(138,28,28,0.1); border-left: 2px solid var(--rubric); padding-left: 6px;}
        .goe-r { font-family: var(--serif-old); font-style: italic; color: var(--rubric);}
        .goe-n { font-family: var(--serif); }
        .goe-n strong { font-family: var(--serif-display); letter-spacing: 0.06em; }
        .goe-t { font-family: var(--sc); font-size: 10px; letter-spacing: 0.2em; color: var(--ink-faded);}
        .goe-detail { padding: 18px 20px; background: rgba(245,236,214,0.6); border: 1px solid var(--rule-soft); position: sticky; top: 16px;}
        .goe-d-rank { font-family: var(--sc); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-faded);}
        .goe-d-name { font-family: var(--serif-display); font-weight: 600; font-size: 36px; letter-spacing: 0.12em; color: var(--rubric); margin: 4px 0 2px;}
        .goe-d-zh { font-family: var(--serif); font-size: 18px; color: var(--ink-soft);}
        .goe-d-sigil { display: flex; justify-content: center; padding: 14px 0; color: var(--ink);}

        /* Ritual */
        .ritual-list { list-style: none; padding: 0; counter-reset: rit;}
        .ritual-list li { padding: 12px 0; border-bottom: 1px dotted var(--rule-soft);}
        .rit-h { display: flex; gap: 12px; align-items: baseline; margin-bottom: 4px;}
        .rit-n { font-family: var(--serif-old); font-style: italic; color: var(--rubric); font-size: 18px; min-width: 24px;}
        .rit-h strong { font-family: var(--serif-display); font-weight: 600; font-size: 18px; }
        .rit-d { font-family: var(--serif); padding-left: 36px; line-height: 1.65;}
        .rit-names { margin-top: 24px; }
        .names-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .names-grid > div { text-align: center; padding: 14px; border: 1px solid var(--rule-soft); background: rgba(245,236,214,0.5);}
        .nm { font-family: var(--serif); font-size: 0.9em; color: var(--ink-soft); margin-top: 4px;}

        /* Alchemy */
        .alch-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 18px;}
        .alch-cell { padding: 18px 22px; border: 1px solid var(--rule-soft); background: rgba(245,236,214,0.5); text-align: center;}
        .alch-num { font-family: var(--sc); font-size: 10px; letter-spacing: 0.4em; color: var(--ink-faded);}
        .alch-glyph { width: 64px; height: 64px; margin: 12px auto; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; color: #f5ecd6;
          font-size: 32px; box-shadow: inset 0 0 12px rgba(0,0,0,0.4);}
        .alch-lat { font-family: var(--serif-display); font-weight: 600; font-size: 22px; letter-spacing: 0.16em; margin: 4px 0;}
        .alch-zh { font-family: var(--serif-display); font-size: 22px; color: var(--rubric); margin-bottom: 4px;}
        .alch-phase { font-family: var(--sc); font-size: 11px; letter-spacing: 0.25em; color: var(--ink-faded);}
        .alch-cell p { font-family: var(--serif); margin: 10px 0; }
        .alch-motto { font-family: var(--serif-display); font-style: italic; font-size: 18px; color: var(--rubric); }

        /* Folio nav */
        .folio-nav { display: flex; justify-content: space-between; align-items: center;
          margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--rule-soft);}
        .fnav { background: transparent; border: 1px solid var(--rule); padding: 8px 14px; cursor: pointer;
          font-family: var(--serif); color: var(--ink); transition: background 0.15s;}
        .fnav:hover { background: rgba(184,166,116,0.18); border-color: var(--rubric); color: var(--rubric);}
        .folio-pn { font-family: var(--sc); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-faded);}

        @media (max-width: 980px) {
          .liber-shell { grid-template-columns: 1fr; }
          .liber-toc { position: static; border-right: 0; border-bottom: 1px solid var(--rule-soft); }
          .pd-cols, .tree-row, .goe-row, .alch-grid, .hour-grid { grid-template-columns: 1fr; }
          .planet-tabs, .vitriol-grid { grid-template-columns: repeat(4, 1fr); }
          .liber-page { padding: 20px; }
          .ch-zh { font-size: 38px; }
          .front-title { font-size: 56px; }
        }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
