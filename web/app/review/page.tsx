// FILE: web/app/review/page.tsx
"use client";

import React from "react";
import PremiumCard from "@/app/components/PremiumCard";
import PlanBadge from "@/app/components/PlanBadge";

type Card = {
  _id: string;
  contentId?: string;
  section?: string;
  type?: string;     // "topic" | "board" | "case" | "video" | "note"
  dueAt: string;
  interval: number;
  ease: number;
};

type NextResp = { ok: boolean; items: Card[]; dueTotal?: number; error?: string };
type AnswerResp = { ok: boolean; action: "graded"|"postponed"; ease?: number; interval?: number; dueAt?: string; error?: string };
type StatsResp = { ok: boolean; dueTotal?: number; totalCards?: number; reviewedToday?: number; postponedToday?: number; ts?: string; error?: string };

const TYPES = ["", "topic", "board", "case", "video", "note"] as const;

export default function ReviewPage(){
  const [plan] = React.useState<"free"|"premium"|"pro">("premium"); // görünüm
  const [items, setItems] = React.useState<Card[]|null>(null);
  const [dueTotal, setDueTotal] = React.useState<number>(0);
  const [stats, setStats] = React.useState<StatsResp|null>(null);
  const [err, setErr] = React.useState<string|null>(null);
  const [loading, setLoading] = React.useState(false);

  // Filtreler
  const [section, setSection] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");

  // Oturum içi ilerleme
  const [reviewed, setReviewed] = React.useState<number>(0);
  const sessionGoal = 20;

  async function load(){
    setLoading(true); setErr(null);
    try{
      const qs = new URLSearchParams();
      qs.set("limit", "20");
      if (section.trim()) qs.set("section", section.trim());
      if (type) qs.set("type", type);
      const [r1, r2] = await Promise.all([
        fetch(`/api/review/next?${qs.toString()}`, { cache:"no-store" }),
        fetch(`/api/review/stats`, { cache:"no-store" }),
      ]);
      const j1 = (await r1.json()) as NextResp;
      const j2 = (await r2.json()) as StatsResp;
      if (!j1.ok) throw new Error(j1.error || "Yükleme hatası");
      setItems(j1.items || []);
      setDueTotal(j1.dueTotal ?? (j1.items?.length ?? 0));
      setReviewed(0);
      setStats(j2 ?? null);
    }catch(e:any){
      setErr(e?.message || "ERR");
    }finally{
      setLoading(false);
    }
  }

  React.useEffect(()=>{ load(); },[]);
  React.useEffect(()=>{ load(); },[section, type]);

  async function answer(id: string, result: "correct"|"wrong"|"later"){
    try{
      const r = await fetch("/api/review/answer", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ id, result })
      });
      const j = (await r.json()) as AnswerResp;
      if (!j.ok) throw new Error(j.error || "Gönderim hatası");

      setItems(prev => (prev || []).filter(it => it._id !== id));
      // “later” ise reviewed artmaz
      if (result !== "later") setReviewed(v => v + 1);
      setDueTotal(t => Math.max(0, t - 1));

      // istatistikleri tazele (hafif)
      fetch("/api/review/stats", { cache: "no-store" }).then(r=>r.json()).then(setStats).catch(()=>{});
    }catch(e:any){
      setErr(e?.message || "ERR");
    }
  }

  const progressPct = React.useMemo(()=>{
    const totalNow = reviewed + (items?.length ?? 0);
    if (totalNow === 0) return 100;
    const val = Math.min(100, Math.round((reviewed / Math.max(1,totalNow)) * 100));
    return isNaN(val) ? 0 : val;
  }, [reviewed, items]);

  const goalPct = Math.min(100, Math.round((reviewed / sessionGoal) * 100));

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Günlük Tekrar</h1>
        <PlanBadge plan={plan} />
      </div>

      {/* İstatistik Hızlı Bakış */}
      <div className="rounded-2xl border p-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="rounded-xl border p-3">Vadesi gelen: <b>{dueTotal}</b></div>
        <div className="rounded-xl border p-3">Bugün çözülen: <b>{stats?.reviewedToday ?? 0}</b></div>
        <div className="rounded-xl border p-3">Bugün ertelenen: <b>{stats?.postponedToday ?? 0}</b></div>
        <div className="rounded-xl border p-3">Toplam kart: <b>{stats?.totalCards ?? 0}</b></div>
      </div>

      {/* Hedef Halkası + Oturum İlerleme */}
      <div className="rounded-2xl border p-4 flex items-center gap-6">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 36 36" className="w-28 h-28">
            <path d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="3" />
            <path
              d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${goalPct}, 100`}
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm">
            <div className="text-center">
              <div className="text-xs opacity-70">Hedef</div>
              <div className="font-semibold">{reviewed}/{sessionGoal}</div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>Oturum ilerleme</div>
            <div>{reviewed} / {reviewed + (items?.length ?? 0)} (≈{progressPct}%)</div>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-3 rounded-full" style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #60a5fa, #2563eb)" }} />
          </div>
        </div>
        <div>
          <button onClick={load} disabled={loading} className="px-3 py-2 rounded-lg border text-sm">
            {loading ? "Yükleniyor…" : "Yenile"}
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
        <input
          value={section}
          onChange={(e)=>setSection(e.target.value)}
          placeholder="Bölüm (Nephrology, Cardiology …)"
          className="px-3 py-2 rounded-lg border text-sm"
        />
        <select
          value={type}
          onChange={(e)=>setType(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm"
        >
          {TYPES.map(t => <option key={t} value={t}>{t || "Tür: Hepsi"}</option>)}
        </select>
        <div className="flex items-center text-sm opacity-70">Vadesi gelen: <b className="ml-2">{dueTotal}</b></div>
      </div>

      {err && <div className="rounded-xl border p-3 text-sm text-red-600">{err}</div>}

      {/* Kartlar */}
      <PremiumCard plan={plan} title="Vadesi Gelen Kartlar" min="premium">
        {!items ? (
          <div className="h-20 bg-gray-100 rounded" />
        ) : items.length === 0 ? (
          <div className="text-sm text-muted-foreground">Şu an için vadesi gelen kart yok.</div>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it._id} className="rounded border p-3">
                <div className="text-sm flex items-center justify-between gap-3">
                  <div>
                    <b>{it.section || "-"}</b> · {it.type || "-"}
                    <div className="text-xs text-gray-500">
                      Son tarih: {new Date(it.dueAt).toLocaleString("tr-TR")}
                      {" · "}Aralık: {it.interval} gün
                      {" · "}Ease: {it.ease.toFixed(2)}
                    </div>
                    {it.contentId && (
                      <div className="mt-2">
                        <a href={`/content/${it.contentId}`} className="text-xs underline">Detaya git</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* İşaretleme butonları */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={()=>answer(it._id, "wrong")} className="px-3 py-1 rounded border text-sm">❌ Yanlış</button>
                  <button onClick={()=>answer(it._id, "later")} className="px-3 py-1 rounded border text-sm">⏳ Sonra</button>
                  <button onClick={()=>answer(it._id, "correct")} className="px-3 py-1 rounded border text-sm">✅ Doğru</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </PremiumCard>
    </div>
  );
}
