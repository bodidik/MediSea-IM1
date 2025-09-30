// FILE: web/app/api/plan/upgrade/route.ts
import { backendBase } from "@/lib/backend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
const backend = backendBase();

  // mk_uid â†’ externalId
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  // backendâ€™e proxy: /api/plan/upgrade
  const url = new URL("/api/plan/upgrade", backend);
  url.searchParams.set("externalId", externalId);

  const r = await fetch(url.toString(), { method: "POST" });
  const j = await r.json();

  // BaÅŸarÄ±lÄ±ysa plan=P Ã§erezi set et
  const res = NextResponse.json(j, { status: r.status });
  if (r.ok) {
    res.cookies.set({
      name: "plan",
      value: "P",            // Premium
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 yÄ±l
    });
  }
  return res;
}






