"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * Wells DVT skoru
 * +1: aktif kanser, paralizi/plesi/immobilizasyon, yakÄ±n cerrahi/yatak istirahati,
 *     derin ven hattÄ± boyunca hassasiyet, tÃ¼m bacak ÅŸiÅŸ, baldÄ±r Ã§evresi farkÄ± >3 cm,
 *     sadece semptomatik bacakta pitting Ã¶dem, yÃ¼zeyel kollateral venler, Ã¶nceki DVT
 * -2: alternatif tanÄ± DVTâ€™den daha olasÄ±
 */

type Item = { key: string; label: string; pts: number };

const ITEMS: Item[] = [
  { key: "cancer", label: "Aktif kanser", pts: 1 },
  { key: "paralysis", label: "Paralizi/paresiz", pts: 1 },
  { key: "immob", label: "YakÄ±n cerrahi / â‰¥3 gÃ¼n immobilizasyon", pts: 1 },
  { key: "tenderness", label: "Derin ven hattÄ± boyunca hassasiyet", pts: 1 },
  { key: "wholeleg", label: "TÃ¼m bacak ÅŸiÅŸ", pts: 1 },
  { key: "calf3", label: "BaldÄ±r Ã§evresi farkÄ± &gt; 3 cm", pts: 1 },
  { key: "pitting", label: "Pitting Ã¶dem (sadece semptomatik bacak)", pts: 1 },
  { key: "collateral", label: "YÃ¼zeyel kollateral venler (varis deÄŸil)", pts: 1 },
  { key: "prevDVT", label: "Ã–nceki DVT", pts: 1 },
  { key: "altDx", label: "Alternatif tanÄ± DVTâ€™den daha olasÄ±", pts: -2 },
];

function round(n:number, dp=1){ return Math.round(n*Math.pow(10,dp))/Math.pow(10,dp); }

export default function WellsDVTPage(){
  const s = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initial: Record<string, boolean> = {};
  ITEMS.forEach(i => { initial[i.key] = s?.get(i.key) === "1"; });

  const [sel, setSel] = React.useState<Record<string, boolean>>(initial);
  function toggle(k:string){ setSel(v=>({ ...v, [k]: !v[k] })); }

  const score = round(ITEMS.reduce((sum, it)=> sum + (sel[it.key] ? it.pts : 0), 0), 1);

  let cat = "DÃ¼ÅŸÃ¼k olasÄ±lÄ±k";
  if (score >= 2) cat = "DVT olasÄ±";
  else if (score >= 1) cat = "Orta olasÄ±lÄ±k";

  const params: Record<string, string|number> = {};
  ITEMS.forEach(i=>{ if(sel[i.key]) params[i.key]=1; });

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Wells (DVT)</h1>
      <div className="rounded-2xl border p-4 space-y-2">
        {ITEMS.map(it=>(
          <label key={it.key} className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2">
              <input type="checkbox" checked={!!sel[it.key]} onChange={()=>toggle(it.key)} />
              {it.label}
            </span>
            <span className="text-xs text-gray-500">{it.pts > 0 ? `+${it.pts}` : it.pts}</span>
          </label>
        ))}
      </div>
      <div className="rounded-2xl border p-4">
        <div className="text-sm">Skor</div>
        <div className="text-2xl font-bold">{score}</div>
        <div className="text-xs text-muted-foreground">Kategori: <b>{cat}</b></div>
      </div>
      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">EÄŸitim amaÃ§lÄ±dÄ±r; kÄ±lavuzlarla doÄŸrulayÄ±n.</p>
    </div>
  );
}



