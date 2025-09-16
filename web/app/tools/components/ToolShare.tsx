"use client";

import React from "react";

type KV = Record<string, string | number | boolean | undefined | null>;

export default function ToolShare({ params }: { params: KV }) {
  const [copied, setCopied] = React.useState(false);

  function buildUrl() {
    const url = new URL(typeof window !== "undefined" ? window.location.href : "");
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") url.searchParams.delete(k);
      else url.searchParams.set(k, String(v));
    });
    return url.toString();
  }

  async function copy() {
    const link = buildUrl();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <button className="px-3 py-1 rounded-lg border" onClick={copy}>
        Linki Kopyala
      </button>
      {copied && <span className="text-green-600">Kopyalandı</span>}
    </div>
  );
}
