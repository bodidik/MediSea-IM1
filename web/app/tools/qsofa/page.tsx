"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/** qSOFA: SBP ≤100, RR ≥22, mental durum değişikliği (GKS<15) → her biri 1 puan */

export default function QsOFA() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const [sbpLow, setSbpLow] = React.useState(search?.get("sbp") === "1");      // ≤100
  const [rrHigh, setRrHigh] = React.useState(search?.get("rr") === "1");       // ≥22
  const [gcsLow, setGcsLow] = React.useState(search?.get("gcs") === "1");      // GKS < 15

  const score = (sbpLow?1:0) + (rrHigh?1:0) + (gcsLow?1:0);
  let comment = "—";
  if (score >= 2) comment = "Kötü prognoz açısından artmış risk; yakın izlem ve değerlendirme.";
  else comment = "Düşük risk, klinik bağlam önemli.";

  const params = { sbp: sbpLow?1:"", rr: rrHigh?1:"", gcs: gcsLow?1:"" };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">qSOFA</h1>
      <div className="rounded-2xl border p-4 space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={sbpLow} onChange={()=>setSbpLow(v=>!v)} />
          Sistolik KB ≤ 100 mmHg
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={rrHigh} onChange={()=>setRrHigh(v=>!v)} />
          Solunum sayısı ≥ 22/dk
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={gcsLow} onChange={()=>setGcsLow(v=>!v)} />
          Mental durumda değişiklik (GKS &lt; 15)
        </label>
      </div>
      <div className="rounded-2xl border p-4">
        <div className="text-sm">Skor</div>
        <div className="text-2xl font-bold">{score}</div>
        <div className="text-xs text-muted-foreground mt-1">{comment}</div>
      </div>
      <ToolShare params={params} />
      <p className="text-xs text-muted-foreground">Eğitim amaçlıdır; sepsis kılavuzlarıyla karşılaştırınız.</p>
    </div>
  );
}
