"use client";
import React from "react";
import { setLang, getLangFromCookie, type Lang } from "@/app/lib/i18n";

export default function LangSwitch({ compact = false }: { compact?: boolean }) {
  const [lang, setL] = React.useState<Lang>(getLangFromCookie());

  function handle(langCode: Lang) {
    setLang(langCode);
    setL(langCode);
  }

  const base = compact ? "text-xs px-2 py-1" : "px-3 py-1.5 text-sm";

  return (
    <div className={`flex items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      <button
        onClick={() => handle("tr")}
        className={`${base} rounded border ${lang === "tr" ? "border-gray-900 font-semibold" : "border-transparent hover:bg-gray-50"}`}
      >
        TR
      </button>
      <button
        onClick={() => handle("en")}
        className={`${base} rounded border ${lang === "en" ? "border-gray-900 font-semibold" : "border-transparent hover:bg-gray-50"}`}
      >
        EN
      </button>
    </div>
  );
}
