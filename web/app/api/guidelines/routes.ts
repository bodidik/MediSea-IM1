import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const url = new URL(req.url);
  const qs = url.search;
  const res = await fetch(`${backend}/api/guidelines${qs}`, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data);
}
