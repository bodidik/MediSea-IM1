export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Ailevi Akdeniz Ateşi (FMF) ve Otoinflamatuvar Hast.</h1>
      <p className="text-sm opacity-70">MEFV mutasyonları ile ilişkili, tekrarlayan ateş ve serözit atakları; otoinflamatuvar spektrum.</p>
<h2>Klinik</h2>
<ul>
  <li>Peritonit benzeri karın ağrısı, plörit, artrit; ataklar 1–3 gün sürer.</li>
</ul>
<h2>Komplikasyon</h2>
<ul><li>AA amiloidoz riski.</li></ul>
<h2>Tedavi</h2>
<ul>
  <li>Kolşisin (atak ve amiloidoz önleme); direnç/ intoleransta IL-1 inhibitörleri.</li>
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

      <ChildLinks appSubPath="topics/romatoloji/ailevi-akdeniz-atesi-otoenflamatuvar"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
