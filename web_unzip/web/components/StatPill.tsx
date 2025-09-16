export default function StatPill({ label, value }:{ label:string; value:number|string }) {
  return (
    <span style={{
      display:'inline-block', padding:'4px 8px', border:'1px solid #e5e7eb',
      borderRadius: 999, fontSize:12, background:'#f8fafc'
    }}>
      {label}: <b>{value}</b>
    </span>
  );
}
