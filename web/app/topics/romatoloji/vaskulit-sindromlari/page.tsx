import ChildLinks from "@/components/ChildLinks";
export default function Page() {
  return (
    <main className="prose prose-neutral max-w-none">
      <h1>Vaskülit Sendromları</h1>
<p>Damar duvarının inflamatuvar hastalıkları; tutulan damar çapına göre sınıflanır.</p>
<h2>Örnekler</h2>
<ul><li>Büyük damar: Dev hücreli arterit, Takayasu.</li><li>Küçük damar: GPA, MPA, EGPA.</li></ul>
      <ChildLinks appSubPath="topics/romatoloji/vaskulit-sindromlari" premiumHref="/premium/ydus" premiumLabel="PREMİUM YDUS" />
    </main>
  );
}

