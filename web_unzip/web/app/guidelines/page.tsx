"use client";

import React from "react";

type Row = {
  _id: string;
  title: string;
  org: string;
  year: number | null;
  lang: "TR" | "EN";
  section?: string;
  url: string;
  tags?: string[];
};

type Resp = { ok: boolean; count: number; items: Row[]; error?: string };

const SECTIONS = ["", "nefroloji","kardiyoloji","endokrinoloji","gastroenteroloji","hematoloji","romatoloji","infeksiyon","onkoloji","göğüs"];
const LANGS = ["", "TR", "EN"];

export default function GuidelinesPage(){
  const [q, setQ] = React.useState("");
  const [lang, setLang] = React.useState<"" | "TR" | "EN">("");
  const [section, setSection] = React.useState<string>("");
  const [items, setItems] = React.useState<Row[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function load(){
    setLoading(true); setErr(null);
    try{
      const usp = new URLSearchParams();
      if (q.trim()) usp.set("q", q.trim());
      if (lang) usp.set("lang", lang);
      if (section) usp.set("section", section);
      const r = await fetch(`/api/guidelines?${usp.toString()}`, { cache: "no-store" });
      const j = (await r.json()) as Resp;
      if (!j.ok) throw new Error(j.error || "Hata");
      setItems(j.items);
    }catch(e:any){ setErr(e?.message || "ERR"); }
    finally{ setLoading(false); }
  }

  React.useEffect(()=>{ load(); },[]);
  React.useEffect(()=>{ load(); },[lang, section]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Guidelines</h1>

      {/* Filtreler */}
      <div className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Ara: KDIGO, IDSA, TEMD…"
          className="px-3 py-2 rounded-lg border"
        />
        <select value={lang} onChange={(e)=>setLang(e.target.value as any)} className="px-3 py-2 rounded-lg border">
          {LANGS.map(x=> <option key={x} value={x}>{x || "Dil: Hepsi"}</option>)}
        </select>
        <select value={section} onChange={(e)=>setSection(e.target.value)} className="px-3 py-2 rounded-lg border">
          {SECTIONS.map(x=> <option key={x} value={x}>{x || "Bölüm: Hepsi"}</option>)}
        </select>
        <button onClick={load} disabled={loading} className="px-3 py-2 rounded-lg border">{loading ? "…" : "Yenile"}</button>
      </div>

      {err && <div className="rounded-xl border p-3 text-sm text-red-600">{err}</div>}

      {!items ? (
        <div className="space-y-2">{Array.from({length:6}).map((_,i)=>(<div key={i} className="h-12 bg-gray-100 rounded" />))}</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-muted-foreground">Sonuç yok.</div>
      ) : (
        <ul className="space-y-3">
          {items.map(it => (
            <li key={it._id} className="rounded-2xl border p-4">
              <div className="text-sm flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-xs text-gray-500">{it.org} · {it.year || "-"} · {it.lang} · {it.section || "-"}</div>
                  {it.tags?.length ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {it.tags.map(t => <span key={t} className="px-2 py-1 rounded-full border text-xs">{t}</span>)}
                    </div>
                  ) : null}
                </div>
                <a href={it.url} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg border text-sm">Aç</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
