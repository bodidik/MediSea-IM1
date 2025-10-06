"use client";

import React from "react";

/**
 * Enfektif endokardit iÃ§in Duke kriterleri benzeri bir CHECKLIST ÅABLONU.
 * Puan ve eÅŸikler Ã¶rnektir; yerel protokole gÃ¶re revize edilmelidir.
 */

type Criterion = { key: string; label: string; weight: number; group: "major" | "minor" };

const CRITERIA: Criterion[] = [
  // Major (Ã¶rnek)
  { key: "blood_culture", label: "Uygun mikrobiyoloji ile kan kÃ¼ltÃ¼rÃ¼ pozitifliÄŸi", weight: 3, group: "major" },
  { key: "echo_find", label: "Ekokardiyografide vejetasyon/abses/yeni valv yetersizliÄŸi", weight: 3, group: "major" },

  // Minor (Ã¶rnek)
  { key: "predispose", label: "Predispozisyon (kalp hastalÄ±ÄŸÄ± / IV ilaÃ§ kullanÄ±mÄ±)", weight: 1, group: "minor" },
  { key: "fever", label: "AteÅŸ â‰¥ 38Â°C", weight: 1, group: "minor" },
  { key: "vascular", label: "VaskÃ¼ler bulgular (emboli, Janeway lezyonlarÄ± vb.)", weight: 1, group: "minor" },
  { key: "immunologic", label: "Ä°mmÃ¼nolojik bulgular (GN, Osler, RF, Roth vb.)", weight: 1, group: "minor" },
  { key: "micro_minor", label: "MajÃ¶r kriter dÄ±ÅŸÄ± mikrobiyolojik bulgular", weight: 1, group: "minor" },
];

export default function EndocarditisToolPage() {
  const [sel, setSel] = React.useState<Record<string, boolean>>({});

  function toggle(k: string) {
    setSel((s) => ({ ...s, [k]: !s[k] }));
  }

  const majorCount = CRITERIA.filter((c) => c.group === "major" && sel[c.key]).length;
  const minorCount = CRITERIA.filter((c) => c.group === "minor" && sel[c.key]).length;
  const score = CRITERIA.reduce((sum, c) => sum + (sel[c.key] ? c.weight : 0), 0);

  // Ã–rnek yorumlama (placeholder):
  let interp = "â€”";
  if (majorCount >= 2 || (majorCount === 1 && minorCount >= 3)) {
    interp = "OlasÄ±/kuvvetli endokardit";
  } else if (majorCount === 1 && minorCount >= 1) {
    interp = "OlasÄ± endokardit (ek deÄŸerlendirme Ã¶nerilir)";
  } else if (minorCount >= 3) {
    interp = "DÃ¼ÅŸÃ¼nÃ¼lebilir; klinik baÄŸlam gerekli";
  } else {
    interp = "ZayÄ±f bulgular";
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Enfektif Endokardit (ÅŸablon)</h1>

      <div className="rounded-2xl border p-4 space-y-4">
        <div className="font-semibold">MajÃ¶r Kriterler</div>
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
        <div className="font-semibold">MinÃ¶r Kriterler</div>
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
        <div className="text-sm mt-2">MajÃ¶r: <b>{majorCount}</b> Â· MinÃ¶r: <b>{minorCount}</b></div>
        <div className="text-sm mt-2">
          Ã–rnek yorum: <b>{interp}</b>
        </div>
        <div className="text-xs text-muted-foreground mt-3">
          Bu araÃ§ eÄŸitim amaÃ§lÄ±dÄ±r; resmi tanÄ± kriterleri iÃ§in gÃ¼ncel kÄ±lavuzlarÄ± kullanÄ±n.
        </div>
      </div>
    </div>
  );
}



