export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Sistemik Lupus Eritematozus (SLE)</h1>

      <p className="opacity-70">
        Sistemik lupus eritematozus (SLE), genetik yatkınlığı olan bireylerde çevresel ve immünolojik faktörlerin etkileşimi sonucu ortaya çıkan, multisistemik tutulum gösterebilen, kronik otoimmün bir bağ dokusu hastalığıdır. Hastalık spektrumu asemptomatik otoantikor pozitifliğinden yaşamı tehdit eden organ tutulumlarına kadar geniştir.
      </p>

      <h2>Tanım ve Genel Özellikler</h2>
      <p>
        SLE; nükleer antijenlere karşı gelişen otoantikorların, immün komplekslerin ve kompleman aktivasyonunun rol aldığı, sistemik inflamatuvar bir hastalıktır. Kadınlarda, özellikle doğurganlık çağında, erkeklere kıyasla 9:1 oranında daha sık görülür. Klinik seyri dalgalı olup atak ve remisyonlarla karakterizedir.
      </p>

      <h2>Epidemiyoloji</h2>
      <ul>
        <li>Prevalans: 20–150/100.000 (etnik gruba göre değişken).</li>
        <li>Kadınlarda erkeklere göre 8–9 kat daha sık.</li>
        <li>Siyahi, Asya ve Hispanik popülasyonlarda daha ağır seyirli.</li>
        <li>Başlangıç yaşı en sık 15–40.</li>
      </ul>

      <h2>Patogenez</h2>
      <ul>
        <li><strong>Genetik:</strong> HLA-DR2/DR3, kompleman eksiklikleri (C1q, C4), IRF5, STAT4 polimorfizmleri.</li>
        <li><strong>Çevresel:</strong> UV ışınları, EBV, sigara, bazı ilaçlar (hidralazin, prokainamid).</li>
        <li><strong>İmmünolojik:</strong> Dendritik hücrelerin IFN-α üretimi, B-hücre hiperaktivasyonu, NETosis.</li>
        <li><strong>Hormonlar:</strong> Östrojen aracılı T/B hücre regülasyonu.</li>
      </ul>

      <h2>Klinik Özellikler</h2>
      <ul>
        <li><strong>Kutanöz:</strong> Malar döküntü (kelebek), diskoid lezyonlar, fotosensitivite, alopesi.</li>
        <li><strong>Muskuloskeletal:</strong> Non-eroziv artrit, artralji, miyalji.</li>
        <li><strong>Hematolojik:</strong> Anemi, lökopeni, trombositopeni.</li>
        <li><strong>Renal:</strong> Lupus nefriti (sınıflar I–VI; diffüz proliferatif nefrit prognoz açısından en kötü).</li>
        <li><strong>Nörolojik:</strong> Konvülziyon, psikoz, kognitif disfonksiyon, inme.</li>
        <li><strong>Kardiyopulmoner:</strong> Serözit, pulmoner hipertansiyon, Libman–Sacks endokarditi.</li>
      </ul>

      <h2>Tedavi</h2>
      <ul>
        <li>Hidroksiklorokin (tüm hastalarda).</li>
        <li>Steroidler (atak kontrolü, düşük doz idame).</li>
        <li>Mikofenolat mofetil ve siklofosfamid (nefrit).</li>
        <li>Azatioprin, metotreksat (idame).</li>
        <li>Belimumab, rituksimab, anifrolumab (biyolojik tedaviler).</li>
      </ul>

      <h2>Prognoz</h2>
      <p>
        1950’lerde 5 yıllık sağkalım %50 iken, günümüzde immünosupresifler ve erken tanı sayesinde %90’ın üzerindedir.
      </p>

      <hr className="my-6" />
      <section className="text-sm opacity-70 mt-4">
        📖 Kaynaklar: Harrison, Cecil, UpToDate, EULAR, ACR, Kelly’s, Firestein, Dubois, Oxford, ACR Primer
      </section>

      <p className="mt-6">
        <Link href="/topics/romatoloji" className="underline">← Romatoloji dizinine dön</Link>
      </p>
    </article>
  );
}
