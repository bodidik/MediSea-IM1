"use client";
import React from "react";

export default function RequirePlan({
  min = "V",
  plan = "P",
  children,
}: { min?: "V"|"M"|"P"; plan?: "V"|"M"|"P"; children: React.ReactNode }) {
  const ok = (min === "V") || (min === "M" && (plan === "M" || plan === "P")) || (min === "P" && plan === "P");
  if (!ok) return <div className="text-sm opacity-70">Bu iÃ§erik iÃ§in daha yÃ¼ksek Ã¼yelik gerekiyor.</div>;
  return <>{children}</>;
}



