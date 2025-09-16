"use client";
import React from "react";
import Link from "next/link";

const PRESETS = [
  { slug: "abdominal-pain", title: "Karın Ağrısı ile Başvuru" },
];

export default function CasesIndexPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">Vaka Çözümleri</h1>
      <p className="text-sm text-muted-foreground">
        Klinik öykü toplama pratiği için soru soran vaka akışları.
      </p>
      <ul className="grid gap-3">
        {PRESETS.map((c) => (
          <li key={c.slug} className="rounded-2xl border p-4 flex items-center justify-between">
            <div className="font-medium">{c.title}</div>
            <Link href={`/cases/${c.slug}`} className="px-3 py-2 rounded-lg border text-sm">
              Aç
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
