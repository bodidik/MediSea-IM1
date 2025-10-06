"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * NEWS2 skoru â€” parametre baÅŸÄ±na 0â€“3 puan:
 * RR, SpO2, O2 (ek), SBP, NabÄ±z, BilinÃ§ (AVPU/Alert), SÄ±caklÄ±k.
 * Burada SpO2 iÃ§in â€œskor 1â€ oksijen saturasyon hedef paketi uygulanmaz (varsayÄ±lan tablo).
 */

function band(val:number, ranges:[number,number,number,number,number,number]) {
  // YardÄ±mcÄ±: thresholdsâ€™lara gÃ¶re 0/1/2/3 dÃ¶ndÃ¼rÃ¼r (tablolar aÅŸaÄŸÄ±da).
  // ranges: [3-upper, 2-upper, 1-upper, 0-upper, 1-upper-high, 2-upper-high] gibi kullanÄ±lacak.
  return 0;
}

function scoreRR(rr:number){
  if (rr <= 8) return 3;
  if (rr >= 9 && rr <= 11) return 1;
  if (rr >= 12 && rr <= 20) return 0;
  if (rr >= 21 && rr <= 24) return 2;
  return 3; // >=25
}
function scoreSpO2(sp:number, onO2:boolean){
  // Basit tablo: ek O2 varsa +2 (NEWS2â€™de ek O2 = 2 puan ayrÄ± kalem)
  let base = 0;
  if (sp <= 91) base = 3;
  else if (sp <= 93) base = 2;
  else if (sp <= 95) base = 1;
  else base = 0;
  return base + (onO2 ? 2 : 0);
}
function scoreTemp(t:number){
  if (t <= 35.0) return 3;
  if (t < 36.1) return 1; // 35.1â€“36.0
  if (t <= 38.0) return 0; // 36.1â€“38.0
  if (t <= 39.0) return 1; // 38.1â€“39.0
  return 2; // >=39.1
}
function scoreSBP(s:number){
  if (s <= 90) return 3;
  if (s <= 100) return 2; // 91â€“100
  if (s <= 110) return 1; // 101â€“110
  if (s <= 219) return 0; // 111â€“219
  return 3; // >=220
}
function scorePulse(p:number){
  if (p <= 40) return 3;
  if (p <= 50) return 1; // 41â€“50
  if (p <= 90) return 0; // 51â€“90
  if (p <= 110) return 1; // 91â€“110
  if (p <= 130) return 2; // 111â€“130
  return 3; // >=131
}
function scoreAVPU(avpu:string){
  return avpu === "A" ? 0 : 3;
}

export default function NEWS2Page(){
  const s = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const [rr, setRr] = React.useState<number>(parseFloat(s?.get("rr") || "18"));
  const [spo2, setSpo2] = React.useState<number>(parseFloat(s?.get("spo2") || "97"));
  const [onO2, setOnO2] = React.useState<boolean>(s?.get("o2")==="1");
  const [sbp, setSbp] = React.useState<number>(parseFloat(s?.get("sbp") || "120"));
  const [hr, setHr] = React.useState<number>(parseFloat(s?.get("hr") || "80"));
  const [temp, setTemp] = React.useState<number>(parseFloat(s?.get("temp") || "36.8"));
  const [avpu, setAvpu] = React.useState<string>(s?.get("avpu") || "A");

  const sc_rr = scoreRR(rr);
  const sc_sp = scoreSpO2(spo2, onO2);
  const sc_temp = scoreTemp(temp);
  const sc_sbp = scoreSBP(sbp);
  const sc_hr = scorePulse(hr);
  const sc_avpu = scoreAVPU(avpu);

  const total = sc_rr + sc_sp + sc_temp + sc_sbp + sc_hr + sc_avpu;

  let risk = "DÃ¼ÅŸÃ¼k";
  if (total >= 7) risk = "YÃ¼ksek";
  else if (total >= 5) risk = "Orta";
  else if ([sc_rr, sc_sp, sc_temp, sc_sbp, sc_hr, sc_avpu].some(v => v === 3)) risk = "Orta";

  const params = { rr, spo2, o2: onO2?1:"", sbp, hr, temp, avpu };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">NEWS2</h1>

      <div className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <label className="flex items-center gap-2"><span className="w-40 text-xs">Solunum sayÄ±sÄ± (/dk)</span><input type="number" value={rr} onChange={e=>setRr(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/></label>
        <div className="flex items-center gap-2">
          <span className="w-40 text-xs">SpOâ‚‚ (%)</span>
          <input type="number" value={spo2} onChange={e=>setSpo2(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/>
        </div>
        <label className="flex items-center gap-2 col-span-1 md:col-span-2"><input type="checkbox" checked={onO2} onChange={()=>setOnO2(v=>!v)} /> Ek oksijen</label>
        <label className="flex items-center gap-2"><span className="w-40 text-xs">Sistolik KB (mmHg)</span><input type="number" value={sbp} onChange={e=>setSbp(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/></label>
        <label className="flex items-center gap-2"><span className="w-40 text-xs">NabÄ±z (/dk)</span><input type="number" value={hr} onChange={e=>setHr(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/></label>
        <label className="flex items-center gap-2"><span className="w-40 text-xs">SÄ±caklÄ±k (Â°C)</span><input type="number" step="0.1" value={temp} onChange={e=>setTemp(parseFloat(e.target.value||"0"))} className="px-3 py-2 border rounded-lg w-full"/></label>
        <label className="flex items-center gap-2">
          <span className="w-40 text-xs">BilinÃ§ (AVPU)</span>
          <select value={avpu} onChange={e=>setAvpu(e.target.value)} className="px-3 py-2 border rounded-lg w-full">
            <option value="A">A (Alert)</option>
            <option value="V">V (Voice)</option>
            <option value="P">P (Pain)</option>
            <option value="U">U (Unresponsive)</option>
          </select>
        </label>
      </div>

      <div className="rounded-2xl border p-4">
        <div className="text-sm">NEWS2 Toplam</div>
        <div className="text-2xl font-bold">{total}</div>
        <div className="text-xs text-muted-foreground">Risk: <b>{risk}</b></div>
      </div>

      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">EÄŸitim amaÃ§lÄ±dÄ±r; resmi NEWS2 tablolarÄ±yla karÅŸÄ±laÅŸtÄ±rÄ±nÄ±z.</p>
    </div>
  );
}



