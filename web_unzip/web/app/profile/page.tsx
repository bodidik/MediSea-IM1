// FILE: web/app/profile/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import PlanBadge, { type PlanType } from "@/app/components/PlanBadge";
import RequirePlan from "@/app/components/RequirePlan";
import UpgradeCard from "@/app/components/UpgradeCard";

type CountsResponse = {
  totals: {
    topics: number;
    boardQuestions: number;
    cases: number;
    videos: number;
    notes: number;
  };
  user: {
    solved: number;
    accuracy: number;        // 0–100 beklenir (compat controller öyle döndürüyor)
    streakDays: number;
    rankPercentile: number;  // 0–100
    todaySolved: number;
    plan?: PlanType;         // "free" | "premium" | "pro"
  };
  lastUpdatedISO: string;
};

export default function ProfilePage() {
  const [data, setData] = useState<CountsResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch("/api/counts", { cache: "no-store" });
        if (!r.ok) throw new Error("counts failed");
        const j = (await r.json()) as CountsResponse;
        if (alive) setData(j);
      } catch (e: any) {
        if (alive) setErr(e?.message || "ERR");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const plan: PlanType = (data?.user.plan ?? "free") as PlanType;
  const updated = data?.lastUpdatedISO
    ? new Date(data.lastUpdatedISO).toLocaleString("tr-TR")
    : "";

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Profil</h1>
          {updated && (
            <div className="text-xs text-muted-foreground mt-1">
              Güncellendi: {updated}
            </div>
          )}
        </div>
        <PlanBadge plan={plan} />
      </div>

      {err && (
        <div className="rounded-xl border p-3 text-sm text-red-600">{err}</div>
      )}

      {/* Free kullanıcılar için hızlı yükseltme kartı */}
      {plan === "free" && <UpgradeCard />}

      {/* Kullanıcı özet metrikleri */}
      <div className="rounded-2xl border p-4">
        {loading || !data ? (
          <div className="h-24 bg-gray-100 rounded" />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div>
              Çözülen: <b>{data.user.solved}</b>
            </div>
            <div>
              Doğruluk: <b>%{Math.round(data.user.accuracy ?? 0)}</b>
            </div>
            <div>
              Streak: <b>{data.user.streakDays}</b>
            </div>
            <div>
              Bugün: <b>{data.user.todaySolved}</b>
            </div>
            <div>
              Üst %: <b>%{Math.round(data.user.rankPercentile ?? 0)}</b>
            </div>
            <div>
              Plan: <b>{(plan || "free").toUpperCase()}</b>
            </div>
          </div>
        )}
      </div>

      {/* Premium özet alanı (kart içine kilitli) */}
      <RequirePlan plan={plan} min="premium">
        <div className="rounded-2xl border p-4 space-y-2">
          <div className="font-semibold">Premium Özeti</div>
          <div className="text-sm text-muted-foreground">
            Son çalışmalarına göre kişiselleştirilmiş öneriler burada görünecek.
          </div>
        </div>
      </RequirePlan>
    </div>
  );
}
