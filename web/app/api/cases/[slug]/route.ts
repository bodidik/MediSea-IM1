import { cookies } from "next/headers";

export async function GET(req: Request) {
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase.replace(/\/+$/, "");

  const jar = cookies();
  const mk = jar.get("mk_uid")?.value || "guest";

  // Backend liste endpoint’ine yönlendir
  const url = new URL("/api/cases", backend);
  url.searchParams.set("externalId", mk);

  try {
    const r = await fetch(url.toString(), { cache: "no-store" });
    const j = await r.json();
    return new Response(JSON.stringify(j), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || "fetch_failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



