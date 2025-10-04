export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const related = [{"href":"/topics/romatoloji/behcet/behcet-disbiyoz","title":"Behçet hastalığı ve disbiyoz ilişkisi"},{"href":"/topics/romatoloji/behcet/behcet-mikroorganizmalar","title":"BH ve mikroorganizmalar (tetikleyiciler)"},{"href":"/topics/romatoloji/behcet/mikrobiyota-modulasyon","title":"Mikrobiyota modülasyonu: probiyotik/prebiyotik"},{"href":"/topics/romatoloji/behcet/oral-ulserler","title":"Oral ülserler: patogenez ve yönetim"},{"href":"/topics/romatoloji/behcet/uveit","title":"Göz tutulumu (üveit): tanı ve tedavi"},{"href":"/topics/romatoloji/behcet/vaskuler-tutulum","title":"Vasküler tutulum: tromboz/anevrizma"},{"href":"/topics/romatoloji/behcet/neuro-behcet","title":"Nöro-Behçet: klinik spektrum ve görüntüleme"},{"href":"/topics/romatoloji/behcet/mukokutanoz","title":"Muko-kutanöz bulgular ve algoritma"},{"href":"/topics/romatoloji/behcet/gebelik","title":"Gebelik ve Behçet: ilaç güvenliği/izlem"},{"href":"/topics/romatoloji/behcet/tedavi","title":"Tedavi: kolşisin, anti-TNF, apremilast, yeni ajanlar"}];

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Gastroenterolojik Tutulum</h1>
      <p className="opacity-70">Bu sayfa placeholder’dır. İçerik eklenecektir.</p>

      <hr className="my-6" />
      <h2 className="text-lg font-semibold">Diğer Behçet Başlıkları</h2>
      <ul className="list-disc pl-6 space-y-1">
        {related.map((it:any) => (
          <li key={it.href}>
            <Link href={it.href} className="underline">{it.title}</Link>
          </li>
        ))}
      </ul>

      <p className="mt-6">
        <Link className="underline" href="/topics/romatoloji/behcet">← Behçet ön sayfa</Link>
      </p>
    <hr className="my-6" />
<section className="text-sm opacity-70 mt-4">
  📖 Kaynaklar: Harrison, Cecil, UpToDate, EULAR, ACR, Kelly’s, Firestein, Dubois, Oxford, ACR Primer
</section>
</article>
  );
}