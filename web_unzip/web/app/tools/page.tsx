"use client";

import Link from "next/link";

const tools = [
  { slug: "sle", name: "SLEDAI Skoru", desc: "Sistemik Lupus Erythematosus aktivite skorlaması" },
  { slug: "ie-duke", name: "Enfektif Endokardit (Duke Kriterleri)", desc: "Majör ve minör kriterlere göre tanı değerlendirmesi" },
  { slug: "infusion", name: "İnfüzyon Hesaplama", desc: "IV ilaç doz ve damla sayısı hesaplama" },
  { slug: "chadsvasc", name: "CHA₂DS₂-VASc Skoru", desc: "Atriyal fibrilasyonda inme riski hesaplama" },
  { slug: "hasbled", name: "HAS-BLED Skoru", desc: "Antikoagülasyon kanama riski hesaplama" },
  { slug: "wells-pe", name: "Wells Skoru (PE)", desc: "Pulmoner emboli klinik olasılık değerlendirmesi" },
  { slug: "perc", name: "PERC Kriterleri", desc: "Pulmoner emboli için düşük risk dışlama kriterleri" },
];

export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Hesaplama Araçları</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-xl border p-4 shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="font-semibold text-lg mb-1">{tool.name}</h2>
            <p className="text-sm text-gray-600">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
