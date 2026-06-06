/* =========================================================================
 * astro.js — Astronomical & Chinese-calendar core engine
 *
 * Provides:
 *   - Julian Day conversions
 *   - Apparent solar ecliptic longitude (Meeus, low-precision ~0.01°)
 *   - Lunar longitude, phase, illumination (Meeus low-precision)
 *   - Solar-term mapping & precise solar-term instants
 *   - GanZhi (干支) for year / month / day / hour pillars
 *
 * All civil times are interpreted in a fixed timezone offset (hours east of
 * UTC). Chinese metaphysics is traditionally reckoned in China Standard Time
 * (UTC+8); the caller may pass a different offset.
 * ========================================================================= */

const Astro = (function () {
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;

  function norm360(x) { return ((x % 360) + 360) % 360; }

  /* ---- Julian Day (from civil date/time at given tz offset in hours) ---- */
  function toJD(year, month, day, hour, minute, second, tzOffset) {
    hour = hour || 0; minute = minute || 0; second = second || 0;
    tzOffset = tzOffset == null ? 8 : tzOffset;
    // convert civil → UT
    const dayFrac = (hour + minute / 60 + second / 3600 - tzOffset) / 24;
    let y = year, m = month;
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const jd0 = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) +
                day - 1524.5;
    return jd0 + B + dayFrac;
  }

  /* Integer Julian Day Number for a civil date (noon convention). */
  function toJDN(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y +
           Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  /* ΔT (TT - UT) in seconds — polynomial approximation (Espenak/Meeus). */
  function deltaT(year, month) {
    const y = year + (month - 0.5) / 12;
    let t, dt;
    if (y < 1986) { t = (y - 1900) / 100; dt = -2.79 + 149.4119 * t - 598.939 * t * t + 6196.6 * Math.pow(t, 3) - 19700 * Math.pow(t, 4); if (y >= 1920) { t = y - 1920; dt = 21.20 + 0.84493 * t - 0.076100 * t * t + 0.0020936 * Math.pow(t, 3); } }
    else if (y < 2005) { t = y - 2000; dt = 63.86 + 0.3345 * t - 0.060374 * t * t + 0.0017275 * Math.pow(t, 3) + 0.000651814 * Math.pow(t, 4) + 0.00002373599 * Math.pow(t, 5); }
    else if (y < 2050) { t = y - 2000; dt = 62.92 + 0.32217 * t + 0.005589 * t * t; }
    else { t = (y - 1820) / 100; dt = -20 + 32 * t * t; }
    return dt;
  }

  /* Apparent geocentric solar longitude (deg) for a given JD (UT).
   * Internally converts to JDE (TT). */
  function sunLongitude(jd, year, month) {
    const jde = jd + deltaT(year || 2000, month || 1) / 86400;
    const T = (jde - 2451545.0) / 36525.0;
    const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const Mr = M * D2R;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
              (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) +
              0.000289 * Math.sin(3 * Mr);
    const trueLong = L0 + C;
    const Omega = 125.04 - 1934.136 * T;
    const lambda = trueLong - 0.00569 - 0.00478 * Math.sin(Omega * D2R);
    return norm360(lambda);
  }

  /* Lunar apparent longitude (deg) — Meeus low precision (~0.3°). */
  function moonLongitude(jd, year, month) {
    const jde = jd + deltaT(year || 2000, month || 1) / 86400;
    const T = (jde - 2451545.0) / 36525.0;
    const Lp = 218.3164477 + 481267.88123421 * T;            // mean longitude
    const D  = 297.8501921 + 445267.1114034 * T;             // elongation
    const M  = 357.5291092 + 35999.0502909 * T;              // sun anomaly
    const Mp = 134.9633964 + 477198.8675055 * T;             // moon anomaly
    const F  = 93.2720950 + 483202.0175233 * T;              // arg of latitude
    const Dr = D * D2R, Mr = M * D2R, Mpr = Mp * D2R, Fr = F * D2R;
    let lon = Lp;
    lon += 6.288774 * Math.sin(Mpr);
    lon += 1.274027 * Math.sin(2 * Dr - Mpr);
    lon += 0.658314 * Math.sin(2 * Dr);
    lon += 0.213618 * Math.sin(2 * Mpr);
    lon += -0.185116 * Math.sin(Mr);
    lon += -0.114332 * Math.sin(2 * Fr);
    lon += 0.058793 * Math.sin(2 * Dr - 2 * Mpr);
    lon += 0.057066 * Math.sin(2 * Dr - Mr - Mpr);
    lon += 0.053322 * Math.sin(2 * Dr + Mpr);
    lon += 0.045758 * Math.sin(2 * Dr - Mr);
    lon += -0.040923 * Math.sin(Mr - Mpr);
    lon += -0.034720 * Math.sin(Dr);
    lon += -0.030383 * Math.sin(Mr + Mpr);
    return norm360(lon);
  }

  /* Sun-Moon elongation → phase fraction & illumination.
   * Returns {age(days), phaseFrac(0..1), illum(0..1), phaseName, ecLon} */
  function moonInfo(jd, year, month) {
    const sl = sunLongitude(jd, year, month);
    const ml = moonLongitude(jd, year, month);
    let elong = norm360(ml - sl);                 // 0=new, 180=full
    const phaseFrac = elong / 360;                // 0..1 cycle
    const illum = (1 - Math.cos(elong * D2R)) / 2;
    const age = phaseFrac * 29.530588853;
    let idx = Math.floor((elong + 22.5) / 45) % 8;
    return {
      age: age,
      phaseFrac: phaseFrac,
      illum: illum,
      elong: elong,
      phaseName: CM.MOON_PHASES[idx],
      ecLon: ml,
    };
  }

  /* Lunar day number 1..30 (新月=初一). Approx by age. */
  function lunarDay(jd, year, month) {
    const info = moonInfo(jd, year, month);
    let d = Math.floor(info.age) + 1;
    if (d > 30) d = 30;
    return d;
  }

  /* Solar-term number (1..24, 立春=1) currently in effect at given longitude. */
  function solarTermNumber(lambda) {
    return Math.floor((((lambda - 315) % 360 + 360) % 360) / 15) + 1;
  }

  /* Month branch index (0=子) directly from solar longitude.
   * 立春(λ=315) starts 寅 month (branch 2). */
  function monthBranchFromLongitude(lambda) {
    const k = Math.floor((((lambda - 315) % 360 + 360) % 360) / 30);
    return (k + 2) % 12;
  }

  /* Find the JD (UT, given tz) at which the sun reaches target longitude,
   * searching near a guess JD. Newton-ish bisection. */
  function solarTermJD(targetLon, guessJD, year, month, tzOffset) {
    let lo = guessJD - 20, hi = guessJD + 20;
    function f(jd) {
      let diff = sunLongitude(jd, year, month) - targetLon;
      // unwrap to [-180,180]
      diff = ((diff + 180) % 360 + 360) % 360 - 180;
      return diff;
    }
    let flo = f(lo);
    for (let i = 0; i < 100; i++) {
      const mid = (lo + hi) / 2;
      const fm = f(mid);
      if (Math.abs(hi - lo) < 1e-6) return mid;
      if ((flo < 0 && fm < 0) || (flo > 0 && fm > 0)) { lo = mid; flo = fm; }
      else { hi = mid; }
    }
    return (lo + hi) / 2;
  }

  /* ----------------------  GanZhi (干支) pillars  ---------------------- */

  /* Year pillar — uses solar (立春) year boundary. Returns {stem,branch,year} */
  function yearPillar(year, month, day, lambda) {
    let by = year;
    if (month < 2) by = year - 1;
    else if (month === 2) { if (lambda < 315 && lambda > 280) by = year - 1; }
    // for month>=3 stays = year (always after 立春, before next 立春)
    const idx = ((by - 4) % 60 + 60) % 60;
    return { stem: idx % 10, branch: idx % 12, year: by };
  }

  /* Month pillar — branch from longitude, stem from five-tiger rule. */
  function monthPillar(yearStem, lambda) {
    const branch = monthBranchFromLongitude(lambda);
    const firstStem = (yearStem * 2 + 2) % 10;     // 寅-month stem (五虎遁)
    const offset = ((branch - 2) % 12 + 12) % 12;
    const stem = (firstStem + offset) % 10;
    return { stem: stem, branch: branch };
  }

  /* Day pillar from JDN. Day boundary at 23:00 (late 子时 → next day). */
  function dayPillar(year, month, day, hour) {
    let jdn = toJDN(year, month, day);
    if (hour != null && hour >= 23) jdn += 1;
    const idx = ((jdn + 49) % 60 + 60) % 60;
    return { stem: idx % 10, branch: idx % 12, jiazi: idx, jdn: jdn };
  }

  /* Hour pillar from day stem + clock hour (with minutes). */
  function hourPillar(dayStem, hour, minute) {
    minute = minute || 0;
    const h = hour + minute / 60;
    const branch = Math.floor(((h + 1) % 24) / 2);   // 23-1 → 子(0)
    const ziStem = (dayStem * 2) % 10;               // 五鼠遁
    const stem = (ziStem + branch) % 10;
    return { stem: stem, branch: branch };
  }

  /* Na Yin for a jiazi index (0..59). */
  function naYin(jiazi) { return CM.NAYIN[Math.floor(jiazi / 2)]; }

  /* Full four-pillar chart. dt = {year,month,day,hour,minute, tzOffset, hourKnown} */
  function fourPillars(dt) {
    const tz = dt.tzOffset == null ? 8 : dt.tzOffset;
    const hour = dt.hourKnown ? dt.hour : 12;
    const minute = dt.hourKnown ? (dt.minute || 0) : 0;
    const jd = toJD(dt.year, dt.month, dt.day, hour, minute, 0, tz);
    const lambda = sunLongitude(jd, dt.year, dt.month);

    const yp = yearPillar(dt.year, dt.month, dt.day, lambda);
    const mp = monthPillar(yp.stem, lambda);
    const dp = dayPillar(dt.year, dt.month, dt.day, dt.hourKnown ? hour : null);
    const hp = dt.hourKnown ? hourPillar(dp.stem, hour, minute) : null;

    return {
      jd: jd, lambda: lambda,
      year: yp, month: mp, day: dp, hour: hp,
      solarTermNo: solarTermNumber(lambda),
      yearJiazi: ((yp.year - 4) % 60 + 60) % 60,
      dayJiazi: dp.jiazi,
    };
  }

  return {
    toJD, toJDN, deltaT, sunLongitude, moonLongitude, moonInfo, lunarDay,
    solarTermNumber, monthBranchFromLongitude, solarTermJD,
    yearPillar, monthPillar, dayPillar, hourPillar, naYin, fourPillars,
    norm360,
  };
})();

if (typeof module !== "undefined") module.exports = Astro;
