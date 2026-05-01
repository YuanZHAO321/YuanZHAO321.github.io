// 装饰元素：首字母放大、卷头花饰、章节分隔条、边角装饰
// 全部 SVG 程序化绘制，仿文艺复兴印刷风格

// 章节首字母放大 — 朱红方块 + 白色字母 + 藤蔓装饰
function DropCap({ letter, color = "var(--rubric)", size = 96 }) {
  return (
    <span className="drop-cap" style={{ "--dc-size": size + "px", "--dc-color": color }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="dc-bg">
        <rect x="0" y="0" width={size} height={size} fill={color}/>
        {/* 角落小花 */}
        <g fill="none" stroke="rgba(255,240,210,0.55)" strokeWidth="0.8">
          {[[6,6],[size-6,6],[6,size-6],[size-6,size-6]].map(([x,y],i) => (
            <g key={i} transform={`translate(${x},${y}) rotate(${i*90})`}>
              <path d="M 0 0 Q 4 -4 8 0 Q 4 4 0 0 Z"/>
              <circle r="1" fill="rgba(255,240,210,0.6)"/>
            </g>
          ))}
        </g>
        {/* 边线 */}
        <rect x="3" y="3" width={size-6} height={size-6} fill="none" stroke="rgba(255,240,210,0.4)" strokeWidth="0.6"/>
      </svg>
      <span className="dc-letter">{letter}</span>
    </span>
  );
}

// 章节分隔花饰
function ChapterRule({ width = "100%", glyph = "❦" }) {
  return (
    <div className="chapter-rule" style={{ width }}>
      <span className="rule-line"></span>
      <span className="rule-orn">{glyph}</span>
      <span className="rule-line"></span>
    </div>
  );
}

// 卷头横饰带
function HeaderBand({ width = 600, height = 40 }) {
  const els = [];
  const n = 24;
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * width / n;
    els.push(<circle key={"d"+i} cx={x} cy={height/2} r="1.4" fill="var(--ink-faded)"/>);
    if (i < n - 1) {
      const x2 = (i + 1.5) * width / n;
      els.push(<path key={"v"+i} d={`M ${x+3} ${height/2} Q ${(x+x2)/2} ${height/2 - 5} ${x2-3} ${height/2}`}
        fill="none" stroke="var(--ink-faded)" strokeWidth="0.6"/>);
    }
  }
  // 中央菱形
  const cx = width/2;
  els.push(<g key="c">
    <rect x={cx-7} y={height/2-7} width="14" height="14" transform={`rotate(45 ${cx} ${height/2})`} fill="var(--paper-0)" stroke="var(--ink-faded)" strokeWidth="0.7"/>
    <circle cx={cx} cy={height/2} r="2.5" fill="var(--rubric)"/>
  </g>);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", maxWidth: "100%" }}>
      <line x1="0" y1={height/2-9} x2={width} y2={height/2-9} stroke="var(--ink-faded)" strokeWidth="0.4"/>
      <line x1="0" y1={height/2+9} x2={width} y2={height/2+9} stroke="var(--ink-faded)" strokeWidth="0.4"/>
      {els}
    </svg>
  );
}

