'use client';
type Props={title:string;desc?:string;href:string};
export default function ModuleCard({title,desc='',href}:Props){
  return (
    <a href={href} style={{display:'block',border:'1px solid #e5e7eb',borderRadius:12,padding:12,background:'#fff',textDecoration:'none'}}>
      <div style={{fontWeight:700,marginBottom:4}}>{title}</div>
      {desc && <div style={{opacity:.8,fontSize:14}}>{desc}</div>}
    </a>
  );
}


