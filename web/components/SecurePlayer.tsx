export const dynamic = 'force-dynamic';
'use client';
import { useEffect, useRef, useState } from 'react';
const API = 'http://localhost:3000';
export default function SecurePlayer({ videoId }:{ videoId:string }){
  const vref = useRef<HTMLVideoElement>(null); const [src,setSrc] = useState('');
  useEffect(()=>{ fetch(API+'/api/video/sign?role=P', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ videoId }) })
    .then(r=>r.json()).then(j=> setSrc(API + j.url)); },[videoId]);
  useEffect(()=>{ if(!src || !vref.current) return; import('hls.js').then(({default:Hls})=>{
    if (Hls.isSupported()){ const hls = new Hls(); hls.loadSource(src); hls.attachMedia(vref.current!); } else { vref.current!.src = src; }
  }); },[src]);
  return <div style={{position:'relative'}}>
    <div style={{position:'absolute', inset:0, display:'flex',alignItems:'end',justifyContent:'end',padding:8, pointerEvents:'none', opacity:.6, fontSize:12}}>Premium • domain-restricted</div>
    <video ref={vref} controls playsInline style={{width:'100%', border:'1px solid #ddd', borderRadius:4}} />
  </div>;
}
