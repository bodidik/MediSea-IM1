"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * HAS-BLED (kanama riski) â€” Ã¶rnek/ÅŸablon.
 * Maddeler ve yorumlama klinik uygulamaya geÃ§meden doÄŸrulanmalÄ±dÄ±r.
 */

type Item = { key: keyof State; label: string; pts: number };

type State = {
  htn: boolean;          // uncontrolled HTN (SBP >160 mmHg)
  abnRenal: boolean;     // renal dysfunction
  abnLiver: boolean;     // liver dysfunction
  stroke: boolean;       // prior stroke
  bleed: boolean;        // bleeding history/predisposition
  labileINR: boolean;    // labile INR (warfarin kullananlarda)
  elderly65: boolean;    // age >65
  drugs: boolean;        // antiplatelet/NSAID
  alcohol: boolean;      // alcohol use
};

const ITEMS: Item[] = [
  { key: "htn",        label: "Hipertansiyon (SBP >160)", pts: 1 },
  { key: "abnRenal",   label: "BÃ¶brek fonksiyon bozukluÄŸu", pts: 1 },
  { key: "abnLiver",   label: "KaraciÄŸer fonksiyon bozukluÄŸu", pts: 1 },
  { key: "stroke",     label: "GeÃ§irilmiÅŸ inme", pts: 1 },
  { key: "bleed",      label: "Kanama Ã¶ykÃ¼sÃ¼/riski", pts: 1 },
  { key: "labileINR",  label: "Labile INR", pts: 1 },
  { key: "elderly65",  label: "YaÅŸ > 65", pts: 1 },
  { key: "drugs",      label: "Ä°laÃ§lar (antiplatelet/NSAID)", pts: 1 },
  { key: "alcohol",    label: "Alkol", pts: 1 },
];

function readBool(param: string | null) {
  return param === "1" || param === "true";
}

export default function HasBledPage() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const [state, setState] = React.useState<State>({
    htn: readBool(search?.get("htn")),
    abnRenal: readBool(search?.get("renal")),
    abnLiver: readBool(search?.get("liver")),
    stroke: readBool(search?.get("stroke")),
    bleed: readBool(search?.get("bleed")),
    labileINR: readBool(search?.get("inr")),
    elderly65: readBool(search?.get("elderly")),
    drugs: readBool(search?.get("drugs")),
    alcohol: readBool(search?.get("alcohol")),
  });

  function toggle(k: keyof State) {
    setState((s) => ({ ...s, [k]: !s[k] }));
  }

  const score = ITEMS.reduce((sum, it) => sum + (state[it.key] ? it.pts : 0), 0);

  let comment = "â€”";
  if (score >= 3) comment = "YÃ¼ksek kanama riski; yakÄ±ndan izlem ve dÃ¼zeltilebilir riskleri iyileÅŸtirme.";
  else if (score === 2) comment = "Orta risk; dikkatli takip.";
  else comment = "DÃ¼ÅŸÃ¼k risk.";

  const shareParams = {
    htn: state.htn ? 1 : "",
    renal: state.abnRenal ? 1 : "",
    liver: state.abnLiver ? 1 : "",
    stroke: state.stroke ? 1 : "",
    bleed: state.bleed ? 1 : "",
    inr: state.labileINR ? 1 : "",
    elderly: state.elderly65 ? 1 : "",
    drugs: state.drugs ? 1 : "",
    alcohol: state.alcohol ? 1 : "",
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">HAS-BLED</h1>

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
