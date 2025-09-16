"use client";

import React from "react";
import ToolShare from "@/app/tools/components/ToolShare";

/**
 * PERC (Pulmonary Embolism Rule-out Criteria)
 * DÃ¼ÅŸÃ¼k klinik olasÄ±lÄ±k + 8 kriterin tamamÄ± NEGATÄ°F ise gÃ¶rÃ¼ntÃ¼leme olmaksÄ±zÄ±n PE dÄ±ÅŸlanabilir.
 * Kriterler pozitifse/ÅŸÃ¼phe varsa D-dimer veya gÃ¶rÃ¼ntÃ¼leme dÃ¼ÅŸÃ¼nÃ¼lÃ¼r.
 */

type State = {
  age50: boolean; hr100: boolean; sao2_95: boolean; hemoptysis: boolean;
  estrogen: boolean; priorVTE: boolean; unilateralLeg: boolean; recentSurgeryTrauma: boolean;
};

function readBool(x:string|null){ return x==="1" || x==="true"; }

export default function PERCPage(){
  const s = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const [st, setSt] = React.useState<State>({
    age50: readBool(s?.get("age50")),
    hr100: readBool(s?.get("hr100")),
    sao2_95: readBool(s?.get("sao2")),
    hemoptysis: readBool(s?.get("hemo")),
    estrogen: readBool(s?.get("est")),
    priorVTE: readBool(s?.get("vte")),
    unilateralLeg: readBool(s?.get("leg")),
    recentSurgeryTrauma: readBool(s?.get("sx")),
  });

  function toggle(k:keyof State){ setSt(v=>({ ...v, [k]: !v[k] })); }

  const allNegative = !st.age50 && !st.hr100 && !st.sao2_95 && !st.hemoptysis && !st.estrogen && !st.priorVTE && !st.unilateralLeg && !st.recentSurgeryTrauma;

  const params = {
    age50: st.age50?1:"", hr100: st.hr100?1:"", sao2: st.sao2_95?1:"", hemo: st.hemoptysis?1:"",
    est: st.estrogen?1:"", vte: st.priorVTE?1:"", leg: st.unilateralLeg?1:"", sx: st.recentSurgeryTrauma?1:""
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">PERC</h1>
      <div className="rounded-2xl border p-4 text-sm space-y-2">
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.age50} onChange={()=>toggle("age50")} /> YaÅŸ â‰¥ 50</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.hr100} onChange={()=>toggle("hr100")} /> Kalp hÄ±zÄ± â‰¥ 100/dk</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.sao2_95} onChange={()=>toggle("sao2_95")} /> SpOâ‚‚ &lt; 95%</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.hemoptysis} onChange={()=>toggle("hemoptysis")} /> Hemoptizi</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.estrogen} onChange={()=>toggle("estrogen")} /> Ã–strojen kullanÄ±mÄ±</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.priorVTE} onChange={()=>toggle("priorVTE")} /> Ã–nceki DVT/PE</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.unilateralLeg} onChange={()=>toggle("unilateralLeg")} /> Tek taraflÄ± bacak ÅŸiÅŸliÄŸi</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={st.recentSurgeryTrauma} onChange={()=>toggle("recentSurgeryTrauma")} /> YakÄ±n cerrahi/Travma</label>
      </div>
      <div className="rounded-2xl border p-4">
        {allNegative ? (
          <div className="text-sm">DÃ¼ÅŸÃ¼k klinik ÅŸÃ¼phe + tÃ¼m kriterler negatif â†’ <b>PE dÄ±ÅŸlanabilir</b> (PERC negatif).</div>
        ) : (
          <div className="text-sm">En az bir kriter pozitif. <b>PERC pozitif</b>; D-dimer/gÃ¶rÃ¼ntÃ¼leme dÃ¼ÅŸÃ¼nÃ¼lÃ¼r.</div>
        )}
      </div>
      <ToolShare params={params}/>
      <p className="text-xs text-muted-foreground">EÄŸitim amaÃ§lÄ±dÄ±r; kÄ±lavuzlarla doÄŸrulayÄ±n.</p>
    </div>
  );
}
