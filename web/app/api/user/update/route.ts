// FILE: web/app/api/user/update/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase.replace(/\/+$/, "");

  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  const body = await req.json().catch(() => ({} as any));
  const url = new URL("/api/user/ensure", backend);
  url.searchParams.set("externalId", externalId);
  if (body?.name)  url.searchParams.set("name", body.name);
  if (body?.email) url.searchParams.set("email", body.email);

  const r = await fetch(url.toString(), { method: "POST" });
  const j = await r.json();
  return new Response(JSON.stringify(j), {
    headers: { "Content-Type": "application/json" },
  });
}




