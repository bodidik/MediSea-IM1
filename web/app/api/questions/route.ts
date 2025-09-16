import { cookies } from "next/headers";

/**
 * Proxy: /api/questions  →  BACKEND:/api/questions
 * Örnek: /api/questions?module=nefroloji&limit=5
 */
export async function GET(req: Request) {
  try {
    const backend =
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ||
      "http://127.0.0.1:4000";

    const inUrl = new URL(req.url);

    // Backend URL’sini hazırlayalım
    const outUrl = new URL(backend + "/api/questions");

    // İzin verdiğimiz query parametreleri (gerektikçe ekleyebilirsin)
    const passthroughParams = [
      "module",       // bizim FE’de kullandığımız isim
      "section",      // BE "section" bekliyorsa
      "limit",
      "offset",
      "planLevel",    // V/M/P override için testlerde işe yarar
      "seed",         // randomizasyon varsa
      "lang",         // TR/EN
    ] as const;

    for (const key of passthroughParams) {
      const v = inUrl.searchParams.get(key);
      if (v !== null) outUrl.searchParams.set(key, v);
    }

    // module alias’ını section’a da yansıt (BE section beklerse)
    if (inUrl.searchParams.has("module") && !inUrl.searchParams.has("section")) {
      outUrl.searchParams.set("section", String(inUrl.searchParams.get("module")));
    }

    // Kullanıcı ve plan bilgisi (cookie → backend)
    const jar = cookies();
    const mkUid = jar.get("mk_uid")?.value || "guest";
    outUrl.searchParams.set("externalId", mkUid);

    const planCookie = jar.get("mk_plan")?.value?.toUpperCase();
    const headers = new Headers();
    if (planCookie && ["V", "M", "P"].includes(planCookie)) {
      headers.set("x-plan", planCookie);
    }

    // Backend’e isteği ilet
    const res = await fetch(outUrl.toString(), {
      headers,
      cache: "no-store",
      // timeout/cors vs. gerekirse buraya eklenir
    });

    // Backend ne döndürdüyse onu iletelim
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("content-type") || "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "proxy_failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
