"use client";
import React from "react";
import RequirePlan from "@/components/RequirePlan";

export default function PremiumCard({
  title,
  children,
  min = "P",
  plan = "P",
}: {
  title: string;
  children: React.ReactNode;
  min?: "V" | "M" | "P";
  plan?: "V" | "M" | "P";
}) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <RequirePlan min={min} plan={plan}>
        {children}
      </RequirePlan>
    </div>
  );
}
