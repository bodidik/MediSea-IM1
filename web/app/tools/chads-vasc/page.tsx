"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

type Item = { key: keyof State; label: string; pts: number };

type State = {
  cHF: boolean;          // Konjestif kalp yetm.
  htn: boolean;          // Hipertansiyon
  age75: boolean;        // â‰¥75
  dm: boolean;           // Diyabet
  strokeTIA: boolean;    // Ä°nme/TIA/tromboembolizm Ã¶ykÃ¼sÃ¼
  vascular: boolean;     // VaskÃ¼ler hastalÄ±k (MI, PAD, aort plak)
  age65to74: boolean;    // 65â€“74
  female: boolean;       // KadÄ±n cinsiyet
};

const ITEMS: Item[] = [
  { key: "cHF",        label: "Kalp yetmezliÄŸi (CHF)", pts: 1 },
  { key: "htn",        label: "Hipertansiyon",         pts: 1 },
  { key: "age75",      label: "YaÅŸ â‰¥ 75",              pts: 2 },
  { key: "dm",         label: "Diyabet",               pts: 1 },
  { key: "strokeTIA",  label: "Ä°nme/TIA/TE Ã¶ykÃ¼sÃ¼",    pts: 2 },
  { key: "vascular",   label: "VaskÃ¼ler hastalÄ±k",     pts: 1 },
  { key: "age65to74",  label: "YaÅŸ 65â€“74",             pts: 1 },
  { key: "female",     label: "KadÄ±n",                 pts: 1 },
];

function readBool(param: string | null) {
  return param === "1" || param === "true";
}

export default function ChadsVascPage() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const [state, setState] = React.useState<State>({
    cHF: readBool(search?.get("chf") || null),
    htn: readBool(search?.get("htn") || null),
    age75: readBool(search?.get("age75") || null),
    dm: readBool(search?.get("dm") || null),
    strokeTIA: readBool(search?.get("stroke")),
    vascular: readBool(search?.get("vasc")),
    age65to74: readBool(search?.get("age6574")),
    female: readBool(search?.get("female")),
  });

  function toggle(k: keyof State) {
    setState((s) => ({ ...s, [k]: !s[k] }));
  }

  const score = ITEMS.reduce((sum, it) => sum + (state[it.key] ? it.pts : 0), 0);

  let comment = "â€”";
  if (score === 0 && !state.female) comment = "DÃ¼ÅŸÃ¼k risk (erkek 0).";
  else if (score === 1 && state.female) comment = "KadÄ±n 1 = cinsiyet puanÄ±; diÄŸer risklere bakÄ±nÄ±z.";
  else if (score >= 2 || (score === 1 && !state.female)) comment = "Orta-YÃ¼ksek risk; antikoagÃ¼lasyon dÃ¼ÅŸÃ¼nÃ¼lebilir.";

  const shareParams = {
    chf: state.cHF ? 1 : "",
    htn: state.htn ? 1 : "",
    age75: state.age75 ? 1 : "",
    dm: state.dm ? 1 : "",
    stroke: state.strokeTIA ? 1 : "",
    vasc: state.vascular ? 1 : "",
    age6574: state.age65to74 ? 1 : "",
    female: state.female ? 1 : "",
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">CHAâ‚‚DSâ‚‚-VASc</h1>

      <div className="rounded-2xl border p-4 space-y-2">
        {ITEMS.map((it) => (
          <label key={it.key} className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2">
              <input type="checkbox" checked={state[it.key]} onChange={() => toggle(it.key)} />
              {it.label}
            </span>
            <span className="text-xs text-gray-500">+{it.pts}</span>
          </label>
        ))}
      </div>

      <div className="rounded-2xl border p-4 space-y-2">
        <div className="text-sm">Skor</div>
        <div className="text-2xl font-bold">{score}</div>
        <div className="text-xs text-muted-foreground">{comment}</div>
      </div>

      <ToolShare params={shareParams} />
      <p className="text-xs text-muted-foreground">EÄŸitim amaÃ§lÄ±dÄ±r; kÄ±lavuzlarÄ± doÄŸrulayÄ±n.</p>
    </div>
  );
}
