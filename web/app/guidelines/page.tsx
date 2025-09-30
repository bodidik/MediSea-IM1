// FILE: web/app/guidelines/page.tsx
import Link from "next/link";
import GuidelinesFilters from "@/app/components/GuidelinesFilters";

// ✅ ISR: yaklaşık 30 gün
export const revalidate = 60 * 60 * 24 * 30;

// Liste için cache tag’leri (on‑demand revalidation ile bozulur)
const listTags = (lang?: string, section?: string, q?: string) => {
  const tags = ["guidelines:list"] as string[];
  if (lang) tags.push(`guidelines:list:lang:${lang}`);
  if (section) tags.push(`guidelines:list:section:${section}`);
  // Arama için çok ince taneli tag vermiyoruz; genel bir tag yeterli
  if (q) tags.push("guidelines:list:q");
  return tags;
};

type Guideline = {
  _id?: string;
  title: string;
  org?: string;
  year?: number | null;
  section?: string;
  lang?: "TR" | "EN";
  url?: string;
  createdAt?: string;
};

type Resp = { ok: boolean; count?: number; items?: Guideline[]; error?: string };

function getParam(sp: Record<string, string | string[] | undefined>, key: string, def = "") {
  const v = Array.isArray(sp[key]) ? sp[key]?.[0] : sp[key];
  return (v ?? def) as string;
}

export default async function GuidelinesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const lang = getParam(searchParams, "lang", "TR");
  const section = getParam(searchParams, "section", "");
  const q = getParam(searchParams, "q", "");
const backend = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000").replace(/\/+$/, "");
  const api = new URL(`${backend}/api/guidelines`);
  if (lang) api.searchParams.set("lang", lang);
  if (section) api.searchParams.set("section", section);
  if (q) api.searchParams.set("q", q);

  // ✅ ISR + tag’li fetch
  const res = await fetch(api.toString(), {
    next: { revalidate, tags: listTags(lang, section, q) },
  });
  const data = (await res.json()) as Resp;
  const items = data.ok ? data.items || [] : [];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Kılavuzlar</h1>
        <Link href="/topics" className="text-sm underline opacity-80 hover:opacity-100">
          Konular →
        </Link>
      </div>

      {/* Client filtreler */}
      <GuidelinesFilters lang={lang} section={section} q={q} total={data.count ?? items.length} />

      {/* Liste */}
      {!data.ok ? (
        <div className="rounded-xl border p-4 text-sm text-red-600 bg-white">
          {data.error || "Liste alınamadı"}
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-gray-500">Kayıt bulunamadı.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((g, idx) => (
            <li key={(g._id as any) || idx} className="rounded-2xl border p-4 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-base font-semibold">
                    {g.url ? (
                      <a className="underline break-words" href={g.url} target="_blank" rel="noreferrer">
                        {g.title}
                      </a>
                    ) : (
                      <span className="break-words">{g.title}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(g.org || "—")} {g.year ? `· ${g.year}` : ""} {g.section ? `· ${g.section}` : ""} {g.lang ? `· ${g.lang}` : ""}
                  </div>
                </div>
                {g.createdAt && (
                  <div className="text-[11px] text-gray-500 whitespace-nowrap">
                    {new Date(g.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}





