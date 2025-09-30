// FILE: web/app/api/revalidate/route.ts
// On-Demand Revalidation for App Router (Next.js 14)
import { backendBase } from "@/lib/backend";
// Secure with Bearer token. Supports tag(s) and path(s).

import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const runtime = "nodejs"; // cache APIs require Node runtime

function unauthorized(msg = "Unauthorized") {
  return NextResponse.json({ ok: false, error: msg }, { status: 401 });
}

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "REVALIDATE_SECRET missing" }, { status: 500 });
  }
  if (token !== process.env.REVALIDATE_SECRET) {
    return unauthorized();
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    // allow empty body
  }

  const tags: string[] = [];
  const paths: string[] = [];

  if (typeof body?.tag === "string") tags.push(body.tag);
  if (Array.isArray(body?.tags)) tags.push(...body.tags.filter((x: any) => typeof x === "string"));

  if (typeof body?.path === "string") paths.push(body.path);
  if (Array.isArray(body?.paths)) paths.push(...body.paths.filter((x: any) => typeof x === "string"));

  // No input? Fail fast
  if (tags.length === 0 && paths.length === 0) {
    return NextResponse.json({ ok: false, error: "Provide tag(s) or path(s)" }, { status: 400 });
  }

  // Deduplicate
  const uniqTags = [...new Set(tags)];
  const uniqPaths = [...new Set(paths)];

  // Revalidate
  for (const t of uniqTags) revalidateTag(t);
  for (const p of uniqPaths) revalidatePath(p);

  return NextResponse.json({ ok: true, revalidated: { tags: uniqTags, paths: uniqPaths } });
}

export function GET() {
  // Optional health endpoint (does not revalidate). Useful for uptime checks.
  return NextResponse.json({ ok: true, service: "revalidate" });
}

