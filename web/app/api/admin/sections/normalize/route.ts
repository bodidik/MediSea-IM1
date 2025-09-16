// FILE: web/app/api/admin/sections/audit/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const inUrl = new URL(req.url);
  const url = new URL("/api/admin/sections/audit", backend);
  const models = inUrl.searchParams.get("models") || "videos,notes";
  const limit = inUrl.searchParams.get("limit") || "5000";
  url.searchParams.set("models", models);
  url.searchParams.set("limit", limit);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}
