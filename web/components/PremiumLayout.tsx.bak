'use client';

import React from 'react';

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{minHeight:'100vh', background:'#f6f7fb'}}>
      <header style={{
        position:'sticky', top:0, zIndex:30,
        backdropFilter:'saturate(180%) blur(8px)',
        background:'rgba(255,255,255,0.9)',
        borderBottom:'1px solid #e5e7eb'
      }}>
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px'}}>
          <a href="/" style={{fontWeight:800,textDecoration:'none',color:'#111'}}>Medknowledge</a>
          <span style={{opacity:.6}}>•</span>
          <a href="/premium" style={{fontWeight:700,textDecoration:'none'}}>Premium</a>

          <nav style={{display:'flex',gap:10,marginLeft:12}}>
            <a href="/premium/ydus" style={{textDecoration:'none'}}>YDUS</a>
            <a href="/premium/tus" style={{textDecoration:'none'}}>TUS</a>
            <a href="/premium/ydus/deneme?role=V" style={{textDecoration:'none'}}>Deneme</a>
            <a href="/premium/ydus/soru-cozum?role=V" style={{textDecoration:'none'}}>Soru Çözüm</a>
          </nav>

          <div style={{marginLeft:'auto', display:'flex', gap:8}}>
            <a href="/premium"
               style={{border:'1px solid #e5e7eb', borderRadius:999, padding:'6px 10px', textDecoration:'none', background:'#fff'}}>
              Premium Ana
            </a>
          </div>
        </div>
      </header>

      <main style={{padding:16, maxWidth:1160, margin:'0 auto'}}>{children}</main>

      <footer style={{padding:'18px 16px', borderTop:'1px solid #e5e7eb', background:'#fff', marginTop:24}}>
        <div style={{opacity:.7, fontSize:13}}>© {new Date().getFullYear()} Medknowledge • İç Hastalıkları</div>
      </footer>
    </div>
  );
}