// 卷头大圆形纹章 — 仿手稿首页飞页
function Frontispiece({ size = 320 }) {
  const c = size / 2;
  const r1 = c - 4;
  const r2 = c - 22;
  const r3 = c - 36;
  // 12节点分布
  const nodes = [];
  for (let i = 0; i < 12; i++) {
    const a = -Math.PI/2 + i * Math.PI / 6;
    nodes.push([c + r3 * Math.cos(a), c + r3 * Math.sin(a), a]);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <defs>
        <path id="frontTextTop" d={`M ${c-r2+8},${c} a ${r2-8},${r2-8} 0 1,1 ${(r2-8)*2},0`}/>
        <path id="frontTextBot" d={`M ${c+r2-8},${c} a ${r2-8},${r2-8} 0 1,1 ${-(r2-8)*2},0`}/>
      </defs>
      <circle cx={c} cy={c} r={r1} fill="none" stroke="var(--ink)" strokeWidth="1.4"/>
      <circle cx={c} cy={c} r={r1-3} fill="none" stroke="var(--ink-faded)" strokeWidth="0.5"/>
      <circle cx={c} cy={c} r={r2} fill="none" stroke="var(--ink-faded)" strokeWidth="0.5"/>
      <circle cx={c} cy={c} r={r3} fill="none" stroke="var(--ink-faded)" strokeWidth="0.4" strokeDasharray="2 4"/>
      <text fontFamily="var(--serif-old)" fontSize="13" fill="var(--ink)" letterSpacing="3">
        <textPath href="#frontTextTop" startOffset="50%" textAnchor="middle">QVOD · EST · INFERIVS · EST · SICVT · QVOD · EST · SVPERIVS</textPath>
      </text>
      <text fontFamily="var(--serif-old)" fontSize="11" fill="var(--ink-faded)" letterSpacing="3" fontStyle="italic">
        <textPath href="#frontTextBot" startOffset="50%" textAnchor="middle">下者如同上者 · 上者如同下者 · 以成独一之奇迹</textPath>
      </text>
      {/* 12个节点 — 黄道 */}
      {["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"].map((g, i) => {
        const [x, y] = nodes[i];
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="11" fill="var(--paper-0)" stroke="var(--ink)" strokeWidth="0.7"/>
            <text x={x} y={y+5} textAnchor="middle" fontSize="14" fill="var(--ink)" fontFamily="serif">{g}</text>
          </g>
        );
      })}
      {/* 内圈 — 七颗行星十字布列 + 中央太阳 */}
      <g>
        {/* 中央 */}
        <circle cx={c} cy={c} r="32" fill="var(--paper-2)" stroke="var(--rubric)" strokeWidth="1"/>
        <circle cx={c} cy={c} r="28" fill="none" stroke="var(--rubric)" strokeWidth="0.4"/>
        <text x={c} y={c+13} textAnchor="middle" fontSize="42" fill="var(--rubric)" fontFamily="serif">☉</text>
      </g>
      {/* 六角星辐射 */}
      <g stroke="var(--ink-faded)" strokeWidth="0.5" fill="none">
        {Array.from({length: 6}).map((_, i) => {
          const a = -Math.PI/2 + i * Math.PI/3;
          return <line key={i} x1={c} y1={c} x2={c + r3*0.9*Math.cos(a)} y2={c + r3*0.9*Math.sin(a)} strokeDasharray="1 3"/>;
        })}
      </g>
    </svg>
  );
}

// 边角藤蔓装饰
function CornerVine({ corner = "tl", size = 80 }) {
  const flips = { tl: "", tr: "scale(-1,1)", bl: "scale(1,-1)", br: "scale(-1,-1)" };
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ position: "absolute", pointerEvents: "none", transform: flips[corner] }}>
      <g stroke="var(--ink-faded)" strokeWidth="0.7" fill="none">
        <path d="M 5 5 Q 30 5 35 30 Q 38 50 60 55"/>
        <path d="M 5 5 Q 8 25 25 28"/>
        <path d="M 35 30 Q 50 25 55 12" />
        {/* 叶子 */}
        <path d="M 22 26 Q 18 22 22 18 Q 26 22 22 26 Z" fill="var(--ink-faded)" opacity="0.5"/>
        <path d="M 52 14 Q 48 10 52 6 Q 56 10 52 14 Z" fill="var(--ink-faded)" opacity="0.5"/>
        <path d="M 56 53 Q 52 49 56 45 Q 60 49 56 53 Z" fill="var(--ink-faded)" opacity="0.5"/>
        {/* 小圆果 */}
        <circle cx="35" cy="30" r="1.6" fill="var(--rubric)" opacity="0.7"/>
      </g>
    </svg>
  );
}

// 简易边注引线 — 用于侧栏注释
function MarginalRule() {
  return <span className="marginal-rule"></span>;
}

Object.assign(window, { DropCap, ChapterRule, HeaderBand, Frontispiece, CornerVine, MarginalRule });
