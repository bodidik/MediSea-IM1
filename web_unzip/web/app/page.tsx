"use client";
import React, { useEffect, useMemo, useState } from "react";
import PlanBadge from "@/app/components/PlanBadge";
import SectionsTable from "@/app/components/SectionsTable";
import SectionsFilters from "@/app/components/SectionsFilters";
import LangSwitch from "@/app/components/LangSwitch";
import UpgradeCard from "@/app/components/UpgradeCard";
import { t } from "@/app/lib/i18n";

type Row = { section: string; topics: number; boardQuestions: number; cases: number; videos: number; notes: number; total: number };

type SectionsResp = { rows: Row[]; lastUpdatedISO: string };
type CountsResp = { totals: { topics: number; boardQuestions: number; cases: number; videos: number; notes: number }; user: { plan?: "free"|"premium"|"pro"; solved: number }; lastUpdatedISO: string };

export default function HomePage(){
  const [plan, setPlan] = useState<"free"|"premium"|"pro">("free");
  const [sections, setSections] = useState<Row[]|null>(null);
  const [filtered, setFiltered] = useState<Row[]|null>(null);
  const [counts, setCounts] = useState<CountsResp|null>(null);
  const [err, setErr] = useState<string|null>(null);

  useEffect(()=>{ const ac=new AbortController(); (async()=>{ try{ await fetch("/api/user/ensure", { method:"POST" }); const [s,c]=await Promise.all([ fetch("/api/sections/with-count",{signal:ac.signal,cache:"no-store"}), fetch("/api/counts",{signal:ac.signal,cache:"no-store"}) ]); if(!s.ok) throw new Error("sections failed"); if(!c.ok) throw new Error("counts failed"); const sjson=await s.json() as SectionsResp; const cjson=await c.json() as CountsResp; setSections(sjson.rows); setFiltered(sjson.rows); setCounts(cjson); setPlan((cjson.user.plan??"free") as any); }catch(e:any){ setErr(e?.message||"ERR"); } })(); return ()=>ac.abort(); },[]);

  const lastUpdated = useMemo(()=> counts?.lastUpdatedISO || "", [counts]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t("appTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("appSubtitle")}</p>
        </div>
        <div className="flex items-center gap-3"><LangSwitch /><PlanBadge plan={plan} /></div>
      </header>
      {err && <div className="rounded-xl border p-3 text-sm text-red-600">{err}</div>}
      <UpgradeCard />
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{t("sectionCountsTitle")}</h2>
          <div className="text-xs text-muted-foreground">{lastUpdated? new Date(lastUpdated).toLocaleString("tr-TR"): ""}</div>
        </div>
        {!sections ? (
          <div className="space-y-2">{Array.from({length:8}).map((_,i)=>(<div className="h-10 bg-gray-100 rounded" key={i}/>))}</div>
        ) : (
          <>
            <SectionsFilters rows={sections} onChange={setFiltered} />
            <SectionsTable rows={filtered || []} />
          </>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mt-6">{t("platformSummary")}</h2>
        {!counts ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">{Array.from({length:6}).map((_,i)=>(<div key={i} className="h-20 bg-gray-100 rounded"/>))}</div>
        ) : (
          <ul className="text-sm grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <li className="rounded-xl border p-3">{t("topics")}: <b>{counts.totals.topics}</b></li>
            <li className="rounded-xl border p-3">{t("board")}: <b>{counts.totals.boardQuestions}</b></li>
            <li className="rounded-xl border p-3">{t("cases")}: <b>{counts.totals.cases}</b></li>
            <li className="rounded-xl border p-3">{t("videos")}: <b>{counts.totals.videos}</b></li>
            <li className="rounded-xl border p-3">{t("notes")}: <b>{counts.totals.notes}</b></li>
            <li className="rounded-xl border p-3">{t("plan")}: <b>{plan.toUpperCase()}</b></li>
          </ul>
        )}
      </div>
    </div>
  );
}