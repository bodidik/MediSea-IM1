"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * Wells DVT skoru
 * +1: aktif kanser, paralizi/plesi/immobilizasyon, yakın cerrahi/yatak istirahati,
 *     derin ven hattı boyunca hassasiyet, tüm bacak şiş, baldır çevresi farkı >3 cm,
 *     sadece semptomatik bacakta pitting ödem, yüzeyel kollateral venler, önceki DVT
 * -2: alternatif tanı DVT’den daha olası
 */

type Item = { key: string; label: string; pts: number };

const ITEMS: Item[] = [
  { key: "cancer", label: "Aktif kanser", pts: 1 },
  { key: "paralysis", label: "Paralizi/paresiz", pts: 1 },
  { key: "immob", label: "Yakın cerrahi / ≥3 gün immobilizasyon", pts: 1 },
  { key: "tenderness", label: "Derin ven hattı boyunca hassasiyet", pts: 1 },
  { key: "wholeleg", label: "Tüm bacak şiş", pts: 1 },
  { key: "calf3", label: "Baldır çevresi farkı &gt; 3 cm", pts: 1 },
  { key: "pitting", label: "Pitting ödem (sadece semptomatik bacak)", pts: 1 },
  { key: "collateral", label: "Yüzeyel kollateral venler (varis değil)", pts: 1 },
  { key: "prevDVT", label: "Önceki DVT", pts: 1 },
  { key: "altDx", label: "Alternatif tanı DVT’den daha olası", pts: -2 },
];

function round(n:number, dp=1){ return Math.round(n*Math.pow(10,dp))/Math.pow(10,dp); }

export default function WellsDVTPage(){
  const s = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initial: Record<string, boolean> = {};
  ITEMS.forEach(i => { initial[i.key] = s?.get(i.key) === "1"; });

  const [sel, setSel] = React.useState<Record<string, boolean>>(initial);
  function toggle(k:string){ setSel(v=>({ ...v, [k]: !v[k] })); }

  const score = round(ITEMS.reduce((sum, it)=> sum + (sel[it.key] ? it.pts : 0), 0), 1);

  let cat = "Düşük olasılık";
  if (score >= 2) cat = "DVT olası";
  else if (score >= 1) cat = "Orta olasılık";

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
      <p className="text-xs text-muted-foreground">Eğitim amaçlıdır; kılavuzlarla doğrulayın.</p>
    </div>
  );
}
