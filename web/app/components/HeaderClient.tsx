"use client";

import React from "react";
import Link from "next/link";

export default function HeaderClient() {
  return (
    <div className="flex-1 flex items-center justify-center md:justify-between gap-3">
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-2">
        <Link href="/sections" className="text-sm hover:underline">Bölümler</Link>
        <Link href="/topics" className="text-sm hover:underline">Konular</Link>
        <Link href="/guidelines" className="text-sm hover:underline">Kılavuzlar</Link>
        <Link href="/tools" className="text-sm hover:underline">Araçlar</Link>
      </nav>

      {/* Sağ taraf (placeholder) */}
      <div className="flex items-center gap-2" />
    </div>
  );
}
