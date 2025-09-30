import { NextRequest } from "next/server";
export async function GET(req: NextRequest){
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase.replace(/\/+$/, "");
  const url = new URL("/api/sections/with-count", backend);
  const limit = req.nextUrl.searchParams.get("limit");
  if (limit) url.searchParams.set("limit", limit);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}




