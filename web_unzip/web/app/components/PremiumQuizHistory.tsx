// FILE: web/app/components/PremiumQuizHistory.tsx
"use client";
import React from "react";

type Item = { id: string; date: string; total: number; correct: number };
type Resp = { ok: boolean; days: number; items: Item[]; error?: string };

function useQuizHistory(days = 30) {
  const [data, setData] = React.useState<Resp | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  React.useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const r = await fetch(`/api/premium/quiz/history?days=${days}`, { cache: "no-store", signal: ac.signal });
        const j = (await r.json()) as Resp;
        setData(j);
      } catch (e: any) {
        setErr(e?.message || "ERR");
      }
    })();
    return () => ac.abort();
  }, [days]);
  return { data, err };
}

function Sparkline({ values, width = 320, height = 60, stroke = 2 }: { values: number[]; width?: number; height?: number; stroke?: number }) {
  if (!values.length) return <svg width={width} height={height} />;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / Math.max(values.length - 1, 1);

  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - stroke) - stroke / 2;
    return `${x},${y}`;
  }).join(" ");

  const pathD = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - stroke) - stroke / 2;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ") + ` L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={pathD} fill="rgba(0,0,0,0.06)" />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth={stroke} />
    </svg>
  );
}

export default function PremiumQuizHistory({ days = 30 }: { days?: number }) {
  const { data, err } = useQuizHistory(days);
  if (err) return <div className="text-sm text-red-600">{err}</div>;
  if (!data) return <div className="h-16 bg-gray-100 rounded" />;

  const items = [...(data.items || [])].reverse(); // eski→yeni
  const accuracy = items.map(it => (it.total ? Math.round((it.correct / it.total) * 100) : 0));

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Quiz Geçmişi (Son {data.days} gün)</div>
        <div className="text-xs text-gray-500">
          Ort. Doğruluk: <b>
            {accuracy.length ? Math.round(accuracy.reduce((a, b) => a + b, 0) / accuracy.length) : 0}%
          </b>
        </div>
      </div>

      <div className="text-xs text-gray-500">Günlük doğruluk yüzdesi</div>
      <div className="text-gray-900">
        <Sparkline values={accuracy} />
      </div>

      <ul className="text-sm grid grid-cols-2 md:grid-cols-3 gap-2">
        {items.slice(-6).map((it) => (
          <li key={it.id} className="border rounded p-2 flex items-center justify-between">
            <span>{it.date}</span>
            <span className="text-gray-600">{it.correct}/{it.total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
