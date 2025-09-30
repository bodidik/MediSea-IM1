// FILE: web/app/api/content/[id]/route.ts
import { backendBase } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, context: { params: { id: string } }) {
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase();
  const id = context.params.id;
  const r = await fetch(`${backend}/api/content/${encodeURIComponent(id)}`, { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), {
    headers: { "Content-Type": "application/json" },
    status: r.status,
  });
}




