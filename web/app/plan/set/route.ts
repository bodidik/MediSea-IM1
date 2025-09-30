// FILE: web/app/api/plan/set/route.ts
import { NextRequest } from "next/server";

// POST body: { plan: "free" | "premium" | "pro" }
// Alternatif: ?plan=premium ÅŸeklinde query de kabul edilir.
export async function POST(req: NextRequest) {
const backend = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000").replace(/\/+$/, "");

  // cookie'den userId
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const userId = m?.[1] || "guest";

  // body veya query'den plan
  let plan = req.nextUrl.searchParams.get("plan") || "premium";
  try {
    const json = await req.json().catch(() => null);
    if (json?.plan) plan = json.plan;
  } catch {
    /* body yoksa sorun deÄŸil */
  }

  const url = new URL("/api/plan/set", backend);
  url.searchParams.set("userId", userId);
  url.searchParams.set("plan", plan);

  const r = await fetch(url.toString(), { method: "POST" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}



