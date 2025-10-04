export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page(){
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Nekrotizan Otoimmün Miyopati (NAM)</h1>
      <p>
        NAM, yaygın kas lif nekrozu ve <b>minimal inflamasyon</b> ile karakterize; sıklıkla <b>anti-SRP</b> veya
        <b> anti-HMGCR</b> antikorlarıyla ilişkilidir (statin ilişkili olgular). CK çok yüksektir, güçsüzlük hızlı ilerleyebilir.
      </p>
      <h2>Tedavi</h2>
      <ul>
        <li>Yüksek doz glukokortikoid + erken IVIG</li>
        <li>Steroid-sparring: MMF/AZA; refrakterde rituksimab</li>
        <li>Statin ilişkiliyse statin kesilir; alternatif lipid düşürücüler değerlendirilir</li>
      </ul>
      <hr />
      <nav className="text-sm mt-6">
  Kardeş sayfalar:{" "}
  <Link className="underline" href="/topics/romatoloji/inflamatuvar-miyopatiler/polimiyozit">Polimiyozit</Link>{" • "}
  <Link className="underline" href="/topics/romatoloji/inflamatuvar-miyopatiler/dermatomiyozit">Dermatomiyozit</Link>{" • "}
  <Link className="underline" href="/topics/romatoloji/inflamatuvar-miyopatiler/nekrotizan-miyopati">Nekrotizan Otoimmün Miyopati</Link>{" • "}
  <Link className="underline" href="/topics/romatoloji/inflamatuvar-miyopatiler/ibm">İnklüzyon Cisimcikli Miyozit (IBM)</Link>
</nav>
      <p className="mt-6"><Link href="/topics/romatoloji" className="underline">← Romatoloji dizinine dön</Link></p>
      <section className="text-sm opacity-70 mt-6">📖 Kaynaklar: Harrison, UpToDate, EULAR/ACR Myositis, Cecil/Goldman, Oxford, Primer, Kelly’s, Firestein, NIH Myositis.</section>
    </article>
  );
}