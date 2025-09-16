'use client';

export default function UpgradeCTA() {
  return (
    <div
      style={{
        marginTop: 10,
        padding: 12,
        border: '1px solid #e0e7ff',
        background: '#eef2ff',
        borderRadius: 12,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Premium içerik</div>
      <div style={{ opacity: 0.8 }}>
        Bu bölümdeki detaylar Premium üyeler için. Yükselterek tüm ders notlarına ve derin açıklamalara erişin.
      </div>
      <a
        href="/premium/upgrade"
        style={{
          display: 'inline-block',
          marginTop: 10,
          padding: '8px 12px',
          borderRadius: 10,
          border: '1px solid #1d4ed8',
          textDecoration: 'none',
        }}
      >
        Premium’a geç
      </a>
    </div>
  );
}
