"use client";
import React from "react";
import { setLang, getLangFromCookie, type Lang } from "@/app/lib/i18n";
export default function LangSwitch(){ const [lang, setL] = React.useState<Lang>(getLangFromCookie()); return (
  <div className="flex items-center gap-2 text-xs">
    <button onClick={()=> setLang("tr")} className={`px-2 py-1 rounded ${lang==="tr"?"border font-semibold":"border-transparent"}`}>TR</button>
    <button onClick={()=> setLang("en")} className={`px-2 py-1 rounded ${lang==="en"?"border font-semibold":"border-transparent"}`}>EN</button>
  </div>
); }



