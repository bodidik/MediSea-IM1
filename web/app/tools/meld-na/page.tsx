"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * MELD-Na (2016)
 * MELD = 0.957*ln(Cr) + 0.378*ln(Bilirubin) + 1.120*ln(INR) + 0.643
 * MELD-Na = MELD + 1.59 * (135 - Na)      (Na clamp: 125â€“137)
 * ln iÃ§in Cr/Tb/INR <1 ise 1â€™e yÃ¼kseltilir.
 * Opsiyonlar: "Diyalizde" (Cr=4 kabul) ve "Cr tavanÄ±=4.0 mg/dL".
 */

function clamp(n:number, min:number, max:number){ return Math.max(min, Math.min(max, n)); }
function round(n:number, dp=0){ return Math.round(n*Math.pow(10,dp))/Math.pow(10,dp); }

export default function MeldNaPage(){
  const s = typeof window !== "undefined" ? new URLSearchParams(window.location.search): null;

  const [cr, setCr] = React.useState<number>(parseFloat(s?.get("cr") || "1"));
  const [tb, setTb] = React.useState<number>(parseFloat(s?.get("tb") || "1"));
  const [inr, setInr] = React.useState<number>(parseFloat(s?.get("inr") || "1"));
  const [na, setNa] = React.useState<number>(parseFloat(s?.get("na") || "135"));

  const [onDialysis, setOnDialysis] = React.useState<boolean>(s?.get("dial")==="1");
  const [capCreat4, setCapCreat4] = React.useState<boolean>(s?.get("cap")==="1");

  const naAdj = clamp(na, 125, 137);
  let crUsed = onDialysis ? 4.0 : cr;
  if (capCreat4) crUsed = Math.min(crUsed, 4.0);

  const crAdj = Math.max(1, crUsed);
  const tbAdj = Math.max(1, tb);
  const inrAdj = Math.max(1, inr);

  const meld = 0.957*Math.log(crAdj) + 0.378*Math.log(tbAdj) + 1.12*Math.log(inrAdj) + 0.643;
  const meldNa = meld + 1.59*(135 - naAdj);
  const score = round(meldNa, 0);

  const params = { cr, tb, inr, na, dial: onDialysis?1:"", cap: capCreat4?1:"" };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">MELD-Na</h1>
      <div className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
        <label className="flex flex-col">
          <span className="text-xs mb-1">Kreatinin (mg/dL)</span>
          <input type="number" step="0.01" value={cr} onChange={e=>setCr(parseFloat(e.target.value||"0"))} className="border rounded-lg px-3 py-2"/>
        </label>
        <label className="flex flex-col">
          <span className="text-xs mb-1">Total Bilirubin (mg/dL)</span>
          <input type="number" step="0.01" value={tb} onChange={e=>setTb(parseFloat(e.target.value||"0"))} className="border rounded-lg px-3 py-2"/>
        </label>
        <label className="flex flex-col">
          <span className="text-xs mb-1">INR</span>
          <input type="number" step="0.01" value={inr} onChange={e=>setInr(parseFloat(e.target.value||"0"))} className="border rounded-lg px-3 py-2"/>
        </label>
        <label className="flex flex-col">
          <span className="text-xs mb-1">Sodyum (mEq/L)</span>
          <input type="number" step="1" value={na} onChange={e=>setNa(parseFloat(e.target.value||"0"))} className="border rounded-lg px-3 py-2"/>
        </label>
      </div>

      <div className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={onDialysis} onChange={()=>setOnDialysis(v=>!v)} />
          Diyalizde (Cr=4 kabul)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={capCreat4} onChange={()=>setCapCreat4(v=>!v)} />
          Kreatinin tavanÄ±: 4.0 mg/dL
        </label>
      </div>

      <div className="rounded-2xl border p-4 space-y-1">
        <div className="text-sm">Skor</div>
        <div className="text-2xl font-bold">{score}</div>
      </div>

      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">EÄŸitim amaÃ§lÄ±dÄ±r; laboratuvar birimlerinizi ve protokolleri doÄŸrulayÄ±n.</p>
    </div>
  );
}



