'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";

type Opt = { key:string; text:string };
type Q = { _id?:string; title:string; stem:string; options:Opt[]; correct?:string; explain?:string };

export default function YdusDeneme(){
  const [items,setItems] = useState<Q[]>([]);
  const [i,setI] = useState(0);
  const [picked,setPicked] = useState<Record<string,string>>({});
  const [secs,setSecs] = useState(20*60); // 20 dk
  const [done,setDone] = useState(false);
  const roleRef = useRef<'V'|'M'|'P'>('V');

  // rolÃ¼ URLâ€™den oku
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const r = (params.get('role')||'V') as 'V'|'M'|'P';
    roleRef.current = r;
  },[]);

  // sorularÄ± Ã§ek
  useEffect(()=>{
    const url = new URL(`${API}/api/questions`);
    url.searchParams.set('examType','ydus');
    url.searchParams.set('role',roleRef.current);
    url.searchParams.set('random','true');
    url.searchParams.set('limit','20');
    fetch(url.toString())
      .then(r=>r.json())
      .then(d=>setItems(d.items||[]))
      .catch(()=>setItems([]));
  },[]);

  // kronometre
  useEffect(()=>{
    if(done) return;
    const t = setInterval(()=>setSecs(s=>s>0?s-1:0),1000);
    return ()=>clearInterval(t);
  },[done]);

  const current = items[i];
  const mm = String(Math.floor(secs/60)).padStart(2,'0');
  const ss = String(secs%60).padStart(2,'0');

  useEffect(()=>{ if(secs===0) setDone(true); },[secs]);

  const answered = useMemo(()=>Object.keys(picked).length,[picked]);

  function pick(ans:string){
    if(!current) return;
    setPicked(prev=>({...prev, [current._id || String(i)]: ans}));
  }

  function finish(){
    setDone(true);
  }

  return (
    <main style={{padding:16, display:'grid', gap:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{fontSize:22,fontWeight:800}}>YDUS â€“ Deneme (20 Soru)</h1>
        <div style={{fontWeight:700, fontVariantNumeric:'tabular-nums'}}>â± {mm}:{ss}</div>
      </div>

      {items.length===0 && <div>YÃ¼kleniyor veya soru bulunamadÄ±.</div>}

      {current && !done && (
        <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:12, background:'#fff'}}>
          <div style={{opacity:.7, marginBottom:6}}>Soru {i+1} / {items.length}</div>
          <div style={{fontWeight:700, marginBottom:6}}>{current.title}</div>
          <div style={{whiteSpace:'pre-wrap'}}>{current.stem}</div>
          <ul style={{marginTop:10, display:'grid', gap:6}}>
            {current.options.map(o=>(
              <li key={o.key}>
                <label style={{display:'flex',gap:8,alignItems:'center',cursor:'pointer'}}>
                  <input type="radio" name={`q-${i}`} onChange={()=>pick(o.key)}
                         checked={picked[current._id||String(i)]===o.key}/>
                  <span><b>{o.key})</b> {o.text}</span>
                </label>
              </li>
            ))}
          </ul>

          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button onClick={()=>setI(v=>Math.max(0,v-1))} disabled={i===0}>Ã–nceki</button>
            <button onClick={()=>setI(v=>Math.min(items.length-1,v+1))} disabled={i===items.length-1}>Sonraki</button>
            <button onClick={finish} style={{marginLeft:'auto'}}>SÄ±navÄ± Bitir</button>
          </div>
        </div>
      )}

      {done && (
        <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:12, background:'#fff'}}>
          <h2 style={{fontWeight:700, marginBottom:8}}>SonuÃ§</h2>
          <p>Cevaplanan: {answered} / {items.length}</p>
          {roleRef.current!=='V' && (
            <ul style={{marginTop:10, display:'grid', gap:8}}>
              {items.map((q,idx)=>(
                <li key={q._id||idx} style={{border:'1px solid #eef',borderRadius:8,padding:8}}>
                  <div style={{fontWeight:600}}>Soru {idx+1}</div>
                  <div>Senin: {picked[q._id||String(idx)] || 'â€”'}</div>
                  {q.correct && <div>DoÄŸru: {q.correct}</div>}
                  {q.explain && <div style={{opacity:.9}}>AÃ§Ä±klama: {q.explain}</div>}
                </li>
              ))}
            </ul>
          )}
          {roleRef.current==='V' && <div style={{marginTop:10,opacity:.8}}>DetaylÄ± anahtar ve aÃ§Ä±klamalar Ã¼yelik/Premium ile gÃ¶rÃ¼nÃ¼r.</div>}
        </div>
      )}
    </main>
  );
}






