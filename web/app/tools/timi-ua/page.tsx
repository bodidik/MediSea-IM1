"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * TIMI risk skoru (UA/NSTEMI, 0–7)
 * Faktörler: yaş ≥65, ≥3 risk faktörü (FHx/HTN/DM/HLP/sigara), bilinen CAD (>50% stenoz),
 * ASA kullanımı (7 günde), ağır anjina (24 saatte ≥2 ep), ST segment deviasyonu, pozitif biyobelirteç.
 */

export default function TIMIUA(){
  const s = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const [age65, setAge65] = React.useState(s?.get("age65")==="1");
  const [risk3, setRisk3] = React.useState(s?.get("risk3")==="1");
  const [cad, setCad] = React.useState(s?.get("cad")==="1");
  const [asa, setAsa] = React.useState(s?.get("asa")==="1");
  const [angina, setAngina] = React.useState(s?.get("angina")==="1");
  const [stdev, setStdev] = React.useState(s?.get("st")==="1");
  const [troponin, setTroponin] = React.useState(s?.get("troponin")==="1");

  const score = (age65?1:0)+(risk3?1:0)+(cad?1:0)+(asa?1:0)+(angina?1:0)+(stdev?1:0)+(troponin?1:0);

  let cat = "Düşük";
  if (score >= 5) cat = "Yüksek";
  else if (score >= 3) cat = "Orta";

  const params = { age65: age65?1:"", risk3: risk3?1:"", cad: cad?1:"", asa: asa?1:"", angina: angina?1:"", st: stdev?1:"", troponin: troponin?1:"" };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">TIMI (UA/NSTEMI)</h1>
      <div className="rounded-2xl border p-4 text-sm space-y-2">
        <label className="flex items-center gap-2"><input type="checkbox" checked={age65} onChange={()=>setAge65(v=>!v)} /> Yaş ≥ 65</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={risk3} onChange={()=>setRisk3(v=>!v)} /> ≥3 risk faktörü (FHx/HTN/DM/HLP/sigara)</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={cad} onChange={()=>setCad(v=>!v)} /> Bilinen CAD (&gt;50% stenoz)</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={asa} onChange={()=>setAsa(v=>!v)} /> Son 7 günde ASA kullanımı</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={angina} onChange={()=>setAngina(v=>!v)} /> 24 saatte ≥2 angina epizodu</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={stdev} onChange={()=>setStdev(v=>!v)} /> ST segment deviasyonu ≥0.5 mm</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={troponin} onChange={()=>setTroponin(v=>!v)} /> Pozitif kardiyak biyobelirteç</label>
      </div>
      <div className="rounded-2xl border p-4">
        <div className="text-sm">Skor</div>
        <div className="text-2xl font-bold">{score} / 7</div>
        <div className="text-xs text-muted-foreground">Kategori: <b>{cat}</b></div>
      </div>
      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">Eğitim amaçlıdır; güncel ACS kılavuzlarını kullanın.</p>
    </div>
  );
}
