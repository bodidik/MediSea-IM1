// FILE: web/app/programs/[slug]/page.tsx
"use client";

import React from "react";
import Link from "next/link";

type Program = {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  track: "TUS" | "YDUS" | "USMLE";
  durationDays: number;
  isActive: boolean;
  createdAt: string;
};

type ProgramDetailResp = { ok: true; program: Program } | { ok: false; error: string };
type EnrollResp =
  | { ok: true; enrollment: any; program: Program }
  | { ok: false; error: string };
type ProgressResp =
  | {
      ok: true;
      enrolled: boolean;
      progress?: { currentDay?: number; doneUnits?: number; lastTickAt?: string };
      status?: "active" | "paused" | "completed" | "canceled";
      endsAt?: string;
      percent?: number;
      program?: { slug: string; title: string; durationDays: number };
    }
  | { ok: false; error: string };

function backendURL() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : "";
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);

  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);
  const [program, setProgram] = React.useState<Program | null>(null);

  const [progress, setProgress] = React.useState<ProgressResp | null>(null);
  const [pLoading, setPLoading] = React.useState(false);

  const [units, setUnits] = React.useState<number>(0);

  // Detay yükle
  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch(`${backendURL()}/api/programs/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });
        const j = (await r.json()) as ProgramDetailResp;
        if (!j.ok) throw new Error(j.error || "detail failed");
        if (alive) {
          setProgram(j.program);
          setErr(null);
        }
      } catch (e: any) {
        if (alive) setErr(e?.message || "ERR");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  // Progress yükle
  async function loadProgress() {
    try {
      setPLoading(true);
      const mk = getCookie("mk_uid") || "guest";
      const r = await fetch(
        `${backendURL()}/api/programs/${encodeURIComponent(slug)}/progress?externalId=${encodeURIComponent(
          mk
        )}`,
        { cache: "no-store" }
      );
      const j = (await r.json()) as ProgressResp;
      setProgress(j);
    } catch (e: any) {
      setProgress({ ok: false, error: e?.message || "ERR" });
    } finally {
      setPLoading(false);
    }
  }

  React.useEffect(() => {
    loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function enroll() {
    try {
      setPLoading(true);
      const mk = getCookie("mk_uid") || "guest";
      const r = await fetch(
        `${backendURL()}/api/programs/${encodeURIComponent(slug)}/enroll?externalId=${encodeURIComponent(
          mk
        )}`,
        { method: "POST" }
      );
      const j = (await r.json()) as EnrollResp;
      if (!j.ok) throw new Error(j.error || "enroll failed");
      await loadProgress();
    } catch (e: any) {
      setProgress({ ok: false, error: e?.message || "Enroll ERR" });
      setPLoading(false);
    }
  }

  async function tickProgress(opts: { advanceDay?: boolean; doneUnits?: number }) {
    try {
      setPLoading(true);
      const mk = getCookie("mk_uid") || "guest";
      const r = await fetch(
        `${backendURL()}/api/programs/${encodeURIComponent(
          slug
        )}/progress/tick?externalId=${encodeURIComponent(mk)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            advanceDay: !!opts.advanceDay,
            doneUnits: Number(opts.doneUnits || 0),
          }),
        }
      );
      const j = (await r.json()) as any;
      if (!j.ok) throw new Error(j.error || "tick failed");
      await loadProgress();
      setUnits(0);
    } catch (e: any) {
      setProgress({ ok: false, error: e?.message || "Tick ERR" });
      setPLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="text-sm">
        <Link href="/programs" className="underline">
          ← Tüm programlar
        </Link>
      </div>

      {loading ? (
        <div className="h-24 bg-gray-100 rounded" />
      ) : err ? (
        <div className="text-sm text-red-600">{err}</div>
      ) : program ? (
        <>
          <div className="rounded-2xl border p-4">
            <div className="text-xs text-gray-500">{program.track}</div>
            <h1 className="text-2xl md:text-3xl font-bold">{program.title}</h1>
            {program.description && (
              <p className="text-sm text-muted-foreground mt-2">{program.description}</p>
            )}
            <div className="text-xs mt-2 text-gray-500">
              Süre: {program.durationDays} gün
            </div>
          </div>

          {/* Enroll / Progress Kartı */}
          <div className="rounded-2xl border p-4 space-y-3">
            <div className="font-semibold">Program Durumu</div>

            {!progress || pLoading ? (
              <div className="h-10 bg-gray-100 rounded" />
            ) : !progress.ok ? (
              <div className="text-sm text-red-600">{progress.error || "Hata"}</div>
            ) : progress.enrolled === false ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Programa kayıtlı değilsin. (Premium kullanıcılar için)
                </div>
                <button
                  onClick={enroll}
                  disabled={pLoading}
                  className="px-4 py-2 rounded-lg border"
                >
                  {pLoading ? "İşleniyor…" : "Programa Kaydol"}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    Gün:{" "}
                    <b>{(progress.progress?.currentDay ?? 1)}</b> /{" "}
                    {program.durationDays}
                  </div>
                  <div>
                    Tamamlanma: <b>%{Math.round(progress.percent ?? 0)}</b>
                  </div>
                  <div>
                    Ünite: <b>{progress.progress?.doneUnits ?? 0}</b>
                  </div>
                  <div>
                    Durum: <b>{progress.status}</b>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => tickProgress({ advanceDay: true })}
                    disabled={pLoading}
                    className="px-3 py-2 rounded-lg border text-sm"
                  >
                    {pLoading ? "…" : "Bir Gün İlerle"}
                  </button>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={units}
                      onChange={(e) => setUnits(parseInt(e.target.value || "0", 10))}
                      className="w-24 px-3 py-2 rounded-lg border text-sm"
                      placeholder="Ünite"
                    />
                    <button
                      onClick={() => tickProgress({ doneUnits: units || 0 })}
                      disabled={pLoading || (units || 0) <= 0}
                      className="px-3 py-2 rounded-lg border text-sm"
                    >
                      {pLoading ? "…" : "Ünite Ekle"}
                    </button>
                  </div>
                </div>

                {progress.endsAt && (
                  <div className="text-xs text-gray-500">
                    Bitiş: {new Date(progress.endsAt).toLocaleDateString("tr-TR")}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
