"use client";
import React from "react";

type Props = {
  /** Tekil içerik için */
  contentId?: string;

  /** Çoğul içerik için (sayfadan gelen isim) */
  contentIds?: string[];

  /** Alternatif isim — bazı yerlerde selectedIds geçiyor */
  selectedIds?: string[];

  /** İsteğe bağlı meta */
  section?: string;
  type?: string;         // içerik türü ("topic" | "guideline" vs.)
  label?: string;        // buton üstü yazı (gelirse aynen kullan)
  className?: string;    // ekstra css sınıfları
};

export default function AddToSRButton({
  contentId,
  contentIds,
  selectedIds,
  section,
  type,
  label,
  className = "",
}: Props) {
  // Tekil/çoğul normalizasyonu
  const ids = (
    contentIds ??
    selectedIds ??
    (contentId ? [contentId] : [])
  ).map(String);

  const disabled = ids.length === 0;

  // Etiket: dışarıdan label verilmişse onu kullan, yoksa akıllı üret
  const btnLabel =
    label ??
    (contentId ? "SR'ye ekle" : `Seçilenleri SR'ye ekle (${ids.length})`);

  function handleClick() {
    // Burada gerçek API çağrını koyabilirsin
    // ör: fetch('/api/sr/add', { method:'POST', body: JSON.stringify({ ids, section, type }) })
    alert(JSON.stringify({ ids, section, type }));
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      onClick={handleClick}
      className={`px-3 py-1 rounded border text-sm disabled:opacity-50 ${className}`}
    >
      {btnLabel}
    </button>
  );
}



