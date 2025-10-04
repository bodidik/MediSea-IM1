export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const TOPICS = [
  { slug: "sistemik-lupus-eritematozus", title: "Sistemik Lupus Eritematozus (SLE)" },
  { slug: "romatoid-artrit", title: "Romatoid Artrit" },
  { slug: "antifosfolipid-sendromu", title: "Antifosfolipid Sendromu" },
  { slug: "vaskulit-sendromlari", title: "Vaskülit Sendromları" },
  { slug: "sjogren", title: "Sjögren Sendromu" },
  { slug: "sistemik-skleroz", title: "Sistemik Skleroz (Skleroderma)" },
  { slug: "behcet", title: "Behçet Sendromu" },
  { slug: "sarkoidoz", title: "Sarkoidoz" },
  { slug: "inflamatuvar-myopatiler", title: "İnflamatuvar Myopatiler" },
  { slug: "osteoartrit", title: "Osteoartrit" },
  { slug: "gut-ve-kristal-artrit", title: "Gut ve Kristal Artritler" },
  { slug: "fibromiyalji", title: "Fibromiyalji" },
  { slug: "fmf-otoenflamatuvar", title: "FMF ve Otoenflamatuvar Hastalıklar" },
  { slug: "igg4-iliskili-hastalik", title: "IgG4-İlişkili Hastalık" },
  { slug: "relapsing-polichondritis", title: "Relapsing Polikondrit" }
];

export default function RomatolojiIndex() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Romatoloji — Konu Dizini</h1>
      <p className="opacity-70 mb-4">Statik dizin; her başlık kendi sayfasına gider.</p>
      <ul className="list-disc pl-5 space-y-1">
        {TOPICS.map((it) => (
          <li key={it.slug}>
            <Link href={`/topics/romatoloji/${it.slug}`} className="underline">{it.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}