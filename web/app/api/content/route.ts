﻿// FILE: web/app/api/admin/content/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const url = new URL("/api/admin/content", backend);
  // Query aynen geÃ§ir
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));

  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), {
    headers: { "Content-Type":"application/json" },
    status: r.status
  });
}
