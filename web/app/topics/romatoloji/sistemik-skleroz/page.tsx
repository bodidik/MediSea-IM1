import ChildLinks from '@/components/ChildLinks';

export default function Page() {
  return (
    <main className="prose prose-neutral max-w-none">
      <h1>Sistemik Skleroz</h1>
<p>Fibrozis, mikrovasküler hasar ve otoimmünite ile karakterize sistemik hastalık.</p>
<h2>Tedavi</h2>
<ul><li>Raynaud’da kalsiyum kanal blokeri, ILD’de MMF veya siklofosfamid.</li></ul>
      <ChildLinks appSubPath="topics/romatoloji/sistemik-skleroz" premiumHref="/premium/ydus" premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
