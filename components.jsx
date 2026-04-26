/* ============ Custom cursor ============ */
function CustomCursor() {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);

  React.useEffect(() => {
    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const tick = () => {
      dotX += (mouseX - dotX) * 0.6;
      dotY += (mouseY - dotY) * 0.6;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target.closest("a, button, .project, .write-row, .links-list li, .mode-btn");
      if (ringRef.current) ringRef.current.classList.toggle("active", !!t);
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
      <div className="cursor-dot" ref={dotRef}></div>
    </>
  );
}

/* ============ Reveal-on-scroll ============ */
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============ Nav ============ */
function Nav({ tweaks, setTweak }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onS);
    onS();
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="brand" href="#top">
          <span className="brand-mark"></span>
          <span>Yuan Zhao</span>
          <span className="brand-cn">赵元</span>
        </a>
        <nav className="nav-links">
          <a href="#about">About<span style={{opacity:.5}}> · 关于</span></a>
          <a href="#work">Work<span style={{opacity:.5}}> · 作品</span></a>
          <a href="#experience">CV<span style={{opacity:.5}}> · 经历</span></a>
          <a href="#writing">Writing<span style={{opacity:.5}}> · 文章</span></a>
          <a href="#contact">Contact<span style={{opacity:.5}}> · 联系</span></a>
          <button
            className="mode-btn"
            onClick={() => setTweak("dark", !tweaks.dark)}
            title="Toggle theme"
          >
            {tweaks.dark ? "Light · 浅" : "Dark · 深"}
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ============ Hero ============ */
function Hero() {
  const [text, setText] = React.useState("");
  const [lineIdx, setLineIdx] = React.useState(0);

  React.useEffect(() => {
    const lines = window.TYPED_LINES;
    let cancelled = false;
    let i = 0;
    let mode = "type";
    let current = "";

    const tick = () => {
      if (cancelled) return;
      const line = lines[lineIdx];
      if (mode === "type") {
        if (i <= line.length) {
          current = line.slice(0, i);
          setText(current);
          i++;
          setTimeout(tick, 38 + Math.random() * 30);
        } else {
          setTimeout(() => { mode = "hold"; tick(); }, 1800);
        }
      } else if (mode === "hold") {
        mode = "delete"; tick();
      } else if (mode === "delete") {
        if (i >= 0) {
          current = line.slice(0, i);
          setText(current);
          i--;
          setTimeout(tick, 18);
        } else {
          setLineIdx((n) => (n + 1) % lines.length);
        }
      }
    };
    tick();
    return () => { cancelled = true; };
  }, [lineIdx]);

  return (
    <section id="top" className="section hero">
      <div className="page">
        <div className="hero-meta reveal">
          <span className="dot"></span>
          <span>Available · open to opportunities</span>
          <span style={{opacity:.5}}>·</span>
          <span>Manchester, UK</span>
        </div>

        <div className="hero-grid">
          <div>
            <h1 className="reveal">
              Yuan&nbsp;<span className="accent">Zhao</span>.
              <span className="cn">赵元 · 曼彻斯特大学地球科学</span>
            </h1>
            <div className="hero-sub reveal">
              {text}<span className="caret"></span>
            </div>
          </div>

          <div className="reveal" style={{ display: "grid", gap: 16 }}>
            <div className="portrait" style={{ backgroundImage: 'url("assets/avatar.png")', backgroundSize: "cover", backgroundPosition: "center top" }} aria-label="Yuan Zhao"></div>
            <div className="hero-card">
              <div className="label">Studying at</div>
              <div className="value">
                Univ. of Manchester
                <span className="cn">曼彻斯特大学 · 大二</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ About ============ */
function About() {
  return (
    <section id="about" className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="section-num">§ 01 · About</div>
          <h2 className="section-title">
            A geologist in training.
            <span className="cn">野外与终端之间。</span>
          </h2>
        </div>

        <div className="about-grid about">
          <div className="en-block reveal">
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

          <div className="cn-block reveal">
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

/* ============ Skills ============ */
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="section-num">§ 02 · Toolkit</div>
          <h2 className="section-title">
            How I work.
            <span className="cn">我的工具与方法。</span>
          </h2>
        </div>

        <div className="skills">
          {window.SKILLS.map((g) => (
            <div className="skill-group reveal" key={g.title_en}>
              <h4>{g.title_en} · <span style={{fontFamily:"var(--f-cjk-sans)"}}>{g.title_cn}</span></h4>
              <ul>
                {g.items.map(([en, cn, lvl]) => (
                  <li key={en}>
                    <span className="lbl">{en}<span className="cn">/ {cn}</span></span>
                    <span className="skill-bar reveal" style={{ "--p": `${lvl * 25}%` }}></span>
                    <span className="lvl">{"●".repeat(lvl)}{"○".repeat(4 - lvl)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Projects ============ */
function Projects() {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="work" className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="section-num">§ 03 · Selected work</div>
          <h2 className="section-title">
            Selected projects.
            <span className="cn">部分项目作品。</span>
          </h2>
        </div>

        <div className="projects">
          {window.PROJECTS.map((p, idx) => {
            const isOpen = open === idx;
            return (
              <div
                className="project reveal"
                data-open={isOpen ? "true" : "false"}
                key={p.num}
                onClick={() => setOpen(isOpen ? null : idx)}
              >
                <div className="p-num">{p.num}</div>
                <div>
                  <div className="p-title">
                    {p.title_en}
                    <span className="cn">{p.title_cn}</span>
                  </div>
                  <div style={{
                    maxHeight: isOpen ? "600px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 400ms cubic-bezier(.2,.7,.2,1)"
                  }}>
                    <div style={{padding: "18px 0 8px", fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.7}}>
                      <p style={{margin:"0 0 10px"}}>{p.summary_en}</p>
                      <p style={{margin:"0 0 12px", fontFamily:"var(--f-cjk)"}}>{p.summary_cn}</p>
                      <div className="tag-row">
                        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-meta">
                  {p.year}<br/>
                  <span style={{opacity:.7}}>{p.type} · {p.type_cn}</span>
                </div>
                <div className="p-toggle" style={{
                  transform: isOpen ? "rotate(45deg)" : "none",
                  color: isOpen ? "var(--accent)" : "var(--ink-mute)",
                  transition: "transform 240ms ease, color 200ms ease",
                  fontFamily: "var(--f-mono)", fontSize: 18, textAlign: "right"
                }}>+</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ Experience ============ */
function Experience() {
  return (
    <section id="experience" className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="section-num">§ 04 · CV</div>
          <h2 className="section-title">
            Roles & experience.
            <span className="cn">经历与岗位。</span>
          </h2>
        </div>

        <div className="exp">
          {window.EXPERIENCE.map((e, i) => (
            <div className="exp-row reveal" key={i}>
              <div className="when">{e.when}</div>
              <div className="role">
                {e.role_en}
                <span className="cn">{e.role_cn}</span>
              </div>
              <div className="where">
                {e.where_en}
                <span className="cn">{e.where_cn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Writing ============ */
function Writing() {
  return (
    <section id="writing" className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="section-num">§ 05 · Notes</div>
          <h2 className="section-title">
            Field notes & essays.
            <span className="cn">野外笔记与随笔。</span>
          </h2>
        </div>

        <div className="writing">
          {window.WRITING.map((w, i) => (
            <a className="write-row reveal" key={i} href={w.url || "#"} target="_blank">
              <div className="date">{w.date}</div>
              <div className="title">
                {w.title_en}
                {w.subtitle_en && <span className="cn">{w.subtitle_en}</span>}
              </div>
              <div className="arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Contact ============ */
function Contact() {
  return (
    <section id="contact" className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="section-num">§ 06 · Get in touch</div>
          <h2 className="section-title">
            Contact.
            <span className="cn">联系。</span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="reveal">
            <p className="contact-lead">
              Geology, code, or anything in between —
              the links are over there.
              <span className="cn">
                地质、代码，或者别的什么——链接就在旁边。
              </span>
            </p>
          </div>

          <ul className="links-list reveal">
            {window.LINKS.map((l) => (
              <li key={l.name} onClick={() => window.open(l.url, "_blank")}>
                <span className="lk-name">{l.name}</span>
                <span className="lk-handle">{l.handle}</span>
                <span className="lk-arrow">↗</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */
function Footer() {
  return (
    <footer>
      <div className="page" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, width: "100%" }}>
        <div className="colophon">
          © 2026 Yuan Zhao · 赵元 — Built in Manchester. Set in Fraunces, Inter & JetBrains Mono.
          Last updated April 2026.
        </div>
        <div>↑ <a href="#top" style={{ borderBottom: "1px dotted currentColor" }}>Back to top · 回到顶部</a></div>
      </div>
    </footer>
  );
}

window.CustomCursor = CustomCursor;
window.useReveal = useReveal;
window.Nav = Nav;
window.Hero = Hero;
window.About = About;
window.Skills = Skills;
window.Projects = Projects;
window.Experience = Experience;
window.Writing = Writing;
window.Contact = Contact;
window.Footer = Footer;
