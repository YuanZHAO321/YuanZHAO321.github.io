// 几何重绘的印记 / 魔法阵 / 希伯来字母 — 全部 SVG 程序化生成
// 不复制任何受版权保护的具体图形；用真实的几何法则（Magic Square Kamea）

// 行星 Kamea (魔方阵) — 真实数学，按古典记载
const KAMEAS = {
  saturn: [[4,9,2],[3,5,7],[8,1,6]],
  jupiter: [[4,14,15,1],[9,7,6,12],[5,11,10,8],[16,2,3,13]],
  mars: [[11,24,7,20,3],[4,12,25,8,16],[17,5,13,21,9],[10,18,1,14,22],[23,6,19,2,15]],
  sol: [[6,32,3,34,35,1],[7,11,27,28,8,30],[19,14,16,15,23,24],[18,20,22,21,17,13],[25,29,10,9,26,12],[36,5,33,4,2,31]],
  venus: [[22,47,16,41,10,35,4],[5,23,48,17,42,11,29],[30,6,24,49,18,36,12],[13,31,7,25,43,19,37],[38,14,32,1,26,44,20],[21,39,8,33,2,27,45],[46,15,40,9,34,3,28]],
  mercury: [[8,58,59,5,4,62,63,1],[49,15,14,52,53,11,10,56],[41,23,22,44,45,19,18,48],[32,34,35,29,28,38,39,25],[40,26,27,37,36,30,31,33],[17,47,46,20,21,43,42,24],[9,55,54,12,13,51,50,16],[64,2,3,61,60,6,7,57]],
  luna: [[37,78,29,70,21,62,13,54,5],[6,38,79,30,71,22,63,14,46],[47,7,39,80,31,72,23,55,15],[16,48,8,40,81,32,64,24,56],[57,17,49,9,41,73,33,65,25],[26,58,18,50,1,42,74,34,66],[67,27,59,10,51,2,43,75,35],[36,68,19,60,11,52,3,44,76],[77,28,69,20,61,12,53,4,45]],
};

// 数生成印记 — 在 Kamea 上按行星数字序列连线
function PlanetSigil({ planet, size = 200, stroke = "currentColor", glow = true, animated = true }) {
  const k = KAMEAS[planet];
  if (!k) return null;
  const n = k.length;
  const cell = size / n;
  // 收集每个数字的坐标
  const pos = {};
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      pos[k[i][j]] = { x: cell * (j + 0.5), y: cell * (i + 0.5) };
    }
  }
  // 按 1..n^2 顺序连线 — 这是行星印记的真实生成法则
  const total = n * n;
  const path = [];
  for (let v = 1; v <= total; v++) {
    const p = pos[v];
    path.push((v === 1 ? "M" : "L") + p.x + "," + p.y);
  }
  // 起点小圆，终点小三角
  const start = pos[1], end = pos[total];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`g-${planet}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
        </radialGradient>
      </defs>
      {/* 外环 */}
      <circle cx={size/2} cy={size/2} r={size/2 - 2} fill={`url(#g-${planet})`} stroke={stroke} strokeWidth="0.6" opacity="0.7" />
      <circle cx={size/2} cy={size/2} r={size/2 - 8} fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.4" strokeDasharray="2 3" />
      {/* 印记本体 */}
      <path d={path.join(" ")} fill="none" stroke={stroke} strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: glow ? "drop-shadow(0 0 4px currentColor)" : "none", animation: animated ? "sigil-pulse 4s ease-in-out infinite" : "none" }} />
      {/* 起点·终点标记 */}
      <circle cx={start.x} cy={start.y} r="3" fill={stroke} />
      <circle cx={start.x} cy={start.y} r="6" fill="none" stroke={stroke} strokeWidth="0.6" />
      <polygon points={`${end.x},${end.y-4} ${end.x-3.5},${end.y+3} ${end.x+3.5},${end.y+3}`} fill="none" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

