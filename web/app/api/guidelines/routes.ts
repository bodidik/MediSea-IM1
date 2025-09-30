import { NextResponse } from "next/server";

export const runtime = "nodejs";          // edge deÄŸil, Node runtime
export const dynamic = "force-dynamic";   // cache yok

export async function GET(req: Request) {
  // Ã–nce server runtime env, sonra public, en sonda dev fallback
const backendBase = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase.replace(/\/+$/, "");

  const { search } = new URL(req.url);

  // 8 sn timeout (upstream takÄ±lÄ±rsa kullanÄ±cÄ± beklemesin)
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${backend}/api/guidelines${search}`, {
      cache: "no-store",
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(t);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "Upstream error", status: res.status, body },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    clearTimeout(t);
    return NextResponse.json(
      { error: "Upstream fetch failed", message: err?.message ?? String(err) },
      { status: 502 }
    );
  }
}



