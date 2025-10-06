"use client";

import React from "react";

type Plan = "V" | "M" | "P";
const order: Plan[] = ["V", "M", "P"];

export default function PremiumGate({
  plan,
  min = "P",
  children,
}: {
  plan: Plan;
  min?: Plan;
  children: React.ReactNode;
}) {
  const ok = order.indexOf(plan) >= order.indexOf(min);
  if (ok) return <>{children}</>;

  return (
    <div className="rounded-2xl border p-4 bg-muted/40">
      <div className="text-sm font-medium">
        Bu iÃ§erik {min === "P" ? "Premium" : min === "M" ? "Ãœye" : "ZiyaretÃ§i"} ve Ã¼zeri planlarda eriÅŸilebilir.
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        PlanÄ±nÄ± yÃ¼kselterek kilidi aÃ§abilirsin.
      </div>
    </div>
  );
}



