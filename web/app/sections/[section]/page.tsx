/* eslint-disable @next/next/no-async-client-component */

"use client";
// FILE: web/app/sections/[section]/page.tsx
// ISR + Tag’li veri çekimi için sunucu bileşenine çevrildi.
// Tek dosyada interaktiviteyi korumak için içte küçük bir client bileşeni kullanıyoruz.

import Link from "next/link";
import { t } from "@/app/lib/i18n";
import SectionDetailFilters, { type Item } from "@/components/SectionDetailFilters";
import AddToSRButton from "@/components/AddToSRButton";

// === ISR ayarı: bölüm sayfası varsayılan olarak 1 günde bir yeniden oluşturulsun ===
export const revalidate = 0; // 1 gün (isteğe göre artırılabilir)

// Tag’ler: on‑demand revalidation için
const sectionTags = (section: string) => [
  `section:${section}`,
  "sections:detail",
];

// API response shape
export type DetailResp = {
  section: string;
  totals: { topics: number; boardQuestions: number; cases: number; videos: number; notes: number; total: number };
  latest: Item[];
  lastUpdatedISO: string;
};

export default async function SectionDetail({ params }: { params: { section: string } }) {
  /* PLACEHOLDER_GATE */
  if (process.env.NEXT_PUBLIC_PLACEHOLDER === "1") {
    return (
      <div className="mx-auto max-w-3xl p-4 text-gray-600">
        Sayfa içeriği yakında.
      </div>
    );
  }
  const section = decodeURIComponent(params.section);
const backend = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000").replace(/\/+$/, "");

  // ✅ ISR + tag’li fetch (CDN cache + /api/revalidate ile anında tazeleme)
  const r = await fetch(`${backend}/api/sections/${encodeURIComponent(section)}`,
    { next: { revalidate, tags: sectionTags(section) } }
  );

  if (!r.ok) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="rounded-xl border p-3 text-sm text-red-600 bg-white">detail failed</div>
        <div className="mt-3">
          <Link href="/sections" className="px-3 py-2 rounded-lg border text-sm inline-block">← {t("back")}</Link>
        </div>
      </div>
    );
  }

  const data = (await r.json()) as DetailResp;

  return <ClientView section={section} data={data} />;
}

// === İç client bileşeni (interaktivite: filtre, seçim, SR ekleme) ===
// Not: aynı dosyada tutuldu, yeni dosya oluşturulmadı.
import React, { useMemo, useState, useCallback } from "react";

function ClientView({ section, data }: { section: string; data: DetailResp }) {
  const [filtered, setFiltered] = useState<Item[] | null>(data.latest || []);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const updated = useMemo(
    () => (data?.lastUpdatedISO ? new Date(data.lastUpdatedISO).toLocaleString("tr-TR") : ""),
    [data]
  );

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const selectedIds = useMemo(() => Object.keys(selected).filter((k) => selected[k]), [selected]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Üst başlık + breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">
            <Link href="/sections" className="underline">{t("sections")}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600 capitalize">{section}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">{t("sectionDetail")}: {section}</h1>
        </div>

        {/* Toplu ekleme butonu */}
        <AddToSRButton
          contentIds={selectedIds}
          section={section}
          type={undefined}
          label={`Seçili (${selectedIds.length}) SR’ye ekle`}
          className="px-3 py-2 rounded-lg border text-sm"
        />
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <div className="text-sm text-gray-500">{updated}</div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mt-3">
          <li className="rounded-xl border p-3">{t("topics")}: <b>{data.totals.topics}</b></li>
          <li className="rounded-xl border p-3">{t("board")}: <b>{data.totals.boardQuestions}</b></li>
          <li className="rounded-xl border p-3">{t("cases")}: <b>{data.totals.cases}</b></li>
          <li className="rounded-xl border p-3">{t("videos")}: <b>{data.totals.videos}</b></li>
          <li className="rounded-xl border p-3">{t("notes")}: <b>{data.totals.notes}</b></li>
          <li className="rounded-xl border p-3">Toplam: <b>{data.totals.total}</b></li>
        </ul>
      </div>

      <SectionDetailFilters items={data.latest} onChange={setFiltered} />

      <div className="rounded-2xl border p-4 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">{t("latestItems")}</div>
          {/* Filtrelenmiş tümünü SR’ye ekle */}
          <AddToSRButton
            contentIds={(filtered || []).map((x) => x.id)}
            section={section}
            type={undefined}
            label={`Listeyi SR’ye ekle (${filtered?.length || 0})`}
            className="px-3 py-1 rounded-lg border text-xs"
          />
        </div>

        <ul className="text-sm space-y-2">
          {(filtered || []).map((x) => (
            <li key={`${x.type}-${x.id}`} className="rounded border p-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!selected[x.id]}
                  onChange={() => toggleSelect(x.id)}
                  aria-label={`${x.type} ${x.id} seç`}
                />
                <span className="min-w-24 inline-block opacity-70 capitalize">{x.type}</span>
                <span className="text-gray-500 whitespace-nowrap">{x.createdAt ? new Date(x.createdAt).toLocaleDateString("tr-TR") : ""}</span>
              </div>

              {/* Tek tek SR’ye ekle */}
              <AddToSRButton
                contentIds={[x.id]}
                section={section}
                type={x.type?.toLowerCase()}
                label="SR"
                className="px-2 py-1 rounded-lg border text-xs"
              />
            </li>
          ))}
          {!filtered?.length && (
            <li className="text-sm text-gray-500">Seçilen filtrelere uygun sonuç yok.</li>
          )}
        </ul>
      </div>

      {/* Geri butonu */}
      <div>
        <Link href="/sections" className="mt-2 px-3 py-2 rounded-lg border text-sm inline-block">← {t("back")}</Link>
      </div>
    </div>
  );
}




