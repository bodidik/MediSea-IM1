export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const SECTIONS = [
  { slug: "romatoloji",   title: "Romatoloji" },
  { slug: "hematoloji",   title: "Hematoloji" },
  { slug: "endokrinoloji",title: "Endokrinoloji" },
  { slug: "nefroloji",    title: "Nefroloji" },
  { slug: "gastroenteroloji", title: "Gastroenteroloji" }
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Medknowledge</h1>
        <p className="opacity-70">İç hastalıkları eğitim platformu.</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Bölümler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SECTIONS.map(s => (
            <Link
              key={s.slug}
              href={`/topics/${s.slug}`}
              className="block border rounded-xl p-4 hover:shadow"
            >
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm opacity-70">/topics/{s.slug}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


