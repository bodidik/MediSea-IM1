"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import navConfig from "@/app/config/nav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showLogin, setShowLogin] = useState(false);
  const [openSections, setOpenSections] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loginRef = useRef<HTMLDivElement>(null);
  const sectRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // dış tıklama ile kapat
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setShowLogin(false);
      if (sectRef.current && !sectRef.current.contains(e.target as Node)) setOpenSections(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // ESC ile kapat
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowLogin(false);
        setOpenSections(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // rota değişince menüleri kapat
  useEffect(() => {
    setShowLogin(false);
    setOpenSections(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER (sticky) */}
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            {/* mobile toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border hover:bg-gray-50"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menüyü Aç/Kapat"
            >
              {!mobileOpen ? (
                // hamburger
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
                </svg>
              ) : (
                // close
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M18.3 5.71L12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z" />
                </svg>
              )}
            </button>

            <Link href="/" className="font-bold text-lg whitespace-nowrap">
              MediSea
            </Link>

            {/* Bölümler menüsü (desktop) */}
            <div className="relative hidden md:block" ref={sectRef}>
              <button
                onClick={() => setOpenSections((v) => !v)}
                className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
                aria-haspopup="menu"
                aria-expanded={openSections}
              >
                Bölümler
              </button>
              {openSections && (
                <div
                  className="absolute left-0 mt-2 w-[700px] max-w-[95vw] max-h-[60vh] overflow-auto rounded-2xl bg-white text-black shadow-xl p-3 grid grid-cols-2 md:grid-cols-3 gap-2 z-50 border"
                  role="menu"
                >
                  {navConfig.sections.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="px-3 py-2 rounded-lg hover:bg-gray-50 text-sm border"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Üst bağlantılar (desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {navConfig.topNav
                .filter((i) => i.label !== "Bölümler")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-1.5 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Orta: arama (desktop) */}
          <div className="hidden md:block">
            <HeaderSearch />
          </div>

          {/* Right: Dil + Login (desktop) */}
          <div className="relative hidden md:flex items-center gap-2">
            <LangSwitch />
            <div className="relative" ref={loginRef}>
              <button
                onClick={() => setShowLogin((v) => !v)}
                className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
              >
                Giriş / Kayıt
              </button>
              {showLogin && <LoginPopover onClose={() => setShowLogin(false)} />}
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </header>

      {/* MAIN */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <div>© {new Date().getFullYear()} MediSea</div>
            <div className="opacity-60">İç Hastalıkları Eğitim Platformu</div>
            <div className="md:ml-auto flex items-center gap-3">
              <Link className="underline" href="/about">Hakkında</Link>
              <Link className="underline" href="/privacy">Gizlilik</Link>
              <Link className="underline" href="/contact">İletişim</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ========================= Parçalar ========================= */

function HeaderSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function go(e?: React.FormEvent) {
    e?.preventDefault();
    const qs = new URLSearchParams();
    if (q.trim()) qs.set("q", q.trim());
    router.push(`/topics?${qs.toString()}`);
  }

  return (
    <form onSubmit={go} className="w-[420px] max-w-[50vw]">
      <div className="w-full flex items-center gap-2 rounded-xl border px-3 py-2 bg-white">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: behçet, nefrit, KDIGO…"
          className="flex-1 outline-none text-sm bg-transparent"
          aria-label="Hızlı Arama"
        />
        <button type="submit" className="text-sm px-2 py-1 rounded-lg border hover:bg-gray-50">
          Ara
        </button>
      </div>
    </form>
  );
}

function LoginPopover({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-xl shadow-xl p-4 z-50 border">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onClose();
        }}
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
  );
}

function LangSwitch() {
  return (
    <div className="flex items-center gap-1">
      <Link href="/?lang=TR" className="text-xs px-2 py-1 rounded border hover:bg-gray-50">
        TR
      </Link>
      <Link href="/?lang=EN" className="text-xs px-2 py-1 rounded border hover:bg-gray-50">
        EN
      </Link>
    </div>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const [sectionsOpen, setSectionsOpen] = useState(false);

  return (
    <div className="md:hidden border-t bg-white">
      <div className="px-4 pt-3 pb-4 space-y-3">
        {/* Search mobile */}
        <MobileSearch onAfterSearch={onClose} />

        {/* Top links */}
        <div className="grid grid-cols-2 gap-2">
          {navConfig.topNav.map((item) =>
            item.label === "Bölümler" ? (
              <button
                key={item.label}
                onClick={() => setSectionsOpen((s) => !s)}
                className="px-3 py-2 rounded-lg border text-left"
              >
                Bölümler
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="px-3 py-2 rounded-lg border"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Sections accordion */}
        {sectionsOpen && (
          <div className="grid grid-cols-2 gap-2">
            {navConfig.sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={onClose}
                className="px-3 py-2 rounded-lg border"
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}

        {/* Auth & Lang */}
        <div className="flex items-center gap-2 pt-1">
          <LangSwitch />
          <div className="ml-auto flex items-center gap-2">
            <Link href="/login" onClick={onClose} className="text-sm px-3 py-2 rounded-lg border">
              Üye Giriş
            </Link>
            <Link href="/signup" onClick={onClose} className="text-sm px-3 py-2 rounded-lg border">
              Kayıt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSearch({ onAfterSearch }: { onAfterSearch: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function go(e?: React.FormEvent) {
    e?.preventDefault();
    const qs = new URLSearchParams();
    if (q.trim()) qs.set("q", q.trim());
    router.push(`/topics?${qs.toString()}`);
    onAfterSearch();
  }

  return (
    <form onSubmit={go} className="w-full">
      <div className="w-full flex items-center gap-2 rounded-xl border px-3 py-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: behçet, nefrit, KDIGO…"
          className="flex-1 outline-none text-sm bg-transparent"
          aria-label="Arama"
        />
        <button type="submit" className="text-sm px-2 py-1 rounded-lg border">
          Ara
        </button>
      </div>
    </form>
  );
}
