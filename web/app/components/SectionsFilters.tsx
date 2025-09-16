"use client";
import React from "react";

type Row = { section: string; topics: number; boardQuestions: number; cases: number; videos: number; notes: number; total: number };

type SortKey = keyof Row;
const SORT_OPTS: { key: SortKey; label: string }[] = [
  { key: "total", label: "Toplam" },
  { key: "topics", label: "Topik" },
  { key: "boardQuestions", label: "Board" },
  { key: "cases", label: "Vaka" },
  { key: "videos", label: "Video" },
  { key: "notes", label: "Not" },
];

export default function SectionsFilters({ rows, onChange }: { rows: Row[]; onChange: (rows: Row[]) => void }){
  const [q, setQ] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey>("total");
  const [desc, setDesc] = React.useState(true);

  React.useEffect(() => {
    let arr = [...rows];
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      arr = arr.filter((r) => r.section.toLowerCase().includes(s));
    }
    arr.sort((a, b) => {
      const va = a[sortKey] as number | string;
      const vb = b[sortKey] as number | string;
      const cmp = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
      return desc ? -cmp : cmp;
    });
    onChange(arr);
  }, [q, sortKey, desc, rows, onChange]);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-3">
      <input
        placeholder="Bölüm ara…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="px-3 py-2 rounded-lg border w-full md:w-64"
      />
      <div className="flex items-center gap-2 text-sm">
        <label>Sırala:</label>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className="px-2 py-2 rounded-lg border">
          {SORT_OPTS.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
        <button onClick={() => setDesc((d) => !d)} className="px-3 py-2 rounded-lg border">{desc ? "↓" : "↑"}</button>
      </div>
    </div>
  );
}