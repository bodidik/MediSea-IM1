// FILE: web/app/sections/[section]/page.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { t } from "@/app/lib/i18n";
import SectionDetailFilters, { type Item } from "@/components/SectionDetailFilters";
import AddToSRButton from "@/components/AddToSRButton";

type DetailResp = {
  section: string;
  totals: { topics: number; boardQuestions: number; cases: number; videos: number; notes: number; total: number };
  latest: Item[];
  lastUpdatedISO: string;
};

export default function SectionDetail(){
  const params = useParams<{ section: string }>();
  const section = decodeURIComponent(params.section);
  const [data, setData] = useState<DetailResp|null>(null);
  const [err, setErr] = useState<string|null>(null);
  const [filtered, setFiltered] = useState<Item[]|null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(()=>{ const ac=new AbortController(); (async()=>{ try{ const r=await fetch(`/api/sections/${encodeURIComponent(section)}`,{signal:ac.signal,cache:"no-store"}); if(!r.ok) throw new Error("detail failed"); const j=await r.json() as DetailResp; setData(j); setFiltered(j.latest); }catch(e:any){ setErr(e?.message||"ERR"); } })(); return ()=>ac.abort(); },[section]);

  const updated = useMemo(()=> data?.lastUpdatedISO ? new Date(data.lastUpdatedISO).toLocaleString("tr-TR"): "", [data]);

  function toggleSelect(id: string){
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([,v])=>v).map(([k])=>k),
    [selected]
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">{t("sectionDetail")}: {section}</h1>
        {/* Toplu ekleme butonu */}
        <AddToSRButton
          contentIds={selectedIds}
          section={section}
          type={undefined}
          label={`SeÃ§ili (${selectedIds.length}) SRâ€™ye ekle`}
          className="px-3 py-2 rounded-lg border text-sm"
        />
      </div>

      {err && <div className="text-sm text-red-500">{err}</div>}
      {!data ? (<div className="h-32 bg-gray-100 rounded" />) : (
        <>
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-gray-500">{updated}</div>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mt-3">
              <li className="rounded-xl border p-3">{t("topics")}: <b>{data.totals.topics}</b></li>
              <li className="rounded-xl border p-3">{t("board")}: <b>{data.totals.boardQuestions}</b></li>
              <li className="rounded-xl border p-3">{t("cases")}: <b>{data.totals.cases}</b></li>
              <li className="rounded-xl border p-3">{t("videos")}: <b>{data.totals.videos}</b></li>
              <li className="rounded-xl border p-3">{t("notes")}: <b>{data.totals.notes}</b></li>
              <li className="rounded-xl border p-3">Toplam: <b>{data.totals.total}</b></li>
            </ul>
          </div>

          <SectionDetailFilters items={data.latest} onChange={setFiltered} />

          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{t("latestItems")}</div>
              {/* FiltrelenmiÅŸ tÃ¼mÃ¼nÃ¼ SRâ€™ye ekle */}
              <AddToSRButton
                contentIds={(filtered||[]).map(x=>x.id)}
                section={section}
                type={undefined}
                label={`Listeyi SRâ€™ye ekle (${filtered?.length||0})`}
                className="px-3 py-1 rounded-lg border text-xs"
              />
            </div>

            <ul className="text-sm space-y-2">
              {(filtered || []).map(x=> (
                <li key={`${x.type}-${x.id}`} className="rounded border p-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!selected[x.id]}
                      onChange={()=>toggleSelect(x.id)}
                    />
                    <span className="min-w-24 inline-block opacity-70">{x.type}</span>
                    <span className="text-gray-500">{new Date(x.createdAt).toLocaleDateString("tr-TR")}</span>
                  </div>

                  {/* Tek tek SRâ€™ye ekle */}
                  <AddToSRButton
                    contentIds={[x.id]}
                    section={section}
                    type={x.type?.toLowerCase()}
                    label="SR"
                    className="px-2 py-1 rounded-lg border text-xs"
                  />
                </li>
              ))}
              {!filtered?.length && (<li className="text-sm text-muted-foreground">SeÃ§ilen filtrelere uygun sonuÃ§ yok.</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
