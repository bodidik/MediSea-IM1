import { NextRequest } from "next/server";
export async function GET(req: NextRequest){
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000"}";
  const cookies = req.headers.get("cookie") || "";
  const userMatch = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const userId = userMatch?.[1] || "guest";
  const url = new URL("/api/counts", backend);
  url.searchParams.set("userId", userId);
  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
}

