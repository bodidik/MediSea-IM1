
import { backendBase } from "@/lib/backend";
export async function GET(req: Request) {
const backend = backendBase();
  const url = new URL(`/api/sections/${decodeURIComponent((new URL(req.url)).pathname.split("/").filter(Boolean).pop()!)}`, backend);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}






