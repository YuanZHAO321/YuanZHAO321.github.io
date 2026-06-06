/* =========================================================================
 * bazi.js — Ba Zi (八字 / Four Pillars of Destiny)
 * ========================================================================= */

const BaZi = (function () {

  /* Ten God 十神 of a stem relative to the Day Master stem. */
  function tenGod(dmStem, otherStem) {
    const dmEl = CM.STEM_ELEMENT[dmStem], dmYang = CM.STEM_YANG[dmStem];
    const oEl = CM.STEM_ELEMENT[otherStem], oYang = CM.STEM_YANG[otherStem];
    const same = (dmYang === oYang);
    // element relations (0W,1F,2E,3M,4Wa) generating cycle W->F->E->M->Wa->W
    const generates = (a, b) => (a + 1) % 5 === b;   // a 生 b
    const controls = (a, b) => (a + 2) % 5 === b;    // a 克 b
    if (oEl === dmEl) return same ? "比肩" : "劫财";
    if (generates(dmEl, oEl)) return same ? "食神" : "伤官";   // 我生
    if (controls(dmEl, oEl)) return same ? "偏财" : "正财";    // 我克
    if (controls(oEl, dmEl)) return same ? "七杀" : "正官";    // 克我
    if (generates(oEl, dmEl)) return same ? "偏印" : "正印";   // 生我
    return "";
  }

  /* 12 Stages of life cycle 长生十二宫 for a stem at a branch. */
  const LIFE_STAGES = ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"];
  const LIFE_STAGES_EN = ["Growth", "Bath", "Cap", "Officer", "Prime", "Decline", "Illness", "Death", "Tomb", "Extinct", "Womb", "Nurture"];
  // 长生 branch for each stem (yang go forward, yin backward)
  const CHANGSHENG = [11, 6, 2, 9, 2, 9, 5, 0, 8, 3]; // 甲亥 乙午 丙寅 丁酉 戊寅 己酉 庚巳 辛子 壬申 癸卯
  function lifeStage(stem, branch) {
    const start = CHANGSHENG[stem];
    const dir = CM.STEM_YANG[stem] ? 1 : -1;
    const idx = ((branch - start) * dir % 12 + 12) % 12;
    return { cn: LIFE_STAGES[idx], en: LIFE_STAGES_EN[idx] };
  }

  /* Luck pillars 大运. Direction: yang-year male / yin-year female → forward.
   * Start age from days to the bounding 节 divided by 3. */
  function luckPillars(dt, chart) {
    const tz = dt.tzOffset == null ? 8 : dt.tzOffset;
    const yangYear = CM.STEM_YANG[chart.year.stem];
    const male = (dt.gender !== "Female");
    const forward = (yangYear === male);

    // sectional term longitudes that bound the birth solar-month
    const lambda = chart.lambda;
    const k = Math.floor((((lambda - 315) % 360 + 360) % 360) / 30);
    const curTermLon = (315 + k * 30) % 360;       // start of current 节
    const nextTermLon = (curTermLon + 30) % 360;

    const hour = dt.hourKnown ? dt.hour : 12;
    const minute = dt.hourKnown ? (dt.minute || 0) : 0;
    const birthJD = Astro.toJD(dt.year, dt.month, dt.day, hour, minute, 0, tz);

    let targetLon = forward ? nextTermLon : curTermLon;
    const guess = birthJD + (forward ? 15 : -15);
    const termJD = Astro.solarTermJD(targetLon, guess, dt.year, dt.month, tz);
    const days = Math.abs(termJD - birthJD);
    const startAgeFloat = days / 3;                  // 3 days = 1 year
    const startAge = Math.round(startAgeFloat * 10) / 10;

    // generate 10 luck pillars from month pillar
    const list = [];
    let s = chart.month.stem, b = chart.month.branch;
    for (let i = 0; i < 10; i++) {
      s = (s + (forward ? 1 : -1) + 10) % 10;
      b = (b + (forward ? 1 : -1) + 12) % 12;
      list.push({
        stem: s, branch: b,
        age: Math.floor(startAge) + i * 10,
        year: chart.year.year + Math.floor(startAge) + i * 10,
        god: tenGod(chart.day.stem, s),
      });
    }
    return { forward, startAge, list };
  }

  /* Element distribution (count weighted: stems 1, branch main hidden 1). */
  function elementCount(chart) {
    const cnt = [0, 0, 0, 0, 0];
    const pillars = [chart.year, chart.month, chart.day, chart.hour].filter(Boolean);
    pillars.forEach(p => {
      cnt[CM.STEM_ELEMENT[p.stem]]++;
      const hid = CM.HIDDEN_STEMS[p.branch];
      hid.forEach((h, i) => { cnt[CM.STEM_ELEMENT[h]] += (i === 0 ? 1 : 0.5); });
    });
    return cnt;
  }

  function compute(dt) {
    const chart = Astro.fourPillars(dt);
    const dm = chart.day.stem;

    function pillarData(p, isDay) {
      if (!p) return null;
      const hidden = CM.HIDDEN_STEMS[p.branch].map(h => ({
        stem: h, god: tenGod(dm, h),
      }));
      const jiazi = ((p.stem - p.branch) % 10 + 10) % 10; // not used directly
      return {
        stem: p.stem, branch: p.branch,
        stemGod: isDay ? "日主" : tenGod(dm, p.stem),
        hidden: hidden,
        nayin: Astro.naYin(((p.stem) + 0)),  // placeholder; replaced below
        life: lifeStage(dm, p.branch),
      };
    }

    // jiazi index per pillar for Na Yin
    function jiaziOf(p) { // find n with n%10=stem, n%12=branch
      for (let n = 0; n < 60; n++) if (n % 10 === p.stem && n % 12 === p.branch) return n;
      return 0;
    }

    const out = {
      raw: chart,
      pillars: {
        year: pillarData(chart.year, false),
        month: pillarData(chart.month, false),
        day: pillarData(chart.day, true),
        hour: pillarData(chart.hour, false),
      },
      dayMaster: dm,
      dayMasterEl: CM.STEM_ELEMENT[dm],
      elementCount: elementCount(chart),
      solarTermNo: chart.solarTermNo,
    };
    ["year", "month", "day", "hour"].forEach(k => {
      const p = chart[k];
      if (p && out.pillars[k]) out.pillars[k].nayin = Astro.naYin(jiaziOf(p));
    });
    out.luck = luckPillars(dt, chart);
    return out;
  }

  return { compute, tenGod, lifeStage };
})();

if (typeof module !== "undefined") module.exports = BaZi;
