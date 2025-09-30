import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase.replace(/\/+$/, "");
  const cookies = req.headers.get("cookie") || "";
  const mk = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = mk?.[1] || "guest";
  const url = new URL("/api/protected/token", backend);
  url.searchParams.set("externalId", externalId);
  // Plan guard backend'de; burada sadece iletiriz.
  const r = await fetch(url.toString(), { headers: { "x-forwarded-for": req.ip || "" } as any, cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" }, status: r.status });
}




