// FILE: web/app/api/user/ensure/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000"}";

  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  const url = new URL("/api/user/ensure", backend);
  url.searchParams.set("externalId", externalId);
  url.searchParams.set("plan", "free");

  const r = await fetch(url.toString(), { method: "POST" });
  const j = await r.json();
  return new Response(JSON.stringify(j), {
    headers: { "Content-Type": "application/json" },
  });
}

