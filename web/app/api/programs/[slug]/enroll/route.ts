// FILE: web/app/api/programs/[slug]/enroll/route.ts
import { NextRequest } from "next/server";

function getUid(req: NextRequest) {
  const c = req.headers.get("cookie") || "";
  const m = c.match(/(?:^|; )mk_uid=([^;]+)/);
  return (m?.[1] as string) || "guest";
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
const backend = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000").replace(/\/+$/, "");
  const externalId = getUid(req);
  const url = new URL(`/api/programs/${params.slug}/enroll`, backend);
  url.searchParams.set("externalId", externalId);
  const r = await fetch(url.toString(), { method: "POST" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}


