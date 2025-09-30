import { NextRequest } from "next/server";
import { backendBase } from "@/lib/backend";
export async function GET(req: NextRequest, { params }: { params: { section: string } }){
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase();
  const url = new URL(`/api/sections/${decodeURIComponent(params.section)}`, backend);
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
}




