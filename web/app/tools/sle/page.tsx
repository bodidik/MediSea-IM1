"use client";

import React from "react";

type Item = {
  key: string;
  label: string;
  points: number;
  group: "NÃ¶ro" | "Renal" | "Kardiyo-Pulmoner" | "MukokutanÃ¶z" | "Kas-Ä°skelet" | "Seroloji" | "Sistemik";
};

// SLEDAI-2K kriterleri (puan aynÄ± kalÄ±r)
const ITEMS: Item[] = [
  // 8 puan
  { key: "seizure", label: "NÃ¶bet (seizure)", points: 8, group: "NÃ¶ro" },
  { key: "psychosis", label: "Psikoz", points: 8, group: "NÃ¶ro" },
  { key: "obs", label: "Organik beyin sendromu (OBS)", points: 8, group: "NÃ¶ro" },
  { key: "visual", label: "GÃ¶rme bozukluÄŸu (retinal patoloji dÃ¢hil)", points: 8, group: "NÃ¶ro" },
  { key: "cranial", label: "Kraniyal sinir tutulumu", points: 8, group: "NÃ¶ro" },
  { key: "lupus_headache", label: "Lupus baÅŸ aÄŸrÄ±sÄ±", points: 8, group: "NÃ¶ro" },
  { key: "cva", label: "SerebrovaskÃ¼ler olay (CVA)", points: 8, group: "NÃ¶ro" },
  { key: "vasculitis", label: "VaskÃ¼lit (kutaneal/organ)", points: 8, group: "NÃ¶ro" },

  // 4 puan
  { key: "arthritis", label: "Artrit (â‰¥2 eklem, hassasiyet + ÅŸiÅŸlik)", points: 4, group: "Kas-Ä°skelet" },
  { key: "myositis", label: "Miyozit (CK/EMG veya klinik)", points: 4, group: "Kas-Ä°skelet" },
  { key: "casts", label: "Ä°drar silendirleri (granÃ¼ler/eritrosit/hemoglobin/...) ", points: 4, group: "Renal" },
  { key: "hematuria", label: "HematÃ¼ri (eritrosit yÃ¼ksek, infeksiyon yok)", points: 4, group: "Renal" },
  { key: "proteinuria", label: "ProteinÃ¼ri (â‰¥0.5 g/gÃ¼n veya â‰¥++ strip)", points: 4, group: "Renal" },
  { key: "pyuria", label: "PiyÃ¼ri (lÃ¶kosit yÃ¼ksek, infeksiyon yok)", points: 4, group: "Renal" },

  // 2 puan
  { key: "rash", label: "DÃ¶kÃ¼ntÃ¼ (malar/diÄŸer tipik lupus)", points: 2, group: "MukokutanÃ¶z" },
  { key: "alopecia", label: "Alopesi (aktif dÃ¶kÃ¼lme)", points: 2, group: "MukokutanÃ¶z" },
  { key: "ulcers", label: "AÄŸÄ±z/nazal Ã¼lser", points: 2, group: "MukokutanÃ¶z" },
  { key: "pleurisy", label: "Plevrit (plevral aÄŸrÄ±/sÃ¼rtÃ¼nme/efÃ¼zyon)", points: 2, group: "Kardiyo-Pulmoner" },
  { key: "pericarditis", label: "Perikardit (aÄŸrÄ±/efÃ¼zyon/sÃ¼rtÃ¼nme)", points: 2, group: "Kardiyo-Pulmoner" },
  { key: "low_complement", label: "DÃ¼ÅŸÃ¼k kompleman (C3/C4)", points: 2, group: "Seroloji" },
  { key: "anti_dsDNA", label: "ArtmÄ±ÅŸ anti-dsDNA", points: 2, group: "Seroloji" },

  // 1 puan
  { key: "fever", label: "AteÅŸ (infeksiyon dÄ±ÅŸÄ±, >38Â°C)", points: 1, group: "Sistemik" },
  { key: "thrombocytopenia", label: "Trombositopeni (<100.000/ÂµL)", points: 1, group: "Sistemik" },
  { key: "leukopenia", label: "LÃ¶kopeni (<3.000/ÂµL)", points: 1, group: "Sistemik" },
];

