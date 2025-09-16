// FILE: web/app/premium/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import PlanBadge, { type PlanType } from "@/app/components/PlanBadge";
import PremiumCard from "@/app/components/PremiumCard";

type CountsResponse = {
  totals: { topics: number; boardQuestions: number; cases: number; videos: number; notes: number };
  user: { solved: number; accuracy: number; streakDays: number; rankPercentile: number; todaySolved: number; plan?: PlanType };
  lastUpdatedISO: string;
};

type ReviewStats = {
  ok: boolean;
  dueTotal?: number;
  totalCards?: number;
  reviewedToday?: number;
  postponedToday?: number;
  ts?: string;
  error?: string;
};

function computePoints(u: CountsResponse["user"]) {
  return u.solved * 10 + u.streakDays * 5 + Math.round((u.accuracy ?? 0) * 20);
}

export default function PremiumPage() {
  const [data, setData] = useState<CountsResponse | null>(null);
  const [review, setReview] = useState<ReviewStats | null>(null);

  useEffect(() => {
    (async () => {
      const r1 = await fetch("/api/counts", { cache: "no-store" });
      if (r1.ok) setData(await r1.json());
      const r2 = await fetch("/api/review/stats", { cache: "no-store" });
      if (r2.ok) setReview(await r2.json());
    })();
  }, []);

  const points = useMemo(() => (data ? computePoints(data.user) : 0), [data]);
  const plan = (data?.user.plan ?? "free") as PlanType;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">MediSea Premium</h1>
        <PlanBadge plan={plan} />
      </div>

      {/* Üst özet */}
      {!data ? (
        <div className="h-20 bg-gray-100 rounded" />
      ) : (
        <div className="rounded-2xl border p-4 text-sm grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>Çözülen: <b>{data.user.solved}</b></div>
          <div>Streak: <b>{data.user.streakDays}</b></div>
          <div>Doğruluk: <b>%{data.user.accuracy}</b></div>
          <div>Puan: <b>{points}</b></div>
        </div>
      )}

      {/* Review istatistik kartı */}
      <PremiumCard plan={plan} title="Review İstatistikleri" min="premium">
        {!review ? (
          <div className="h-16 bg-gray-100 rounded" />
        ) : !review.ok ? (
          <div className="text-sm text-red-600">{review.error || "Yüklenemedi"}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="rounded-xl border p-3">Vadesi gelen: <b>{review.dueTotal ?? 0}</b></div>
            <div className="rounded-xl border p-3">Toplam kart: <b>{review.totalCards ?? 0}</b></div>
            <div className="rounded-xl border p-3">Bugün çözülen: <b>{review.reviewedToday ?? 0}</b></div>
            <div className="rounded-xl border p-3">Bugün ertelenen: <b>{review.postponedToday ?? 0}</b></div>
          </div>
        )}
      </PremiumCard>

      {/* Diğer premium içerik kartları (mevcut yapın korunur) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <PremiumCard plan={plan} title="Günlük Program (AI)" min="premium">
          Haftalık zayıf alanlarına göre 20 soruluk odaklı set.
        </PremiumCard>
        <PremiumCard plan={plan} title="Zor Soru Analizi" min="premium">
          En çok yanlış yapılan 10 soru ve konu özetleri.
        </PremiumCard>
        <PremiumCard plan={plan} title="Video Önerileri" min="premium">
          Son ilerlemene göre 3 kısa video listesi.
        </PremiumCard>
        <PremiumCard plan={plan} title="Sınav Simülatörü" min="pro">
          Gerçek sınav süresi ve dağılımıyla tam simülasyon.
        </PremiumCard>
        <PremiumCard plan={plan} title="Vaka Tartışmaları" min="premium">
          Güncel 5 vaka üzerinden tartışma akışı.
        </PremiumCard>
        <PremiumCard plan={plan} title="Konu Haritası" min="premium">
          Konular arası bağlantı grafı ile çalışma yolu.
        </PremiumCard>
      </div>
    </div>
  );
}
