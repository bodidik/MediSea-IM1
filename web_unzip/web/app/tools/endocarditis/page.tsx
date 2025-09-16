"use client";

import React from "react";

/**
 * Enfektif endokardit için Duke kriterleri benzeri bir CHECKLIST ŞABLONU.
 * Puan ve eşikler örnektir; yerel protokole göre revize edilmelidir.
 */

type Criterion = { key: string; label: string; weight: number; group: "major" | "minor" };

const CRITERIA: Criterion[] = [
  // Major (örnek)
  { key: "blood_culture", label: "Uygun mikrobiyoloji ile kan kültürü pozitifliği", weight: 3, group: "major" },
  { key: "echo_find", label: "Ekokardiyografide vejetasyon/abses/yeni valv yetersizliği", weight: 3, group: "major" },

  // Minor (örnek)
  { key: "predispose", label: "Predispozisyon (kalp hastalığı / IV ilaç kullanımı)", weight: 1, group: "minor" },
  { key: "fever", label: "Ateş ≥ 38°C", weight: 1, group: "minor" },
  { key: "vascular", label: "Vasküler bulgular (emboli, Janeway lezyonları vb.)", weight: 1, group: "minor" },
  { key: "immunologic", label: "İmmünolojik bulgular (GN, Osler, RF, Roth vb.)", weight: 1, group: "minor" },
  { key: "micro_minor", label: "Majör kriter dışı mikrobiyolojik bulgular", weight: 1, group: "minor" },
];

export default function EndocarditisToolPage() {
  const [sel, setSel] = React.useState<Record<string, boolean>>({});

  function toggle(k: string) {
    setSel((s) => ({ ...s, [k]: !s[k] }));
  }

  const majorCount = CRITERIA.filter((c) => c.group === "major" && sel[c.key]).length;
  const minorCount = CRITERIA.filter((c) => c.group === "minor" && sel[c.key]).length;
  const score = CRITERIA.reduce((sum, c) => sum + (sel[c.key] ? c.weight : 0), 0);

  // Örnek yorumlama (placeholder):
  let interp = "—";
  if (majorCount >= 2 || (majorCount === 1 && minorCount >= 3)) {
    interp = "Olası/kuvvetli endokardit";
  } else if (majorCount === 1 && minorCount >= 1) {
    interp = "Olası endokardit (ek değerlendirme önerilir)";
  } else if (minorCount >= 3) {
    interp = "Düşünülebilir; klinik bağlam gerekli";
  } else {
    interp = "Zayıf bulgular";
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Enfektif Endokardit (şablon)</h1>

      <div className="rounded-2xl border p-4 space-y-4">
        <div className="font-semibold">Majör Kriterler</div>
        <ul className="space-y-2">
          {CRITERIA.filter(c => c.group === "major").map((c) => (
            <li key={c.key} className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={!!sel[c.key]} onChange={() => toggle(c.key)} />
                <span>{c.label}</span>
              </label>
              <span className="text-xs text-gray-500">+{c.weight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border p-4 space-y-4">
        <div className="font-semibold">Minör Kriterler</div>
        <ul className="space-y-2">
          {CRITERIA.filter(c => c.group === "minor").map((c) => (
            <li key={c.key} className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={!!sel[c.key]} onChange={() => toggle(c.key)} />
                <span>{c.label}</span>
              </label>
              <span className="text-xs text-gray-500">+{c.weight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border p-4">
        <div className="text-sm">Toplam Skor: <b>{score}</b></div>
        <div className="text-sm mt-2">Majör: <b>{majorCount}</b> · Minör: <b>{minorCount}</b></div>
        <div className="text-sm mt-2">
          Örnek yorum: <b>{interp}</b>
        </div>
        <div className="text-xs text-muted-foreground mt-3">
          Bu araç eğitim amaçlıdır; resmi tanı kriterleri için güncel kılavuzları kullanın.
        </div>
      </div>
    </div>
  );
}
