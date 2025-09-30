// FILE: web/app/api/premium/video-recommendations/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  const url = new URL("/api/premium/video-recommendations", backend);
  url.searchParams.set("externalId", externalId);
  const limit = req.nextUrl.searchParams.get("limit");
  if (limit) url.searchParams.set("limit", limit);

  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}


