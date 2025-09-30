import { NextRequest } from "next/server";
import { backendBase } from "@/lib/backend";
export async function GET(req: NextRequest){
const backend = backendBase();
  const cookies = req.headers.get("cookie") || "";
  const userMatch = cookies.match(/(?:^|; )mk_uid=([^;]+)/);
  const userId = userMatch?.[1] || "guest";
  const url = new URL("/api/counts", backend);
  url.searchParams.set("userId", userId);
  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
}






