// FILE: web/app/sections/geriatri/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";
export const dynamic = "force-dynamic";


const topicsGeri = [
{ title: "Kapsamlı Geriatrik Değerlendirme", slug: "kgd" },
{ title: "Frailty (Kırılganlık) Yönetimi", slug: "frailty" },
{ title: "Polifarmasi ve Potansiyel Yersiz İlaçlar", slug: "polifarmasi" },
{ title: "Deliryum – Tanı ve Önleme", slug: "deliryum" },
{ title: "Demans – Tanı ve Tedavi Prensipleri", slug: "demans" },
{ title: "Düşmeler ve Osteoporoz", slug: "dusmeler-osteoporoz" },
{ title: "İdrar İnkontinansı", slug: "inkontinans" },
{ title: "Beslenme ve Sarkopeni", slug: "sarkopeni" },
{ title: "Basınç Ülserleri Önleme/Yönetim", slug: "basinc-ulseri" },
{ title: "Ağrı Yönetimi (Yaşlı)", slug: "agri-yonetimi-yasli" },
{ title: "Aşılar ve Profilaksi (Yaşlı)", slug: "asilar-yasli" },
{ title: "Kognitif Tarama Testleri", slug: "kognitif-testler" },
];


export default function GeriatriSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">Geriatri</h1>
</div>
<div className="text-sm"><Link href="/" className="underline">Ana Sayfa</Link><span className="mx-2">/</span><span className="text-gray-500">Geriatri</span></div>
</div>
<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsGeri.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}