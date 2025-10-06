export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const SUBPAGES = [
  { href: "/topics/romatoloji/behcet/behcet-disbiyoz",           title: "Behçet hastalığı ve disbiyoz ilişkisi" },
  { href: "/topics/romatoloji/behcet/behcet-mikroorganizmalar",  title: "BH ve mikroorganizmalar (tetikleyiciler)" },
  { href: "/topics/romatoloji/behcet/mikrobiyota-modulasyon",    title: "Mikrobiyota modülasyonu: probiyotik/prebiyotik" },
  { href: "/topics/romatoloji/behcet/oral-ulserler",             title: "Oral ülserler: patogenez ve yönetim" },
  { href: "/topics/romatoloji/behcet/uveit",                     title: "Göz tutulumu (üveit): tanı ve tedavi" },
  { href: "/topics/romatoloji/behcet/vaskuler-tutulum",          title: "Vasküler tutulum: tromboz/anevrizma" },
  { href: "/topics/romatoloji/behcet/neuro-behcet",              title: "Nöro-Behçet: klinik spektrum ve görüntüleme" },
  { href: "/topics/romatoloji/behcet/mukokutanoz",               title: "Muko-kutanöz bulgular ve algoritma" },
  { href: "/topics/romatoloji/behcet/gebelik",                   title: "Gebelik ve Behçet: ilaç güvenliği/izlem" },
  { href: "/topics/romatoloji/behcet/tedavi",                    title: "Tedavi: kolşisin, anti-TNF, apremilast, yeni ajanlar" },
  { href: "/topics/romatoloji/behcet/gastroenterolojik-tutulum", title: "Gastroenterolojik Tutulum" }
];

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <header className="mb-4">
        <h1>Behçet Hastalığı — Giriş ve Genel Bakış</h1>
        <p className="opacity-70">
          Çok sistemli, alevlenme-remisyon paternli bir vaskülit; nötrofil aracılı inflamasyon, Th1/Th17 yanıtı ve
          mikrovasküler hasarla seyreder. HLA-B*51 ile ilişki, mukozal bariyer bozukluğu ve dizbiyoz tetikleyicidir.
        </p>
      </header>

      <section className="space-y-4">
        <h2>Tanım ve Epidemiyoloji</h2>
        <p>
          Tekrarlayan oral/genital ülserler, oküler inflamasyon ve kutanöz bulgularla karakterizedir. “İpek Yolu” kuşağında daha sık,
          erkeklerde daha şiddetlidir.
        </p>

        <h2>Patogenez (Özet)</h2>
        <p>
          Mikrobiyota kaynaklı PAMP’ların TLR aktivasyonu → IL-1/IL-6/TNF aksı; Th1/Th17 yanıtı; NETosis ile damar duvarı hasarı ve tromboz eğilimi.
        </p>

        <h2>Klinik Spektrum (Özet)</h2>
        <ul>
          <li>Mukokutanöz: tekrarlayan oral/genital ülser, paterji, papülopüstüler lezyon.</li>
          <li>Oküler: panuveit, retina vasküliti — acil immünsupresyon.</li>
          <li>Vasküler: DVT, yüzeyel tromboflebit, majör arter anevrizmaları.</li>
          <li>Nöro-Behçet: parankimal ve non-parankimal ayrımı.</li>
          <li>GİS: ileoçekal ülserler; Crohn benzeri patern.</li>
          <li>Eklem: non-eroziv oligoartrit, entezit/sakroiliit eşlik edebilir.</li>
        </ul>

        <h2>Yönetim İlkeleri</h2>
        <ul>
          <li>Mukokutanöz: kolşisin ± topikaller; dirençte apremilast/immünmod.</li>
          <li>Oküler: yüksek doz steroid + anti-TNF (infliximab/adalimumab) öncelikli.</li>
          <li>Vasküler: venöz olayda immünsüpresyon esastır; arter anevrizmada anti-TNF + cerrahi/EVAR değerlendirilir.</li>
          <li>Nöro-Behçet: IV MP → AZA/SYKF ± anti-TNF; SSST’de antikoagülasyon + inflamasyon kontrolü.</li>
          <li>GİS: orta-ağırda steroid + anti-TNF; seçilmişte talidomid/vedolizumab.</li>
        </ul>

        <hr />
        <h3>Alt Başlıklara Hızlı Erişim</h3>
        <ul className="list-disc pl-5 space-y-1">
          {SUBPAGES.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="underline">{it.title}</Link>
            </li>
          ))}
        </ul>

        <p className="text-xs opacity-70 mt-6">© 2025 MediSea</p>

        <p className="mt-6">
          <Link className="underline" href="/topics/romatoloji">← Romatoloji dizinine dön</Link>
        </p>

        <section className="text-sm opacity-70 mt-6">
          📖 Kaynaklar: Harrison, Cecil/Goldman, UpToDate, EULAR/ACR Behçet rehberleri, Oxford, ACR Primer.
        </section>
      </section>
    </article>
  );
}


