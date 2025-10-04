export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Romatoid Artrit (RA)</h1>

      <p>
        Romatoid artrit (RA), kronik, sistemik ve otoimmün karakterde seyreden,
        başlıca sinovyal eklemleri tutan, ilerleyici eklem hasarı ve fonksiyon
        kaybıyla seyreden bir hastalıktır. Prevalansı %0.5–1 arasındadır ve
        kadınlarda erkeklerden 2–3 kat daha sık görülür. Tipik başlangıç yaşı
        30–50 arasındadır.
      </p>

      <h2>Patogenez</h2>
      <p>
        RA gelişiminde genetik yatkınlık (HLA-DR4, DR1), çevresel faktörler
        (sigara, periodontal hastalık, mikrobiyom) ve immünolojik mekanizmalar
        etkilidir. Antijen sunumu, CD4+ T hücre aktivasyonu, B hücrelerinden
        RF/anti-CCP üretimi ve proinflamatuar sitokinler (TNF-α, IL-6, IL-1)
        sinovyal proliferasyon ve pannus oluşumuna yol açar.
      </p>

      <h2>Klinik Özellikler</h2>
      <ul>
        <li>Simetrik poliartrit (MCP, PIP, el bileği, MTP)</li>
        <li>Sabah tutukluğu (≥1 saat)</li>
        <li>Ekstraartiküler bulgular: nodül, vaskülit, interstisyel akciğer hastalığı, göz tutulumu</li>
      </ul>

      <h2>Tanı Kriterleri</h2>
      <p>
        2010 ACR/EULAR kriterleri kullanılır. Anti-CCP ve RF pozitifliği, akut
        faz reaktanları (ESR, CRP), klinik eklem tutulumu ve semptom süresi
        değerlendirilir.
      </p>

      <h2>Tedavi</h2>
      <p>
        RA tedavisi “treat-to-target” stratejisine dayanır. Amaç remisyon veya
        düşük hastalık aktivitesi elde etmektir. Tedavi basamakları:
      </p>
      <ol>
        <li>Konvansiyonel DMARD’lar: metotreksat (ilk tercih), leflunomid, sulfasalazin, hidroksiklorokin</li>
        <li>Biyolojik DMARD’lar: TNF inhibitörleri, abatacept, tocilizumab, rituksimab</li>
        <li>Hedefe yönelik sentetik DMARD’lar: JAK inhibitörleri (tofacitinib, baricitinib)</li>
      </ol>

      <h2>Komplikasyonlar</h2>
      <p>
        Kardiyovasküler hastalıklar, akciğer tutulumları, lenfoma riskinde artış
        ve ilaç toksisiteleri önemli morbidite nedenleridir.
      </p>

      <hr className="my-6" />
      <section className="text-sm opacity-70 mt-4">
        📖 Kaynaklar: Harrison, Cecil, UpToDate, EULAR, ACR, Kelly’s,
        Firestein, Dubois, Oxford, ACR Primer
      </section>

      <p className="mt-6">
        <Link href="/topics/romatoloji" className="underline">
          ← Romatoloji dizinine dön
        </Link>
      </p>
    </article>
  );
}