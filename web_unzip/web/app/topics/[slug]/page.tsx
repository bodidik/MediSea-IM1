import { cookies } from "next/headers";

type Ref = { label: string; url?: string; year?: number | null };
type SectionBlock = { title: string; html: string; visibility: "V" | "M" | "P" };
type CaseLite = { _id?: string; slug?: string; title?: string };
type Topic = {
  slug: string;
  title: string;
  summary?: string;
  lang: "TR" | "EN";
  section?: string;
  tags?: string[];
  sections: SectionBlock[];
  relatedCaseIds?: CaseLite[];
  relatedCaseSlugs?: string[];
  references?: Ref[];
};

function canSee(required: "V" | "M" | "P", plan: "V" | "M" | "P") {
  const level = { V: 0, M: 1, P: 2 } as const;
  return level[plan] >= level[required];
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";

  const jar = cookies();
  const plan = (jar.get("mk_plan")?.value?.toUpperCase() || "V") as "V" | "M" | "P";

  // 1) Ana konu
  const res = await fetch(`${backend}/api/topics/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (!res.ok) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Topic bulunamadı</h1>
        <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
      </div>
    );
  }
  const { item } = (await res.json()) as { ok: boolean; item: Topic };

  // 2) Yan panel verileri (aynı bölüm + benzerler)
  const section = item.section || "";
  const [recentResp, alphaResp, similarResp] = await Promise.all([
    fetch(`${backend}/api/topics?section=${encodeURIComponent(section)}&limit=6&page=1&sort=-updatedAt`, { cache: "no-store" }),
    fetch(`${backend}/api/topics?section=${encodeURIComponent(section)}&limit=6&page=1&sort=title`, { cache: "no-store" }),
    fetch(`${backend}/api/topics/${encodeURIComponent(item.slug)}/similar?limit=5`, { cache: "no-store" }),
  ]);

  const recentJson = (recentResp.ok ? await recentResp.json() : { items: [] }) as {
    items?: { slug: string; title: string; updatedAt?: string }[];
  };
  const alphaJson = (alphaResp.ok ? await alphaResp.json() : { items: [] }) as {
    items?: { slug: string; title: string }[];
  };
  const similarJson = (similarResp.ok ? await similarResp.json() : { items: [] }) as {
    items?: { slug: string; title: string; updatedAt?: string }[];
  };

  const recent = (recentJson.items || []).filter((t) => t.slug !== item.slug).slice(0, 5);
  const alpha  = (alphaJson.items || []).filter((t) => t.slug !== item.slug).slice(0, 5);
  const similars = (similarJson.items || []).slice(0, 5);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Üst başlık */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wide text-gray-500">
          {item.section || "-"} · {item.lang}
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

      {/* İçerik + Yan panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* İçerik alanı */}
        <div className="lg:col-span-8 space-y-4">
          {item.sections?.map((blk, i) => {
            const allowed = canSee(blk.visibility, plan);
            return (
              <section key={i} className="rounded-2xl border p-4 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{blk.title}</h2>
                  <span className="text-xs px-2 py-1 rounded bg-gray-50 border">Görünürlük: {blk.visibility}</span>
                </div>
                {allowed ? (
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: blk.html || "" }} />
                ) : (
                  <div className="text-sm text-gray-500 mt-2">
                    Bu bölüm {blk.visibility === "M" ? "üyeler" : "premium"} için.
                    {plan !== "P" && <a className="ml-2 underline" href="/premium">Yükselt</a>}
                  </div>
                )}
              </section>
            );
          })}

          {(item.relatedCaseIds?.length || item.relatedCaseSlugs?.length) ? (
            <section className="rounded-2xl border p-4 bg-white">
              <h3 className="text-lg font-semibold">İlişkili Vakalar</h3>
              <ul className="list-disc pl-5 mt-2">
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

          {item.references?.length ? (
            <section className="rounded-2xl border p-4 bg-white">
              <h3 className="text-lg font-semibold">Referanslar</h3>
              <ul className="list-disc pl-5 mt-2">
                {item.references.map((r, i) => (
                  <li key={i}>
                    {r.url ? (
                      <a className="underline" href={r.url} target="_blank">{r.label}</a>
                    ) : <span>{r.label}</span>}
                    {r.year ? <span className="text-gray-500"> ({r.year})</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* Yan panel */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border p-4 bg-white">
            <h3 className="text-base font-semibold">Aynı bölümden yeni eklenenler</h3>
            <ul className="mt-2 space-y-1">
              {recent.length === 0 ? <li className="text-sm text-gray-500">Kayıt yok.</li> :
                recent.map((t) => (
                  <li key={t.slug} className="text-sm">
                    <a className="underline" href={`/topics/${encodeURIComponent(t.slug)}`}>{t.title}</a>
                    {t.updatedAt && (
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(t.updatedAt).toLocaleDateString("tr-TR")}
                      </span>
                    )}
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="rounded-2xl border p-4 bg-white">
            <h3 className="text-base font-semibold">Benzer konular</h3>
            <ul className="mt-2 space-y-1">
              {similars.length === 0 ? <li className="text-sm text-gray-500">Kayıt yok.</li> :
                similars.map((t) => (
                  <li key={t.slug} className="text-sm">
                    <a className="underline" href={`/topics/${encodeURIComponent(t.slug)}`}>{t.title}</a>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="rounded-2xl border p-4 bg-white">
            <h3 className="text-base font-semibold">Diğer başlıklar</h3>
            <ul className="mt-2 space-y-1">
              {alpha.length === 0 ? <li className="text-sm text-gray-500">Kayıt yok.</li> :
                alpha.map((t) => (
                  <li key={t.slug} className="text-sm">
                    <a className="underline" href={`/topics/${encodeURIComponent(t.slug)}`}>{t.title}</a>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="rounded-2xl border p-4 bg-white">
            <h3 className="text-base font-semibold">📚 Premium İçerikler</h3>
            <p className="text-sm text-gray-600 mt-1">YDUS/USMLE düzeyinde vaka & quiz’lere erişim için planını yükselt.</p>
            <a href="/premium" className="inline-block mt-2 text-sm underline">Planları gör →</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
