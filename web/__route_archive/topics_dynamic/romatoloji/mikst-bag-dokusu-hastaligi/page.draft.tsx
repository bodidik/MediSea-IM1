export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Mikst Bağ Dokusu Hastalığı (MCTD)</h1>

      <p>
        Mikst Bağ Dokusu Hastalığı (MCTD), yüksek titreli anti-U1 RNP antikorları ile
        tanımlanan, sistemik lupus eritematozus (SLE), sistemik skleroz (SSc) ve
        polimiyozit/dermatomiyozit (PM/DM) bulgularını değişken oranlarda bir arada
        sergileyen bir otoimmün bağ dokusu hastalığıdır. Klinik spektrumda Raynaud
        fenomeni, şiş puffy eller, artrit/artralji, myozit bulguları, özofageal
        dismotilite ve akciğer tutulumları (özellikle pulmoner hipertansiyon ve/veya
        interstisyel akciğer hastalığı; İAH) öne çıkar.
      </p>

      <h2>Epidemiyoloji ve Doğal Seyir</h2>
      <p>
        Nadir görülür; kadınlarda daha sık ve genellikle 20–40 yaş aralığında başlar.
        Hastalık seyri dalgalıdır; bir kısım olguda zamanla SLE/SSc/PM fenotiplerinden
        birine evrilme (fenotipik kayma) gözlenebilir. Uzun dönem prognozu en çok akciğer
        tutulumu ve pulmoner hipertansiyon varlığı belirler.
      </p>

      <h2>Patogenez ve İmmünoloji</h2>
      <ul>
        <li><b>Genetik/İmmün:</b> HLA ilişkileri bildirilmiştir. Anti-U1 RNP antikorları yüksek ve özgün seyir belirtecidir.</li>
        <li><b>İnflamasyon-Fibrozis Ekseni:</b> Endotelyal disfonksiyon, vazospazm, mikroanjiyopati ve fibroblast aktivasyonu klinik tabloyu şekillendirir.</li>
        <li><b>Çevresel Tetikleyiciler:</b> Viral enfeksiyonlar, sigara, silika vb. predisposisyonu klinikleştirir (kanıt düzeyi değişken).</li>
      </ul>

      <h2>Klinik Bulgular</h2>
      <ul>
        <li><b>Vasküler:</b> Raynaud fenomeni; kapillaroskopide megakapiller/telenjiektazi.</li>
        <li><b>Kas-İskelet:</b> Simetrik non-eroziv artrit/artralji; miyalji veya proksimal kas güçsüzlüğü.</li>
        <li><b>Deri:</b> Puffy eller, sklerodaktili benzeri sıkılaşma, telenjiektazi.</li>
        <li><b>Gastrointestinal:</b> Özofagus dismotilitesi, reflü; ince bağırsak dismotilitesi nadiren.</li>
        <li><b>Akciğer:</b> İAH (NSIP patern sık), pulmoner hipertansiyon (PH) majör morbidite.</li>
        <li><b>Kardiyak:</b> Perikardit, aritmi; PH’a sekonder sağ kalp yüklenmesi.</li>
        <li><b>Böbrek/Nöro:</b> Genellikle hafif; belirgin nefrit nadirdir (SLE’den ayrımda yardımcı).</li>
      </ul>

      <h2>Laboratuvar ve Seroloji</h2>
      <ul>
        <li><b>Seroloji:</b> ANA pozitifliği; <b>yüksek titre anti-U1 RNP</b> belirleyici.</li>
        <li>Komplementler genellikle normal ya da hafif düşük; anti-dsDNA tipik olarak negatif veya düşük.</li>
        <li>Kas enzimleri (CK/aldolaz) myozit eşlik ediyorsa yükselir; inflamatuvar belirteçler orta düzeyde yükselebilir.</li>
      </ul>

      <h2>Sınıflama/Tanı Kriterleri</h2>
      <p>
        En sık kullanılan setler <b>Alarcón-Segovia</b> ve <b>Kasukawa</b> kriterleridir. Ortak payda:
        (1) yüksek titre anti-U1 RNP varlığı ve (2) SLE/SSc/PM klinik kümelerinden yeterli sayıda bulgunun birlikteliğidir.
        Uygulamada SLE (2019 EULAR/ACR), SSc (2013 ACR/EULAR) ve PM/DM (EULAR/ACR) kriterleri ile çakışan özellikler ayrıca not edilir.
      </p>

      <h2>Ayrıcı Tanı</h2>
      <ul>
        <li>SLE (anti-dsDNA/anti-Sm, aktif nefrit eğilimi, düşük kompleman)</li>
        <li>Sistemik skleroz (anti-centromere/anti-Scl-70, belirgin cilt sertleşmesi, PH/İAH paterni)</li>
        <li>PM/DM (belirgin kas güçsüzlüğü, EMG/MRG ve biyopsi ile myozit doğrulaması)</li>
        <li>İlaç/İndüklenmiş sendromlar, diğer otoimmün bağ dokusu hastalıkları</li>
      </ul>

      <h2>Değerlendirme ve İzlem</h2>
      <ul>
        <li><b>Akciğer:</b> PFT (DLCO dahil), Yüksek çözünürlüklü BT; PH için ekokardiyografi ± sağ kalp kateterizasyonu.</li>
        <li><b>Kas:</b> CK/aldolaz, güç değerlendirmesi; EMG/MRG ve gerekirse biyopsi.</li>
        <li><b>Vasküler:</b> Dijital ülser/iskemi takibi; kapillaroskopi.</li>
        <li><b>GİS:</b> Özofageal manometri/özofagografi gerektiğinde.</li>
      </ul>

      <h2>Tedavi (Organ/Tutulum Temelli)</h2>
      <ul>
        <li><b>Raynaud/dijital ülser:</b> KKB (nifedipin), PDE5 inhibitörleri, endotelin reseptör antagonistleri, prostasiklin analogları, ısı/sigara bırakma.</li>
        <li><b>İAH:</b> Mikofenolat mofetil (ilk seçenek), siklofosfamid; antifibrotik (nintedanib) seçilmiş olgularda.</li>
        <li><b>Pulmoner hipertansiyon:</b> PDE5i, ERA, prostasiklin analogları; multidisipliner PH yönetimi.</li>
        <li><b>Artrit:</b> NSAİİ/kısa süreli düşük-orta doz GK; hidroksiklorokin; metotreksat (akciğer/PH yoksa dikkatle).</li>
        <li><b>Myozit:</b> GK + steroid-sparing (MMF, azatiyoprin); dirençli olguda IVIG/rituksimab seçilmiş durumlarda.</li>
        <li><b>GİS reflü/dismotilite:</b> PPI, prokinetikler; aspirasyon riskine karşı önlemler.</li>
      </ul>

      <h2>Prognoz ve Komplikasyonlar</h2>
      <p>
        Uzun dönem sağkalımı belirleyen ana faktörler PH ve İAH’dır. Dijital ülserler infeksiyon ve
        amputasyon riski taşır. Osteoporoz, enfeksiyon ve KV risk yönetimi eşlik eden komorbiditelerle birlikte
        planlanmalıdır. Gebelik planlayanlarda hastalık aktivitesi düşükken multidisipliner yaklaşım gerekir.
      </p>

      <hr className="my-6" />
      <section className="text-sm opacity-70 mt-4">
        📖 Kaynaklar: Harrison, Cecil/Goldman, UpToDate, EULAR/ACR rehberleri, Kelly’s, Firestein, Dubois, Oxford, ACR Primer.
      </section>

      <p className="mt-6">
        <Link href="/topics/romatoloji" className="underline">← Romatoloji dizinine dön</Link>
      </p>
    </article>
  );
}


