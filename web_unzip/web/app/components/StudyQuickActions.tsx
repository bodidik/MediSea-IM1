"use client";
import React, { useState } from "react";

async function post(url: string) {
  const r = await fetch(url, { method: "POST" });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export default function StudyQuickActions() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function hit(correct: boolean) {
    try {
      setBusy(true);
      setMsg(null);
      await post(`/api/progress/tick?correct=${correct}`);
      setMsg(correct ? "✔️ Doğru işlendi" : "❌ Yanlış işlendi");
      // Sayfalardaki sayımları güncellemek için:
      try { (window as any).location.reload(); } catch {}
    } catch (e: any) {
      setMsg(e?.message || "Hata");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    try {
      setBusy(true);
      setMsg(null);
      await post(`/api/progress/reset`);
      setMsg("🔄 Bugün sıfırlandı");
      try { (window as any).location.reload(); } catch {}
    } catch (e: any) {
      setMsg(e?.message || "Hata");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border p-3 flex items-center gap-2 text-sm">
      <button disabled={busy} onClick={() => hit(true)} className="px-3 py-2 rounded-lg border">Doğru (+)</button>
      <button disabled={busy} onClick={() => hit(false)} className="px-3 py-2 rounded-lg border">Yanlış</button>
      <button disabled={busy} onClick={reset} className="px-3 py-2 rounded-lg border">Bugünü Sıfırla</button>
      {msg && <span className="ml-2 text-xs text-gray-500">{msg}</span>}
    </div>
  );
}
