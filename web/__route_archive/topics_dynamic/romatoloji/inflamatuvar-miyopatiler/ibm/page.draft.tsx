export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page(){
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>İnklüzyon Cisimcikli Miyozit (IBM)</h1>
      <p>
        IBM, ileri yaşta başlayan, <b>distal &gt; proksimal</b> dağılım gösteren ve tedaviye genellikle dirençli,
        yavaş ilerleyen bir miyopatidir. <b>Parmak fleksörleri</b> ve <b>kuadriseps</b> belirgin etkilenir;
        düşme ve yürüme kaybı sık görülür. Biyopside <i>rimmed vacuoles</i> ve T-hücre infiltrasyonu tipiktir.
      </p>
      <h2>Yönetim</h2>
      <ul>
        <li>İmmünsüpresiflere yanıt sınırlıdır; <b>fizyoterapi</b>, yardımcı cihazlar, düşme önleme</li>
        <li>Disfaji yönetimi, beslenme desteği; araştırma protokolleri (ör. arimoclomol vb.)</li>
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


