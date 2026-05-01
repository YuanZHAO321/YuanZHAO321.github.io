// 真实可用的工具：
// 1. 行星时计算器（按地理纬度算日出日落，再分为日昼12等份+夜12等份）
// 2. 塔罗抽牌
// 3. 希伯来字母+大阿卡纳查询

const D2 = window.GRIMOIRE_DATA2;
const D = window.GRIMOIRE_DATA;

// === 行星时计算器 ===
// 日出日落算法 — NOAA 标准近似公式
function calcSunTimes(date, lat, lon) {
  const rad = Math.PI / 180;
  const dayMs = 86400000;
  const J1970 = 2440588;
  const J2000 = 2451545;
  const toJulian = d => d.valueOf() / dayMs - 0.5 + J1970;
  const toDays = d => toJulian(d) - J2000;

  const e = rad * 23.4397;
  const solarMeanAnomaly = d => rad * (357.5291 + 0.98560028 * d);
  const eclipticLongitude = M => {
    const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2*M) + 0.0003 * Math.sin(3*M));
    return M + C + rad * 102.9372 + Math.PI;
  };
  const declination = (l, b) => Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));
  const julianCycle = (d, lw) => Math.round(d - 0.0009 - lw / (2 * Math.PI));
  const approxTransit = (Ht, lw, n) => 0.0009 + (Ht + lw) / (2 * Math.PI) + n;
  const solarTransitJ = (ds, M, L) => J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
  const hourAngle = (h, phi, d) => Math.acos((Math.sin(h) - Math.sin(phi) * Math.sin(d)) / (Math.cos(phi) * Math.cos(d)));
  const getSetJ = (h, lw, phi, dec, n, M, L) => {
    const w = hourAngle(h, phi, dec);
    const a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
  };
  const fromJulian = j => new Date((j + 0.5 - J1970) * dayMs);

  const lw = rad * -lon;
  const phi = rad * lat;
  const d = toDays(date);
  const n = julianCycle(d, lw);
  const ds = approxTransit(0, lw, n);
  const M = solarMeanAnomaly(ds);
  const L = eclipticLongitude(M);
  const dec = declination(L, 0);
  const Jnoon = solarTransitJ(ds, M, L);
  const h0 = rad * -0.833;
  const Jset = getSetJ(h0, lw, phi, dec, n, M, L);
  const Jrise = Jnoon - (Jset - Jnoon);
  return { sunrise: fromJulian(Jrise), sunset: fromJulian(Jset) };
}

