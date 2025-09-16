"use client";
import React, { useState } from "react";
export default function UpgradeCard(){ const [loading, setLoading] = useState(false); const [msg, setMsg] = useState<string|undefined>(); async function upgrade(){ setLoading(true); try{ const r=await fetch("/api/plan/upgrade",{method:"POST"}); if(!r.ok) throw new Error("upgrade failed"); const j=await r.json(); setMsg(j.message || "Plan upgraded"); location.reload(); }catch(e:any){ setMsg(e?.message||"ERR"); } finally{ setLoading(false);} } return (
  <div className="rounded-2xl border p-4 flex items-center justify-between">
    <div className="text-sm">Planı Yükselt</div>
    <button onClick={upgrade} disabled={loading} className="px-4 py-2 rounded-lg border">{loading?"...":"Go"}</button>
  </div>
); }