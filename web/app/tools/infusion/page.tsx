"use client";

import React from "react";

/**
 * Ä°nfÃ¼zyon HesaplarÄ±
 * - mL/saat â†” damla/dk (gtt) dÃ¶nÃ¼ÅŸÃ¼mÃ¼ (set: 20 gtt/mL veya mikrodrip 60 gtt/mL)
 * - Doz â†’ hÄ±z: mg/kg/dk â†’ mL/saat (konsantrasyon Ã¼zerinden)
 */

function round(n: number, dp = 2) {
  return Math.round(n * Math.pow(10, dp)) / Math.pow(10, dp);
}

export default function InfusionPage() {
  // 1) mL/saat â†” gtt/dk
  const [rateMlHr, setRateMlHr] = React.useState<number>(0);
  const [dropFactor, setDropFactor] = React.useState<number>(20); // gtt/mL (makro set 20; mikro 60)
  const gttPerMin = React.useMemo(() => round((rateMlHr * dropFactor) / 60, 1), [rateMlHr, dropFactor]);

  // 2) Doz (mg/kg/dk) â†’ mL/saat (konsantrasyon: mg/mL)
  const [weightKg, setWeightKg] = React.useState<number>(70);
  const [doseMgKgMin, setDoseMgKgMin] = React.useState<number>(0);
  const [concentrationMgMl, setConcentrationMgMl] = React.useState<number>(1); // Ã¶r: 1 mg/mL
  const mlPerHrFromDose = React.useMemo(() => {
    // mg/kg/dk â†’ mg/dk = dose * weight
    // mg/dk â†’ mg/saat = *60
    // mg/saat / (mg/mL) = mL/saat
    const mgPerMin = doseMgKgMin * weightKg;
    const mgPerHr = mgPerMin * 60;
    if (!concentrationMgMl || concentrationMgMl <= 0) return 0;
    return round(mgPerHr / concentrationMgMl, 2);
  }, [doseMgKgMin, weightKg, concentrationMgMl]);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Ä°nfÃ¼zyon HesaplarÄ±</h1>

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="font-semibold">mL/saat â†’ gtt/dk</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <label className="flex flex-col">
            <span className="text-xs mb-1">HÄ±z (mL/saat)</span>
            <input type="number" className="border rounded-lg px-3 py-2"
              value={rateMlHr} onChange={e=>setRateMlHr(parseFloat(e.target.value || "0"))} />
          </label>
          <label className="flex flex-col">
            <span className="text-xs mb-1">Set (gtt/mL)</span>
            <input type="number" className="border rounded-lg px-3 py-2"
              value={dropFactor} onChange={e=>setDropFactor(parseFloat(e.target.value || "0"))} />
            <span className="text-xs text-gray-500 mt-1">Makro: 20 Â· Mikro: 60</span>
          </label>
          <div className="flex flex-col justify-end">
            <div className="text-xs mb-1">SonuÃ§</div>
            <div className="text-lg font-semibold">{gttPerMin} gtt/dk</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="font-semibold">Doz â†’ HÄ±z (mg/kg/dk â†’ mL/saat)</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
          <label className="flex flex-col">
            <span className="text-xs mb-1">Kilo (kg)</span>
            <input type="number" className="border rounded-lg px-3 py-2"
              value={weightKg} onChange={e=>setWeightKg(parseFloat(e.target.value || "0"))} />
          </label>
          <label className="flex flex-col">
            <span className="text-xs mb-1">Doz (mg/kg/dk)</span>
            <input type="number" className="border rounded-lg px-3 py-2"
              value={doseMgKgMin} onChange={e=>setDoseMgKgMin(parseFloat(e.target.value || "0"))} />
          </label>
          <label className="flex flex-col">
            <span className="text-xs mb-1">Konsantrasyon (mg/mL)</span>
            <input type="number" className="border rounded-lg px-3 py-2"
              value={concentrationMgMl} onChange={e=>setConcentrationMgMl(parseFloat(e.target.value || "0"))} />
          </label>
          <div className="flex flex-col justify-end">
            <div className="text-xs mb-1">SonuÃ§</div>
            <div className="text-lg font-semibold">{mlPerHrFromDose} mL/saat</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Not: Bu hesap eÄŸitim amaÃ§lÄ±dÄ±r; ilaÃ§ protokollerinizdeki hedef doz ve dilÃ¼syonlarÄ± doÄŸrulayÄ±n.
        </div>
      </div>
    </div>
  );
}
