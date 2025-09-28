// FILE: web/app/cases/page.tsx
import Link from "next/link";

// ✅ ISR: yaklaşık 30 gün
export const revalidate = 60 * 60 * 24 * 30;

// Liste için cache tag’leri (on‑demand revalidation ile bozulur)
const listTags = ["cases:list"] as const;

type CaseRow = {
  slug: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
};

type ListResp = { ok: boolean; items?: CaseRow[]; error?: string };

export default async function CasesIndexPage() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";

  // ✅ ISR + tag’li fetch
  const r = await fetch(`${backend}/api/cases`, {
    next: { revalidate, tags: [...listTags] },
  });

  if (!r.ok) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="rounded-xl border p-3 text-sm text-red-600 bg-white">Liste alınamadı</div>
      </div>
    );
  }

  const data = (await r.json()) as ListResp;
  const rows = data.ok ? data.items || [] : [];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Vaka Çözümleri</h1>
        {/* İstersen client taraflı bir yenile düğmesi yerine sayfayı yeniden ziyaret etmek yeterli */}
        <Link href="/cases" className="px-3 py-2 rounded-lg border text-sm">Yenile</Link>
      </div>

      <p className="text-sm text-gray-600">Klinik öykü toplama pratiği için soru soran vaka akışları.</p>

      {rows.length === 0 ? (
        <div className="text-sm text-gray-500">Kayıtlı vaka bulunamadı.</div>
      ) : (
        <ul className="grid gap-3">
          {rows.map((c) => (
            <li key={c.slug} className="rounded-2xl border p-4 bg-white flex items-center justify-between">
              <div>
                <div className="font-medium">{c.title}</div>
                {(c.updatedAt || c.createdAt) && (
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(c.updatedAt || c.createdAt!).toLocaleString("tr-TR")}
                  </div>
                )}
              </div>
              <Link href={`/cases/${encodeURIComponent(c.slug)}`} className="px-3 py-2 rounded-lg border text-sm">
                Aç
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


