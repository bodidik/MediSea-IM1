export const dynamic = "force-dynamic";

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

export default async function GuidelinesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // URL â†’ filtreler
  const lang =
    (Array.isArray(searchParams.lang) ? searchParams.lang[0] : searchParams.lang) || "TR";
  const section =
    (Array.isArray(searchParams.section) ? searchParams.section[0] : searchParams.section) || "";
  const q =
    (Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q) || "";

  // API Ã§aÄŸrÄ±sÄ±
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";
  const api = new URL(`${backend}/api/guidelines`);
  if (lang) api.searchParams.set("lang", lang);
  if (section) api.searchParams.set("section", section);
  if (q) api.searchParams.set("q", q);

  const res = await fetch(api.toString(), { cache: "no-store" });
  const data = (await res.json()) as Resp;
  const items = data.ok ? data.items || [] : [];

  const SECTION_OPTIONS = [
    "",
    "romatoloji",
    "nefroloji",
    "gastroenteroloji",
    "hematoloji",
    "endokrinoloji",
    "kardiyoloji",
    "infeksiyon",
    "gÃ¶ÄŸÃ¼s",
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">KÄ±lavuzlar</h1>
        <a href="/topics" className="text-sm underline opacity-80 hover:opacity-100">
          Konular â†’
        </a>
      </div>

      {/* Filtreler */}
      <form
        className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-5 gap-3 bg-white"
        method="GET"
      >
        <select
          name="lang"
          defaultValue={lang}
          className="px-3 py-2 rounded-lg border text-sm"
          aria-label="Dil"
        >
          <option value="TR">TR</option>
          <option value="EN">EN</option>
        </select>

        <select
          name="section"
          defaultValue={section}
          className="px-3 py-2 rounded-lg border text-sm md:col-span-2"
          aria-label="BÃ¶lÃ¼m"
        >
          {SECTION_OPTIONS.map((s) => (
            <option key={s || "all"} value={s}>
              {s ? s : "BÃ¶lÃ¼m: Hepsi"}
            </option>
          ))}
        </select>

        <input
          name="q"
          defaultValue={q}
          placeholder="Ara: KDIGO, EULAR, ESC, ADAâ€¦"
          className="px-3 py-2 rounded-lg border text-sm md:col-span-2"
          aria-label="Arama"
        />

        <div className="md:col-span-5 flex items-center gap-3">
          <button className="px-3 py-2 rounded-lg border text-sm">Uygula</button>
          <a href="/guidelines" className="text-sm underline opacity-70 hover:opacity-100">
            SÄ±fÄ±rla
          </a>
          <span className="ml-auto text-xs text-gray-500">
            {typeof data.count === "number" ? `Toplam ${data.count} kayÄ±t` : `${items.length} sonuÃ§`}
          </span>
        </div>
      </form>

      {/* Liste */}
      {!data.ok ? (
        <div className="rounded-xl border p-4 text-sm text-red-600 bg-white">
          {data.error || "Liste alÄ±namadÄ±"}
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-gray-500">KayÄ±t bulunamadÄ±.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((g, idx) => (
            <li key={(g._id as any) || idx} className="rounded-2xl border p-4 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-base font-semibold">
                    {g.url ? (
                      <a className="underline break-words" href={g.url} target="_blank">
                        {g.title}
                      </a>
                    ) : (
                      <span className="break-words">{g.title}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(g.org || "â€”")} {g.year ? `Â· ${g.year}` : ""}{" "}
                    {g.section ? `Â· ${g.section}` : ""} {g.lang ? `Â· ${g.lang}` : ""}
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
