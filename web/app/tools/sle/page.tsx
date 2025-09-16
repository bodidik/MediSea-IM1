"use client";

import React from "react";

type Item = {
  key: string;
  label: string;
  points: number;
  group: "Nöro" | "Renal" | "Kardiyo-Pulmoner" | "Mukokutanöz" | "Kas-İskelet" | "Seroloji" | "Sistemik";
};

// SLEDAI-2K kriterleri (puan aynı kalır)
const ITEMS: Item[] = [
  // 8 puan
  { key: "seizure", label: "Nöbet (seizure)", points: 8, group: "Nöro" },
  { key: "psychosis", label: "Psikoz", points: 8, group: "Nöro" },
  { key: "obs", label: "Organik beyin sendromu (OBS)", points: 8, group: "Nöro" },
  { key: "visual", label: "Görme bozukluğu (retinal patoloji dâhil)", points: 8, group: "Nöro" },
  { key: "cranial", label: "Kraniyal sinir tutulumu", points: 8, group: "Nöro" },
  { key: "lupus_headache", label: "Lupus baş ağrısı", points: 8, group: "Nöro" },
  { key: "cva", label: "Serebrovasküler olay (CVA)", points: 8, group: "Nöro" },
  { key: "vasculitis", label: "Vaskülit (kutaneal/organ)", points: 8, group: "Nöro" },

  // 4 puan
  { key: "arthritis", label: "Artrit (≥2 eklem, hassasiyet + şişlik)", points: 4, group: "Kas-İskelet" },
  { key: "myositis", label: "Miyozit (CK/EMG veya klinik)", points: 4, group: "Kas-İskelet" },
  { key: "casts", label: "İdrar silendirleri (granüler/eritrosit/hemoglobin/...) ", points: 4, group: "Renal" },
  { key: "hematuria", label: "Hematüri (eritrosit yüksek, infeksiyon yok)", points: 4, group: "Renal" },
  { key: "proteinuria", label: "Proteinüri (≥0.5 g/gün veya ≥++ strip)", points: 4, group: "Renal" },
  { key: "pyuria", label: "Piyüri (lökosit yüksek, infeksiyon yok)", points: 4, group: "Renal" },

  // 2 puan
  { key: "rash", label: "Döküntü (malar/diğer tipik lupus)", points: 2, group: "Mukokutanöz" },
  { key: "alopecia", label: "Alopesi (aktif dökülme)", points: 2, group: "Mukokutanöz" },
  { key: "ulcers", label: "Ağız/nazal ülser", points: 2, group: "Mukokutanöz" },
  { key: "pleurisy", label: "Plevrit (plevral ağrı/sürtünme/efüzyon)", points: 2, group: "Kardiyo-Pulmoner" },
  { key: "pericarditis", label: "Perikardit (ağrı/efüzyon/sürtünme)", points: 2, group: "Kardiyo-Pulmoner" },
  { key: "low_complement", label: "Düşük kompleman (C3/C4)", points: 2, group: "Seroloji" },
  { key: "anti_dsDNA", label: "Artmış anti-dsDNA", points: 2, group: "Seroloji" },

  // 1 puan
  { key: "fever", label: "Ateş (infeksiyon dışı, >38°C)", points: 1, group: "Sistemik" },
  { key: "thrombocytopenia", label: "Trombositopeni (<100.000/µL)", points: 1, group: "Sistemik" },
  { key: "leukopenia", label: "Lökopeni (<3.000/µL)", points: 1, group: "Sistemik" },
];

const GROUP_ORDER: Item["group"][] = [
  "Nöro",
  "Renal",
  "Kardiyo-Pulmoner",
  "Mukokutanöz",
  "Kas-İskelet",
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
  if (total <= 4) return { level: "Düşük aktivite", color: "bg-green-100 text-green-800" };
  if (total <= 9) return { level: "Orta aktivite", color: "bg-yellow-100 text-yellow-800" };
  if (total <= 14) return { level: "Yüksek aktivite", color: "bg-orange-100 text-orange-800" };
  return { level: "Çok yüksek aktivite", color: "bg-red-100 text-red-800" };
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
            Sistemik Lupus Erythematosus aktivite değerlendirmesi (SLEDAI-2K).
            Dönem: son 10 gün içindeki bulgular.
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
        <button onClick={() => toggleAll(true)} className="px-3 py-2 rounded-lg border">Tümünü İşaretle</button>
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
          <li><b>0–4:</b> Düşük aktivite</li>
          <li><b>5–9:</b> Orta aktivite</li>
          <li><b>10–14:</b> Yüksek aktivite</li>
          <li><b>≥15:</b> Çok yüksek aktivite</li>
        </ul>
        <div className="text-xs text-gray-500">
          Not: SLEDAI bir aktivite skorudur; tanı koydurmaz. Klinik yargı, laboratuvar ve görüntüleme ile birlikte değerlendirilmelidir.
        </div>
      </section>
    </div>
  );
}
