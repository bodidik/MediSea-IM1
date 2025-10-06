// FILE: web/app/components/AppShell.tsx
import SiteHeader from "@/app/components/SiteHeader";
import Link from "next/link";
import React from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <div>© {new Date().getFullYear()} MediSea</div>
            <div className="opacity-60">İç Hastalıkları Eğitim Platformu</div>
            <div className="md:ml-auto flex items-center gap-3">
              <Link href="/about" className="underline">Hakkında</Link>
              <Link href="/privacy" className="underline">Gizlilik</Link>
              <Link href="/contact" className="underline">İletişim</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



