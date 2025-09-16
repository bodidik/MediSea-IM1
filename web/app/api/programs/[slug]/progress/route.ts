// FILE: web/app/api/programs/[slug]/progress/route.ts
import { NextRequest } from "next/server";

function getUid(req: NextRequest) {
  const c = req.headers.get("cookie") || "";
  const m = c.match(/(?:^|; )mk_uid=([^;]+)/);
  return (m?.[1] as string) || "guest";
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const externalId = getUid(req);
  const url = new URL(`/api/programs/${params.slug}/progress`, backend);
  url.searchParams.set("externalId", externalId);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const externalId = getUid(req);
  const body = await req.json().catch(()=> ({}));
  const url = new URL(`/api/programs/${params.slug}/progress/tick`, backend);
  url.searchParams.set("externalId", externalId);
  const r = await fetch(url.toString(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}
