import Link from "next/link";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";

// ---- Tipler ----
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
  sections?: SectionBlock[];
  relatedCaseIds?: CaseLite[];
  relatedCaseSlugs?: string[];
  references?: Ref[];
  relatedTopics?: string[]; // slug listesi
  updatedAt?: string;
};

// ---- Yardımcılar ----
function canSee(required: "V" | "M" | "P", plan: "V" | "M" | "P") {
  const level = { V: 0, M: 1, P: 2 } as const;
  return level[plan] >= level[required];
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
const backend = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000").replace(/\/+$/, "");

  const jar = cookies();
  const plan = (jar.get("mk_plan")?.value?.toUpperCase() || "V") as "V" | "M" | "P";

  // Ana konu
  const detailResp = await fetchJSON<{ ok: boolean; item: Topic }>(
    `${backend}/api/topics/${encodeURIComponent(slug)}`
  );

  if (!detailResp?.ok || !detailResp.item) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Konu bulunamadı</h1>
        <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
      </div>
    );
  }

  const item = detailResp.item;

  // İlişkili konuların başlıklarını zenginleştir (opsiyonel; başarısız olursa slug ile gösterir)
  let relatedTopicDetails:
    | { slug: string; title?: string }[]
    | undefined = item.relatedTopics?.map((s) => ({ slug: s }));

  if (item.relatedTopics?.length) {
    const fetched = await Promise.all(
      item.relatedTopics.map(async (s) => {
        const data = await fetchJSON<{ ok: boolean; item?: Pick<Topic, "title" | "slug"> }>(
          `${backend}/api/topics/${encodeURIComponent(s)}`
        );
        return data?.ok && data.item ? { slug: data.item.slug, title: data.item.title } : { slug: s };
      })
    );
    relatedTopicDetails = fetched;
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-10 max-w-6xl mx-auto">
      {/* Üst başlık */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wide text-gray-500">
          {item.section || "-"} · {item.lang || "TR"}
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold mt-1 break-words">{item.title}</h1>
        {item.summary && <p className="mt-3 text-gray-700">{item.summary}</p>}
        {item.tags?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 border">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* İki sütunlu düzen: içerik + yan panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* İçerik */}
        <div className="lg:col-span-8 space-y-4">
          {(item.sections || []).map((blk, i) => {
            const allowed = canSee(blk.visibility, plan);
            return (
              <section key={i} className="rounded-2xl border bg-white p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-xl font-semibold">{blk.title}</h2>
                  <span className="text-[11px] px-2 py-1 rounded bg-gray-50 border">
                    Görünürlük: {blk.visibility}
                  </span>
                </div>
                {allowed ? (
                  <div
                    className="prose max-w-none mt-3"
                    dangerouslySetInnerHTML={{ __html: blk.html || "" }}
                  />
                ) : (
                  <div className="text-sm text-gray-600 mt-3">
                    Bu bölüm {blk.visibility === "M" ? "üyeler" : "premium"} için.
                    {plan !== "P" && (
                      <Link href="/premium" className="ml-2 underline">
                        Yükselt
                      </Link>
                    )}
                  </div>
                )}
              </section>
            );
          })}

          {/* İlişkili Vakalar */}
          {(item.relatedCaseIds?.length || item.relatedCaseSlugs?.length) ? (
            <section className="rounded-2xl border bg-white p-4 md:p-5">
              <h3 className="text-lg font-semibold">İlişkili Vakalar</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {(item.relatedCaseIds || []).map((c, idx) => (
                  <li key={c._id || idx}>
                    <a className="underline" href={`/cases/${encodeURIComponent(c.slug || "")}`}>
                      {c.title || c.slug}
                    </a>
                  </li>
                ))}
                {(item.relatedCaseSlugs || []).map((s, idx) => (
                  <li key={`slug-${idx}`}>
                    <a className="underline" href={`/cases/${encodeURIComponent(s)}`}>{s}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Referanslar */}
          {item.references?.length ? (
            <section className="rounded-2xl border bg-white p-4 md:p-5">
              <h3 className="text-lg font-semibold">Referanslar</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {item.references.map((r, i) => (
                  <li key={i}>
                    {r.url ? (
                      <a className="underline" href={r.url} target="_blank">
                        {r.label}
                      </a>
                    ) : (
                      <span>{r.label}</span>
                    )}
                    {r.year ? <span className="text-gray-500"> ({r.year})</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* Yan panel: ilişkili konular (mobilde altta gösterilir, lg ve üstünde sağda sticky) */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-8 space-y-4">
            <div className="rounded-2xl border bg-white p-4 md:p-5">
              <h3 className="text-base md:text-lg font-semibold">İlişkili Konular</h3>
              {!relatedTopicDetails?.length ? (
                <p className="text-sm text-gray-500 mt-2">Bağlantı bulunamadı.</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {relatedTopicDetails.map((rt) => (
                    <li key={rt.slug}>
                      <a
                        className="underline text-sm break-words"
                        href={`/topics/${encodeURIComponent(rt.slug)}`}
                      >
                        {rt.title || rt.slug}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tanıtım/CTA alanı (mobil dostu) */}
            <div className="rounded-2xl border bg-white p-4 md:p-5">
              <h4 className="font-semibold">Sınav Hazırlık & Premium</h4>
              <p className="text-sm text-gray-600 mt-1">
                Geniş soru bankası, vaka atölyeleri ve özelleştirilmiş çalışma planları.
              </p>
              <Link href="/premium"
                className="inline-block mt-3 text-sm px-3 py-2 rounded-lg border hover:shadow-sm"
              >
                Paketleri Gör
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}



