// FILE: web/app/api/content/preview/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const ids = req.nextUrl.searchParams.getAll("ids"); // çoklu ids desteği
  const url = new URL("/api/content/preview", backend);
  if (ids.length) {
    for (const v of ids) {
      // virgüllüyse bölmeden olduğu gibi geçelim (backend bölüyor)
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
