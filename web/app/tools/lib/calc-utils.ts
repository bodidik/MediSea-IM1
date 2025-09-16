// FILE: web/app/tools/lib/calc-utils.ts

// ---------- Türler ----------
export type Sex = "male" | "female";

// ---------- Yardımcılar ----------
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const round = (n: number, dp = 2) =>
  Math.round(n * Math.pow(10, dp)) / Math.pow(10, dp);

// ---------- CKD-EPI ----------
/**
 * CKD-EPI 2021 race-free (serum kreatinin, mg/dL)
 * Kaynak: Inker LA et al., N Engl J Med 2021.
 * eGFR = 142 * min(Scr/κ,1)^α * max(Scr/κ,1)^(-1.200) * 0.9938^Age * [1.012 if female]
 *  κ: 0.7 (kadın), 0.9 (erkek) ; α: −0.241 (kadın), −0.302 (erkek)
 */
export function egfrCkdEpi2021(
  scrMgdl: number,
  age: number,
  sex: Sex
): number {
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const scrByK = scrMgdl / kappa;
  const minTerm = Math.min(scrByK, 1) ** alpha;
  const maxTerm = Math.max(scrByK, 1) ** -1.2;
  const sexFactor = sex === "female" ? 1.012 : 1.0;
  const egfr = 142 * minTerm * maxTerm * Math.pow(0.9938, age) * sexFactor;
  return round(egfr, 1);
}

/**
 * CKD-EPI 2009 (serum kreatinin, mg/dL) — isteğe bağlı
 * ırk faktörü içermez (race katsayısı 1 alınmıştır).
 */
export function egfrCkdEpi2009(
  scrMgdl: number,
  age: number,
  sex: Sex
): number {
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.329 : -0.411;
  const sexFactor = sex === "female" ? 1.018 : 1.0;
  const scrByK = scrMgdl / kappa;
  const minTerm = Math.min(scrByK, 1) ** alpha;
  const maxTerm = Math.max(scrByK, 1) ** -1.209;
  const egfr = 141 * minTerm * maxTerm * Math.pow(0.993, age) * sexFactor;
  return round(egfr, 1);
}

// ---------- Düzeltmiş kalsiyum (Payne) ----------
/**
 * Corrected Ca (mg/dL) = measured + 0.8 * (4.0 − albumin)
 * (albumin g/dL)
 */
export function correctedCalciumMgdl(
  measuredMgdl: number,
  albuminGdl: number
): number {
  const corr = measuredMgdl + 0.8 * (4 - albuminGdl);
  return round(corr, 2);
}

// ---------- Birim çevirileri ----------
export const factor = {
  // mmol/L = mg/dL * factor.mmolFromMgdl.X
  mmolFromMgdl: {
    glucose: 0.0555, // mmol/L
    ureaNitrogen: 0.357, // BUN
    creatinine: 0.0884, // mg/dL → mmol/L (ya da 88.4 → µmol/L)
    calcium: 0.2495, // ≈0.25
    sodium: 0.0435, // örnek (mg/dL → mmol/L), pratikte Na mg/dL pek kullanılmaz
  },
  // mg/dL = mmol/L * factor.mgdlFromMmol.X
  mgdlFromMmol: {
    glucose: 18.0182,
    ureaNitrogen: 2.800, // ≈ 1/0.357
    creatinine: 11.314, // mmol/L → mg/dL
    calcium: 4.006, // ≈ 1/0.2495
  },
  // µmol/L ↔ mg/dL (kreatinin)
  umolFromCreatMgdl: 88.4,
  creatMgdlFromUmol: 1 / 88.4,
};

export function mgdlToMmol(x: number, kind: keyof typeof factor.mmolFromMgdl) {
  return round(x * factor.mmolFromMgdl[kind], 3);
}

export function mmolToMgdl(x: number, kind: keyof typeof factor.mgdlFromMmol) {
  return round(x * factor.mgdlFromMmol[kind], 1);
}

export function creatMgdlToUmolL(x: number) {
  return round(x * factor.umolFromCreatMgdl, 0);
}
export function creatUmolLToMgdl(x: number) {
  return round(x * factor.creatMgdlFromUmol, 2);
}


// Ek: infüzyon yardımcıları
export const infusion = {
  gttPerMin(rateMlPerHour: number, dropFactorGttPerMl: number) {
    return Math.round(((rateMlPerHour * dropFactorGttPerMl) / 60) * 10) / 10;
  },
  mlPerHourFromDose(doseMgPerKgPerMin: number, weightKg: number, concentrationMgPerMl: number) {
    if (!concentrationMgPerMl) return 0;
    const mgPerMin = doseMgPerKgPerMin * weightKg;
    const mgPerHour = mgPerMin * 60;
    return Math.round((mgPerHour / concentrationMgPerMl) * 100) / 100;
  },
};
