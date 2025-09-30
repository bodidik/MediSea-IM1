// FILE: web/app/api/content/preview/[id]/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
  const url = `${backend}/api/content/preview/${params.id}`;
  const r = await fetch(url, { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), {
    headers: { "Content-Type": "application/json" },
    status: r.status,
  });
}

