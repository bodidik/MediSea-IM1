// FILE: web/app/api/programs/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const inUrl = new URL(req.url);
  const url = new URL("/api/programs", backend);
  const track = inUrl.searchParams.get("track");
  if (track) url.searchParams.set("track", track);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}
