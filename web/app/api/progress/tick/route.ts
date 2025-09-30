import { NextRequest } from "next/server";
import { backendBase } from "@/lib/backend";
export async function POST(req: NextRequest) {
const backend = backendBase();
  const cookies = req.headers.get("cookie") || "";
  const m = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const userId = m?.[1] || "guest";
  const correct = req.nextUrl.searchParams.get("correct") ?? "true";
  const url = new URL("/api/progress/tick", backend);
  url.searchParams.set("userId", userId);
  url.searchParams.set("correct", correct);
  const r = await fetch(url.toString(), { method: "POST" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}






