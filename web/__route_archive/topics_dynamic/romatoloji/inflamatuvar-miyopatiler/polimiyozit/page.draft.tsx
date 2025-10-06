export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page(){
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Polimiyozit</h1>
      <p>
        Polimiyozit (PM), simetrik <b>proksimal kas güçsüzlüğü</b> ile seyreden, <b>CD8⁺ T-hücre aracılı</b>
        sitotoksisitenin öne çıktığı bir inflamatuvar miyopatidir. Endomisyumda MHC-I ekspresyonu artmış kas liflerine
        invazyon tipiktir. CK/aldolaz yüksekliği, miyopatik EMG ve kas MRG’sinde ödem eşlik eder.
      </p>
      <h2>Tanı ve Ayrım</h2>
      <p>
        Musküler distrofi, statin ilişkili miyopati ve <i>nekrotizan otoimmün miyopati</i> ayırıcı tanıda düşünülmelidir.
        <b>Anti-Jo-1</b> ve diğer antisentetaz antikorları eşlik edebilir (miyozit-ILD ilişkisi).
      </p>
      <h2>Tedavi</h2>
      <ul>
        <li>İndüksiyon: yüksek doz glukokortikoid</li>
        <li>İdame: azatiyoprin veya metotreksat; refrakterde MMF/IVIG ± rituksimab</li>
        <li>Eşlik eden ILD’de erken immünmodülasyon; pulmonoloji ile ortak izlem</li>
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


