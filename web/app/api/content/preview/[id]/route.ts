// FILE: web/app/api/content/preview/[id]/route.ts
import { backendBase } from "@/lib/backend";

export async function GET(req: Request) {
const backend = backendBase();
  const url = `${backend}/api/content/preview/${(new URL(req.url)).pathname.split("/").filter(Boolean).pop()!}`;
  const r = await fetch(url, { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), {
    headers: { "Content-Type": "application/json" },
    status: r.status,
  });
}






