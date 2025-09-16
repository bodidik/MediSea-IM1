"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import QuestionRun, { type Question } from "@/app/components/QuestionRun";

type BackendResp =
  | {
      ok: true;
      planLevel: "P" | "M" | "V";
      visibleCount: number;
      remaining?: number;
      message?: string;
      questions: Question[];
    }
  | { ok: false; error: string };

export default function SectionQuestionsPage() {
  const params = useParams<{ section: string }>();
  const search = useSearchParams();
  const section = decodeURIComponent(params.section);
  const [data, setData] = React.useState<BackendResp | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const planLevel = search.get("planLevel") || ""; // test amaçlı (?planLevel=P|M|V)
      const qs = new URLSearchParams({ module: section });
      if (planLevel) qs.set("planLevel", planLevel);
      const r = await fetch(`/api/questions?${qs.toString()}`, { cache: "no-store" });
      const j = (await r.json()) as BackendResp;
      if (!r.ok || j.ok === false) throw new Error((j as any).error || "load_failed");
      setData(j);
    } catch (e: any) {
      setErr(e?.message || "ERR");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  async function onNextBatch() {
    // İstersek başka modülden öneri getirme akışını burada yaparız.
    // Şimdilik sayfayı tazeliyoruz (kota uygunsa backend yeni set döndürür).
    await load();
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">{section} — Sorular</h1>
        <button onClick={load} className="px-3 py-2 rounded-lg border text-sm" disabled={loading}>
          {loading ? "Yükleniyor…" : "Yenile"}
        </button>
      </div>

      {err && <div className="rounded-xl border p-3 text-sm text-red-600">{err}</div>}

      {!data ? (
        <div className="h-24 bg-gray-100 rounded" />
      ) : (
        <>
          <div className="rounded-2xl border p-4 text-sm flex flex-wrap gap-3 items-center">
            <div>Plan: <b>{(data as any).planLevel}</b></div>
            {"remaining" in data && typeof data.remaining === "number" && (
              <div>Kalan günlük hak: <b>{data.remaining}</b></div>
            )}
            <div>Gösterilen: <b>{data.visibleCount}</b></div>
            {"message" in data && data.message && (
              <div className="text-xs text-muted-foreground">({data.message})</div>
            )}
          </div>

          <QuestionRun
            questions={(data as any).questions || []}
            onExhausted={() => {/* gerekirse analytics */}}
            onNextBatch={onNextBatch}
          />
        </>
      )}
    </div>
  );
}
