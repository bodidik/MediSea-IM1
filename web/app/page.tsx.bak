// FILE: web/app/page.tsx (minimal hero + kısayollar)
import Link from "next/link";
import navConfig from "@/app/config/nav";
import NavCard from "@/app/components/NavCard";

export const dynamic = "force-dynamic";

export default function Home() {
  // Ana ekran sade: yalnızca hero + bölümlere hızlı erişim
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* HERO */}
      <section className="rounded-3xl border p-6 md:p-10 bg-white">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-gray-500">Medknowledge</div>
            <h1 className="text-3xl md:text-5xl font-semibold mt-1">Klinik Bilgi · Hızlı · Mobil</h1>
            <p className="mt-3 text-gray-700 max-w-2xl">
              İç hastalıkları içerikleri tek çatı altında. Amacımız: aradığını 30 saniyede bul.
            </p>

            {/* Hızlı arama */}
            <form action="/topics" method="GET" className="mt-5 flex gap-2" role="search">
              <input
                name="q"
                placeholder="Ara: membranöz GN, KDIGO, vaskülit…"
                className="w-full px-4 py-3 rounded-xl border text-sm"
                aria-label="Hızlı arama"
              />
              <button className="px-4 py-3 rounded-xl border text-sm whitespace-nowrap">Ara</button>
            </form>

            {/* Tümü linki */}
            <div className="mt-3 text-sm">
              <Link href="/topics" className="underline">Tüm konular →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hızlı Kısayollar (Bölümler) */}
      <section id="sections" aria-labelledby="sections-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="sections-heading" className="text-xl md:text-2xl font-semibold">Bölümler</h2>
          <Link href="/sections" className="text-sm underline">Tümü →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {navConfig.sections.map((s) => (
            <NavCard key={s.href} href={s.href} title={s.label} description="İlgili konu listesine git" />
          ))}
        </div>
      </section>
    </div>
  );
}
