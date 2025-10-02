﻿export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/genel-bakis","title":"Genel Bakış"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/epidemiyoloji","title":"Epidemiyoloji"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/patogenez","title":"Patogenez / Fizyoloji"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/klinik-bulgular","title":"Klinik Bulgular"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/siniflama-tani-kriterleri","title":"Sınıflama ve Tanı Kriterleri"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/laboratuvar-goruntuleme","title":"Laboratuvar ve Görüntüleme"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/ayirici-tani","title":"Ayırıcı Tanı"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/tedavi-yaklasimi","title":"Tedavi Yaklaşımı"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/komorbidite-komplikasyon","title":"Komorbiditeler ve Komplikasyonlar"},{"href":"/topics/nefroloji/akut-bobrek-hasari-aki/ozel-durumlar","title":"Özel Durumlar"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Akut Böbrek Hasarı (AKI) — Dizin</h1>
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