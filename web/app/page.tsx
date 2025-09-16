export const dynamic = "force-dynamic";

type TopicLite = {
  slug: string;
  title: string;
  summary?: string;
  section?: string;
  lang?: "TR" | "EN";
  updatedAt?: string;
};

type GuidelineLite = {
  _id?: string;
  title: string;
  org?: string;
  year?: number | null;
  section?: string;
  lang?: "TR" | "EN";
  url?: string;
};

async function getFeatured() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";

  // Son güncellenen 8 konu
  const topicsUrl = new URL(`${backend}/api/topics`);
  topicsUrl.searchParams.set("limit", "8");
  topicsUrl.searchParams.set("sort", "-updatedAt");

  // Kılavuzlar: API limit desteklemese bile FE tarafında slice ederiz
  const glUrl = new URL(`${backend}/api/guidelines`);
  glUrl.searchParams.set("lang", "TR");

  // counts (opsiyonel — varsa hoş bir özet veriyor)
  const countsUrl = `${backend}/api/counts`;

  const [tRes, gRes, cRes] = await Promise.all([
    fetch(topicsUrl.toString(), { cache: "no-store" }).catch(() => null),
    fetch(glUrl.toString(), { cache: "no-store" }).catch(() => null),
    fetch(countsUrl, { cache: "no-store" }).catch(() => null),
  ]);

  let topics: TopicLite[] = [];
  let guidelines: GuidelineLite[] = [];
  let counts: any = null;

  try {
    const tJson = (await tRes?.json()) as { ok: boolean; items?: TopicLite[] };
    if (tJson?.ok && Array.isArray(tJson.items)) topics = tJson.items;
  } catch {}

  try {
    const gJson = (await gRes?.json()) as { ok: boolean; items?: GuidelineLite[]; count?: number };
    if (gJson?.ok) {
      const arr = (gJson.items as GuidelineLite[]) || [];
      guidelines = arr.slice(0, 6);
    }
  } catch {}

  try {
    counts = await cRes?.json();
  } catch {}

  return { topics, guidelines, counts };
}

