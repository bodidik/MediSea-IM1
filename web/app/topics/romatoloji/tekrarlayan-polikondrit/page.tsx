export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Tekrarlayan Polikondrit</h1>
      <p className="text-sm opacity-70">Kıkırdak dokusunun tekrarlayan inflamasyonu: kulak, burun, larenks/ trakea, kostal kıkırdaklar.</p>
<h2>Klinik</h2>
<ul>
  <li>Ağrılı kızarık kulak kepçesi (lob sparing), nazal kıkırdak, kondrosternal ağrı.</li>
  <li>Havayolu tutulumunda stridor, kollaps riski.</li>
</ul>
<h2>Tanı</h2>
<ul>
  <li>Klinik ön planda; destek: MRG/US; histoloji gerekebilir.</li>
</ul>
<h2>Tedavi</h2>
<ul>
  <li>NSAİİ, steroid; orta-ağırda MTX/azatiyoprin; refrakterde biyolojik (anti-TNF) seçenekleri.</li>
</ul>

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

      <ChildLinks appSubPath="topics/romatoloji/tekrarlayan-polikondrit"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
