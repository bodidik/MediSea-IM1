import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
  const cookies = req.headers.get("cookie") || "";
  const mk = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = mk?.[1] || "guest";

  const id = req.nextUrl.searchParams.get("id") || "sample";
  const tRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/protected/token`, { headers: { cookie: cookies }, cache: "no-store" });
  const tJson = await tRes.json();
  if (!tRes.ok || !tJson.ok) {
    return new Response(JSON.stringify({ ok: false, error: "token_fail" }), { status: 401 });
  }

  const url = new URL("/api/protected/chunk", backend);
  url.searchParams.set("externalId", externalId);
  url.searchParams.set("id", id);

  const r = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${tJson.token}` },
    cache: "no-store"
  });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" }, status: r.status });
}


