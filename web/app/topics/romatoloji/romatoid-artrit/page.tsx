export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Romatoid Artrit (RA)</h1>
      <p className="text-sm opacity-70">Kronik, simetrik, eroziv sinovit; otoimmün mekanizmalar.</p>
<h2>Klinik</h2>
<ul><li>MCP/PIP tutulumu, sabah tutukluğu &gt;60 dk; ekstra-artiküler bulgular.</li></ul>
<h2>Tanı</h2>
<ul>
  <li>2010 ACR/EULAR; RF ve anti-CCP; CRP/ESR; US/MRG ile erken sinovit/erozyon.</li>
</ul>
<h2>Tedavi (Treat-to-Target)</h2>
<ul>
  <li>İlk sıra MTX (+ folat); kısa süre düşük-orta doz steroid köprü.</li>
  <li>Yetersizlikte biyolojik (anti-TNF, abatacept, tocilizumab, rituksimab) veya JAK inhibitörleri.</li>
</ul>
<h2>İzlem</h2>
<ul><li>DAS28 hedefi: remisyon/ düşük aktivite; toksisite/aşılar/osteoporoz.</li></ul>

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

      <ChildLinks appSubPath="topics/romatoloji/romatoid-artrit"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
