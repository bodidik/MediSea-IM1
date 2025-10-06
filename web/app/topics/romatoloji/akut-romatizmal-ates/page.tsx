export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Akut Romatizmal Ateş (ARA)</h1>
      <p className="text-sm opacity-70">A grubu beta hemolitik streptokok farenjiti sonrası gelişen, immün aracılı multisistem hastalık.</p>
<h2>Tanı (Jones Kriterleri)</h2>
<ul>
  <li>Büyük: kardit, gezici poliartrit, korea, eritema marginatum, subkutan nodül.</li>
  <li>Küçük: artralji, ateş, ↑ESR/CRP, PR uzaması; + kanıtlanmış streptokok enfeksiyonu.</li>
</ul>
<h2>Tedavi</h2>
<ul>
  <li>Penisilin (akut tedavi ve sekonder profilaksi), NSAİİ; karditte steroid/diğer destek.</li>
</ul>
<h2>İzlem</h2>
<ul><li>Uzun süreli benzatin penisilin profilaksisi; kapak tutulumunun takibi.</li></ul>

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

      <ChildLinks appSubPath="topics/romatoloji/akut-romatizmal-ates"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
