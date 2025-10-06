export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Romatoid Artrit (RA)</h1>
      <p className="text-sm opacity-70">
        Bu özet; Harrison’s, UpToDate, EULAR/ACR kılavuzları ve temel romatoloji kaynaklarına dayanmaktadır.
      </p>

      <h2>Tanım & Epidemiyoloji</h2>
      <ul>
        <li>Kronik, simetrik, eroziv inflamatuvar artrit; kadınlarda daha sık.</li>
        <li>Seropozitiflik: RF ve/veya anti-CCP sıklıkla pozitiftir.</li>
      </ul>

      <h2>Patogenez (kısa)</h2>
      <ul>
        <li>Sinovyal inflamasyon, pannus; sitokin ağı (TNF, IL-6, IL-1).</li>
        <li>Genetik yatkınlık (HLA-DRB1 “shared epitope”), çevresel tetikleyiciler.</li>
      </ul>

      <h2>Klinik</h2>
      <ul>
        <li>Simetrik küçük eklem tutulumu (MCP, PIP), sabah tutukluğu.</li>
        <li>Ekstraartiküler: nodüller, ILD, vaskülit, anemi vb.</li>
      </ul>

      <h2>Tanı (ACR/EULAR 2010)</h2>
      <ul>
        <li>Eklem sayısı + seroloji (RF/anti-CCP) + akut faz + semptom süresi.</li>
        <li>US/MRG erozivite ve sinovit için yardımcı.</li>
      </ul>

      <h2>Tedavi (özet)</h2>
      <ul>
        <li>Hedefe yönelik yaklaşım (T2T): düşük hastalık aktivitesi/remisyon.</li>
        <li>İlk basamak: csDMARD (metotreksat ± kısa süre steroid).</li>
        <li>Yetersizlikte: bDMARD (anti-TNF, IL-6R, abatasept) veya tsDMARD (JAK-i).</li>
        <li>Komorbiditeler ve enfeksiyon taraması (HBV, TB) kritik.</li>
      </ul>

      <h2>İzlem</h2>
      <ul>
        <li>DAS28/CDAI ile aktivite izlemi; ilaç toksisite izlemi (MTX: KC, hematoloji).</li>
      </ul>

      <ChildLinks appSubPath="topics/romatoloji/romatoid-artrit" premiumHref="/premium/ydus" premiumLabel="PREMİUM YDUS" />
    </main>
  );
}

