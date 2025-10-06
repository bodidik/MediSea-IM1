// FILE: web/app/profile/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import PlanBadge, { type PlanType } from "@/components/PlanBadge";
import RequirePlan from "@/components/RequirePlan";
import UpgradeCard from "@/components/UpgradeCard";

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
    accuracy: number;        // 0–100
    streakDays: number;
    rankPercentile: number;  // 0–100
    todaySolved: number;
    plan?: PlanType;         // "free" | "member" | "premium" | "pro"
  };
  lastUpdatedISO: string;
};

// RequirePlan / Premium* bileşenlerinin beklediği rol harfleri
type Role = "V" | "M" | "P";

// "free" | "member" | "premium" | "pro" -> "V" | "M" | "P"
function toRole(plan: string | undefined): Role {
  const p = (plan ?? "").toLowerCase();
  if (p === "premium" || p === "p" || p === "pro") return "P";
  if (p === "member" || p === "m") return "M";
  return "V";
}

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

  // Badge gibi kullanıcıya dönük yerlerde orijinal plan metni:
  const plan = (data?.user.plan ?? "free") as PlanType;
  // Kapı/koruma bileşenleri için normalize edilmiş rol:
  const role = toRole(plan);

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
      <RequirePlan plan={role} min="P">
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



