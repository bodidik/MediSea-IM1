import ChildLinks from '@/components/ChildLinks';

export default function Page() {
  return (
    <main className="prose prose-neutral max-w-none">
      <h1>Romatoid Artrit (RA)</h1>
<p>Kronik, simetrik, eroziv sinovit ile seyreden sistemik otoimmün hastalık.</p>
<h2>Tanım</h2>
<ul><li>Sinovyumda otoimmün inflamasyon → kıkırdak/kemik erozyonu.</li></ul>
<h2>Tedavi</h2>
<ul><li>Metotreksat, biyolojik DMARD, düşük doz steroid.</li></ul>
      <ChildLinks appSubPath="topics/romatoloji/romatoid-artrit" premiumHref="/premium/ydus" premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
