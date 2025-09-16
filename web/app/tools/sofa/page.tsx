"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * SOFA (Sequential Organ Failure Assessment)
 * Parametreler: Solunum (P/F), KoagÃ¼lasyon (Plt), KaraciÄŸer (Bilirubin),
 * KardiyovaskÃ¼ler (MAP/vasopressÃ¶r), SSS (GKS), Renal (Kreatinin/diÃ¼rez).
 * BasitleÅŸtirilmiÅŸ uygulamadÄ±r; kÄ±lavuzlarÄ± doÄŸrulayÄ±n.
 */

function round(n:number, dp=0){ return Math.round(n*Math.pow(10,dp))/Math.pow(10,dp); }
function clamp(n:number, min:number, max:number){ return Math.max(min, Math.min(max, n)); }

export default function SOFAPage(){
  const s = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  // Solunum
  const [pf, setPf] = React.useState<number>(parseFloat(s?.get("pf") || "400")); // PaO2/FiO2
  const [respSupport, setRespSupport] = React.useState<boolean>(s?.get("vent")==="1"); // ventilasyon/CPAP

  // KoagÃ¼lasyon
  const [plt, setPlt] = React.useState<number>(parseFloat(s?.get("plt") || "200")); // 10^3/ÂµL

  // KaraciÄŸer
  const [bili, setBili] = React.useState<number>(parseFloat(s?.get("bili") || "1")); // mg/dL

  // KardiyovaskÃ¼ler
  const [map, setMap] = React.useState<number>(parseFloat(s?.get("map") || "75"));
  const [pressor, setPressor] = React.useState<string>(s?.get("press") || "none"); // none/dobu/dopa/epi/norepi
  const [dose, setDose] = React.useState<number>(parseFloat(s?.get("dose") || "0")); // Âµg/kg/dk

  // SSS (GKS)
  const [gcs, setGcs] = React.useState<number>(parseFloat(s?.get("gcs") || "15"));

  // Renal
  const [cr, setCr] = React.useState<number>(parseFloat(s?.get("cr") || "1.0")); // mg/dL
  const [urine, setUrine] = React.useState<number>(parseFloat(s?.get("ur") || "1000")); // mL/gÃ¼n

  // --- Skorlamalar ---
  function scoreResp(){
    // mg/dL deÄŸil; P/F oranÄ± (PaO2/FiO2)
    if (pf >= 400) return 0;
    if (pf < 400 && pf >= 300) return 1;
    if (pf < 300 && pf >= 200) return 2;
    if (pf < 200 && pf >= 100) return respSupport ? 3 : 2;
    if (pf < 100) return respSupport ? 4 : 3;
    return 0;
  }

  function scoreCoag(){
    if (plt >= 150) return 0;
    if (plt < 150 && plt >= 100) return 1;
    if (plt < 100 && plt >= 50) return 2;
    if (plt < 50 && plt >= 20) return 3;
    if (plt < 20) return 4;
    return 0;
  }

  function scoreLiver(){
    if (bili < 1.2) return 0;
    if (bili >= 1.2 && bili < 2.0) return 1;
    if (bili >= 2.0 && bili < 6.0) return 2;
    if (bili >= 6.0 && bili < 12.0) return 3;
    return 4; // >=12
  }

  function scoreCardio(){
    const m = map;
    const p = pressor;
    const d = dose;
    if (p === "none"){
      return m < 70 ? 1 : 0;
    }
    if (p === "dobu") return 2; // dobutamin herhangi doz
    if (p === "dopa"){
      if (d <= 5) return 2;
      if (d > 5 && d <= 15) return 3;
      return 4; // >15
    }
    if (p === "epi" || p === "norepi"){
      if (d <= 0.1) return 3;
      return 4; // >0.1
    }
    return 0;
  }

  function scoreCNS(){
    const g = clamp(gcs, 3, 15);
    if (g === 15) return 0;
    if (g >= 13) return 1;
    if (g >= 10) return 2;
    if (g >= 6) return 3;
    return 4; // <6
  }

  function scoreRenal(){
    // Cr mg/dL ve idrar Ã§Ä±kÄ±ÅŸÄ± kriterleri
    if (cr < 1.2 && urine >= 500) return 0;
    if ((cr >= 1.2 && cr < 2.0) && urine >= 500) return 1;
    if ((cr >= 2.0 && cr < 3.5) && urine >= 500) return 2;
    if ((cr >= 3.5 && cr < 5.0) || (urine < 500 && urine >= 200)) return 3;
    if (cr >= 5.0 || urine < 200) return 4;
    // default fallback
    return 0;
  }

  const resp = scoreResp();
  const coag = scoreCoag();
  const liv = scoreLiver();
  const car = scoreCardio();
  const cns = scoreCNS();
  const ren = scoreRenal();
  const total = resp + coag + liv + car + cns + ren;

  const params = {
    pf, vent: respSupport?1:"", plt, bili, map, press: pressor, dose, gcs, cr, ur: urine
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">SOFA</h1>

      <div className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Solunum */}
        <div className="rounded-xl border p-3 space-y-2">
          <div className="font-semibold">Solunum (PaOâ‚‚/FiOâ‚‚)</div>
          <label className="flex items-center gap-2">
            <span className="text-xs w-36">P/F</span>
            <input type="number" value={pf} onChange={e=>setPf(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={respSupport} onChange={()=>setRespSupport(v=>!v)} />
            Mekanik ventilasyon / CPAP
          </label>
          <div className="text-xs text-gray-500">Skor: <b>{resp}</b></div>
        </div>

        {/* KoagÃ¼lasyon */}
        <div className="rounded-xl border p-3 space-y-2">
          <div className="font-semibold">KoagÃ¼lasyon</div>
          <label className="flex items-center gap-2">
            <span className="text-xs w-36">Trombosit (Ã—10Â³/ÂµL)</span>
            <input type="number" value={plt} onChange={e=>setPlt(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
          </label>
          <div className="text-xs text-gray-500">Skor: <b>{coag}</b></div>
        </div>

        {/* KaraciÄŸer */}
        <div className="rounded-xl border p-3 space-y-2">
          <div className="font-semibold">KaraciÄŸer</div>
          <label className="flex items-center gap-2">
            <span className="text-xs w-36">Bilirubin (mg/dL)</span>
            <input type="number" step="0.1" value={bili} onChange={e=>setBili(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
          </label>
          <div className="text-xs text-gray-500">Skor: <b>{liv}</b></div>
        </div>

        {/* KardiyovaskÃ¼ler */}
        <div className="rounded-xl border p-3 space-y-2">
          <div className="font-semibold">KardiyovaskÃ¼ler</div>
          <label className="flex items-center gap-2">
            <span className="text-xs w-36">MAP (mmHg)</span>
            <input type="number" value={map} onChange={e=>setMap(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <span className="text-xs w-24">VazopresÃ¶r</span>
              <select value={pressor} onChange={e=>setPressor(e.target.value)} className="px-3 py-2 border rounded-lg w-full">
                <option value="none">Yok</option>
                <option value="dobu">Dobutamin</option>
                <option value="dopa">Dopamin</option>
                <option value="epi">Epinefrin</option>
                <option value="norepi">Norepinefrin</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span className="text-xs w-24">Doz (Âµg/kg/dk)</span>
              <input type="number" step="0.01" value={dose} onChange={e=>setDose(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
            </label>
          </div>
          <div className="text-xs text-gray-500">Skor: <b>{car}</b></div>
        </div>

        {/* SSS */}
        <div className="rounded-xl border p-3 space-y-2">
          <div className="font-semibold">SSS (GKS)</div>
          <label className="flex items-center gap-2">
            <span className="text-xs w-36">GKS (3â€“15)</span>
            <input type="number" value={gcs} onChange={e=>setGcs(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full" />
          </label>
          <div className="text-xs text-gray-500">Skor: <b>{scoreCNS()}</b></div>
        </div>

        {/* Renal */}
        <div className="rounded-xl border p-3 space-y-2">
          <div className="font-semibold">Renal</div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <span className="text-xs w-24">Kreatinin</span>
              <input type="number" step="0.1" value={cr} onChange={e=>setCr(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
            </label>
            <label className="flex items-center gap-2">
              <span className="text-xs w-24">DiÃ¼rez (mL/gÃ¼n)</span>
              <input type="number" value={urine} onChange={e=>setUrine(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
            </label>
          </div>
          <div className="text-xs text-gray-500">Skor: <b>{ren}</b></div>
        </div>
      </div>

      <div className="rounded-2xl border p-4">
        <div className="text-sm">Toplam SOFA</div>
        <div className="text-2xl font-bold">{total}</div>
      </div>

      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">EÄŸitim amaÃ§lÄ±dÄ±r; resmi tablolarla doÄŸrulayÄ±n.</p>
    </div>
  );
}
