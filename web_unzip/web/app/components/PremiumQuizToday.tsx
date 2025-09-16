// FILE: web/app/components/PremiumQuizToday.tsx
"use client";
import React from "react";

type QuizQ = { id: string; question: string; options: string[] };
type TodayResp = { ok: boolean; quizId: string; date: string; questions: QuizQ[]; error?: string };
type SubmitResp = { ok: boolean; attemptId: string; date: string; total: number; correct: number; score: number; error?: string };

export default function PremiumQuizToday() {
  const [data, setData] = React.useState<TodayResp | null>(null);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<SubmitResp | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const r = await fetch("/api/premium/quiz/today", { cache: "no-store", signal: ac.signal });
        const j = (await r.json()) as TodayResp;
        setData(j);
      } catch (e: any) {
        setErr(e?.message || "ERR");
      }
    })();
    return () => ac.abort();
  }, []);

  const handleSelect = (qid: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = async () => {
    if (!data?.quizId) return;
    setLoading(true);
    try {
      const r = await fetch("/api/premium/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId: data.quizId, answers }),
      });
      const j = (await r.json()) as SubmitResp;
      if (!r.ok || !j.ok) throw new Error(j?.error || "Gönderim hatası");
      setResult(j);
    } catch (e: any) {
      setErr(e?.message || "ERR");
    } finally {
      setLoading(false);
    }
  };

  if (err) return <div className="text-sm text-red-600">{err}</div>;
  if (!data) return <div className="h-20 bg-gray-100 rounded animate-pulse" />;

  if (result) {
    return (
      <div className="rounded-2xl border p-4 space-y-3">
        <div className="font-semibold">Sonuç ({data.date})</div>
        <div>Doğru: <b>{result.correct}</b> / {result.total}</div>
        <div>Puan: <b>{result.score}</b></div>
        <button className="mt-2 px-3 py-1 bg-gray-200 rounded" onClick={() => location.reload()}>
          Yenile
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-4 space-y-4">
      <div className="text-xs text-gray-500">Tarih: {data.date}</div>
      {data.questions.map((q) => (
        <div key={q.id} className="space-y-2">
          <div className="text-sm font-medium">{q.question}</div>
          <ul className="space-y-1">
            {q.options.map((opt, i) => (
              <li key={i}>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === i}
                    onChange={() => handleSelect(q.id, i)}
                  />
                  <span>{opt}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button disabled={loading} onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
        {loading ? "Gönderiliyor..." : "Cevapları Gönder"}
      </button>
    </div>
  );
}