// Kamea 网格本身
function KameaGrid({ planet, size = 240, color = "currentColor" }) {
  const k = KAMEAS[planet];
  if (!k) return null;
  const n = k.length;
  const cell = size / n;
  const lines = [];
  for (let i = 0; i <= n; i++) {
    lines.push(<line key={`h${i}`} x1={0} y1={i*cell} x2={size} y2={i*cell} stroke={color} strokeWidth="0.4" opacity="0.4" />);
    lines.push(<line key={`v${i}`} x1={i*cell} y1={0} x2={i*cell} y2={size} stroke={color} strokeWidth="0.4" opacity="0.4" />);
  }
  const nums = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      nums.push(
        <text key={`${i}-${j}`} x={cell*(j+0.5)} y={cell*(i+0.5)+cell*0.12}
          fontSize={cell*0.42} textAnchor="middle" fill={color} fontFamily="JetBrains Mono">
          {k[i][j]}
        </text>
      );
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {lines}{nums}
    </svg>
  );
}

// 通用召唤圆 — 双圆环 + 内接星形 + 字符
function SummoningCircle({ size = 320, points = 5, label = "", inner = "", color = "currentColor", spin = true }) {
  const r1 = size/2 - 4;
  const r2 = size/2 - 18;
  const r3 = size/2 - 30;
  const r4 = size/2 - 60;
  const cx = size/2, cy = size/2;
  // 星形点
  const pts = [];
  for (let i = 0; i < points; i++) {
    const a = -Math.PI/2 + (i * 2 * Math.PI) / points;
    pts.push([cx + r4 * Math.cos(a), cy + r4 * Math.sin(a)]);
  }
  // 五角星连线 — 跨步连接
  const step = points === 5 ? 2 : (points === 7 ? 3 : (points === 6 ? 1 : 1));
  const star = [];
  let cur = 0;
  for (let i = 0; i <= points; i++) {
    star.push((i === 0 ? "M" : "L") + pts[cur][0] + "," + pts[cur][1]);
    cur = (cur + step) % points;
  }

  // 沿 r3 圆周散布的字符
  const chars = (label || "ALEPH BETH GIMEL DALETH HEH VAV ZAYIN CHETH TETH YOD KAPH LAMED MEM NUN").split(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <defs>
        <path id="circ-text" d={`M ${cx-r3},${cy} a ${r3},${r3} 0 1,1 ${r3*2},0 a ${r3},${r3} 0 1,1 ${-r3*2},0`} />
      </defs>
      <g style={{ animation: spin ? "slow-rotate 90s linear infinite" : "none", transformOrigin: "center" }}>
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke={color} strokeWidth="0.5" />
        <text fontFamily="JetBrains Mono" fontSize={size*0.034} fill={color} letterSpacing="2">
          <textPath href="#circ-text" startOffset="0">{chars.join(" · ").repeat(2)}</textPath>
        </text>
      </g>
      <g style={{ animation: spin ? "slow-rotate 140s linear infinite reverse" : "none", transformOrigin: "center" }}>
        <circle cx={cx} cy={cy} r={r3} fill="none" stroke={color} strokeWidth="0.4" strokeDasharray="1 4" />
        <path d={star.join(" ")} fill="none" stroke={color} strokeWidth="1" opacity="0.85" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />
        ))}
      </g>
      {/* 中心字符 */}
      {inner && (
        <text x={cx} y={cy + size*0.05} textAnchor="middle"
          fontFamily="EB Garamond" fontSize={size*0.28} fill={color}
          style={{ filter: "drop-shadow(0 0 8px currentColor)" }}>{inner}</text>
      )}
    </svg>
  );
}

