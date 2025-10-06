export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Sistemik Lupus Eritematozus (SLE)</h1>
      <p className="text-sm opacity-70">Çok organlı, otoantikor aracılı sistemik otoimmün hastalık.</p>
<h2>Tanım</h2>
<ul><li>ANA pozitifliği yaygındır; anti-dsDNA/anti-Sm daha özgüldür.</li></ul>
<h2>Epidemiyoloji</h2>
<ul><li>Kadınlarda sık; doğurganlık çağında pik.</li></ul>
<h2>Klinik</h2>
<ul>
  <li>Cilt (malar döküntü), artrit, hematolojik sitopeniler.</li>
  <li>Nefrit, serozit, NÖSLE gibi ciddi tutulumlar.</li>
</ul>
<h2>Tanı</h2>
<ul>
  <li>2019 EULAR/ACR kriterleri: ANA ≥1:80 giriş kriteri + ek puanlar.</li>
  <li>Kompleman düşüklüğü (C3/C4), anti-dsDNA artışı aktivite göstergesi olabilir.</li>
</ul>
<h2>Tedavi</h2>
<ul>
  <li>Tüm hastalarda hidroksiklorokin (HKQ) temel.</li>
  <li>Organ tutulumuna göre steroid ± immünsüpresif (MMF, azatiyoprin, siklofosfamid).</li>
  <li>Biyolojik seçenekler: belimumab; dirençli nefritte ek protokoller.</li>
</ul>
<h2>İzlem</h2>
<ul><li>Aktivite, toksisite, enfeksiyon ve kardiyovasküler risk izlemi.</li></ul>

      <h2>Kaynaklar</h2>
      <ul className="text-sm">
        <li>Harrison’s Principles of Internal Medicine</li>
        <li>UpToDate (ilgili başlıklar)</li>
        <li>Goldman–Cecil Medicine</li>
        <li>Kelley & Firestein’s Textbook of Rheumatology</li>
        <li>EULAR / ACR kılavuzları</li>
        <li>NEJM / Lancet (review)</li>
        <li>StatPearls / Medscape</li>
      </ul>

      <ChildLinks appSubPath="topics/romatoloji/sistemik-lupus-eritematozus"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
