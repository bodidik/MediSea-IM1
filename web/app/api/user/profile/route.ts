// FILE: web/app/api/user/profile/route.ts
import { NextRequest } from "next/server";

function getUidFromCookie(req: NextRequest) {
  const c = req.headers.get("cookie") || "";
  const m = c.match(/(?:^|; )mk_uid=([^;]+)/);
  return (m?.[1] as string) || "guest";
}

export async function GET(req: NextRequest) {
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase.replace(/\/+$/, "");
  const externalId = getUidFromCookie(req);
  const url = new URL("/api/user/profile", backend);
  url.searchParams.set("externalId", externalId);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}

export async function POST(req: NextRequest) {
  // alias: POST ile track deÄŸiÅŸtirmeyi de destekleyelim (forward)
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase.replace(/\/+$/, "");
  const externalId = getUidFromCookie(req);
  const body = await req.json().catch(() => ({}));
  const url = new URL("/api/user/track", backend);
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




