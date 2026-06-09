/* ════════════════════════════════════════════════════════
   FIELD NOTEBOOK · components
   ════════════════════════════════════════════════════════ */

/* ── hooks ── */

function useReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    // observe current and future .reveal nodes
    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.42;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(",")]);
  return active;
}

/* ── Crosshair cursor ── */

function CustomCursor() {
  const hRef = React.useRef(null);
  const vRef = React.useRef(null);
  const ringRef = React.useRef(null);

  React.useEffect(() => {
    let mx = -100, my = -100, rx = -100, ry = -100, raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e) => {
      const t = e.target.closest("a, button, .log-head");
      ringRef.current && ringRef.current.classList.toggle("active", !!t);
    };
    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (hRef.current) hRef.current.style.transform = `translate(${mx - 9}px, ${my}px)`;
      if (vRef.current) vRef.current.style.transform = `translate(${mx}px, ${my - 9}px)`;
      if (ringRef.current) ringRef.current.style.transform =
        `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef}></div>
      <div className="cursor-h" ref={hRef}></div>
      <div className="cursor-v" ref={vRef}></div>
    </>
  );
}

/* ── Strata data (shared by nav + depth markers) ── */

const STRATA = [
  { id: "hero",       label: "Surface · 地表" },
  { id: "about",      label: "About · 关于" },
  { id: "skills",     label: "Toolkit · 工具" },
  { id: "projects",   label: "Projects · 项目" },
  { id: "experience", label: "CV · 经历" },
  { id: "writing",    label: "Writing · 文章" },
  { id: "contact",    label: "Contact · 联系" },
];

/* ── Nav (topbar + strata rail) ── */

function Nav({ tweaks, setTweak }) {
  const [scrolled, setScrolled] = React.useState(false);
  const active = useScrollSpy(STRATA.map((s) => s.id));

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id) => {
    const el = document.getElementById(id);
    el && el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* left strata rail */}
      <nav className="strata-nav" aria-label="Stratigraphic navigation">
        {STRATA.map((s) => (
          <button
            key={s.id}
            className="strata-seg"
            data-for={s.id}
            data-active={active === s.id ? "true" : "false"}
            onClick={() => goto(s.id)}
            title={s.label}
          >
            <span className="fill"></span>
            <span className="seg-label">{s.label}</span>
          </button>
        ))}
      </nav>

      {/* top bar */}
      <header className={"topbar" + (scrolled ? " scrolled" : "")}>
        <div className="topbar-inner">
          <a className="brand" href="#hero" onClick={(e) => { e.preventDefault(); goto("hero"); }}>
            <span className="mark"></span>
            <span>{PROFILE.name_en}</span>
            <span className="cn">{PROFILE.name_cn}</span>
          </a>
          <div className="top-links">
            <a className="hide-sm" href="#projects" onClick={(e) => { e.preventDefault(); goto("projects"); }}>Projects</a>
            <a className="hide-sm" href="#writing" onClick={(e) => { e.preventDefault(); goto("writing"); }}>Writing</a>
            <button
              className="theme-toggle"
              onClick={() => setTweak("dark", !tweaks.dark)}
            >
              {tweaks.dark ? "Day · 昼" : "Night · 夜"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ── Depth marker ── */

function DepthMarker({ depth, note }) {
  return (
    <div className="depth-marker reveal" aria-hidden="true">
      <span className="tick">— {depth}</span>
      {note && <span>{note}</span>}
    </div>
  );
}

/* ── Hero ── */

function ContourBackdrop() {
  // hand-drawn-ish nested contour lines
  return (
    <div className="contours" aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <g>
          <path d="M 920,180 C 1010,150 1110,200 1130,290 C 1150,380 1080,460 980,470 C 880,480 790,420 780,330 C 770,240 830,210 920,180 Z" />
          <path d="M 915,215 C 985,192 1070,230 1087,300 C 1104,370 1050,428 970,436 C 890,444 822,398 814,328 C 806,258 845,238 915,215 Z" className="index-line" />
          <path d="M 912,252 C 962,236 1028,262 1040,313 C 1052,364 1014,404 956,410 C 898,416 850,382 845,330 C 840,278 862,268 912,252 Z" />
          <path d="M 910,288 C 941,278 982,294 990,326 C 998,358 974,382 938,386 C 902,390 872,370 868,338 C 864,306 879,298 910,288 Z" />
          <path d="M 140,520 C 240,460 400,470 470,560 C 540,650 480,760 340,780 C 200,800 60,740 40,640 C 20,540 60,568 140,520 Z" />
          <path d="M 175,556 C 255,508 380,516 436,588 C 492,660 444,746 332,762 C 220,778 110,730 94,650 C 78,570 111,594 175,556 Z" className="index-line" />
          <path d="M 212,592 C 270,558 360,564 400,616 C 440,668 406,728 326,740 C 246,752 168,718 156,660 C 144,602 168,618 212,592 Z" />
          <path d="M 250,628 C 285,608 338,612 362,642 C 386,672 366,708 318,715 C 270,722 224,702 217,668 C 210,634 224,643 250,628 Z" />
          <path d="M 560,80 C 620,40 720,50 750,110 C 780,170 740,240 650,250 C 560,260 480,220 470,160 C 460,100 500,120 560,80 Z" />
          <path d="M 580,112 C 624,84 696,91 718,135 C 740,179 711,229 645,236 C 579,243 521,214 514,170 C 507,126 536,140 580,112 Z" />
        </g>
      </svg>
    </div>
  );
}

function TypeLine() {
  const lines = TYPED_LINES;
  const [text, setText] = React.useState("");
  const idx = React.useRef(0);
  const pos = React.useRef(0);
  const deleting = React.useRef(false);

  React.useEffect(() => {
    let t;
    const step = () => {
      const line = lines[idx.current % lines.length];
      if (!deleting.current) {
        pos.current++;
        setText(line.slice(0, pos.current));
        if (pos.current === line.length) {
          deleting.current = true;
          t = setTimeout(step, 2300);
          return;
        }
        t = setTimeout(step, 46 + Math.random() * 50);
      } else {
        pos.current -= 2;
        if (pos.current <= 0) {
          pos.current = 0;
          deleting.current = false;
          idx.current++;
          setText("");
          t = setTimeout(step, 480);
          return;
        }
        setText(line.slice(0, pos.current));
        t = setTimeout(step, 16);
      }
    };
    t = setTimeout(step, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="typeline">
      {text}<span className="caret"></span>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <ContourBackdrop />
      <div className="wrap hero-grid">
        <div className="reveal">
          <div className="hero-coords">
            <span className="dot"></span>
            <span>53.4668° N · 2.2339° W — {PROFILE.location}</span>
          </div>
          <h1 className="hero-name">
            Yuan <em>Zhao</em>
          </h1>
          <div className="hero-name-cn">{PROFILE.name_cn}</div>
          <TypeLine />
          <div className="hero-status">
            <span className="led"></span>
            <span>Available · open to opportunities</span>
          </div>
        </div>

        <div className="specimen reveal">
          <div
            className="photo"
            style={{ backgroundImage: 'url("assets/avatar.png")' }}
            aria-label={PROFILE.name_en}
          ></div>
          <div className="caption">
            <span>Plate I</span>
            <span>{PROFILE.school_en.replace("The ", "")}</span>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>Core begins</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

/* ── About ── */

function About() {
  return (
    <section id="about">
      <DepthMarker depth="0 m" note="Topsoil · recent deposits" />
      <div className="wrap sec-pad">
        <div className="sec-head reveal">
          <span className="sec-num">§ 01</span>
          <h2 className="sec-title">
            Between the outcrop &amp; the terminal
            <span className="cn">野外与终端之间</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="prose-en reveal">
            <p>
              I'm <strong>Yuan Zhao</strong>, from Shanghai, currently reading
              Earth &amp; Planetary Sciences at the University of Manchester.
              I came to geology partly for the fieldwork — it gave travel an
              older reason, and gave the ground beneath my feet something worth
              reading.
            </p>
            <p>
              I move between the outcrop and the terminal window.{" "}
              <strong>Structural geology and sedimentology</strong> on one side,
              recording how rock writes time; code on the other, translating
              that writing into something thinkable. What draws me to both is
              the same thing — learning to read a system.
            </p>
            <p>
              Outside of coursework: a compact camera, an obsessive interest in
              military history, an analytical fascination with occult systems.
              And code — for no professional reason, just because I can't stop.
            </p>
          </div>

          <div className="reveal">
            <div className="prose-cn">
              <p>
                我是赵元，上海人，曼彻斯特大学地球与行星科学大二学生。
                选择这条路，有一部分是因为野外——地质给了旅行一个更古老的理由，
                给了脚下的土地一个可以阅读的文字系统。
              </p>
              <p>
                当前我站在野外与终端之间：<strong>构造地质与沉积学</strong>在一侧，
                记录着岩层如何书写时间；代码在另一侧，试图把那些书写翻译成可以思考的形状。
                两件事让我着迷的，都是同一件事——如何读懂一个系统。
              </p>
              <p>
                课业之外，我用卡片机拍照，对军事史有些过度的热情，
                对神秘学体系保持一种分析式的着迷。以及写代码——不为任何专业理由，只是停不下来。
              </p>
            </div>

            <div className="facts">
              <div className="fact">
                <div className="k">From</div>
                <div className="v">Shanghai<span className="cn">上海</span></div>
              </div>
              <div className="fact">
                <div className="k">Based</div>
                <div className="v">Manchester, UK<span className="cn">英国 · 曼彻斯特</span></div>
              </div>
              <div className="fact">
                <div className="k">Languages</div>
                <div className="v">中文 · English</div>
              </div>
              <div className="fact">
                <div className="k">Year 1</div>
                <div className="v">First Class<span className="cn">一等</span></div>
              </div>
              <div className="fact">
                <div className="k">Currently</div>
                <div className="v">Y2 · Energy &amp; Resources</div>
              </div>
              <div className="fact">
                <div className="k">Also into</div>
                <div className="v">Code · Outdoors · Photography</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills: map legend ── */

function gradeLabel(lv) {
  if (lv >= 4) return ["████", "fluent"];
  if (lv === 3) return ["███░", "working"];
  if (lv === 2) return ["██░░", "basic"];
  return ["█░░░", "aware"];
}

function Skills() {
  return (
    <section id="skills">
      <DepthMarker depth="120 m" note="Toolkit horizon" />
      <div className="wrap sec-pad">
        <div className="sec-head reveal">
          <span className="sec-num">§ 02</span>
          <h2 className="sec-title">
            Legend
            <span className="cn">图例 · 工具与方法</span>
          </h2>
        </div>
        <div className="legend-note reveal">
          Hatching denotes proficiency, after the convention of geological maps.
        </div>

        <div className="legend-grid">
          {SKILLS.map((col) => (
            <div key={col.title_en} className="reveal">
              <div className="legend-col-title">
                <span>{col.title_en}</span>
                <span className="cn">{col.title_cn}</span>
              </div>
              {col.items.map(([en, cn, lv]) => {
                const [bar, word] = gradeLabel(lv);
                return (
                  <div className="legend-item" key={en}>
                    <span className="legend-swatch" data-lv={lv}></span>
                    <span className="legend-name">
                      {en}
                      <span className="cn">{cn}</span>
                    </span>
                    <span className="legend-grade"><b>{bar}</b> {word}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects: borehole logs ── */

function Projects() {
  const [open, setOpen] = React.useState(null);
  const bodies = React.useRef({});

  return (
    <section id="projects">
      <DepthMarker depth="340 m" note="Project-bearing sequence" />
      <div className="wrap sec-pad">
        <div className="sec-head reveal">
          <span className="sec-num">§ 03</span>
          <h2 className="sec-title">
            Drill logs
            <span className="cn">项目记录</span>
          </h2>
        </div>

        <div className="reveal">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            return (
              <div className="log" key={p.num} data-open={isOpen ? "true" : "false"}>
                <button
                  className="log-head"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="log-id">
                    LOG-{p.num}
                    <span className="yr">{p.year}</span>
                  </span>
                  <span className="log-title">
                    {p.title_en}
                    <span className="cn">{p.title_cn}</span>
                  </span>
                  <span className="log-meta">{p.type}</span>
                  <span className="log-toggle">+</span>
                </button>
                <div
                  className="log-body"
                  style={{
                    maxHeight: isOpen
                      ? (bodies.current[i] ? bodies.current[i].scrollHeight + 40 : 800) + "px"
                      : "0px",
                    transition: "max-height 420ms cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  <div className="log-body-inner" ref={(el) => (bodies.current[i] = el)}>
                    <p className="log-summary-en">{p.summary_en}</p>
                    <p className="log-summary-cn">{p.summary_cn}</p>
                    <div className="tag-row">
                      {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ── */

function Experience() {
  if (!EXPERIENCE || EXPERIENCE.length === 0) return null;
  return (
    <section id="experience">
      <DepthMarker depth="610 m" note="Experience beds" />
      <div className="wrap sec-pad">
        <div className="sec-head reveal">
          <span className="sec-num">§ 04</span>
          <h2 className="sec-title">
            Curriculum vitae
            <span className="cn">经历</span>
          </h2>
        </div>
        <div className="reveal">
          {EXPERIENCE.map((e, i) => (
            <div className="exp-row" key={i}>
              <div className="exp-when">{e.when}</div>
              <div>
                <div className="exp-role">
                  {e.role_en}
                  <span className="cn">{e.role_cn}</span>
                </div>
                <div className="exp-where">
                  {e.where_en}
                  <span className="cn">{e.where_cn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Writing ── */

function Writing() {
  if (!WRITING || WRITING.length === 0) return null;
  return (
    <section id="writing">
      <DepthMarker depth="780 m" note="Writing formation" />
      <div className="wrap sec-pad">
        <div className="sec-head reveal">
          <span className="sec-num">§ 05</span>
          <h2 className="sec-title">
            Field notes
            <span className="cn">文章</span>
          </h2>
        </div>
        <div className="reveal">
          {WRITING.map((w, i) => (
            <a className="write-row" key={i} href={w.url || "#"}>
              <span className="write-date">{w.date}</span>
              <span className="write-title">
                {w.title_en}
                {w.subtitle_en && <span className="write-sub">{w.subtitle_en}</span>}
              </span>
              <span className="write-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */

function Contact() {
  return (
    <section id="contact">
      <DepthMarker depth="470 Ma" note="Basement · Dalradian" />
      <div className="wrap sec-pad">
        <div className="sec-head reveal">
          <span className="sec-num">§ 06</span>
          <h2 className="sec-title">
            Make contact
            <span className="cn">联系</span>
          </h2>
        </div>

        <p className="contact-lead reveal">
          Geology, code, or anything in between —
          the links are over there.
          <span className="cn">地质、代码，或者别的什么——链接就在旁边。</span>
        </p>

        <div className="link-grid reveal">
          {LINKS.map((l) => (
            <a className="link-cell" key={l.name} href={l.url} target="_blank" rel="noreferrer">
              <div className="link-name">{l.name}</div>
              <div className="link-handle">{l.handle}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer: map cartouche ── */

function Footer() {
  return (
    <footer className="cartouche">
      <div className="cartouche-inner">
        <div className="cell">
          <div className="k">Sheet</div>
          <div className="v">{PROFILE.name_en} · {PROFILE.name_cn}<br/>Personal survey, 1st ed.</div>
        </div>
        <div className="cell">
          <div className="k">Surveyed at</div>
          <div className="v">53.4668° N, 2.2339° W<br/>{PROFILE.location}</div>
        </div>
        <div className="cell">
          <div className="k">Scale</div>
          <div className="v">
            1 : 25 000
            <span className="scalebar" aria-hidden="true">
              <i></i><i></i><i></i><i></i>
            </span>
          </div>
        </div>
        <div className="cell">
          <div className="k">Compiled</div>
          <div className="v">Built in Manchester,<br/>with Claude · 2026</div>
        </div>
      </div>
    </footer>
  );
}

/* ── expose ── */
Object.assign(window, {
  useReveal, CustomCursor, Nav, Hero, About, Skills,
  Projects, Experience, Writing, Contact, Footer,
});
