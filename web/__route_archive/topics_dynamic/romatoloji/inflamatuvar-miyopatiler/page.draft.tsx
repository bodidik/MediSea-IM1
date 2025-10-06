export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const SUBPAGES = [
  { href: "/topics/romatoloji/inflamatuvar-miyopatiler/polimiyozit", title: "Polimiyozit" },
  { href: "/topics/romatoloji/inflamatuvar-miyopatiler/dermatomiyozit", title: "Dermatomiyozit" },
  { href: "/topics/romatoloji/inflamatuvar-miyopatiler/nekrotizan-miyopati", title: "Nekrotizan Otoimmün Miyopati" },
  { href: "/topics/romatoloji/inflamatuvar-miyopatiler/ibm", title: "İnklüzyon Cisimcikli Miyozit (IBM)" }
];

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>İnflamatuvar Miyopatiler — Genel Bakış</h1>
      <p className="opacity-80">
        İskelet kasını tutan, immün-aracılı hastalık grubu: PM, DM, nekrotizan otoimmün miyopati ve IBM.
        Proksimal güçsüzlük, CK yüksekliği, EMG/MRG ve biyopsi ile tanı; otoantikor fenotipleme önemlidir.
      </p>

      <h2>Başlıca Alt Tipler (kısa)</h2>
      <ul>
        <li><b>Polimiyozit:</b> CD8+ sitotoksisite; endomisyumda T-hücreler.</li>
        <li><b>Dermatomiyozit:</b> Komplement aracılı mikroanjiyopati; perifasiküler atrofi; tip I IFN imzası.</li>
        <li><b>Nekrotizan:</b> Yaygın nekroz, minimal inflamasyon; anti-SRP/anti-HMGCR.</li>
        <li><b>IBM:</b> Distal ağırlıklı, yavaş ilerleyici; rimmed vacuoles; immünsüpresyona dirençli.</li>
      </ul>

      <h2>Tedavi Çerçevesi</h2>
      <ul>
        <li>İndüksiyon: sistemik GK; idame AZA/MTX/MMF.</li>
        <li>Refrakter: IVIG ± rituksimab (öz. DM/PM); IBM’de destek/rehab odaklı.</li>
        <li>ILD eşliği varsa erken ve yakın takip.</li>
      </ul>

      <hr />
      <h3>Alt Başlıklara Hızlı Erişim</h3>
      <ul className="list-disc pl-5 space-y-1">
        {SUBPAGES.map((it) => (
          <li key={it.href}><Link href={it.href} className="underline">{it.title}</Link></li>
        ))}
      </ul>

      <p className="text-xs opacity-70 mt-6">© 2025 MediSea</p>
      <p className="mt-6"><Link className="underline" href="/topics/romatoloji">← Romatoloji dizinine dön</Link></p>
      <section className="text-sm opacity-70 mt-6">📖 Kaynaklar: Harrison, Cecil/Goldman, UpToDate, EULAR/ACR Myositis, Oxford, Primer, Kelly’s, Firestein, NIH Myositis.</section>
    </article>
  );
}


