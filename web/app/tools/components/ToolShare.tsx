"use client";

import React from "react";

type Params = Record<string, string | number | boolean | null | undefined>;

export default function ToolShare({ params = {} }: { params?: Params }) {
  const [copied, setCopied] = React.useState(false);

  const buildUrl = React.useCallback(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") url.searchParams.delete(k);
      else url.searchParams.set(k, String(v));
    });
    return url.toString();
  }, [params]);

  const copy = React.useCallback(async () => {
    const link = buildUrl();
    if (!link) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        const el = document.createElement("textarea");
        el.value = link;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
    } catch { /* no-op */ }
  }, [buildUrl]);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="flex items-center gap-2 text-xs" aria-live="polite">
      <button type="button" className="px-3 py-1 rounded-lg border" onClick={copy}>
        Linki Kopyala
      </button>
      {copied && <span className="text-green-600">Kopyalandı</span>}
    </div>
  );
}