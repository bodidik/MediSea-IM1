"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * SLEDAI-2K — sadeleştirilmiş uygulama (yaygın maddeler; örnek puanlar)
 * Klinik kullanım öncesi kurum protokolünüzle doğrulayın.
 */

type Item = { key: string; label: string; pts: number };

const ITEMS: Item[] = [
  { key: "seizure", label: "Nöbet", pts: 8 },
  { key: "psychosis", label: "Psikoz", pts: 8 },
  { key: "cva", label: "Serebrovasküler olay", pts: 8 },
  { key: "vasculitis", label: "Vaskülit", pts: 8 },
  { key: "arthritis", label: "Artrit", pts: 4 },
  { key: "myositis", label: "Miyozit", pts: 4 },
  { key: "urinary", label: "İdrar sedimenti aktif (hematüri, silendir vb.)", pts: 4 },
  { key: "proteinuria", label: "Proteinüri (>0.5 g/gün)", pts: 4 },
  { key: "lowComplement", label: "Düşük kompleman", pts: 2 },
  { key: "antiDsDNA", label: "Anti-dsDNA yüksek", pts: 2 },
  { key: "rash", label: "Döküntü", pts: 2 },
  { key: "alopecia", label: "Alopesi", pts: 2 },
  { key: "mucosal", label: "Ağız/nazal ülser", pts: 2 },
  { key: "fever", label: "Ateş", pts: 1 },
  { key: "thrombocytopenia", label: "Trombositopeni", pts: 1 },
  { key: "leukopenia", label: "Lökopeni", pts: 1 },
];

export default function Sledai2kPage() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initial: Record<string, boolean> = {};
  ITEMS.forEach(i => { initial[i.key] = (search?.get(i.key) === "1"); });

  const [sel, setSel] = React.useState<Record<string, boolean>>(initial);
  function toggle(k: string) { setSel(s => ({ ...s, [k]: !s[k] })); }

  const score = ITEMS.reduce((sum, it) => sum + (sel[it.key] ? it.pts : 0), 0);

  let activity = "—";
  if (score >= 12) activity = "Yüksek aktivite";
  else if (score >= 6) activity = "Orta aktivite";
  else if (score >= 1) activity = "Düşük aktivite";
  else activity = "Aktif hastalık yok";

  const params: Record<string, string|number> = {};
  ITEMS.forEach(i => { if (sel[i.key]) params[i.key] = 1; });

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">SLEDAI-2K</h1>
      <div className="rounded-2xl border p-4 space-y-2">
        {ITEMS.map(it => (
          <label key={it.key} className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2">
              <input type="checkbox" checked={!!sel[it.key]} onChange={()=>toggle(it.key)} />
              {it.label}
            </span>
            <span className="text-xs text-gray-500">+{it.pts}</span>
          </label>
        ))}
      </div>
      <div className="rounded-2xl border p-4 space-y-1">
        <div className="text-sm">Skor: <b>{score}</b></div>
        <div className="text-xs text-muted-foreground">{activity}</div>
      </div>
      <ToolShare params={params} />
      <p className="text-xs text-muted-foreground">Eğitim amaçlıdır; resmi skorlama tablolarını doğrulayın.</p>
    </div>
  );
}
