export const revalidate = 7776000;
import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Sjögren Hastalığı</h1>
      <p><b>Sjögren sendromu</b>, ekzokrin bezlerin otoimmün tutulumu sonucu gelişen, özellikle göz ve ağız kuruluğu ile seyreden kronik bir hastalıktır.</p>

      <h2>Epidemiyoloji & Etiyoloji</h2>
      <ul>
        <li>Kadınlarda erkeklere göre 9:1 oranında sık.</li>
        <li>Primer form veya diğer otoimmün hastalıklarla (özellikle RA, SLE) ilişkili sekonder form.</li>
      </ul>

      <h2>Klinik Özellikler</h2>
      <ul>
        <li><b>Göz</b>: Keratokonjunktivit sikka — yanma, kum hissi, kızarıklık.</li>
        <li><b>Ağız</b>: Ksserostomi — çiğneme/yutma güçlüğü, diş çürükleri, kandidiyazis.</li>
        <li>Ekstraglandüler: Artralji, Raynaud, interstisyel nefrit, pulmoner tutulum, nöropati, lenfoma riski.</li>
      </ul>

      <h2>Tanı</h2>
      <ul>
        <li>Anti-Ro/SSA, Anti-La/SSB antikorları pozitifliği.</li>
        <li>Schirmer testi, tükürük akımı ölçümü, minör tükrük bezi biyopsisi (lenfositik sialadenit).</li>
      </ul>

      <h2>Tedavi</h2>
      <ul>
        <li>Semptomatik: yapay gözyaşı, tükürük stimülanları (pilokarpin).</li>
        <li>Sistemik: hidroksiklorokin, düşük doz steroid, ağır tutulumda immünsüpresifler.</li>
      </ul>

      <ChildLinks appSubPath="topics/romatoloji/sjogrens-hastaligi"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
