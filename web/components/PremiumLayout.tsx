// FILE: components/PremiumLayout.tsx
import Link from "next/link";
import React from "react";

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          backdropFilter: "saturate(180%) blur(8px)",
          background: "rgba(255,255,255,0.9)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
          <Link href="/" style={{ fontWeight: 800, textDecoration: "none", color: "#111" }}>
            Medknowledge
          </Link>
          <span style={{ opacity: 0.6 }}>•</span>
          <Link href="/premium" style={{ fontWeight: 700, textDecoration: "none" }}>
            Premium
          </Link>

          <nav style={{ display: "flex", gap: 10, marginLeft: 12 }}>
            <Link href="/premium/ydus" style={{ textDecoration: "none" }}>
              YDUS
            </Link>
            <Link href="/premium/tus" style={{ textDecoration: "none" }}>
              TUS
            </Link>
            <Link href="/premium/ydus/deneme?role=V" style={{ textDecoration: "none" }}>
              Deneme
            </Link>
            <Link href="/premium/ydus/soru-cozum?role=V" style={{ textDecoration: "none" }}>
              Soru Çözüm
            </Link>
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <Link
              href="/premium"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 999,
                padding: "6px 10px",
                textDecoration: "none",
                background: "#fff",
              }}
            >
              Premium Ana
            </Link>
          </div>
        </div>
      </header>

      <main style={{ padding: 16, maxWidth: 1160, margin: "0 auto" }}>{children}</main>

      <footer style={{ padding: "18px 16px", borderTop: "1px solid #e5e7eb", background: "#fff", marginTop: 24 }}>
        <div style={{ opacity: 0.7, fontSize: 13 }}>© {new Date().getFullYear()} Medknowledge • İç Hastalıkları</div>
      </footer>
    </div>
  );
}