// 生命之树 — 十质点 + 22径
function TreeOfLife({ size = 480, color = "currentColor", highlight = -1 }) {
  // 经典 Kircher 排布坐标 (单位制)
  const W = size, H = size * 1.5;
  const sx = (x) => W * (0.5 + x);
  const sy = (y) => H * y;
  const nodes = [
    [0,    0.06], //1 Kether
    [0.22, 0.16], //2 Chokmah
    [-0.22,0.16], //3 Binah
    [0.22, 0.32], //4 Chesed
    [-0.22,0.32], //5 Geburah
    [0,    0.42], //6 Tiphareth
    [0.22, 0.55], //7 Netzach
    [-0.22,0.55], //8 Hod
    [0,    0.66], //9 Yesod
    [0,    0.85], //10 Malkuth
  ].map(([x,y]) => [sx(x), sy(y)]);

  // 22径 (索引从1)
  const paths = [
    [1,2],[1,3],[1,6],[2,3],[2,6],[2,4],[3,5],[3,6],[4,5],[4,6],
    [4,7],[5,6],[5,8],[6,7],[6,8],[6,9],[7,8],[7,9],[7,10],[8,9],
    [8,10],[9,10]
  ];
  const D = window.GRIMOIRE_DATA.sephiroth;

  return (
    <svg width={size} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      {/* 三柱辅线 */}
      <line x1={sx(-0.22)} y1={sy(0.05)} x2={sx(-0.22)} y2={sy(0.6)} stroke={color} strokeWidth="0.3" opacity="0.2" strokeDasharray="2 4"/>
      <line x1={sx(0.22)}  y1={sy(0.05)} x2={sx(0.22)}  y2={sy(0.6)} stroke={color} strokeWidth="0.3" opacity="0.2" strokeDasharray="2 4"/>
      <line x1={sx(0)}     y1={sy(0.02)} x2={sx(0)}     y2={sy(0.9)} stroke={color} strokeWidth="0.3" opacity="0.2" strokeDasharray="2 4"/>
      {/* 22径 */}
      {paths.map(([a,b], i) => (
        <line key={i}
          x1={nodes[a-1][0]} y1={nodes[a-1][1]}
          x2={nodes[b-1][0]} y2={nodes[b-1][1]}
          stroke={color} strokeWidth="0.7" opacity="0.55" />
      ))}
      {/* 10质点 */}
      {nodes.map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="22" fill="var(--bg-0)" stroke={color} strokeWidth={highlight === i ? 2 : 1}
            style={{ filter: highlight === i ? "drop-shadow(0 0 10px currentColor)" : "none" }}/>
          <text x={x} y={y+1} textAnchor="middle" fontFamily="EB Garamond" fontSize="14" fill={color}>{D[i].n}</text>
          <text x={x} y={y+38} textAnchor="middle" fontFamily="EB Garamond" fontSize="11" fill={color} opacity="0.85">{D[i].latin}</text>
          <text x={x} y={y+50} textAnchor="middle" fontFamily="Noto Serif SC" fontSize="10" fill={color} opacity="0.6">{D[i].zh}</text>
        </g>
      ))}
    </svg>
  );
}

