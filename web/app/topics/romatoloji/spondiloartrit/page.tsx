export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Spondiloartrit (SpA)</h1>
      <p className="text-sm opacity-70">Aksiyal (AS) ve periferik alt tipleri olan, HLA-B27 ile ilişkili heterojen grup.</p>
<h2>Klinik</h2>
<ul>
  <li>İnflamatuvar bel ağrısı, entezit, sakroiliit; üveit/psöriyazis/İBH eşlik edebilir.</li>
</ul>
<h2>Tanı</h2>
<ul>
  <li>ASAS kriterleri; MRG ile erken sakroiliit; HLA-B27 destekleyici.</li>
</ul>
<h2>Tedavi</h2>
<ul>
  <li>Egzersiz/fizyoterapi temeldir; NSAİİ ilk basamak.</li>
  <li>Yetersizlikte anti-TNF veya IL-17 inhibitörleri; periferikte lokal steroid/ssDMARD.</li>
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

      <ChildLinks appSubPath="topics/romatoloji/spondiloartrit"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
