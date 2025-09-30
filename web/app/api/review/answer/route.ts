// FILE: web/app/api/review/answer/route.ts
import { backendBase } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase();
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  const body = await req.json().catch(() => ({}));
  const url = new URL("/api/review/answer", backend);
  url.searchParams.set("externalId", externalId);

  const r = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}





