// FILE: web/app/api/premium/quiz/today/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000"}";
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  const url = new URL("/api/premium/quiz/today-set", backend);
  url.searchParams.set("externalId", externalId);
  const n = req.nextUrl.searchParams.get("n");
  if (n) url.searchParams.set("n", n);

  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" }, status: r.status });
}

