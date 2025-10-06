// FILE: web/app/programs/[slug]/enroll/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic"; // statik çıkarmaya zorlama
export const revalidate = 0;

type PageProps = { params: { slug: string } };

export default function EnrollPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="text-sm">
        <Link href="/programs" className="underline">
          ← Tüm programlar
        </Link>
      </div>

      <h1 className="text-2xl font-semibold">Kayıt: {slug}</h1>

      <p className="text-sm text-neutral-600">
        Bu sayfa UI bileşenidir. HTTP metodları için aynı klasörde <code>route.ts</code> kullanılır.
      </p>

      {/* İleride kayıt formu / CTA buraya gelecek */}
      <div className="border rounded-lg p-4">
        <p>Program detayları ve kayıt bileşenleri burada gösterilecek.</p>
      </div>
    </div>
  );
}

