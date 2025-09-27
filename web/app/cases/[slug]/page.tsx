// FILE: web/app/cases/[slug]/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

type Ref = { label: string; url?: string; year?: number | null };
type SimilarLite = { slug: string; title: string; section?: string; updatedAt?: string };

type CaseDetail = {
  slug: string;
  title: string;
  section?: string;
  lang?: "TR" | "EN";
  summary?: string;
  bodyHtml?: string; // hazır HTML
  tags?: string[];
  references?: Ref[];
  updatedAt?: string;
  createdAt?: string;
};

export default async function CaseDetailPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";

  const [detailRes, similarRes] = await Promise.all([
    fetch(`${backend}/api/cases/${encodeURIComponent(slug)}`, { cache: "no-store" }),
    fetch(`${backend}/api/cases/${encodeURIComponent(slug)}/similar?limit=6`, { cache: "no-store" }),
  ]);

  if (!detailRes.ok) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Vaka bulunamadı</h1>
        <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
        <Link href="/cases" className="underline text-sm mt-4 inline-block">Vaka listesine dön</Link>
      </div>
    );
  }

  const { item } = (await detailRes.json()) as { ok: boolean; item: CaseDetail };
  const simData = similarRes.ok ? ((await similarRes.json()) as { ok: boolean; items?: SimilarLite[] }) : { ok: false, items: [] };
  const similars = simData.items || [];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MAIN */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              {(item.section || "-")} · {(item.lang || "TR")}
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">{item.title}</h1>
            {item.summary && <p className="mt-3 text-gray-700">{item.summary}</p>}
            {item.tags?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 border">{t}</span>
                ))}
              </div>
            ) : null}
          </div>

          {/* İçerik */}
          {item.bodyHtml ? (
            <div className="rounded-2xl border p-4 bg-white">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
            </div>
          ) : (
            <div className="rounded-2xl border p-4 bg-white text-sm text-gray-600">
              Bu vaka için içerik henüz eklenmedi.
            </div>
          )}

          {/* Referanslar */}
          {item.references?.length ? (
            <div className="rounded-2xl border p-4 bg-white">
              <h3 className="text-lg font-semibold">Referanslar</h3>
              <ul className="list-disc pl-5 mt-2">
                {item.references.map((r, i) => (
                  <li key={i}>
                    {r.url ? (
                      <a className="underline" href={r.url} target="_blank" rel="noreferrer">{r.label}</a>
                    ) : (
                      <span>{r.label}</span>
                    )}
                    {r.year ? <span className="text-gray-500"> ({r.year})</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* ASIDE */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-4">
            <div className="rounded-2xl border p-4 bg-white">
              <h4 className="font-semibold">Vaka Listesi</h4>
              <Link href="/cases" className="underline text-sm">Tüm vakalar →</Link>
            </div>

            <div className="rounded-2xl border p-4 bg-white">
              <h4 className="font-semibold">Benzer Vakalar</h4>
              {!similars.length ? (
                <p className="text-sm text-gray-500 mt-2">Henüz benzer vaka bulunamadı.</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {similars.map((s) => (
                    <li key={s.slug}>
                      <Link className="underline" href={`/cases/${encodeURIComponent(s.slug)}`}>
                        {s.title}
                      </Link>
                      <div className="text-[11px] text-gray-500">
                        {(s.section || "-")} · {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString("tr-TR") : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <Link href="/cases" className="mt-4 px-3 py-2 rounded-lg border text-sm inline-block">← Geri</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

