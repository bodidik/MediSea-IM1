// FILE: web/app/api/programs/[slug]/route.ts
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
const backend = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000").replace(/\/+$/, "");
  const url = new URL(`/api/programs/${params.slug}`, backend);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}


