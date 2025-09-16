'use client';

import { useEffect, useMemo, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const PAGE_SIZE = 10;

type Opt = { key: string; text: string };
type Q = {
  _id?: string;
  title: string;
  stem: string;
  options: Opt[];
  correct?: string;
  explain?: string;
  section?: string;
};

const SECTION_LIST = [
  { key:'all', title:'TÃ¼mÃ¼' },
  { key:'romatoloji', title:'Romatoloji' },
  { key:'hematoloji', title:'Hematoloji' },
  { key:'gastroenteroloji', title:'Gastroenteroloji' },
  { key:'endokrinoloji', title:'Endokrinoloji' },
  { key:'geriatri', title:'Geriatri' },
  { key:'nefroloji', title:'Nefroloji' },
  { key:'onkoloji', title:'Onkoloji' },
  { key:'immÃ¼noloji', title:'Ä°mmÃ¼noloji' },
  { key:'kardiyoloji', title:'Kardiyoloji' },
  { key:'infeksiyon', title:'Ä°nfeksiyon' },
  { key:'gÃ¶ÄŸÃ¼s', title:'GÃ¶ÄŸÃ¼s HastalÄ±klarÄ±' },
];

export default function YdusSoruCozum() {
  const [items, setItems] = useState<Q[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'V'|'M'|'P'>('V');
  const [section, setSection] = useState<string>('all');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // URLâ€™den role/section/q okumak (ilk aÃ§Ä±lÄ±ÅŸ)
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const r = (sp.get('role') || 'V') as 'V'|'M'|'P';
    const s = sp.get('section') || 'all';
    const qq = sp.get('q') || '';
    setRole(r); setSection(s); setQ(qq);
  }, []);

  // veri Ã§ek
  useEffect(() => {
    setLoading(true);
    const url = new URL(`${API}/api/questions`);
    url.searchParams.set('examType','ydus');
    url.searchParams.set('role', role);
    url.searchParams.set('limit', String(PAGE_SIZE));
    url.searchParams.set('skip', String((page-1)*PAGE_SIZE));
    if (section && section !== 'all') url.searchParams.set('section', section);
    if (q.trim()) url.searchParams.set('q', q.trim());

    fetch(url.toString())
      .then(r => r.json())
      .then(d => { setItems(d.items || []); setTotal(d.total || 0); })
      .catch(() => { setItems([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [role, section, q, page]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  function applyFilters(next?: { role?: 'V'|'M'|'P'; section?: string; q?: string }) {
    const r = next?.role ?? role;
    const s = next?.section ?? section;
    const qq = next?.q ?? q;
    const u = new URL(location.href);
    u.searchParams.set('role', r);
    u.searchParams.set('section', s);
    u.searchParams.set('q', qq);
    history.replaceState(null, '', u.toString());
    setRole(r); setSection(s); setQ(qq); setPage(1);
  }

  return (
    <main style={{display:'grid', gap:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8, flexWrap:'wrap'}}>
        <h1 style={{fontSize:22, fontWeight:800}}>YDUS â€“ Soru Ã‡Ã¶zÃ¼mÃ¼</h1>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <label>Rol:</label>
          <select value={role} onChange={e=>applyFilters({ role: e.target.value as 'V'|'M'|'P' })}
            style={{border:'1px solid #e5e7eb', borderRadius:8, padding:'6px 10px'}}>
            <option value="V">V</option>
            <option value="M">M</option>
            <option value="P">P</option>
          </select>
        </div>
      </div>

      {/* Filtrelar */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        <select value={section} onChange={e=>applyFilters({ section: e.target.value })}
          style={{border:'1px solid #e5e7eb', borderRadius:8, padding:'8px 10px', background:'#fff'}}>
          {SECTION_LIST.map(s => <option key={s.key} value={s.key}>{s.title}</option>)}
        </select>

        <div style={{display:'flex', gap:8}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Konu / anahtar kelime araâ€¦"
            style={{flex:1, border:'1px solid #e5e7eb', borderRadius:8, padding:'8px 10px'}}/>
          <button onClick={()=>applyFilters()} style={{border:'1px solid #e5e7eb', borderRadius:8, padding:'8px 12px', background:'#fff'}}>Ara</button>
        </div>
      </div>

      {/* Liste */}
      {loading && <div>YÃ¼kleniyorâ€¦</div>}
      {!loading && items.length === 0 && <div>Soru bulunamadÄ±.</div>}
      <ol style={{display:'grid', gap:12, listStyle:'decimal', paddingInlineStart:20}}>
        {items.map((qitem, idx) => (
          <li key={qitem._id || idx} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:12, background:'#fff'}}>
            <div style={{fontWeight:700, marginBottom:6}}>{qitem.title}</div>
            <div style={{whiteSpace:'pre-wrap'}}>{qitem.stem}</div>
            <ul style={{marginTop:8, display:'grid', gap:4}}>
              {qitem.options.map(o => (
                <li key={o.key}><b>{o.key})</b> {o.text}</li>
              ))}
            </ul>
            {qitem.correct && (
              <div style={{marginTop:8, background:'#ecfeff', border:'1px solid #e5e7eb', borderRadius:8, padding:'6px 8px'}}>
                DoÄŸru: <b>{qitem.correct}</b>
              </div>
            )}
            {qitem.explain && (
              <div style={{marginTop:8, background:'#f8fafc', border:'1px solid #e5e7eb', borderRadius:8, padding:'8px 10px'}}>
                <b>AÃ§Ä±klama:</b> {qitem.explain}
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div style={{display:'flex', gap:8, alignItems:'center', justifyContent:'flex-end'}}>
          <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}
            style={{padding:'6px 10px', border:'1px solid #e5e7eb', borderRadius:8, background:'#fff'}}>Ã–nceki</button>
          <span style={{opacity:.8}}>Sayfa {page}/{totalPages}</span>
          <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
            style={{padding:'6px 10px', border:'1px solid #e5e7eb', borderRadius:8, background:'#fff'}}>Sonraki</button>
        </div>
      )}
    </main>
  );
}
