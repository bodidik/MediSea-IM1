export const dynamic = "force-dynamic";
// FILE: web/app/guidelines/[slug]/page.tsx
import Link from "next/link";

// ✅ ISR: yaklaşık 30 gün
export const revalidate = 60 * 60 * 24 * 30;

// Tekil guideline için tag seti
const gTags = (slug: string) => [
  `guideline:${slug}`,
  "guidelines:detail",
  // Detay güncellenince liste de tazelensin istersen admin çağrısında ayrıca "guidelines:list" gönderirsin
];

type Guideline = {
  _id?: string;
  title: string;
  org?: string;
  year?: number | null;
  section?: string;
  lang?: "TR" | "EN";
  url?: string;
  createdAt?: string;
};

type Resp = { ok: boolean; item?: Guideline; error?: string };

export default async function GuidelineDetail({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4000";

  // ✅ ISR + tag’li fetch
  const res = await fetch(`${backend}/api/guidelines/${slug}`, {
    next: { revalidate, tags: gTags(slug) },
  });

  if (!res.ok) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link href="/guidelines" className="text-sm underline">
          ← Geri
        </Link>
        <h1 className="text-2xl font-bold mt-2">Kılavuz bulunamadı</h1>
        <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
      </div>
    );
  }

  const { item } = (await res.json()) as Resp;
  if (!item) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link href="/guidelines" className="text-sm underline">
          ← Geri
        </Link>
        <h1 className="text-2xl font-bold mt-2">Kılavuz kaydı boş</h1>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">
            {item.section || "-"} · {item.lang || "TR"}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mt-1">{item.title}</h1>
          <div className="text-sm text-gray-600 mt-1">
            {item.org || "—"} {item.year ? `· ${item.year}` : ""}
          </div>
        </div>
        <Link href="/guidelines" className="text-sm underline">
          ← Geri
        </Link>
      </div>

      <div className="rounded-2xl border p-4 bg-white space-y-2">
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-3 py-2 rounded-lg border text-sm underline"
          >
            Orijinal Kaynağı Aç
          </a>
        ) : (
          <p className="text-sm text-gray-500">URL tanımlı değil</p>
        )}
        {item.createdAt && (
          <p className="text-xs text-gray-400">
            Eklenme tarihi: {new Date(item.createdAt).toLocaleDateString("tr-TR")}
          </p>
        )}
      </div>
    </div>
  );
}

