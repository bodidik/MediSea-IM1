// FILE: web/app/api/review/next/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000"}";
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  const inUrl = new URL(req.url);
  const backendUrl = new URL("/api/review/next", backend);
  // proxy edilen queryâ€™ler
  for (const [k, v] of inUrl.searchParams.entries()) backendUrl.searchParams.set(k, v);
  backendUrl.searchParams.set("externalId", externalId);

  const r = await fetch(backendUrl.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}

