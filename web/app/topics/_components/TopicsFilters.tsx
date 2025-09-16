"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SECTION_OPTIONS = [
  "",
  "romatoloji",
  "nefroloji",
  "gastroenteroloji",
  "hematoloji",
  "endokrinoloji",
  "kardiyoloji",
  "infeksiyon",
  "gÃ¶ÄŸÃ¼s",
];

function buildQuery(base: URLSearchParams, patch: Record<string, string | number>) {
  const sp = new URLSearchParams(base.toString());
  Object.entries(patch).forEach(([k, v]) => {
    const val = String(v ?? "");
    if (val) sp.set(k, val);
    else sp.delete(k);
  });
  // her filtre deÄŸiÅŸiminde sayfayÄ± 1â€™e al
  sp.set("page", "1");
  return sp.toString();
}

export default function TopicsFilters(props: {
  lang: string;
  section: string;
  q: string;
  limit: number;
  page: number;
  total: number;
}) {
  const { lang, section, q, limit, total } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [qLocal, setQLocal] = useState(q);
  const [isPending, startTransition] = useTransition();

  // debounce
  useEffect(() => {
    const id = setTimeout(() => {
      if (qLocal !== q) {
        const qs = buildQuery(searchParams, { q: qLocal });
        startTransition(() => router.push(`${pathname}?${qs}`));
      }
    }, 350);
    return () => clearTimeout(id);
  }, [qLocal]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalHint = useMemo(() => {
    if (!total) return "0 sonuÃ§";
    return `Toplam ${total} kayÄ±t`;
  }, [total]);

  return (
    <form
      className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-5 gap-3 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        const qs = buildQuery(searchParams, { q: qLocal });
        router.push(`${pathname}?${qs}`);
      }}
    >
      <select
        name="lang"
        defaultValue={lang}
        className="px-3 py-2 rounded-lg border text-sm"
        aria-label="Dil"
        onChange={(e) => {
          const qs = buildQuery(searchParams, { lang: e.target.value });
          router.push(`${pathname}?${qs}`);
        }}
      >
        <option value="TR">TR</option>
        <option value="EN">EN</option>
      </select>

      <select
        name="section"
        defaultValue={section}
        className="px-3 py-2 rounded-lg border text-sm md:col-span-2"
        aria-label="BÃ¶lÃ¼m"
        onChange={(e) => {
          const qs = buildQuery(searchParams, { section: e.target.value });
          router.push(`${pathname}?${qs}`);
        }}
      >
        {SECTION_OPTIONS.map((s) => (
          <option key={s || "all"} value={s}>
            {s ? s : "BÃ¶lÃ¼m: Hepsi"}
          </option>
        ))}
      </select>

      <input
        name="q"
        value={qLocal}
        onChange={(e) => setQLocal(e.target.value)}
        placeholder="Ara: behÃ§et, kdigo, vaskÃ¼litâ€¦"
        className="px-3 py-2 rounded-lg border text-sm md:col-span-2"
        aria-label="Arama"
      />

      <div className="md:col-span-5 flex items-center gap-3">
        <button className="px-3 py-2 rounded-lg border text-sm" type="submit" disabled={isPending}>
          Uygula
        </button>
        <button
          type="button"
          className="text-sm underline opacity-70 hover:opacity-100"
          onClick={() => {
            setQLocal("");
            const qs = new URLSearchParams();
            qs.set("lang", lang || "TR");
            router.push(`${pathname}?${qs.toString()}`);
          }}
        >
          SÄ±fÄ±rla
        </button>

        <div className="ml-auto flex items-center gap-3 text-xs text-gray-500">
          <span>{totalHint}</span>
          <span className={isPending ? "animate-pulse" : ""}>{isPending ? "Filtreleniyorâ€¦" : ""}</span>
        </div>
      </div>

      {/* limit deÄŸiÅŸimi */}
      <div className="md:col-span-5 flex items-center gap-2">
        <label className="text-xs text-gray-600">Sayfa baÅŸÄ±na:</label>
        <select
          defaultValue={String(limit)}
          className="px-2 py-1 rounded-lg border text-xs"
          onChange={(e) => {
            const qs = buildQuery(searchParams, { limit: e.target.value });
            router.push(`${pathname}?${qs}`);
          }}
        >
          {["10", "20", "30", "50", "100"].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
