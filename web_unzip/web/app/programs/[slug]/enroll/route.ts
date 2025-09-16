// FILE: web/app/programs/[slug]/enroll/route.ts
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  return new Response(
    JSON.stringify({ ok: false, error: "Use /programs/[slug]/enroll page for UI" }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
}
