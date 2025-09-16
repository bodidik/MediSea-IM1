// FILE: web/app/premium/quiz/page.tsx
"use client";

import React from "react";
import PremiumGate from "@/app/components/PremiumGate";
import PremiumQuizToday from "@/app/components/PremiumQuizToday";
import PremiumQuizHistory from "@/app/components/PremiumQuizHistory";

export default function PremiumQuizPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Günlük Quiz</h1>

      <PremiumGate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border p-4">
            <div className="font-semibold mb-2">Bugünkü Quiz</div>
            <PremiumQuizToday />
          </div>

          <div className="rounded-2xl border p-4">
            <div className="font-semibold mb-2">Quiz Geçmişi</div>
            <PremiumQuizHistory days={30} />
          </div>
        </div>
      </PremiumGate>
    </div>
  );
}
