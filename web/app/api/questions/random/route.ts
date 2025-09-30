import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000"}";
  const url = new URL("/api/questions/random", backend);
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { status: r.status, headers: { "Content-Type": "application/json" } });
}