export default async function Home() {
  const { topics, guidelines, counts } = await getFeatured();

  const SECTIONS = [
    "nefroloji",
    "gastroenteroloji",
    "hematoloji",
    "endokrinoloji",
    "romatoloji",
    "kardiyoloji",
    "infeksiyon",
    "göğüs",
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* HERO */}
      <section className="rounded-3xl border p-6 md:p-10 bg-white">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-gray-500">Medknowledge</div>
            <h1 className="text-3xl md:text-5xl font-semibold mt-1">
              Klinik Bilgi • Hızlı • Mobil
            </h1>
            <p className="mt-3 text-gray-700 max-w-2xl">
              İç hastalıkları müfredatını bölümlere ayrılmış konular, kısa özetler, ilişkili
              vakalar ve kılavuzlarla sunuyoruz. Hedef: aradığını 30 sn içinde bul.
            </p>

            {/* Hızlı arama */}
            <form action="/topics" method="GET" className="mt-5 flex gap-2">
              <input
                name="q"
                placeholder="Ara: membranöz glomerülonefrit, KDIGO, vaskülit…"
                className="w-full px-4 py-3 rounded-xl border text-sm"
              />
              <button className="px-4 py-3 rounded-xl border text-sm whitespace-nowrap">
                Ara
              </button>
            </form>

            {/* Hızlı bölüm kısayolları */}
            <div className="mt-4 flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a
                  key={s}
                  href={`/topics?section=${encodeURIComponent(s)}`}
                  className="text-xs px-3 py-1.5 rounded-full border bg-gray-50 hover:bg-white"
                >
                  {s}
                </a>
              ))}
              <a href="/topics" className="text-xs px-3 py-1.5 rounded-full border">
                Tümü →
              </a>
            </div>
          </div>

          {/* Özet kart (counts varsa) */}
          <div className="w-full md:w-72 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border p-4 text-center">
              <div className="text-2xl font-bold">
                {counts?.topics ?? topics.length ?? 0}
              </div>
              <div className="text-xs text-gray-600">Konu</div>
            </div>
            <div className="rounded-2xl border p-4 text-center">
              <div className="text-2xl font-bold">
                {counts?.guidelines ?? (guidelines?.length ?? 0)}
              </div>
              <div className="text-xs text-gray-600">Kılavuz</div>
            </div>
            <div className="rounded-2xl border p-4 text-center">
              <div className="text-2xl font-bold">{counts?.cases ?? "-"}</div>
              <div className="text-xs text-gray-600">Vaka</div>
            </div>
            <div className="rounded-2xl border p-4 text-center">
              <div className="text-2xl font-bold">{counts?.questions ?? "-"}</div>
              <div className="text-xs text-gray-600">Soru</div>
            </div>
          </div>
        </div>
      </section>

      {/* ÖNE ÇIKAN KONULAR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Öne Çıkan Konular</h2>
          <a className="text-sm underline" href="/topics">
            Tüm Konular →
          </a>
        </div>

        {!topics.length ? (
          <div className="rounded-2xl border p-4 bg-white text-sm text-gray-500">
            Henüz konu verisi bulunamadı. <a className="underline" href="/topics">Konular</a>{" "}
            sayfasından arama yapabilirsiniz.
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((t) => (
              <li key={t.slug} className="rounded-2xl border p-4 bg-white hover:shadow-sm">
                <a
                  href={`/topics/${encodeURIComponent(t.slug)}`}
                  className="text-base font-semibold underline"
                >
                  {t.title}
                </a>
                <div className="text-xs text-gray-500 mt-1">
                  {(t.section || "-")} {t.lang ? `· ${t.lang}` : ""}
                </div>
                {t.summary ? (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">{t.summary}</p>
                ) : null}
                {t.updatedAt ? (
                  <div className="text-[11px] text-gray-500 mt-2">
                    {new Date(t.updatedAt).toLocaleDateString("tr-TR")}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* KILAVUZLAR (Hafif liste) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Kılavuzlar</h2>
          <a className="text-sm underline" href="/guidelines">
            Tümü →
          </a>
        </div>
        {!guidelines.length ? (
          <div className="rounded-2xl border p-4 bg-white text-sm text-gray-500">
            Kılavuz listesi boş görünüyor.
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {guidelines.map((g, i) => (
              <li key={(g._id as any) || i} className="rounded-2xl border p-4 bg-white">
                <div className="text-sm font-medium">
                  {g.url ? (
                    <a className="underline" href={g.url} target="_blank">
                      {g.title}
                    </a>
                  ) : (
                    <span>{g.title}</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {(g.org || "—")} {g.year ? `· ${g.year}` : ""} {g.section ? `· ${g.section}` : ""}{" "}
                  {g.lang ? `· ${g.lang}` : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Hızlı Kısayollar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <a
          href="/tools"
          className="rounded-2xl border p-5 bg-white hover:shadow-sm transition block"
        >
          <div className="text-lg font-semibold">Hesaplayıcılar</div>
          <p className="text-sm text-gray-600 mt-1">
            qSOFA, Wells, TIMI, SLEDAI-2K, KDIGO vb. hızlı araçlar.
          </p>
          <div className="text-sm underline mt-2">Göz at →</div>
        </a>

        <a
          href="/topics?section=nefroloji"
          className="rounded-2xl border p-5 bg-white hover:shadow-sm transition block"
        >
          <div className="text-lg font-semibold">Nefroloji</div>
          <p className="text-sm text-gray-600 mt-1">
            Glomerülonefritler, AKI, CKD, elektrolit bozuklukları…
          </p>
          <div className="text-sm underline mt-2">Konu listesi →</div>
        </a>

        <a
          href="/premium"
          className="rounded-2xl border p-5 bg-white hover:shadow-sm transition block"
        >
          <div className="text-lg font-semibold">Premium’a Geç</div>
          <p className="text-sm text-gray-600 mt-1">
            Daha fazla detay, quiz ve üyeye özel içerik.
          </p>
          <div className="text-sm underline mt-2">Planları gör →</div>
        </a>
      </section>
    </div>
  );
}
