// FILE: web/app/premium/quiz/page.tsx
"use client";

import React from "react";
import PremiumGate from "@/components/PremiumGate";
import PremiumQuizToday from "@/components/PremiumQuizToday";
import PremiumQuizHistory from "@/components/PremiumQuizHistory";

export default function PremiumQuizPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">GÃ¼nlÃ¼k Quiz</h1>

      <PremiumGate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border p-4">
            <div className="font-semibold mb-2">BugÃ¼nkÃ¼ Quiz</div>
            <PremiumQuizToday />
          </div>

          <div className="rounded-2xl border p-4">
            <div className="font-semibold mb-2">Quiz GeÃ§miÅŸi</div>
            <PremiumQuizHistory days={30} />
          </div>
        </div>
      </PremiumGate>
    </div>
  );
}
