"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import navConfig from "@/app/config/nav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showLogin, setShowLogin] = useState(false);
  const [openSections, setOpenSections] = useState(false);

  const loginRef = useRef<HTMLDivElement>(null);
  const sectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setShowLogin(false);
      if (sectRef.current && !sectRef.current.contains(e.target as Node)) setOpenSections(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-blue-600 text-white px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-lg whitespace-nowrap">Medknowledge</Link>

            {/* Bölümler menüsü */}
            <div className="relative" ref={sectRef}>
              <button
                onClick={() => setOpenSections(v => !v)}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                aria-haspopup="menu" aria-expanded={openSections}
              >
                Bölümler
              </button>
              {openSections && (
                <div
                  className="absolute left-0 mt-2 w-[280px] max-h-[60vh] overflow-auto rounded-lg bg-white text-black shadow-lg p-2 grid gap-1 z-50"
                  role="menu"
                >
                  {navConfig.sections.map(s => (
                    <Link key={s.href} href={s.href} className="px-3 py-2 rounded hover:bg-gray-100 text-sm">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Üst bağlantılar */}
            <nav className="hidden md:flex items-center gap-2">
              {navConfig.topNav
                .filter(i => i.label !== "Bölümler") // Bölümler butonunu yukarıda açılır menü olarak kullandık
                .map(item => (
                  <Link key={item.href} href={item.href} className="px-2 py-1 rounded hover:bg-white/20">
                    {item.label}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Right: Login */}
          <div className="relative" ref={loginRef}>
            <button
              onClick={() => setShowLogin(v => !v)}
              className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-gray-100"
            >
              Giriş / Kayıt
            </button>
            {showLogin && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-lg p-4 z-50">
                <form
                  className="space-y-3"
                  onSubmit={(e) => { e.preventDefault(); setShowLogin(false); }}
                >
                  <input type="email" placeholder="E-posta" className="w-full border px-2 py-2 rounded" required />
                  <input type="password" placeholder="Şifre" className="w-full border px-2 py-2 rounded" required />
                  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Giriş
                  </button>
                  <div className="text-xs text-center text-gray-500">
                    Hesabınız yok mu? <Link href="/register" className="underline">Kayıt ol</Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 p-6">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Medknowledge · İç Hastalıkları Eğitim Platformu
      </footer>
    </div>
  );
}