// 元素三角符号
function ElementGlyph({ id, size = 80, color = "currentColor" }) {
  const s = size, c = s/2;
  const tri = (up, crossbar) => {
    const r = s * 0.42;
    if (up) {
      const p = `M ${c} ${c-r} L ${c+r*0.866} ${c+r*0.5} L ${c-r*0.866} ${c+r*0.5} Z`;
      return (
        <>
          <path d={p} fill="none" stroke={color} strokeWidth="1.4"/>
          {crossbar && <line x1={c-r*0.45} y1={c+r*0.05} x2={c+r*0.45} y2={c+r*0.05} stroke={color} strokeWidth="1.2"/>}
        </>
      );
    } else {
      const p = `M ${c} ${c+r} L ${c+r*0.866} ${c-r*0.5} L ${c-r*0.866} ${c-r*0.5} Z`;
      return (
        <>
          <path d={p} fill="none" stroke={color} strokeWidth="1.4"/>
          {crossbar && <line x1={c-r*0.45} y1={c-r*0.05} x2={c+r*0.45} y2={c-r*0.05} stroke={color} strokeWidth="1.2"/>}
        </>
      );
    }
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${s} ${s}`}>
      {id === "ignis" && tri(true, false)}
      {id === "aer"   && tri(true, true)}
      {id === "aqua"  && tri(false, false)}
      {id === "terra" && tri(false, true)}
    </svg>
  );
}

// 简化的所罗门72灵 印记 — 程序化（与受版权图形无关）
function GoetiaSigil({ rank, name, size = 160, color = "currentColor" }) {
  // 用 rank 作为种子生成确定性几何
  const seed = (rank * 9301 + 49297) % 233280;
  const rng = (n) => ((Math.sin(seed + n * 12.9898) * 43758.5453) % 1 + 1) % 1;
  const cx = size/2, cy = size/2;
  const r = size * 0.38;
  // 在圆上放 5-8 个点，按某序连线，加几条放射线
  const np = 5 + Math.floor(rng(1) * 4); // 5..8
  const pts = [];
  for (let i = 0; i < np; i++) {
    const a = -Math.PI/2 + (i * 2 * Math.PI) / np + rng(i*3) * 0.3;
    const rr = r * (0.7 + rng(i*5) * 0.3);
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  // 一条主连线（按种子打乱顺序）
  const order = [...Array(np).keys()].sort((a,b) => rng(a*7) - rng(b*7));
  const path = order.map((i, k) => (k === 0 ? "M" : "L") + pts[i][0] + "," + pts[i][1]).join(" ") + " Z";
  // 几条放射小线
  const rays = [];
  for (let i = 0; i < np; i++) {
    const a = -Math.PI/2 + (i * 2 * Math.PI) / np;
    rays.push(
      <line key={i}
        x1={cx + r*0.45*Math.cos(a)} y1={cy + r*0.45*Math.sin(a)}
        x2={cx + r*0.95*Math.cos(a)} y2={cy + r*0.95*Math.sin(a)}
        stroke={color} strokeWidth="0.4" opacity="0.5"/>
    );
  }
  // 中心小符号
  const centerGlyph = ["☥","✠","☩","🜍","🜔","🜂"][rank % 6];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <circle cx={cx} cy={cy} r={size*0.45} fill="none" stroke={color} strokeWidth="0.6"/>
      <circle cx={cx} cy={cy} r={size*0.42} fill="none" stroke={color} strokeWidth="0.3" strokeDasharray="1 3"/>
      {rays}
      <path d={path} fill="none" stroke={color} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 3px currentColor)" }}/>
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="1.8" fill={color}/>
      ))}
      <text x={cx} y={cy+5} textAnchor="middle" fontFamily="EB Garamond" fontSize={size*0.14} fill={color} opacity="0.85">{centerGlyph}</text>
    </svg>
  );
}

// 翠玉录 — 卷边装饰性条纹（用 SVG 生成，不复制版画）
function VellumOrnament({ width = 400, height = 30, color = "currentColor" }) {
  const els = [];
  const n = 12;
  const w = width / n;
  for (let i = 0; i < n; i++) {
    const x = i * w + w/2;
    els.push(<circle key={i} cx={x} cy={height/2} r="1.5" fill={color} opacity="0.8"/>);
    if (i < n-1) {
      els.push(<line key={`l${i}`} x1={x+3} y1={height/2} x2={x+w-3} y2={height/2} stroke={color} strokeWidth="0.4" opacity="0.5"/>);
    }
  }
  return (
    <svg width={width} height={height}>
      <line x1="0" y1={height/2-6} x2={width} y2={height/2-6} stroke={color} strokeWidth="0.3" opacity="0.3"/>
      <line x1="0" y1={height/2+6} x2={width} y2={height/2+6} stroke={color} strokeWidth="0.3" opacity="0.3"/>
      {els}
    </svg>
  );
}

Object.assign(window, { PlanetSigil, KameaGrid, SummoningCircle, TreeOfLife, ElementGlyph, GoetiaSigil, VellumOrnament });
