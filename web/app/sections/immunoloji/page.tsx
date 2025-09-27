// FILE: web/app/sections/immunoloji/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";
export const dynamic = "force-dynamic";


const topicsImmun = [
{ title: "Primer İmmün Yetmezliklere Yaklaşım", slug: "piy-yaklasim" },
{ title: "Sekonder İmmün Yetmezlik (İlaç/KH)", slug: "siy" },
{ title: "Alerjik Hastalıklara Genel Yaklaşım", slug: "alerji-genel" },
{ title: "Anafilaksi – Acil Yönetim", slug: "anafilaksi" },
{ title: "Serum Hastalığı ve İlaç Alerjileri", slug: "serum-hastaligi" },
{ title: "Kompleman Bozuklukları – Özet", slug: "kompleman-bozukluklari" },
{ title: "Sitokin Fırtınası ve HLH", slug: "hlh-sitokin" },
{ title: "Aşılara İmmün Yanıt – Özel Durumlar", slug: "asilara-yanit" },
];


export default function ImmunolojiSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">İmmünoloji</h1>
</div>
<div className="text-sm"><Link href="/" className="underline">Ana Sayfa</Link><span className="mx-2">/</span><span className="text-gray-500">İmmünoloji</span></div>
</div>
<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsImmun.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}