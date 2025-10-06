// FILE: web/app/api/admin/import/[type]/route.ts
import { backendBase } from "@/lib/backend";

export async function POST(req: Request) {
const backend = backendBase();
  const { type } = await (context as any).params; // "videos" | "notes"
  const body = await req.json().catch(()=> ({}));

  const url = new URL(`/api/admin/import/${type}`, backend);
  const r = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}






