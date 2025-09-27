// FILE: web/app/topics/[slug]/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Ref = { label: string; url?: string; year?: number | null };
type SectionBlock = { title: string; html: string; visibility: "V" | "M" | "P" };
type CaseLite = { _id?: string; slug?: string; title?: string };
type Topic = {
  slug: string;
  title: string;
  summary?: string;
  lang?: "TR" | "EN";
  section?: string;
  tags?: string[];
  sections: SectionBlock[];
  relatedCaseIds?: CaseLite[];
  relatedCaseSlugs?: string[];
  references?: Ref[];
  updatedAt?: string;
};
type SimilarLite = { slug: string; title: string; section?: string; summary?: string; updatedAt?: string };

function canSee(required: "V" | "M" | "P", plan: "V" | "M" | "P") {
  const level = { V: 0, M: 1, P: 2 } as const;
  return level[plan] >= level[required];
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";
  const jar = cookies();
  const plan = (jar.get("mk_plan")?.value?.toUpperCase() || "V") as "V" | "M" | "P";

  const [detailRes, similarRes] = await Promise.all([
    fetch(`${backend}/api/topics/${encodeURIComponent(slug)}`, { cache: "no-store" }),
    fetch(`${backend}/api/topics/${encodeURIComponent(slug)}/similar?limit=8`, { cache: "no-store" }),
  ]);

  if (!detailRes.ok) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Konu bulunamadı</h1>
        <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
      </div>
    );
  }

  const { item } = (await detailRes.json()) as { ok: boolean; item: Topic };
  const simData = similarRes.ok
    ? ((await similarRes.json()) as { ok: boolean; items?: SimilarLite[] })
    : { ok: false, items: [] };
  const similars = simData.items || [];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MAIN */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              {item.section || "-"} · {item.lang || "TR"}
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">{item.title}</h1>
            {item.summary && <p className="mt-3 text-gray-700">{item.summary}</p>}
            {!!item.tags?.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 border">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* İçerik blokları */}
          <div className="space-y-4">
            {(!item.sections || item.sections.length === 0) && (
              <div className="rounded-2xl border p-4 bg-white text-sm text-gray-600">
                Bu konu için içerik henüz eklenmedi.
              </div>
            )}
            {item.sections?.map((blk, i) => {
              const allowed = canSee(blk.visibility, plan);
              return (
                <div key={i} className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{blk.title}</h2>
                    <span className="text-xs px-2 py-1 rounded bg-gray-50 border">
                      Görünürlük: {blk.visibility}
                    </span>
                  </div>
                  {allowed ? (
                    <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: blk.html || "" }} />
                  ) : (
                    <div className="text-sm text-gray-500 mt-2">
                      Bu bölüm {blk.visibility === "M" ? "üyeler" : "premium"} için.
                      {plan !== "P" && (
                        <Link className="ml-2 underline" href="/premium">
                          Yükselt
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* İlişkili Vakalar */}
          {(item.relatedCaseIds?.length || item.relatedCaseSlugs?.length) ? (
            <div className="rounded-2xl border p-4 bg-white">
              <h3 className="text-lg font-semibold">İlişkili Vakalar</h3>
              <ul className="list-disc pl-5 mt-2">
                {(item.relatedCaseIds || []).map((c, idx) => (
                  <li key={c._id || idx}>
                    <Link className="underline" href={`/cases/${encodeURIComponent(c.slug || "")}`}>
                      {c.title || c.slug}
                    </Link>
                  </li>
                ))}
                {(item.relatedCaseSlugs || []).map((s, idx) => (
                  <li key={`slug-${idx}`}>
                    <Link className="underline" href={`/cases/${encodeURIComponent(s)}`}>{s}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

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
              <h3 className="text-base font-semibold">Benzer Konular</h3>
              {!similars.length ? (
                <p className="text-sm text-gray-500 mt-2">Henüz benzer konu bulunamadı.</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {similars.map((s) => (
                    <li key={s.slug}>
                      <Link className="underline" href={`/topics/${encodeURIComponent(s.slug)}`}>
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

            <div className="rounded-2xl border p-4 bg-white">
              <h4 className="font-semibold">Premium’a Geç</h4>
              <p className="text-sm text-gray-600 mt-1">Daha fazla konu, quiz ve detaylı içerik. Mobilde hızlı.</p>
              <Link href="/premium" className="inline-block mt-3 px-3 py-2 rounded-lg border text-sm">
                Planları Gör
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// FILE: web/app/topics/[slug]/loading.tsx
export default function LoadingTopic() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-pulse">
      <div className="h-4 w-40 bg-gray-200 rounded" />
      <div className="h-8 w-1/2 bg-gray-200 rounded mt-3" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
          ))}
        </div>
        <div className="lg:col-span-4 space-y-3">
          <div className="h-40 bg-gray-200 rounded-2xl" />
          <div className="h-28 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
