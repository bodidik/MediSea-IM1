import ChildLinks from "@/components/ChildLinks";
export const runtime = 'nodejs';
export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/genel-bakis","title":"Genel Bakış"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/epidemiyoloji","title":"Epidemiyoloji"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/patogenez","title":"Patogenez / İmmünoloji"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/klinik-bulgular","title":"Klinik Bulgular"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/siniflama-tani-kriterleri","title":"Sınıflama ve Tanı Kriterleri"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/laboratuvar-goruntuleme","title":"Laboratuvar ve Görüntüleme"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/ayirici-tani","title":"Ayırıcı Tanı"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/tedavi-yaklasimi","title":"Tedavi Yaklaşımı"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/komorbidite-komplikasyon","title":"Komorbiditeler ve Komplikasyonlar"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri/ozel-durumlar","title":"Özel Durumlar"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">B12/Folat Eksikliği Anemileri — Dizin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it:any) => (
          <Link key={it.href} href={it.href} className="block border rounded-xl p-4 hover:shadow">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm opacity-70">{it.href.split("/").slice(-1)[0]}</div>
          </Link>
        ))}
      </div>
      <ChildLinks appSubPath="topics/hematoloji/b12-folat-eksikligi-anemileri" />
</main>

  );
}



