// Backend çıktısını (all/premium/totals) frontend'in beklediği rows yapısına çevirir.

export async function GET(_req: Request) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";

  // Asıl endpoint
  const res = await fetch(`${backend}/api/sections/with-count`, { cache: "no-store" });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ ok: false, error: `backend_status_${res.status}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await res.json();

  // data.all → [{ section, count }]
  const rows = Array.isArray(data?.all)
    ? data.all.map((it: any) => ({
        section: String(it.section || "-"),
        topics: 0,
        boardQuestions: 0,
        cases: 0,
        videos: 0,
        notes: 0,
        total: Number(it.count || 0),
      }))
    : [];

  const payload = {
    ok: true,
    rows,
    lastUpdatedISO: new Date().toISOString(),
    // İstersen totals'ı da ileri kullanımlar için geçiriyoruz
    _raw: { totals: data?.totals ?? null, premium: data?.premium ?? null },
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
