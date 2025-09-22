// FILE: web/app/premium/quiz/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import PremiumGate from "@/components/PremiumGate";
import PremiumQuizToday from "@/components/PremiumQuizToday";
import { type PlanType } from "@/components/PlanBadge";

// Sadece plan için minimal response tipi
type CountsResponse = {
  user: { plan?: PlanType };
};

// PremiumGate'in beklediği rol harfleri
type Role = "V" | "M" | "P";

// "free" | "member" | "premium" -> "V" | "M" | "P"
function toRole(plan: string | undefined): Role {
  const p = (plan ?? "").toLowerCase();
  if (p === "premium" || p === "p" || p === "pro") return "P";
  if (p === "member" || p === "m") return "M";
  return "V";
}

export default function PremiumQuizPage() {
  const [counts, setCounts] = useState<CountsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Kullanıcının plan bilgisini al
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/counts", { cache: "no-store" });
        if (alive && r.ok) {
          const j = (await r.json()) as CountsResponse;
          setCounts(j);
        }
      } catch {
        // sessiz geç
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Orijinal plan (free|member|premium)
  const plan = (counts?.user.plan ?? "free") as PlanType;
  // PremiumGate için normalize edilmiş rol
  const role = toRole(plan);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Günlük Quiz</h1>

      {loading ? (
        <div className="h-24 rounded-2xl border bg-gray-50" />
      ) : (
        <PremiumGate plan={role} min="P">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bugünkü quiz özeti / bileşeni */}
            <div className="rounded-2xl border p-4">
              <div className="font-semibold mb-2">Bugünkü Quiz</div>
              <p className="text-sm text-gray-600 mb-3">
                Premium kullanıcılar için günlük seçilmiş soru seti.
              </p>
              {/* Senin mevcut component’in — var dedin */}
              <PremiumQuizToday className="text-sm" />
            </div>

            {/* İkinci sütunda istersen ek kartlar */}
            <div className="rounded-2xl border p-4">
              <div className="font-semibold mb-2">İpucu</div>
              <p className="text-sm text-gray-600">
                Zayıf konularına göre önerilen kısa tekrar: premium alanında.
              </p>
            </div>
          </div>
        </PremiumGate>
      )}
    </div>
  );
}
