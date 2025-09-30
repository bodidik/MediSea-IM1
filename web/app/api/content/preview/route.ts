// FILE: web/app/api/content/preview/route.ts
import { backendBase } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
const backend = backendBase();
  const ids = req.nextUrl.searchParams.getAll("ids"); // Ã§oklu ids desteÄŸi
  const url = new URL("/api/content/preview", backend);
  if (ids.length) {
    for (const v of ids) {
      // virgÃ¼llÃ¼yse bÃ¶lmeden olduÄŸu gibi geÃ§elim (backend bÃ¶lÃ¼yor)
      url.searchParams.append("ids", v);
    }
  }
  const r = await fetch(url.toString(), { cache: "no-store" });
  const j = await r.json();
  return new Response(JSON.stringify(j), {
    headers: { "Content-Type": "application/json" },
    status: r.status
  });
}





