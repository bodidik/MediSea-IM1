export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page(){
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Dermatomiyozit (DM)</h1>
      <p>
        DM, <b>komplement aracılı mikroanjiyopati</b> ve <b>tip I interferon</b> imzası ile ilişkili, <b>perifasiküler atrofi</b>nin
        ayırt edici olduğu miyopati alt tipidir. Heliotrop döküntü, Gottron papülleri ve foto-duyarlı lezyonlar tipiktir.
      </p>
      <h2>Malignite İlişkisi</h2>
      <p>
        Özellikle <b>anti-TIF1γ</b> ve <b>anti-NXP2</b> pozitif olgularda risk artar. Yaşa uygun ve hedeflenmiş
        tarama (akciğer BT, mamografi, pelvis US/BT, GİS taramaları) planlanmalıdır.
      </p>
      <h2>Tedavi</h2>
      <ul>
        <li>Glukokortikoid + steroid-sparring (AZA/MTX/MMF)</li>
        <li>Refrakter kutanöz/kas: IVIG, rituksimab</li>
        <li>Güneşten korunma, topikal tedaviler; disfaji varsa yutma terapisi</li>
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