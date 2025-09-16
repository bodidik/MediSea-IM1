"use client";
import React from "react";
import Link from "next/link";

type CaseRow = {
  slug: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
};
type ListResp = { ok: boolean; items?: CaseRow[]; error?: string };

export default function CasesIndexPage() {
  const [rows, setRows] = React.useState<CaseRow[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch("/api/cases", { cache: "no-store" });
      const j: ListResp = await r.json();
      if (!j.ok) throw new Error(j.error || "Yükleme hatası");
      setRows(j.items || []);
    } catch (e: any) {
      setErr(e?.message || "ERR");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Vaka Çözümleri</h1>
        <button
          onClick={load}
          className="px-3 py-2 rounded-lg border text-sm"
          disabled={loading}
        >
          {loading ? "…" : "Yenile"}
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Klinik öykü toplama pratiği için soru soran vaka akışları.
      </p>

      {err && (
        <div className="rounded-xl border p-3 text-sm text-red-600">
          {err}
        </div>
      )}

      {!rows ? (
        <ul className="grid gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="h-20 rounded-2xl bg-gray-100" />
          ))}
        </ul>
      ) : rows.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          Kayıtlı vaka bulunamadı.
        </div>
      ) : (
        <ul className="grid gap-3">
          {rows.map((c) => (
            <li
              key={c.slug}
              className="rounded-2xl border p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{c.title}</div>
                {(c.updatedAt || c.createdAt) && (
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(c.updatedAt || c.createdAt!).toLocaleString(
                      "tr-TR"
                    )}
                  </div>
                )}
              </div>
              <Link
                href={`/cases/${encodeURIComponent(c.slug)}`}
                className="px-3 py-2 rounded-lg border text-sm"
              >
                Aç
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
