export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";
import fs from "fs";
import path from "path";

type Item = { slug: string; title: string; href: string };

function toTitleTR(slug: string) {
  let t = slug.replace(/-/g, " ");
  // Sık kısaltmaları düzelt
  t = t.replace(/\b(ibd|ibs|gis|hp)\b/gi, (m) => m.toUpperCase());
  return t.replace(/\p{L}[\p{L}\p{Mn}\p{Nd}]*/gu, (w) =>
    w[0].toLocaleUpperCase("tr-TR") + w.slice(1)
  );
}

async function getGastroTopics(): Promise<Item[]> {
  const dir = path.join(process.cwd(), "app", "topics", "gastroenteroloji");
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .filter(slug => fs.existsSync(path.join(dir, slug, "page.tsx")));
  } catch { entries = []; }
  const items = entries.map(slug => ({ slug, title: toTitleTR(slug), href: /topics/gastroenteroloji/ }));
  items.sort((a,b)=>a.title.localeCompare(b.title,'tr'));
  return items;
}

export default async function Page() {
  const items = await getGastroTopics();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Gastroenteroloji</h1>
      <p className="opacity-70 mb-6">
        Aşağıda gastroenteroloji konu başlıkları listelenmiştir. Bir başlığa tıklayarak ilgili içerik dizinine gidin.
      </p>

      {items.length===0 ? (
        <p className="opacity-70">Konu bulunamadı. (Henüz dizinler oluşturulmamış olabilir.)</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(it=>(
            <Link key={it.slug} href={it.href} className="block border rounded-xl p-4 hover:shadow">
              <div className="font-semibold">{it.title}</div>
              <div className="text-xs opacity-60">{it.slug}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
