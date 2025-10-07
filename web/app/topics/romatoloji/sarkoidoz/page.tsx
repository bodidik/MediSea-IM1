export const revalidate = 7776000;
import ChildLinks from "@/components/ChildLinks";
export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Sarkoidoz</h1>
      <p><b>Sarkoidoz</b>, multisistem granülomatöz bir hastalıktır; en sık akciğer ve lenf nodlarını tutar. Etiyoloji bilinmez; Th1 hücre aracılı immün yanıtla karakterizedir.</p>

      <h2>Epidemiyoloji</h2>
      <ul>
        <li>Genç-orta yaş kadınlarda sık.</li>
        <li>Afrikan-Amerikan ve İskandinav kökenlilerde daha yaygın.</li>
      </ul>

      <h2>Klinik</h2>
      <ul>
        <li>En sık pulmoner: öksürük, dispne, bilateral hiler LAP, retikülonodüler infiltratlar.</li>
        <li>Cilt: eritema nodozum, lupus pernio.</li>
        <li>Göz: üveit, konjonktivit.</li>
        <li>Sistemik: ateş, yorgunluk, artralji.</li>
      </ul>

      <h2>Tanı</h2>
      <ul>
        <li>Klinik + radyolojik + histolojik (nonkazeifiye granülom).</li>
        <li>ACE yüksekliği, hiperkalsemi, negatif tüberküloz testleri.</li>
        <li>Ayırıcı tanı: tbc, fungal, berylliosis, lenfoma.</li>
      </ul>

      <h2>Tedavi</h2>
      <ul>
        <li>Semptomsuz olgular izlenebilir; %60 spontan remisyon.</li>
        <li>Steroid ilk basamak; dirençte metotreksat, azatiyoprin, infliksimab.</li>
      </ul>

      <ChildLinks appSubPath="topics/romatoloji/sarkoidoz"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}

