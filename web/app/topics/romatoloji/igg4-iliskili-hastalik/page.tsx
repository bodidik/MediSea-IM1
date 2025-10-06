export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>IgG4-İlişkili Hastalık</h1>
      <p className="text-sm opacity-70">Fibroinflamatuvar, çok organlı; serum IgG4 yüksekliği ve doku içinde IgG4+ plazma hücreleri ile karakterize.</p>
<h2>Klinik</h2>
<ul>
  <li>Pankreatit (AIP tip 1), sklerozan kolanjit, sialadenit/dakriyoadenit (Mikulicz), retroperitoneal fibrozis.</li>
</ul>
<h2>Tanı</h2>
<ul>
  <li>Serum IgG4 ↑ (spesifik değil); histoloji: storiform fibrozis, obliteratif flebit, IgG4+/IgG oranı ↑.</li>
</ul>
<h2>Tedavi</h2>
<ul>
  <li>İlk seçenek steroid; nüks/bağımlılıkta rituksimab veya immünsüpresif eklenebilir.</li>
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

      <ChildLinks appSubPath="topics/romatoloji/igg4-iliskili-hastalik"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