function PlanetaryHours() {
  const today = new Date();
  const [date, setDate] = React.useState(today.toISOString().slice(0,10));
  const [lat, setLat] = React.useState(31.23);   // 上海
  const [lon, setLon] = React.useState(121.47);
  const [city, setCity] = React.useState("上海");

  const cities = [
    {n:"上海",lat:31.23,lon:121.47},
    {n:"北京",lat:39.90,lon:116.41},
    {n:"广州",lat:23.13,lon:113.26},
    {n:"成都",lat:30.67,lon:104.07},
    {n:"伦敦",lat:51.51,lon:-0.13},
    {n:"纽约",lat:40.71,lon:-74.01},
    {n:"东京",lat:35.68,lon:139.76},
  ];

  const d = new Date(date + "T12:00:00");
  const { sunrise, sunset } = calcSunTimes(d, lat, lon);
  // 次日日出
  const nextD = new Date(d.getTime() + 86400000);
  const { sunrise: sunriseNext } = calcSunTimes(nextD, lat, lon);

  const dayLen = sunset - sunrise;
  const nightLen = sunriseNext - sunset;
  const dayHourMs = dayLen / 12;
  const nightHourMs = nightLen / 12;

  // 今日守护行星 (按 0=Sun,1=Mon,..6=Sat 对应 weekdayRulers)
  const weekday = sunrise.getDay();
  const dayRuler = D2.weekdayRulers[weekday];
  // 迦勒底序
  const chal = D2.chaldean;
  const startIdx = chal.indexOf(dayRuler);

  const hours = [];
  for (let i = 0; i < 12; i++) {
    const t0 = new Date(sunrise.getTime() + i * dayHourMs);
    const t1 = new Date(sunrise.getTime() + (i + 1) * dayHourMs);
    const planet = chal[(startIdx + i) % 7];
    hours.push({ kind: "day", n: i+1, t0, t1, planet });
  }
  for (let i = 0; i < 12; i++) {
    const t0 = new Date(sunset.getTime() + i * nightHourMs);
    const t1 = new Date(sunset.getTime() + (i + 1) * nightHourMs);
    const planet = chal[(startIdx + 12 + i) % 7];
    hours.push({ kind: "night", n: i+1, t0, t1, planet });
  }

  const fmt = t => t.toTimeString().slice(0,5);
  const now = new Date();
  const cur = hours.findIndex(h => now >= h.t0 && now < h.t1);

  return (
    <div className="tool-block">
      <div className="tool-controls">
        <div className="tool-row">
          <label>日期</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}/>
        </div>
        <div className="tool-row">
          <label>地点</label>
          <select value={city} onChange={e=>{const c = cities.find(x=>x.n===e.target.value); if(c){setCity(c.n);setLat(c.lat);setLon(c.lon);}}}>
            {cities.map(c => <option key={c.n} value={c.n}>{c.n}</option>)}
          </select>
        </div>
        <div className="tool-row mono small">
          <span>纬 {lat.toFixed(2)}° · 经 {lon.toFixed(2)}°</span>
        </div>
      </div>

      <div className="tool-summary">
        <div className="ts-row"><em>本日守护</em><strong>{D.planets.find(p=>p.id===dayRuler).glyph} {D.planets.find(p=>p.id===dayRuler).zh}</strong></div>
        <div className="ts-row"><em>日出</em><strong>{fmt(sunrise)}</strong></div>
        <div className="ts-row"><em>日落</em><strong>{fmt(sunset)}</strong></div>
        <div className="ts-row"><em>昼时长</em><strong>{Math.round(dayHourMs/60000)} 分</strong></div>
        <div className="ts-row"><em>夜时长</em><strong>{Math.round(nightHourMs/60000)} 分</strong></div>
      </div>

      <div className="hour-grid">
        <div className="hour-col">
          <div className="hour-col-h">昼之十二时</div>
          {hours.slice(0,12).map((h, i) => {
            const p = D.planets.find(x => x.id === h.planet);
            return (
              <div key={i} className={"hour-row " + (cur===i?"now":"")}>
                <span className="h-n">{D2.hourLabels[i]}</span>
                <span className="h-time">{fmt(h.t0)}–{fmt(h.t1)}</span>
                <span className="h-glyph" style={{color:p.color}}>{p.glyph}</span>
                <span className="h-name">{p.zh}</span>
              </div>
            );
          })}
        </div>
        <div className="hour-col">
          <div className="hour-col-h">夜之十二时</div>
          {hours.slice(12).map((h, i) => {
            const p = D.planets.find(x => x.id === h.planet);
            return (
              <div key={i} className={"hour-row " + (cur===i+12?"now":"")}>
                <span className="h-n">{D2.hourLabels[i]}</span>
                <span className="h-time">{fmt(h.t0)}–{fmt(h.t1)}</span>
                <span className="h-glyph" style={{color:p.color}}>{p.glyph}</span>
                <span className="h-name">{p.zh}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// === 塔罗抽牌 ===
function TarotDraw() {
  const arcana = D.arcana;
  const [draw, setDraw] = React.useState([]);
  const [mode, setMode] = React.useState("three");
  const [revealed, setRevealed] = React.useState(false);

  const positions = {
    one:   [{label:"指引"}],
    three: [{label:"过去"},{label:"现在"},{label:"未来"}],
    cross: [{label:"现状"},{label:"挑战"},{label:"根基"},{label:"近况"},{label:"内心"},{label:"未来"}],
  };

  const doDraw = () => {
    const pool = [...arcana];
    const out = [];
    const n = positions[mode].length;
    for (let i = 0; i < n; i++) {
      const k = Math.floor(Math.random() * pool.length);
      const card = pool.splice(k,1)[0];
      const reversed = Math.random() < 0.3;
      out.push({ ...card, reversed });
    }
    setDraw(out);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 80);
  };

  return (
    <div className="tool-block">
      <div className="tool-controls">
        <div className="tool-row">
          <label>牌阵</label>
          <select value={mode} onChange={e=>{setMode(e.target.value);setDraw([]);}}>
            <option value="one">单张 · 今日指引</option>
            <option value="three">三张 · 过去/现在/未来</option>
            <option value="cross">六张 · 简凯尔特</option>
          </select>
        </div>
        <button className="tool-btn" onClick={doDraw}>抽 牌 · Tirage</button>
      </div>
      {draw.length > 0 && (
        <div className={"tarot-spread spread-" + mode}>
          {draw.map((c, i) => (
            <div key={i} className={"tarot-card " + (c.reversed?"reversed ":"") + (revealed?"on":"")} style={{transitionDelay: (i*120)+"ms"}}>
              <div className="tc-pos">{positions[mode][i].label}</div>
              <div className="tc-roman">{c.roman}</div>
              <div className="tc-glyph">{c.planet}</div>
              <div className="tc-zh">{c.zh}</div>
              <div className="tc-lat">{c.latin}</div>
              <div className="tc-letter hebrew">{c.hebrew}</div>
              {c.reversed && <div className="tc-rev">逆位</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { PlanetaryHours, TarotDraw });
