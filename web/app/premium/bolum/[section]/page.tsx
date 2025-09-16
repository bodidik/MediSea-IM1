'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type ContentItem = { _id?:string; title:string; summary?:string };

export default function SectionPage({ params, searchParams }:{ params:{section:string}, searchParams:Record<string,string> }){
  const { section } = params;
  const role = (searchParams.role || 'V') as 'V'|'M'|'P';
  const [items,setItems] = useState<ContentItem[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    fetch(`${API}/api/section-content/${encodeURIComponent(section)}?role=${role}`)
      .then(r=>r.json())
      .then(d=>setItems(d.items||d||[]))
      .catch(()=>setItems([]))
      .finally(()=>setLoading(false));
  },[section,role]);

  return (
    <main style={{padding:16, display:'grid', gap:12}}>
      <h1 style={{fontSize:22,fontWeight:800}}>{decodeURIComponent(section)} – İçerikler</h1>
      {loading && <div>Yükleniyor…</div>}
      {!loading && items.length===0 && <div>İçerik bulunamadı.</div>}
      <ul style={{display:'grid',gap:10}}>
        {items.map((it,i)=>(
          <li key={it._id||i} style={{border:'1px solid #e5e7eb',borderRadius:12,padding:12,background:'#fff'}}>
            <div style={{fontWeight:700}}>{it.title}</div>
            {it.summary && <div style={{opacity:.8}}>{it.summary}</div>}
          </li>
        ))}
      </ul>
    </main>
  );
}
