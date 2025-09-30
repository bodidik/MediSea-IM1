// FILE: web/app/api/plan/set/route.ts
import { backendBase } from "@/lib/backend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase();
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const externalId = m?.[1] || "guest";

  // body veya query'den plan al
  const urlPlan = req.nextUrl.searchParams.get("plan");
  let bodyPlan: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    bodyPlan = body?.plan;
  } catch {
    bodyPlan = undefined;
  }
  const plan = (urlPlan || bodyPlan || "free").toLowerCase();

  // backendâ€™e proxy: /api/plan/set
  const url = new URL("/api/plan/set", backend);
  url.searchParams.set("externalId", externalId);
  url.searchParams.set("plan", plan);

  const r = await fetch(url.toString(), { method: "POST" });
  const j = await r.json();

  // Frontend Ã§erezini senkron tut
  const res = NextResponse.json(j, { status: r.status });
  const cookieVal = plan === "premium" || plan === "pro" ? "P" : "V"; // V=visitor/basic
  res.cookies.set({
    name: "plan",
    value: cookieVal,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}





