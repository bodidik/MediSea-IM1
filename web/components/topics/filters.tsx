"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  sections: string[];
};

export default function TopicsFilters({ sections }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [lang, setLang] = useState(sp.get("lang") || "TR");
  const [section, setSection] = useState(sp.get("section") || "");
  const [q, setQ] = useState(sp.get("q") || "");
  const [limit, setLimit] = useState(sp.get("limit") || "20");

  // 300ms debounce
  const debouncedQ = useDebounced(q, 300);

  // URL’i güncelle (Form submit’e gerek yok; seçimlerde ve debounced aramada çalışır)
  useEffect(() => {
    const next = new URLSearchParams(sp.toString());
    lang ? next.set("lang", lang) : next.delete("lang");
    section ? next.set("section", section) : next.delete("section");
    debouncedQ ? next.set("q", debouncedQ) : next.delete("q");
    limit ? next.set("limit", limit) : next.delete("limit");

    router.replace(`${pathname}?${next.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, section, debouncedQ, limit]);

  return (
    <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/95 border-b">
      <div className="mx-auto max-w-5xl p-3 md:p-4 grid grid-cols-2 md:grid-cols-5 gap-2">
        <select
          aria-label="Dil"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm"
        >
          <option value="TR">TR</option>
          <option value="EN">EN</option>
        </select>

        <select
          aria-label="Bölüm"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm md:col-span-2"
        >
          <option value="">Bölüm: Hepsi</option>
          {sections.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          aria-label="Ara"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: behçet, kdigo, vaskülit…"
          className="px-3 py-2 rounded-lg border text-sm md:col-span-2"
        />

        <div className="col-span-2 md:col-span-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setLang("TR"); setSection(""); setQ(""); setLimit("20"); }}
            className="px-3 py-2 rounded-lg border text-sm"
            title="Filtreleri sıfırla"
          >
            Sıfırla
          </button>
          <div className="ml-auto flex items-center gap-2 text-xs">
            <span className="opacity-60">Sayfa başına:</span>
            <select
              aria-label="Limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="px-2 py-1 rounded border text-xs"
            >
              {["10","20","30","50","100"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function useDebounced<T>(value: T, ms: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}
