'use client';
type Props = {
  page: number;
  total: number;
  pageSize?: number;
  onPage: (p: number) => void;
};
export default function Pagination({ page, total, pageSize = 24, onPage }: Props) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  if (pageCount <= 1) return null;
  const canPrev = page > 1;
  const canNext = page < pageCount;
  return (
    <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:12 }}>
      <button disabled={!canPrev} onClick={() => onPage(page-1)}
        style={{ padding:'6px 10px', border:'1px solid #e5e7eb', borderRadius:8, background: canPrev?'white':'#f1f5f9', cursor: canPrev?'pointer':'default' }}>
        ‹ Önceki
      </button>
      <span style={{ opacity:.8 }}>Sayfa {page} / {pageCount}</span>
      <button disabled={!canNext} onClick={() => onPage(page+1)}
        style={{ padding:'6px 10px', border:'1px solid #e5e7eb', borderRadius:8, background: canNext?'white':'#f1f5f9', cursor: canNext?'pointer':'default' }}>
        Sonraki ›
      </button>
    </div>
  );
}


