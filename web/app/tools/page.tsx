"use client";

import Link from "next/link";

const tools = [
  { slug: "sle", name: "SLEDAI Skoru", desc: "Sistemik Lupus Erythematosus aktivite skorlamasÄ±" },
  { slug: "ie-duke", name: "Enfektif Endokardit (Duke Kriterleri)", desc: "MajÃ¶r ve minÃ¶r kriterlere gÃ¶re tanÄ± deÄŸerlendirmesi" },
  { slug: "infusion", name: "Ä°nfÃ¼zyon Hesaplama", desc: "IV ilaÃ§ doz ve damla sayÄ±sÄ± hesaplama" },
  { slug: "chadsvasc", name: "CHAâ‚‚DSâ‚‚-VASc Skoru", desc: "Atriyal fibrilasyonda inme riski hesaplama" },
  { slug: "hasbled", name: "HAS-BLED Skoru", desc: "AntikoagÃ¼lasyon kanama riski hesaplama" },
  { slug: "wells-pe", name: "Wells Skoru (PE)", desc: "Pulmoner emboli klinik olasÄ±lÄ±k deÄŸerlendirmesi" },
  { slug: "perc", name: "PERC Kriterleri", desc: "Pulmoner emboli iÃ§in dÃ¼ÅŸÃ¼k risk dÄ±ÅŸlama kriterleri" },
];

export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Hesaplama AraÃ§larÄ±</h1>
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



