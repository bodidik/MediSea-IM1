export const runtime = "nodejs";
export const revalidate = 7776000;

import ChildLinks from "@/components/ChildLinks";

export default function Page() {
  return (
    <main className="prose max-w-3xl px-4 py-8">
      <h1>Gut ve Diğer Kristal Artropatileri</h1>
      <p className="text-sm opacity-70">
        Monosodyum ürat (MSU) kristallerine bağlı <b>gut</b> en sık kristal artropatidir; diğerleri kalsiyum pirofosfat
        dihidrat (<b>CPPD / psödogut</b>) ve <b>hidroksiapatit</b> birikimleridir.
      </p>

      <h2>Tanım</h2>
      <ul>
        <li><b>Gut</b>: Hiperürisemi zemininde eklemde MSU kristal birikimi → inflamatuvar artrit, tofüs, nefropati.</li>
        <li><b>CPPD</b>: Kondrokalsinozis ile ilişkili; diz, el bileği sık. Akut “psödogut” atağı yapabilir.</li>
        <li><b>Hidroksiapatit</b>: Özellikle omuzda kalsifik tendinit/Periartirit; akut ağrı ve hareket kısıtlılığı.</li>
      </ul>

      <h2>Epidemiyoloji & Risk</h2>
      <ul>
        <li>Gut erkeklerde sık; ileri yaşta artar. Diyüretikler, alkol (özellikle bira), fruktoz, obezite, KBH risk.</li>
        <li>CPPD: İleri yaş, osteoartrit, hemokromatozis, hiperparatiroidi, hipomagnezemi ile ilişkili.</li>
      </ul>

      <h2>Klinik</h2>
      <ul>
        <li><b>Gut atağı</b>: Ani, gece başlayan şiddetli monoartrit; en sık MTP-1 (podagra), ayak bileği, diz.</li>
        <li><b>Kronik gut</b>: Tofüsler, erozif değişiklikler; araya giren asemptomatik dönemler kısalır.</li>
        <li><b>CPPD</b>: Akut psödogut (diz/el bileği), subakut/poliartrit; OA benzeri tabloyu alevlendirebilir.</li>
      </ul>

      <h2>Tanı</h2>
      <ul>
        <li><b>Altın standart</b>: Eklem aspiratında polarize mikroskopide <b>iğne şekilli, negatif çift kırılmalı</b> MSU kristalleri.</li>
        <li>CPPD’de <b>romboid, pozitif çift kırılmalı</b> kristaller; radyografide kondrokalsinozis.</li>
        <li>Serum ürik asidi atakta normal olabilir; klinik tek başına tanı koydurmaz.</li>
        <li>Ayrıcı tanı: septik artrit, travma, OA alevlenmesi, psöriyatik artrit vb.</li>
      </ul>

      <h2>Tedavi — Akut Atak</h2>
      <ul>
        <li><b>NSAİİ</b> (kontrendike değilse), <b>kolşisin</b> (erken &lt;36 saatte), veya <b>glukokortikoid</b> (intraartiküler/sistemik).</li>
        <li>Şiddetli/poliartriküler atakta kombinasyon tedavileri kullanılabilir; enfeksiyon dışlanmalı.</li>
      </ul>

      <h2>Uzatılmış Yönetim & Profilaksi (Gut)</h2>
      <ul>
        <li>Hedef <b>serum UA</b>: çoğu hastada <b>&lt;6 mg/dL</b>; tofüslü/şiddetli hastalıkta <b>&lt;5 mg/dL</b> düşünülebilir.</li>
        <li><b>Birinci basamak</b>: Allopurinol (title up); alternatif: Febuksostat. Uygunsa <b>urikozürikler</b> (probenesid) seçilebilir.</li>
        <li><b>Titrelereken profilaksi</b>: Kolşisin düşük doz veya düşük doz NSAİİ (3–6 ay+).</li>
        <li>Yaşam tarzı: kilo kaybı, alkol ve fruktoz kısıtlaması, purinden zengin gıdayı azaltma; diüretiklerin gözden geçirilmesi.</li>
        <li>Refrakter tofüslü ağır hastalıkta <b>peglotikaz</b> seçeneği.</li>
      </ul>

      <h2>CPPD Yönetimi</h2>
      <ul>
        <li>Akut psödogut: NSAİİ, kolşisin, intraartiküler steroid; altta yatan metabolik nedenleri araştır/düzelt.</li>
      </ul>

      <h2>İzlem</h2>
      <ul>
        <li>Ürik asit hedefe inene kadar sık aralıklarla; ilaç toksisitesi (KC, hematolojik, böbrek) ve etkileşimler.</li>
        <li>Komorbidite yönetimi (KT, DM, KBH), aşılar ve nefrolitiyazis önleme.</li>
      </ul>

      <h2>Kaynaklar</h2>
      <ul className="text-sm">
        <li>Harrison’s Principles of Internal Medicine</li>
        <li>UpToDate — Gout, CPPD</li>
        <li>Goldman–Cecil Medicine</li>
        <li>Kelley & Firestein’s Textbook of Rheumatology</li>
        <li>EULAR / ACR ilgili kılavuz ve önerileri</li>
        <li>NEJM, Lancet (review)</li>
        <li>StatPearls / Medscape</li>
      </ul>

      <ChildLinks appSubPath="topics/romatoloji/gut-ve-diger-kristal-artropatileri"
                  premiumHref="/premium/ydus"
                  premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
