export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Sistemik Skleroz (Skleroderma)</h1>

      <p>
        Sistemik skleroz (SSc), otoimmün, kronik ve ilerleyici seyreden,
        fibroblast aktivasyonu, yaygın doku fibrozisi, immün disregülasyon ve
        mikrovasküler hasar ile karakterize bir bağ dokusu hastalığıdır.
        Klinik spektrum, deri ile sınırlı tutulumlardan multiorgan fibrozise
        kadar geniştir.
      </p>

      <h2>Epidemiyoloji</h2>
      <p>
        Prevalansı 50–300/1.000.000 olup kadınlarda 4–6 kat daha sık görülür.
        Başlangıç yaşı genellikle 30–50 arasındadır. Etnik ve coğrafi farklılıklar
        prognoz ve klinik alt tipleri etkileyebilir.
      </p>

      <h2>Patogenez</h2>
      <ul>
        <li><b>Genetik:</b> HLA-DR, HLA-DQ varyantları</li>
        <li><b>İmmün:</b> Anti-centromere, anti-Scl-70 (topoizomeraz I), anti-RNA polimeraz III antikorları</li>
        <li><b>Vasküler:</b> Endotel hasarı, vazospazm, intimal proliferasyon</li>
        <li><b>Fibrozis:</b> TGF-β, PDGF aracılı aşırı fibroblast aktivasyonu</li>
      </ul>

      <h2>Klinik Özellikler</h2>
      <ul>
        <li><b>Deri:</b> Sklerodaktili, tuz-biber pigmentasyonu, dijital ülser</li>
        <li><b>Raynaud fenomeni:</b> Genellikle ilk bulgu</li>
        <li><b>Gastrointestinal:</b> Özofagus dismotilitesi, reflü, malabsorpsiyon</li>
        <li><b>Akciğer:</b> İnterstisyel akciğer hastalığı, pulmoner hipertansiyon</li>
        <li><b>Renal:</b> Skleroderma renal krizi (hipertansif acil, AKI)</li>
        <li><b>Kardiyak:</b> Fibrozis, aritmi, perikardiyal efüzyon</li>
      </ul>

      <h2>Klinik Alt Tipler</h2>
      <ol>
        <li><b>Diffüz kutanöz SSc:</b> Yaygın deri tutulumlu, erken viseral organ tutulum riski yüksek</li>
        <li><b>Limited kutanöz SSc (CREST):</b> Kalsinozis, Raynaud, özofagus dismotilitesi, sklerodaktili, telenjiektazi</li>
      </ol>

      <h2>Tanı</h2>
      <p>
        2013 ACR/EULAR sınıflama kriterleri kullanılır. ANA pozitifliği (%90),
        spesifik otoantikor profilleri ve klinik bulgularla tanı konur.
      </p>

      <h2>Tedavi</h2>
      <p>
        Hastalığın heterojenliği nedeniyle tedavi organ tutulumu bazlıdır:
      </p>
      <ul>
        <li>Raynaud ve dijital ülser: kalsiyum kanal blokerleri, endotelin reseptör antagonistleri, prostasiklin analogları</li>
        <li>İnterstisyel akciğer hastalığı: mikofenolat mofetil, siklofosfamid, nintedanib</li>
        <li>Pulmoner hipertansiyon: sildenafil, bosentan, prostasiklin analogları</li>
        <li>Renal kriz: ACE inhibitörleri (ilk tercih)</li>
        <li>Deri ve eklem: metotreksat, immünsüpresifler</li>
      </ul>

      <h2>Prognoz</h2>
      <p>
        Diffüz kutanöz tipte prognoz daha kötüdür. Akciğer ve kalp tutulumu
        mortalitenin ana belirleyicisidir. Pulmoner hipertansiyon ve renal kriz
        mortalite ile en yakından ilişkilidir.
      </p>

      <hr className="my-6" />
      <section className="text-sm opacity-70 mt-4">
        📖 Kaynaklar: Harrison, Cecil, UpToDate, EULAR, ACR, Kelly’s, Firestein,
        Dubois, Oxford, ACR Primer
      </section>

      <p className="mt-6">
        <Link href="/topics/romatoloji" className="underline">
          ← Romatoloji dizinine dön
        </Link>
      </p>
    </article>
  );
}