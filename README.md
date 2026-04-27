# yuanzhao321.github.io

[中文简介](README.zh.md) · English

Personal website of Yuan Zhao (赵元) — Earth & Planetary Sciences student at the University of Manchester.

**Live:** [yuanzhao321.github.io](https://yuanzhao321.github.io) · [personalpages.manchester.ac.uk/student/yuan.zhao-8](https://personalpages.manchester.ac.uk/student/yuan.zhao-8/)

---

## Stack

No build step. No bundler. Just files.

| File | Role |
|---|---|
| `index.html` | Entry point, loads everything |
| `styles.css` | All styling, CSS custom properties |
| `data.jsx` | **Content only** — edit this to update the site |
| `components.jsx` | React component library |
| `app.jsx` | Root app + tweaks panel logic |
| `tweaks-panel.jsx` | Live customisation panel (theme, density, etc.) |
| `writing/field-2026.html` | Standalone article page |
| `assets/` | Static assets (avatar, etc.) |

React and Babel are loaded from CDN via `<script>` tags — no `npm install` required.

> ⚠️ Because of this, you **cannot** open `index.html` directly from the filesystem (`file://`). Use a local server instead.

---

## Local development

```bash
# Python (built-in)
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

---

## Customisation

All content lives in `data.jsx`. The structure is straightforward:

```js
PROFILE    // name, school, location, links
TYPED_LINES // typewriter strings in the hero
SKILLS     // three columns, each item is [label_en, label_cn, level 1–4]
PROJECTS   // cards with summary_en, summary_cn, tags, year
EXPERIENCE // CV entries
WRITING    // article list with url
LINKS      // footer / contact links
```

The tweaks panel (bottom-right corner) exposes live controls for dark mode, accent colour, typeset (serif / sans / mono), layout density, and section visibility. Defaults are set in `app.jsx`:

```js
const TWEAK_DEFAULTS = {
  dark: false,
  accent: "#a85a2a",   // ochre
  typeset: "serif",
  density: "normal",
  ...
};
```

---

## Design

- **Typography:** Fraunces (display) · Inter (sans) · JetBrains Mono · Noto Serif SC / Noto Sans SC
- **Palette:** Warm parchment background (`#f6f3ec`) · ochre accent (`#a85a2a`) · full dark mode
- **Motion:** CSS reveal-on-scroll via `IntersectionObserver`, custom cursor, typewriter effect
- **Writing pages:** Self-contained HTML — same design language, independent of the React app

---

## Writing

Long-form pieces live in `writing/` as standalone HTML files. The article format uses the same font system and colour tokens as the main site, with a reading-optimised layout (660px column, line-height 2, drop cap, pull quotes).

To add a new piece:

1. Duplicate `writing/field-2026.html` and edit the content
2. Add an entry to `WRITING` in `data.jsx`:

```js
{
  date: "2026 · 09",
  title_en: "Your title",
  title_cn: "标题",
  subtitle_en: "Optional subtitle",
  url: "writing/your-file.html",
}
```

---

## Deployment

The site is hosted in two places simultaneously — GitHub Pages and the University of Manchester's student web hosting — as a dual-verification of identity.

Both are updated by pushing to this repository (GitHub Pages) or syncing files to the university server.

---

*Built in Manchester.*
