// FILE: web/app/review/page.tsx
"use client";

import React from "react";
import PremiumCard from "@/app/components/PremiumCard";
import PlanBadge from "@/app/components/PlanBadge";

type Card = { id: string; contentId?: string; section?: string; type?: string; dueAt: string; interval: number; ease: number };
type NextResp = { ok: boolean; items: Card[]; error?: string };
type SubmitResp = { ok: boolean; updated: number; error?: string };

export default function ReviewPage(){
  const [plan, setPlan] = React.useState<"free"|"premium"|"pro">("premium"); // görünüm için
  const [items, setItems] = React.useState<Card[]|null>(null);
  const [err, setErr] = React.useState<string|null>(null);
  const [loading, setLoading] = React.useState(false);

  async function load(){
    setLoading(true);
    try{
      const r = await fetch("/api/review/next?limit=10", { cache:"no-store" });
      const j = (await r.json()) as NextResp;
      if (!j.ok) throw new Error(j.error || "Yükleme hatası");
      setItems(j.items || []);
    }catch(e:any){
      setErr(e?.message || "ERR");
    }finally{
      setLoading(false);
    }
  }

  React.useEffect(()=>{ load(); },[]);

  async function submitQuality(id: string, quality: number){
    try{
      const r = await fetch("/api/review/submit", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ results: [{ id, quality }] })
      });
      const j = (await r.json()) as SubmitResp;
      if (!j.ok) throw new Error(j.error || "Gönderim hatası");
      // kartı listeden çıkar
      setItems(prev => (prev || []).filter(it => it.id !== id));
    }catch(e:any){
      setErr(e?.message || "ERR");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Günlük Tekrar</h1>
        <PlanBadge plan={plan} />
      </div>

      {err && <div className="rounded-xl border p-3 text-sm text-red-600">{err}</div>}

      <PremiumCard plan={plan} title="Vadesi Gelen Kartlar" min="premium">
        {!items ? (
          <div className="h-20 bg-gray-100 rounded" />
        ) : items.length === 0 ? (
          <div className="text-sm text-muted-foreground">Şu an için vadesi gelen kart yok.</div>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="rounded border p-3">
                <div className="text-sm">
                  <b>{it.section || "-"}</b> · {it.type || "-"}
                </div>
                <div className="text-xs text-gray-500">
                  Son tarih: {new Date(it.dueAt).toLocaleString("tr-TR")}
                  {" · "}Aralık: {it.interval} gün
                  {" · "}Ease: {it.ease.toFixed(2)}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0,1,2,3,4,5].map(q => (
                    <button key={q} onClick={()=>submitQuality(it.id, q)} className="px-2 py-1 rounded border text-sm">
                      {q}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <button onClick={load} disabled={loading} className="px-4 py-2 rounded-lg border">
            {loading ? "Yükleniyor..." : "Yenile"}
          </button>
        </div>
      </PremiumCard>
    </div>
  );
}
