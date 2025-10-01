export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const PAGES = [{"href":"/topics/behcet/behcet-disbiyoz","title":"Behçet hastalığı ve disbiyoz ilişkisi"},{"href":"/topics/behcet/behcet-mikroorganizmalar","title":"BH ve mikroorganizmalar (tetikleyiciler)"},{"href":"/topics/behcet/mikrobiyota-modulasyon","title":"Mikrobiyota modülasyonu: probiyotik/prebiyotik"},{"href":"/topics/behcet/oral-ulserler","title":"Oral ülserler: patogenez ve yönetim"},{"href":"/topics/behcet/uveit","title":"Göz tutulumu (üveit): tanı ve tedavi"},{"href":"/topics/behcet/vaskuler-tutulum","title":"Vasküler tutulum: tromboz/anevrizma"},{"href":"/topics/behcet/neuro-behcet","title":"Nöro-Behçet: klinik spektrum ve görüntüleme"},{"href":"/topics/behcet/mukokutanoz","title":"Muko-kutanöz bulgular ve algoritma"},{"href":"/topics/behcet/gebelik","title":"Gebelik ve Behçet: ilaç güvenliği/izlem"},{"href":"/topics/behcet/tedavi","title":"Tedavi: kolşisin, anti-TNF, apremilast, yeni ajanlar"}];

export default function BehcetIndex() {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Behçet Hastalığı — Çalışma Alanı</h1>
        <p className="text-gray-600 mt-2">Aşağıdaki placeholder sayfalarda taslak içerik üretip sonradan dolduracağız.</p>
      </header>

      <ul className="list-disc pl-5 space-y-1">
        {PAGES.map(item => (
          <li key={item.href}>
            <Link href={item.href} className="underline">{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
