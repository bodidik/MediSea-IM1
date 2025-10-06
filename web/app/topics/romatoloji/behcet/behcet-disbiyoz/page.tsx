export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const RELATED = [
  { title: "BH ve mikroorganizmalar (tetikleyiciler)", href: "/topics/romatoloji/behcet/behcet-mikroorganizmalar" },
  { title: "Mikrobiyota modülasyonu: probiyotik/prebiyotik", href: "/topics/romatoloji/behcet/mikrobiyota-modulasyon" },
  { title: "Oral ülserler: patogenez ve yönetim", href: "/topics/romatoloji/behcet/oral-ulserler" },
  { title: "Göz tutulumu (üveit): tanı ve tedavi", href: "/topics/romatoloji/behcet/uveit" },
  { title: "Vasküler tutulum: tromboz/anevrizma", href: "/topics/romatoloji/behcet/vaskuler-tutulum" },
  { title: "Nöro-Behçet: klinik spektrum ve görüntüleme", href: "/topics/romatoloji/behcet/neuro-behcet" },
  { title: "Muko-kutanöz bulgular ve algoritma", href: "/topics/romatoloji/behcet/mukokutanoz" },
  { title: "Gebelik ve Behçet: ilaç güvenliği/izlem", href: "/topics/romatoloji/behcet/gebelik" },
  { title: "Tedavi: kolşisin, anti-TNF, apremilast, yeni ajanlar", href: "/topics/romatoloji/behcet/tedavi" }
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Behçet Hastalığı ve Mikrobiyota İlişkisi</h1>
        <p className="text-gray-600 mt-2">
          Behçet sendromunun patogenezinde genetik yatkınlık, çevresel tetikleyiciler ve bağışıklık sistemi işlev bozukluğu
          arasındaki etkileşim önemlidir. Mikrobiyota ve ürünleri bu çevresel faktörler arasında öne çıkmaktadır.
        </p>
      </header>

      <section className="prose max-w-none">
        <h2>I. Mikrobiyota ve Behçet Sendromu Arasındaki Genel İlişki</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Dizbiyozun Varlığı:</strong> Behçet hastalarında mikrobiyomun bileşimi/çeşitliliğinde dengesizlik gösterilmiştir.</li>
          <li><strong>Patogenetik Rol:</strong> Otoimmün üveit fare modellerinde, BS hastalarından alınan fekal mikrobiyota nakli
            hastalık aktivitesini ve inflamatuvar sitokinleri artırmıştır.</li>
          <li><strong>Çevresel Faktör Olarak Rol:</strong> Mikrobiyota ve ürünleri, genetik/immünolojik faktörlerle birlikte patogenezde yer alır.</li>
        </ol>

        <h2>II. Oral Mikrobiyota Değişiklikleri</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Düşük çeşitlilik</strong> ve belirli türlerin baskınlığı bildirilmiştir.</li>
          <li><strong>Artan türler:</strong>
            <ul className="list-disc pl-5">
              <li>Haemophilus parainfluenzae</li>
              <li>Alloprevotella spp</li>
              <li>Staphylococcus salivarius</li>
              <li>Streptococcus sanguinis</li>
            </ul>
          </li>
          <li><strong>Streptokoklar & Moleküler Taklit:</strong> Streptokokal antijenlere cilt testi aşırı duyarlılık ve alevlenme yapabilir.
            Türkiye’den 106 hastalık bir çalışmada, <em>Streptococcus mutans</em> tükürük kolonizasyonu daha yüksek bulunmuş ve
            düşük serum mannoz-bağlayıcı lektin düzeyleriyle ilişkili saptanmıştır.</li>
        </ul>

        <h2>III. Bağırsak Mikrobiyota Değişiklikleri</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Bozulmuş topluluk</strong> ve <strong>azalmış çeşitlilik</strong> tutarlı bulgulardır.</li>
          <li><strong>Bütirat üreten bakterilerde azalma (depletion):</strong>
            <ul className="list-disc pl-5">
              <li>Roseburia</li>
              <li>Subdoligranulum</li>
              <li>Clostridium spp</li>
            </ul>
          </li>
          <li><strong>Bütiratın etkisi:</strong> Kısa zincirli yağ asidi bütirat, Treg aktivitesini destekler; azalması,
            Th-17 yanıtını artırabilir. Bütiratça zengin diyetlerin redoks/fibrinoliz üzerinde iyileştirici etkileri gösterilmiştir.</li>
          <li><strong>Klinik fenotiple ilişki:</strong> Mikrobiyota bileşimi ile oküler, mukokutanöz, vasküler tutulum arasında ilişkiler bildirildi.</li>
        </ul>

        <h2>IV. Mikrobiyal Tetikleyiciler ve İmmün Yanıt</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Fırsatçı patojenlerin artışı</strong> fekal örneklerde görülebilir.</li>
          <li><strong>TLR aracılı inflamasyon:</strong> LPS/peptidoglikan gibi bileşenler TLR2/4 üzerinden IL-1β’yi tetikleyebilir.</li>
          <li><strong>Çapraz reaktivite:</strong> <em>S. sanguinis</em> kökenli GroEL antijenine karşı serum IgA reaktivitesi,
            insan hnRNP A2/B1’e karşı reaktivite ile ilişkilendirilmiştir.</li>
        </ul>

        <h2>Özet</h2>
        <p>
          Ağız ve bağırsak mikrobiyotasındaki dizbiyoz—özellikle bütirat üreten faydalı bakterilerin azalması ve potansiyel
          patojenlerin artması—inflamatuvar bağışıklık tepkilerini tetikleyebilir ve BS’in farklı klinik özellikleriyle ilişkili olabilir.
        </p>
      </section>

      <aside className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">İlgili Behçet sayfaları</h3>
        <ul className="list-disc pl-5 space-y-1">
          {RELATED.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="underline">{it.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}



