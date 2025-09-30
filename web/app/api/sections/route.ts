import { backendBase } from "@/lib/backend";
// Backend Ã§Ä±ktÄ±sÄ±nÄ± (all/premium/totals) frontend'in beklediÄŸi rows yapÄ±sÄ±na Ã§evirir.

export async function GET(_req: Request) {
const backend = backendBase();

  // AsÄ±l endpoint
  const res = await fetch(`${backend}/api/sections/with-count`, { cache: "no-store" });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ ok: false, error: `backend_status_${res.status}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await res.json();

  // data.all â†’ [{ section, count }]
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
    // Ä°stersen totals'Ä± da ileri kullanÄ±mlar iÃ§in geÃ§iriyoruz
    _raw: { totals: data?.totals ?? null, premium: data?.premium ?? null },
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}






