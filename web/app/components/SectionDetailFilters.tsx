"use client";
import React from "react";

export type Item = { type: string; id: string; createdAt: string };
const TYPES = ["Topic","BoardQuestion","Case","Video","Note"] as const;

export default function SectionDetailFilters({ items, onChange }: { items: Item[]; onChange: (rows: Item[]) => void }){
  const [types, setTypes] = React.useState<string[]>([]);
  const [from, setFrom] = React.useState<string>("");
  const [to, setTo] = React.useState<string>("");

  React.useEffect(()=>{
    let arr = [...items];
    if (types.length) arr = arr.filter(i=> types.includes(i.type));
    if (from) arr = arr.filter(i=> new Date(i.createdAt) >= new Date(from));
    if (to)   arr = arr.filter(i=> new Date(i.createdAt) <= new Date(to));
    onChange(arr);
  },[types, from, to, items, onChange]);

  function toggle(t: string){ setTypes(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]); }

  return (
    <div className="rounded-2xl border p-3 flex flex-col md:flex-row md:items-end gap-3">
      <div className="flex-1">
        <div className="text-xs mb-1">TÃ¼r</div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map(t=> (
            <button key={t} onClick={()=>toggle(t)} className={`px-3 py-1 rounded-full border text-sm ${types.includes(t)?"bg-gray-900 text-white":""}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <label className="text-xs mb-1">BaÅŸlangÄ±Ã§</label>
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="px-3 py-2 border rounded-lg" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs mb-1">BitiÅŸ</label>
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="px-3 py-2 border rounded-lg" />
        </div>
      </div>
    </div>
  );
}
