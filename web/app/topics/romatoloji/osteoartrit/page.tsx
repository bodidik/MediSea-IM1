import ChildLinks from '@/components/ChildLinks';

export default function Page() {
  return (
    <main className="prose prose-neutral max-w-none">
      <h1>Osteoartrit (OA)</h1>
<p>Yaşla artan, mekanik dejeneratif eklem hastalığı.</p>
<h2>Tedavi</h2>
<ul><li>Kilo kontrolü, egzersiz, topikal NSAİİ, ileri olguda cerrahi.</li></ul>
      <ChildLinks appSubPath="topics/romatoloji/osteoartrit" premiumHref="/premium/ydus" premiumLabel="PREMİUM YDUS" />
    </main>
  );
}
