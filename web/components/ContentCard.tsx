'use client';
import React from 'react';
import UpgradeCTA from './UpgradeCTA';

export default function ContentCard({ item, role }:{ item:any; role:'V'|'M'|'P' }) {
  const lockedGeneral = item.premiumOnly && role === 'V';
  const lockedDeep = role !== 'P';

  return (
    <article style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:12, background:'white' }}>
      <h3 style={{ fontWeight:700, marginBottom:6 }}>{item.title}</h3>
      {item.teaser && <p style={{ opacity:.8, marginBottom:6 }}>{item.teaser}</p>}

      {/* Genel gövde */}
      {item.body_general && !lockedGeneral && (
        <div style={{ whiteSpace:'pre-wrap', marginTop:8 }}>{item.body_general}</div>
      )}
      {lockedGeneral && (
        <>
          <div style={{ marginTop:8, padding:8, border:'1px dashed #f59e0b', background:'#fffbeb', borderRadius:8 }}>
            Bu içerik <b>Premium</b> için kilitli.
          </div>
          <UpgradeCTA />
        </>
      )}

      {/* Derin gövde (sadece P) */}
      {item.body_deep && role === 'P' && (
        <div style={{ whiteSpace:'pre-wrap', marginTop:8, padding:8, border:'1px solid #e5e7eb', background:'#f6f7fb', borderRadius:8 }}>
          <b>Detay:</b> {item.body_deep}
        </div>
      )}
      {item.body_deep && lockedDeep && role !== 'V' && (
        <>
          <div style={{ marginTop:8, padding:8, border:'1px dashed #93c5fd', background:'#eff6ff', borderRadius:8 }}>
            Detaylı açıklamalar için Premium’a geçin.
          </div>
          <UpgradeCTA />
        </>
      )}
    </article>
  );
}
