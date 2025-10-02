﻿export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"title":"Genel Bakış","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/genel-bakis"},{"title":"Epidemiyoloji","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/epidemiyoloji"},{"title":"Patogenez / Fizyoloji","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/patogenez"},{"title":"Klinik Bulgular","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/klinik-bulgular"},{"title":"Sınıflama ve Tanı Kriterleri","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/siniflama-tani-kriterleri"},{"title":"Laboratuvar ve Görüntüleme","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/laboratuvar-goruntuleme"},{"title":"Ayırıcı Tanı","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/ayirici-tani"},{"title":"Tedavi Yaklaşımı","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/tedavi-yaklasimi"},{"title":"Komorbiditeler ve Komplikasyonlar","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/komorbidite-komplikasyon"},{"title":"Özel Durumlar","href":"/topics/gastroenteroloji/inflamatuar-bagirsak-hastaligi-ibd/ozel-durumlar"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">İnflamatuar Bağırsak Hastalığı (IBD) — Dizin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it:any) => (
          <Link key={it.href} href={it.href} className="block border rounded-xl p-4 hover:shadow">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm opacity-70">{it.href.split("/").slice(-1)[0]}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}