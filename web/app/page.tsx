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

  // Son gÃ¼ncellenen 8 konu
  const topicsUrl = new URL(`${backend}/api/topics`);
  topicsUrl.searchParams.set("limit", "8");
  topicsUrl.searchParams.set("sort", "-updatedAt");

  // KÄ±lavuzlar: API limit desteklemese bile FE tarafÄ±nda slice ederiz
  const glUrl = new URL(`${backend}/api/guidelines`);
  glUrl.searchParams.set("lang", "TR");

  // counts (opsiyonel â€” varsa hoÅŸ bir Ã¶zet veriyor)
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
    "gÃ¶ÄŸÃ¼s",
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* HERO */}
      <section className="rounded-3xl border p-6 md:p-10 bg-white">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-gray-500">Medknowledge</div>
            <h1 className="text-3xl md:text-5xl font-semibold mt-1">
              Klinik Bilgi â€¢ HÄ±zlÄ± â€¢ Mobil
            </h1>
            <p className="mt-3 text-gray-700 max-w-2xl">
              Ä°Ã§ hastalÄ±klarÄ± mÃ¼fredatÄ±nÄ± bÃ¶lÃ¼mlere ayrÄ±lmÄ±ÅŸ konular, kÄ±sa Ã¶zetler, iliÅŸkili
              vakalar ve kÄ±lavuzlarla sunuyoruz. Hedef: aradÄ±ÄŸÄ±nÄ± 30 sn iÃ§inde bul.
            </p>

            {/* HÄ±zlÄ± arama */}
            <form action="/topics" method="GET" className="mt-5 flex gap-2">
              <input
                name="q"
                placeholder="Ara: membranÃ¶z glomerÃ¼lonefrit, KDIGO, vaskÃ¼litâ€¦"
                className="w-full px-4 py-3 rounded-xl border text-sm"
              />
              <button className="px-4 py-3 rounded-xl border text-sm whitespace-nowrap">
                Ara
              </button>
            </form>

            {/* HÄ±zlÄ± bÃ¶lÃ¼m kÄ±sayollarÄ± */}
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
                TÃ¼mÃ¼ â†’
              </a>
            </div>
          </div>

          {/* Ã–zet kart (counts varsa) */}
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
              <div className="text-xs text-gray-600">KÄ±lavuz</div>
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

      {/* Ã–NE Ã‡IKAN KONULAR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Ã–ne Ã‡Ä±kan Konular</h2>
          <a className="text-sm underline" href="/topics">
            TÃ¼m Konular â†’
          </a>
        </div>

        {!topics.length ? (
          <div className="rounded-2xl border p-4 bg-white text-sm text-gray-500">
            HenÃ¼z konu verisi bulunamadÄ±. <a className="underline" href="/topics">Konular</a>{" "}
            sayfasÄ±ndan arama yapabilirsiniz.
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
                  {(t.section || "-")} {t.lang ? `Â· ${t.lang}` : ""}
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
          <h2 className="text-xl md:text-2xl font-semibold">KÄ±lavuzlar</h2>
          <a className="text-sm underline" href="/guidelines">
            TÃ¼mÃ¼ â†’
          </a>
        </div>
        {!guidelines.length ? (
          <div className="rounded-2xl border p-4 bg-white text-sm text-gray-500">
            KÄ±lavuz listesi boÅŸ gÃ¶rÃ¼nÃ¼yor.
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
                  {(g.org || "â€”")} {g.year ? `Â· ${g.year}` : ""} {g.section ? `Â· ${g.section}` : ""}{" "}
                  {g.lang ? `Â· ${g.lang}` : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* HÄ±zlÄ± KÄ±sayollar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <a
          href="/tools"
          className="rounded-2xl border p-5 bg-white hover:shadow-sm transition block"
        >
          <div className="text-lg font-semibold">HesaplayÄ±cÄ±lar</div>
          <p className="text-sm text-gray-600 mt-1">
            qSOFA, Wells, TIMI, SLEDAI-2K, KDIGO vb. hÄ±zlÄ± araÃ§lar.
          </p>
          <div className="text-sm underline mt-2">GÃ¶z at â†’</div>
        </a>

        <a
          href="/topics?section=nefroloji"
          className="rounded-2xl border p-5 bg-white hover:shadow-sm transition block"
        >
          <div className="text-lg font-semibold">Nefroloji</div>
          <p className="text-sm text-gray-600 mt-1">
            GlomerÃ¼lonefritler, AKI, CKD, elektrolit bozukluklarÄ±â€¦
          </p>
          <div className="text-sm underline mt-2">Konu listesi â†’</div>
        </a>

        <a
          href="/premium"
          className="rounded-2xl border p-5 bg-white hover:shadow-sm transition block"
        >
          <div className="text-lg font-semibold">Premiumâ€™a GeÃ§</div>
          <p className="text-sm text-gray-600 mt-1">
            Daha fazla detay, quiz ve Ã¼yeye Ã¶zel iÃ§erik.
          </p>
          <div className="text-sm underline mt-2">PlanlarÄ± gÃ¶r â†’</div>
        </a>
      </section>
    </div>
  );
}
