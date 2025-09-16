"use client";
import React from "react";
export type PlanType = "free" | "premium" | "pro";
interface BadgeConfig { title: string; color: string; description: string; }
export const PLAN_BADGES: Record<PlanType, BadgeConfig> = {
  free: { title: "Free", color: "bg-gray-300 text-gray-900", description: "Temel özellikler, sınırlı erişim" },
  premium: { title: "Premium", color: "bg-yellow-400 text-yellow-900", description: "Tüm içeriklere erişim, gelişmiş özellikler" },
  pro: { title: "Pro", color: "bg-indigo-500 text-white", description: "Premium + özel mentorluk ve ek modüller" }
};
export default function PlanBadge({ plan }: { plan: PlanType }){ const cfg = PLAN_BADGES[plan]; return (<span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${cfg.color}`}>{cfg.title}</span>); }

