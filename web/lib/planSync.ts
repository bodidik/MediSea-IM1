// FILE: web/lib/planSync.ts
"use server";
import { cookies } from "next/headers";

export async function syncPlan() {
const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";
  const cookieStore = cookies();
  const externalId = cookieStore.get("mk_uid")?.value || "guest";

  try {
    const url = new URL("/api/counts", backend);
    url.searchParams.set("externalId", externalId);
    const r = await fetch(url.toString(), { cache: "no-store" });
    if (!r.ok) return;
    const j = await r.json();
    const backendPlan = j?.user?.plan ? "P" : "V";

    const cookiePlan = cookieStore.get("plan")?.value || "V";
    if (cookiePlan !== backendPlan) {
      (cookieStore as any).set("plan", backendPlan, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
  } catch (e) {
    console.error("syncPlan error", e);
  }
}



