"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * Wells (PE) â€” klasik puanlama:
 * - Klinik DVT bulgularÄ±: +3
 * - PE olasÄ±lÄ±ÄŸÄ± alternatif tanÄ±dan daha yÃ¼ksek: +3
 * - TaÅŸikardi (HR > 100): +1.5
 * - GeÃ§irilmiÅŸ immobilizasyon/cerrahi (son 4 hafta): +1.5
 * - GeÃ§irilmiÅŸ DVT/PE: +1.5
 * - Hemoptizi: +1
 * - Malignite (aktif/tedavi): +1
 */

type Item = { key: string; label: string; pts: number };

const ITEMS: Item[] = [
  { key: "dvt", label: "Klinik DVT bulgularÄ±", pts: 3 },
  { key: "altHigher", label: "PE olasÄ±lÄ±ÄŸÄ± alternatif tanÄ±dan daha yÃ¼ksek", pts: 3 },
  { key: "tachy", label: "TaÅŸikardi (HR &gt; 100)", pts: 1.5 },
  { key: "immob", label: "Ä°mmobilizasyon/Cerrahi (â‰¤4 hf)", pts: 1.5 },
  { key: "prevVTE", label: "Ã–nceki DVT/PE", pts: 1.5 },
  { key: "hemoptysis", label: "Hemoptizi", pts: 1 },
  { key: "malignancy", label: "Malignite (aktif/tedavi)", pts: 1 },
];

function round(n:number, dp=1){ return Math.round(n*Math.pow(10,dp))/Math.pow(10,dp); }

export default function WellsPEPage(){
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search): null;
  const initial: Record<string, boolean> = {};
  ITEMS.forEach(i => { initial[i.key] = (search?.get(i.key) === "1"); });

  const [sel, setSel] = React.useState<Record<string, boolean>>(initial);
  function toggle(k:string){ setSel(s=>({ ...s, [k]: !s[k] })); }

  const score = round(ITEMS.reduce((sum, it)=> sum + (sel[it.key] ? it.pts : 0), 0), 1);

  let prob = "DÃ¼ÅŸÃ¼k";
  if (score > 4) prob = "YÃ¼ksek";
  else if (score > 1.5) prob = "Orta";

  const params: Record<string, string|number> = {};
  ITEMS.forEach(i => { if (sel[i.key]) params[i.key] = 1; });

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Wells (Pulmoner Emboli)</h1>
      <div className="rounded-2xl border p-4 space-y-2">
        {ITEMS.map(it=>(
          <label key={it.key} className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2">
              <input type="checkbox" checked={!!sel[it.key]} onChange={()=>toggle(it.key)} />
              {it.label}
            </span>
            <span className="text-xs text-gray-500">+{it.pts}</span>
          </label>
        ))}
      </div>
      <div className="rounded-2xl border p-4 space-y-1">
        <div className="text-sm">Skor</div>
        <div className="text-2xl font-bold">{score}</div>
        <div className="text-xs text-muted-foreground">Risk kategorisi: <b>{prob}</b></div>
      </div>
      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">EÄŸitim amaÃ§lÄ±dÄ±r; kÄ±lavuzlarla doÄŸrulayÄ±n.</p>
    </div>
  );
}
