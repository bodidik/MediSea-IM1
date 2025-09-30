// FILE: web/app/api/premium/quiz/history/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  const days = req.nextUrl.searchParams.get("days") || "30";
  const url = new URL("/api/premium/quiz/history", backend);
  url.searchParams.set("externalId", externalId);
  url.searchParams.set("days", days);

  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}


