// FILE: web/app/components/PremiumDailyProgram.tsx
"use client";
import React, { useEffect, useState } from "react";

type ProgItem = { section: string; type: string; qty: number };
type Resp = { locked: boolean; reason?: string; program?: { items: ProgItem[]; total: number }; lastUpdatedISO?: string };

export default function PremiumDailyProgram(){
  const [data, setData] = useState<Resp | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(()=>{ (async()=>{
    try{
      const r = await fetch("/api/premium/daily-program", { cache: "no-store" });
      const j = await r.json() as Resp;
      setData(j);
    }catch(e:any){ setErr(e?.message || "ERR"); }
  })(); },[]);

  if (err) return <div className="text-sm text-red-600">{err}</div>;
  if (!data) return <div className="h-16 bg-gray-100 rounded" />;

  if (data.locked) {
    return (
      <div className="rounded-xl border p-4 text-sm">
        Premium deÄŸil: gÃ¼nlÃ¼k program kilitli. <span className="opacity-70">PlanÄ±nÄ± yÃ¼kselterek aÃ§abilirsin.</span>
      </div>
    );
  }

  const items = data.program?.items || [];
  const total = data.program?.total || 0;

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">GÃ¼nlÃ¼k Program</div>
        <div className="text-xs text-gray-500">Toplam: <b>{total}</b></div>
      </div>
      <ul className="text-sm space-y-2">
        {items.map((it, idx)=>(
          <li key={idx} className="rounded border p-2 flex items-center justify-between">
            <span>{it.section} â€” {it.type}</span>
            <span className="opacity-70">{it.qty} adet</span>
          </li>
        ))}
      </ul>
    </div>
  );
}



