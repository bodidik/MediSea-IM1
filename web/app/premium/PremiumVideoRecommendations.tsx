// FILE: web/app/components/PremiumVideoRecommendations.tsx
"use client";
import React, { useEffect, useState } from "react";

type Item = { title: string; section: string; url: string; duration: number; score: number };
type Resp = { locked: boolean; reason?: string; items?: Item[]; lastUpdatedISO?: string; error?: string };

export default function PremiumVideoRecommendations({ limit = 3 }: { limit?: number }) {
  const [data, setData] = useState<Resp | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async ()=>{
      try{
        const r = await fetch(`/api/premium/video-recommendations?limit=${limit}`, { cache: "no-store" });
        const j = await r.json() as Resp;
        setData(j);
      }catch(e:any){
        setErr(e?.message || "ERR");
      }
    })();
  }, [limit]);

  if (err) return <div className="text-sm text-red-600">{err}</div>;
  if (!data) return <div className="h-16 bg-gray-100 rounded" />;

  if (data.locked) {
    return <div className="text-sm">Premium değil: video önerileri kilitli.</div>;
  }

  const items = data.items || [];
  if (!items.length) return <div className="text-sm text-muted-foreground">Öneri bulunamadı.</div>;

  return (
    <ul className="text-sm space-y-2">
      {items.map((x, i) => (
        <li key={`${x.title}-${i}`} className="rounded border p-2 flex items-center justify-between">
          <div className="truncate mr-3">
            <b>{x.section}</b> — {x.title}
            {!!x.duration && <span className="ml-2 text-xs opacity-70">({Math.round(x.duration)} dk)</span>}
          </div>
          {x.url ? (
            <a href={x.url} target="_blank" rel="noreferrer" className="text-xs underline">İzle</a>
          ) : (
            <span className="text-xs opacity-60">Link yok</span>
          )}
        </li>
      ))}
    </ul>
  );
}
