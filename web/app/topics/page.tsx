import dynamic from "next/dynamic";
const TopicsFilters = dynamic(() => import("@/app/topics/_components/TopicsFilters"), { ssr: false }) as any;
// FILE: web/app/topics/page.tsx
import Link from "next/link";
// ❌ force-dynamic yerine ISR: yaklaşık 30 gün
export const revalidate = 60 * 60 * 24 * 30;

// Liste sayfası için cache tag’leri (on‑demand revalidation ile bozulur)
const listTags = (lang?: string, section?: string, q?: string) => {
  const tags = ["topics:list"] as string[];
  if (lang) tags.push(`topics:list:lang:${lang}`);
  if (section) tags.push(`topics:list:section:${section}`);
  // Arama sorguları çok çeşitli olabilir; istersen q tabanlı tag’ı kapatabilirsin.
  if (q) tags.push(`topics:list:q`); // genel arama tag’ı (spesifik değeri değil)
  return tags;
};

type TopicLite = {
  slug: string;
  title: string;
  summary?: string;
  lang?: "TR" | "EN";
  section?: string;
  tags?: string[];
  updatedAt?: string;
};

type ListResp = {
  ok: boolean;
  page?: number;
  limit?: number;
  total?: number;
  items?: TopicLite[];
  error?: string;
};

function getParam(sp: Record<string, string | string[] | undefined>, key: string, def = "") {
  const v = Array.isArray(sp[key]) ? sp[key]?.[0] : sp[key];
  return (v ?? def) as string;
}

export default async function TopicsIndex({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const lang = getParam(searchParams, "lang", "TR");
  const section = getParam(searchParams, "section", "");
  const q = getParam(searchParams, "q", "");
  const limit = getParam(searchParams, "limit", "20");
  const pageStr = getParam(searchParams, "page", "1");
  const page = Math.max(1, parseInt(pageStr || "1", 10));

  // Backend
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";
  const api = new URL(`${backend}/api/topics`);
  if (lang) api.searchParams.set("lang", lang);
  if (section) api.searchParams.set("section", section);
  if (q) api.searchParams.set("q", q);
  api.searchParams.set("limit", limit);
  api.searchParams.set("page", String(page));
  api.searchParams.set("sort", "-updatedAt");

  // ✅ ISR’lı fetch: CDN cache, on-demand revalidate ile tazelenir
  const res = await fetch(api.toString(), {
    next: { revalidate, tags: listTags(lang, section, q) },
  });

  const data = (await res.json()) as ListResp;
  const items = data.ok ? data.items || [] : [];
  const total = data.total ?? items.length;
  const perPage = parseInt(limit, 10) || 20;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const buildUrl = (nextPage: number) => {
    const u = new URL("/topics", "http://dummy.local");
    if (lang) u.searchParams.set("lang", lang);
    if (section) u.searchParams.set("section", section);
    if (q) u.searchParams.set("q", q);
    u.searchParams.set("limit", String(perPage));
    u.searchParams.set("page", String(nextPage));
    return u.pathname + u.search;
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Konular</h1>
        <Link href="/guidelines" className="text-sm underline opacity-80 hover:opacity-100">
          Kılavuzlar →
        </Link>
      </div>

      {/* Client filtre bileşeni */}
      <TopicsFilters lang={lang} section={section} q={q} limit={perPage} page={page} total={total} />

      {/* Liste */}
      {!data.ok ? (
        <div className="rounded-xl border p-4 text-sm text-red-600 bg-white">
          {data.error || "Liste alınamadı"}
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-gray-500">Kayıt bulunamadı.</div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((t) => (
              <li key={t.slug} className="rounded-2xl border p-4 hover:shadow-sm transition bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/topics/${encodeURIComponent(t.slug)}`}
                      className="text-lg font-semibold underline break-words"
                    >
                      {t.title}
                    </Link>
                    {t.section || t.lang ? (
                      <div className="text-xs text-gray-500 mt-1">
                        {(t.section || "-")} · {t.lang || "TR"}
                      </div>
                    ) : null}
                    {t.summary ? (
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">{t.summary}</p>
                    ) : null}
                    {t.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {t.tags.slice(0, 6).map((tag) => (
                          <span key={tag} className="text-[11px] px-2 py-1 rounded-full bg-gray-100 border">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {t.updatedAt && (
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(t.updatedAt).toLocaleDateString("tr-TR")}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Link
              href={buildUrl(Math.max(1, page - 1))}
              aria-disabled={page <= 1}
              className={`px-3 py-2 rounded-lg border text-sm ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
            >
              ← Önceki
            </Link>
            <span className="text-xs text-gray-600">
              Sayfa {page} / {totalPages}
            </span>
            <Link
              href={buildUrl(Math.min(totalPages, page + 1))}
              aria-disabled={page >= totalPages}
              className={`px-3 py-2 rounded-lg border text-sm ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
            >
              Sonraki →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}



