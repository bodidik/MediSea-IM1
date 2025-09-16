"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/** CURB-65: Confusion, Urea >7 mmol/L, RR ≥30, SBP<90/DBP≤60, Age ≥65 → her biri 1 puan */

export default function Curb65Page(){
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search): null;

  const [confusion, setConfusion] = React.useState(search?.get("c") === "1");
  const [ureaHigh, setUreaHigh] = React.useState(search?.get("u") === "1");
  const [rrHigh, setRrHigh] = React.useState(search?.get("r") === "1");
  const [bpLow, setBpLow] = React.useState(search?.get("b") === "1");
  const [age65, setAge65] = React.useState(search?.get("a") === "1");

  const score = (confusion?1:0) + (ureaHigh?1:0) + (rrHigh?1:0) + (bpLow?1:0) + (age65?1:0);

  let comment = "—";
  if (score <= 1) comment = "Ayaktan tedavi düşünülebilir (klinik bağlam önemli).";
  else if (score === 2) comment = "Kısa yatış / yakın takip değerlendirilebilir.";
  else comment = "Yatış ve ileri değerlendirme önerilir.";

  const params = {
    c: confusion?1:"", u: ureaHigh?1:"", r: rrHigh?1:"", b: bpLow?1:"", a: age65?1:""
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">CURB-65</h1>
      <div className="rounded-2xl border p-4 space-y-2 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={confusion} onChange={()=>setConfusion(v=>!v)} /> Konfüzyon</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={ureaHigh} onChange={()=>setUreaHigh(v=>!v)} /> Üre &gt; 7 mmol/L</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={rrHigh} onChange={()=>setRrHigh(v=>!v)} /> RR ≥ 30/dk</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={bpLow} onChange={()=>setBpLow(v=>!v)} /> SBP &lt; 90 veya DBP ≤ 60 mmHg</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={age65} onChange={()=>setAge65(v=>!v)} /> Yaş ≥ 65</label>
      </div>
      <div className="rounded-2xl border p-4">
        <div className="text-sm">Skor</div>
        <div className="text-2xl font-bold">{score}</div>
        <div className="text-xs text-muted-foreground mt-1">{comment}</div>
      </div>
      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">Eğitim amaçlıdır; kılavuzlarla doğrulayın.</p>
    </div>
  );
}
