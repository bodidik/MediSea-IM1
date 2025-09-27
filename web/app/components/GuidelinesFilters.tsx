// FILE: web/app/components/GuidelinesFilters.tsx
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SECTION_OPTIONS = [
  "",
  "romatoloji",
  "nefroloji",
  "gastroenteroloji",
  "hematoloji",
  "endokrinoloji",
  "kardiyoloji",
  "infeksiyon",
  "göğüs",
];

function buildQuery(base: URLSearchParams, patch: Record<string, string | number>) {
  const sp = new URLSearchParams(base.toString());
  Object.entries(patch).forEach(([k, v]) => {
    const val = String(v ?? "");
    if (val) sp.set(k, val);
    else sp.delete(k);
  });
  return sp.toString();
}

export default function GuidelinesFilters({
  lang,
  section,
  q,
  total,
}: {
  lang: string;
  section: string;
  q: string;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [qLocal, setQLocal] = React.useState(q);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => setQLocal(q), [q]);

  // debounce arama
  React.useEffect(() => {
    const id = setTimeout(() => {
      if (qLocal !== q) {
        const qs = buildQuery(searchParams, { q: qLocal });
        startTransition(() => router.push(`${pathname}?${qs}`));
      }
    }, 350);
    return () => clearTimeout(id);
  }, [qLocal]); // eslint-disable-line react-hooks/exhaustive-deps

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
        aria-label="Bölüm"
        onChange={(e) => {
          const qs = buildQuery(searchParams, { section: e.target.value });
          router.push(`${pathname}?${qs}`);
        }}
      >
        {SECTION_OPTIONS.map((s) => (
          <option key={s || "all"} value={s}>
            {s ? s : "Bölüm: Hepsi"}
          </option>
        ))}
      </select>

      <input
        name="q"
        value={qLocal}
        onChange={(e) => setQLocal(e.target.value)}
        placeholder="Ara: KDIGO, EULAR, ESC, ADA…"
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
          Sıfırla
        </button>
        <div className="ml-auto flex items-center gap-3 text-xs text-gray-500">
          <span>{typeof total === "number" ? `Toplam ${total} kayıt` : ""}</span>
          <span className={isPending ? "animate-pulse" : ""}>{isPending ? "Filtreleniyor…" : ""}</span>
        </div>
      </div>
    </form>
  );
}
