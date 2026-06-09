/* ============ App + Tweaks ============ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "#b04f24",
  "typeset": "serif",
  "density": "normal",
  "hide_skills": false,
  "hide_experience": false,
  "hide_writing": false
}/*EDITMODE-END*/;

const ACCENT_PRESETS = [
  { label: "Iron oxide · 氧化铁红", value: "#b04f24" },
  { label: "Map teal · 图青", value: "#38606b" },
  { label: "Moss · 苔绿", value: "#5a7a3a" },
  { label: "Hematite · 赤铁", value: "#8a3030" },
  { label: "Ink · 墨", value: "#1d1a14" },
];

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweaks to <html>
  React.useEffect(() => {
    const r = document.documentElement;
    r.dataset.theme = tweaks.dark ? "dark" : "light";
    r.dataset.typeset = tweaks.typeset;
    r.dataset.density = tweaks.density;
    r.dataset.hideSkills = tweaks.hide_skills;
    r.dataset.hideExperience = tweaks.hide_experience;
    r.dataset.hideWriting = tweaks.hide_writing;
    r.style.setProperty("--accent", tweaks.accent);
    r.style.setProperty("--selection", tweaks.accent + "33");
  }, [tweaks]);

  useReveal();

  return (
    <>
      <CustomCursor />
      <Nav tweaks={tweaks} setTweak={setTweak} />
      <div className="shell">
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Writing />
          <Contact />
        </main>
        <Footer />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme · 主题">
          <TweakToggle
            label="Night mode · 夜间模式"
            value={tweaks.dark}
            onChange={(v) => setTweak("dark", v)}
          />
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", opacity: .7, marginBottom: 8 }}>
              Accent · 主题色
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ACCENT_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setTweak("accent", p.value)}
                  title={p.label}
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: p.value,
                    border: tweaks.accent === p.value ? "2px solid var(--ink)" : "1px solid rgba(0,0,0,.15)",
                    cursor: "pointer",
                    outline: "none",
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <TweakColor
              label="Custom · 自定义"
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
            />
          </div>
        </TweakSection>

        <TweakSection label="Typography · 字体">
          <TweakRadio
            label="Typeset · 字组"
            value={tweaks.typeset}
            onChange={(v) => setTweak("typeset", v)}
            options={[
              { value: "serif", label: "Serif" },
              { value: "sans", label: "Sans" },
              { value: "mono", label: "Mono" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Layout · 布局密度">
          <TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "normal", label: "Normal" },
              { value: "airy", label: "Airy" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Sections · 段落显隐">
          <TweakToggle label="Show Legend · 图例"
            value={!tweaks.hide_skills}
            onChange={(v) => setTweak("hide_skills", !v)} />
          <TweakToggle label="Show CV · 经历"
            value={!tweaks.hide_experience}
            onChange={(v) => setTweak("hide_experience", !v)} />
          <TweakToggle label="Show Writing · 文章"
            value={!tweaks.hide_writing}
            onChange={(v) => setTweak("hide_writing", !v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
