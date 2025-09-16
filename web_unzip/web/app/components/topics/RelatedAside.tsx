import Link from "next/link";

type RelatedMini = { slug: string; title?: string; section?: string };

export default function RelatedAside({ items }: { items: RelatedMini[] }) {
  if (!items?.length) return null;
  return (
    <aside className="md:sticky md:top-20 rounded-2xl border p-4 bg-white">
      <h3 className="font-semibold mb-2">İlişkili Konular</h3>
      <ul className="space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.slug}>
            <Link className="underline" href={`/topics/${encodeURIComponent(it.slug)}`}>
              {it.title || it.slug}
            </Link>
            {it.section ? (
              <span className="text-xs text-gray-500 ml-1">· {it.section}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}
