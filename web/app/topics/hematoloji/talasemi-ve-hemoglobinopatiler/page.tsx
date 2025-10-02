﻿export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/genel-bakis","title":"Genel Bakış"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/epidemiyoloji","title":"Epidemiyoloji"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/patogenez","title":"Patogenez / İmmünoloji"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/klinik-bulgular","title":"Klinik Bulgular"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/siniflama-tani-kriterleri","title":"Sınıflama ve Tanı Kriterleri"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/laboratuvar-goruntuleme","title":"Laboratuvar ve Görüntüleme"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/ayirici-tani","title":"Ayırıcı Tanı"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/tedavi-yaklasimi","title":"Tedavi Yaklaşımı"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/komorbidite-komplikasyon","title":"Komorbiditeler ve Komplikasyonlar"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler/ozel-durumlar","title":"Özel Durumlar"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Talasemi ve Hemoglobinopatiler — Dizin</h1>
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