const GROUP_ORDER: Item["group"][] = [
  "NÃ¶ro",
  "Renal",
  "Kardiyo-Pulmoner",
  "MukokutanÃ¶z",
  "Kas-Ä°skelet",
  "Seroloji",
  "Sistemik",
];

function groupItems(items: Item[]) {
  const map = new Map<Item["group"], Item[]>();
  for (const g of GROUP_ORDER) map.set(g, []);
  items.forEach((it) => map.get(it.group)!.push(it));
  return map;
}

function interpret(total: number) {
  if (total <= 4) return { level: "DÃ¼ÅŸÃ¼k aktivite", color: "bg-green-100 text-green-800" };
  if (total <= 9) return { level: "Orta aktivite", color: "bg-yellow-100 text-yellow-800" };
  if (total <= 14) return { level: "YÃ¼ksek aktivite", color: "bg-orange-100 text-orange-800" };
  return { level: "Ã‡ok yÃ¼ksek aktivite", color: "bg-red-100 text-red-800" };
}

export default function SLEDAIPage() {
  const [sel, setSel] = React.useState<Record<string, boolean>>({});

  const total = React.useMemo(
    () =>
      ITEMS.reduce((acc, it) => (sel[it.key] ? acc + it.points : acc), 0),
    [sel]
  );

  const groups = React.useMemo(() => groupItems(ITEMS), []);
  const interp = interpret(total);

  function toggleAll(val: boolean) {
    const next: Record<string, boolean> = {};
    ITEMS.forEach((it) => (next[it.key] = val));
    setSel(next);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">SLEDAI Skoru</h1>
          <p className="text-sm text-gray-600">
            Sistemik Lupus Erythematosus aktivite deÄŸerlendirmesi (SLEDAI-2K).
            DÃ¶nem: son 10 gÃ¼n iÃ§indeki bulgular.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Toplam Puan</div>
          <div className="text-3xl font-extrabold">{total}</div>
          <div className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${interp.color}`}>
            {interp.level}
          </div>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => toggleAll(false)} className="px-3 py-2 rounded-lg border">Temizle</button>
        <button onClick={() => toggleAll(true)} className="px-3 py-2 rounded-lg border">TÃ¼mÃ¼nÃ¼ Ä°ÅŸaretle</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {GROUP_ORDER.map((g) => {
          const list = groups.get(g)!;
          return (
            <section key={g} className="rounded-2xl border p-4">
              <div className="font-semibold mb-2">{g}</div>
              <ul className="space-y-2">
                {list.map((it) => (
                  <li key={it.key} className="flex items-center justify-between gap-3 text-sm">
                    <label className="flex items-center gap-2 flex-1">
                      <input
                        type="checkbox"
                        checked={!!sel[it.key]}
                        onChange={(e) => setSel((s) => ({ ...s, [it.key]: e.target.checked }))}
                      />
                      <span>{it.label}</span>
                    </label>
                    <span className="text-xs rounded-full border px-2 py-1 bg-gray-50">
                      +{it.points}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="rounded-2xl border p-4 space-y-2 text-sm">
        <div className="font-semibold">Yorum</div>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li><b>0â€“4:</b> DÃ¼ÅŸÃ¼k aktivite</li>
          <li><b>5â€“9:</b> Orta aktivite</li>
          <li><b>10â€“14:</b> YÃ¼ksek aktivite</li>
          <li><b>â‰¥15:</b> Ã‡ok yÃ¼ksek aktivite</li>
        </ul>
        <div className="text-xs text-gray-500">
          Not: SLEDAI bir aktivite skorudur; tanÄ± koydurmaz. Klinik yargÄ±, laboratuvar ve gÃ¶rÃ¼ntÃ¼leme ile birlikte deÄŸerlendirilmelidir.
        </div>
      </section>
    </div>
  );
}
