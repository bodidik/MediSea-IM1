// FILE: web/app/components/HeaderClient.tsx
"use client";

import React from "react";
import Link from "next/link";

type NavLink = { label: string; href: string };
type NavConfig = { topNav: NavLink[]; sections: NavLink[] };

type HeaderClientProps = {
  navConfig?: NavConfig;
};

export default function HeaderClient({ navConfig }: HeaderClientProps) {
  const topLinks: NavLink[] =
    navConfig?.topNav ?? [
      { label: "Bölümler", href: "/sections" },
      { label: "Konular", href: "/topics" },
      { label: "Kılavuzlar", href: "/guidelines" },
      { label: "Araçlar", href: "/tools" },
    ];

  return (
    <div className="flex-1 flex items-center justify-center md:justify-between gap-3">
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-2">
        {topLinks.map((l) => (
          <Link key={l.href} href={l.href} className="text-sm hover:underline">
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Sağ taraf (placeholder) */}
      <div className="flex items-center gap-2" />
    </div>
  );
}



