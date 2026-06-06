/* =========================================================================
 * qimen.js — Qi Men Dun Jia (奇门遁甲), hour-based 时家奇门 (转盘 / 拆补法)
 *
 * Method:
 *   1. Determine the active solar term and the 三元 (上/中/下元) from the
 *      符头 (most recent 甲/己 day) → look up the 局 number + 阴/阳遁.
 *   2. Lay the 地盘三奇六仪 (Earth-plate stems) across the 9 palaces.
 *   3. Find the 旬首 of the hour → its 仪 → the 值符 star and 值使 door.
 *   4. Rotate the Heaven-plate stars so the 值符 star sits on the hour-stem's
 *      Earth palace; rotate the doors so 值使 advances per hour count; place
 *      the 8 gods following 值符.
 * ========================================================================= */

const QiMen = (function () {

  const RING = CM.QM_RING;                 // [1,8,3,4,9,2,7,6] later-heaven ring
  function ringIdx(p) { return RING.indexOf(p === 5 ? 2 : p); }
  function ringAt(i) { return RING[((i % 8) + 8) % 8]; }
  function wrap9(p) { return ((p - 1) % 9 + 9) % 9 + 1; }

  /* Hour ganzhi (jiazi 0..59) from day stem and hour. */
  function hourJiazi(dayStem, hour, minute) {
    const hp = Astro.hourPillar(dayStem, hour, minute || 0);
    for (let n = 0; n < 60; n++) if (n % 10 === hp.stem && n % 12 === hp.branch) return n;
    return 0;
  }
  function dayJiazi(dp) {
    for (let n = 0; n < 60; n++) if (n % 10 === dp.stem && n % 12 === dp.branch) return n;
    return 0;
  }

  /* 旬首 of a jiazi (hour or day): the 甲X that leads its 旬. */
  function xunShou(jiazi) {
    const lead = jiazi - (jiazi % 10);   // 0,10,20,30,40,50 → 甲子甲戌甲申甲午甲辰甲寅
    const map = { 0: "甲子", 10: "甲戌", 20: "甲申", 30: "甲午", 40: "甲辰", 50: "甲寅" };
    return { name: map[lead], jiazi: lead };
  }

  /* 元 (yuan) from 符头 branch: 子午卯酉→上(0), 寅申巳亥→中(1), 辰戌丑未→下(2). */
  function yuanFromFuTou(dayJz) {
    // most recent 甲/己 day on/before this day
    let fz = dayJz;
    while (!(fz % 10 === 0 || fz % 10 === 5)) fz = (fz - 1 + 60) % 60;
    const branch = fz % 12;
    if ([0, 6, 3, 9].indexOf(branch) >= 0) return { yuan: 0, name: "上元", fuTouBranch: branch };
    if ([2, 8, 5, 11].indexOf(branch) >= 0) return { yuan: 1, name: "中元", fuTouBranch: branch };
    return { yuan: 2, name: "下元", fuTouBranch: branch };
  }

  function compute(dt) {
    const tz = dt.tzOffset == null ? 8 : dt.tzOffset;
    const chart = Astro.fourPillars(dt);
    const hour = dt.hourKnown ? dt.hour : 12;
    const minute = dt.hourKnown ? (dt.minute || 0) : 0;

    const dp = chart.day;
    const dayJz = dayJiazi(dp);
    const hp = Astro.hourPillar(dp.stem, hour, minute);
    const hourJz = hourJiazi(dp.stem, hour, minute);

    // 1) solar term + 元 → 局
    const termNo = chart.solarTermNo;
    const yuanInfo = yuanFromFuTou(dayJz);
    const juData = CM.QM_JU[termNo];
    const yin = juData.yin;
    const ju = juData.ju[yuanInfo.yuan];

    // 2) Earth plate 地盘
    const earth = {};   // palace → stem char
    let p = ju;
    for (let i = 0; i < 9; i++) { earth[p] = CM.QM_STEMS[i]; p = wrap9(p + (yin ? -1 : 1)); }

    // 3) 旬首 & 值符 / 值使
    const xs = xunShou(hourJz);
    const fuYi = CM.QM_XUN_YI[xs.name];           // 旬首仪 stem char
    let pFu = +Object.keys(earth).find(k => earth[k] === fuYi);  // 值符 palace (ground)
    const fuStar = CM.QM_PALACE[pFu].star;        // 值符星
    const shiDoor = CM.QM_PALACE[pFu === 5 ? 2 : pFu].door; // 值使门
    const shiDoorEn = CM.QM_PALACE[pFu === 5 ? 2 : pFu].doorEn;

    // hour stem location (时干落宫). 甲 hour → use 旬首仪 location.
    let hourStemChar = CM.STEMS_CN[hp.stem];
    if (hourStemChar === "甲") hourStemChar = fuYi;
    let pHour = +Object.keys(earth).find(k => earth[k] === hourStemChar);

    // 4) Heaven-plate stars + stems (rotate so 值符星 → pHour)
    const starOffset = ringIdx(pHour) - ringIdx(pFu);
    const heavenStar = {}, heavenStem = {};
    RING.forEach((gp, i) => {
      const tgt = ringAt(i + starOffset);
      heavenStar[tgt] = CM.QM_PALACE[gp].star;
      heavenStem[tgt] = earth[gp];
    });
    // 天禽 (center ground star) + center stem ride with 天芮 (ground palace 2)
    const qinPalace = ringAt(ringIdx(2) + starOffset);
    heavenStar[qinPalace] = (heavenStar[qinPalace] || "") + "/天禽";
    heavenStem[qinPalace + "_qin"] = earth[5];

    // 5) Doors (值使 advances by hour-count within 旬)
    const steps = (hourJz - xs.jiazi + 60) % 60;   // 0..9
    const dir = yin ? -1 : 1;
    const doorOffset = dir * steps;
    const heavenDoor = {};
    RING.forEach((gp, i) => {
      const tgt = ringAt(i + doorOffset);
      heavenDoor[tgt] = CM.QM_PALACE[gp].door;
    });

    // 6) Gods 八神 — 值符 at pHour, follow ring (阳顺阴逆)
    const gods = {};
    const startG = ringIdx(pHour);
    for (let j = 0; j < 8; j++) {
      const tgt = ringAt(startG + dir * j);
      gods[tgt] = { cn: CM.QM_GODS[j], en: CM.QM_GODS_EN[j] };
    }

    // 7) Assemble grid (traditional layout, South/9 at top)
    const layout = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    const palaces = layout.map(pal => {
      const info = CM.QM_PALACE[pal];
      const cell = {
        palace: pal,
        trigram: info.trigram,
        dir: info.dir,
        earthStem: earth[pal],
        heavenStem: heavenStem[pal] || "",
        heavenStemQin: heavenStem[pal + "_qin"] || "",
        star: heavenStar[pal] || (pal === 5 ? "天禽(寄坤)" : ""),
        door: heavenDoor[pal] || (pal === 5 ? "" : ""),
        god: gods[pal] || null,
        isFu: pal === pFu,
        isHour: pal === pHour,
      };
      return cell;
    });

    return {
      chart,
      dayPillar: dp, hourPillar: hp,
      hourGz: CM.STEMS_CN[hp.stem] + CM.BRANCHES_CN[hp.branch],
      dayGz: CM.STEMS_CN[dp.stem] + CM.BRANCHES_CN[dp.branch],
      term: { no: termNo, cn: CM.SOLAR_TERMS[termNo - 1][0], en: CM.SOLAR_TERMS[termNo - 1][1] },
      yuan: yuanInfo.name,
      dun: yin ? "阴遁 Yin Dun" : "阳遁 Yang Dun",
      ju: ju,
      juText: (yin ? "阴遁" : "阳遁") + ju + "局",
      xunShou: xs.name,
      fuYi: fuYi,
      fuStar: fuStar,
      shiDoor: shiDoor, shiDoorEn: shiDoorEn,
      pFu: pFu, pHour: pHour,
      palaces: palaces,
    };
  }

  return { compute };
})();

if (typeof module !== "undefined") module.exports = QiMen;
