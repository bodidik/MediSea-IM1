// FILE: web/app/sections/gogus/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";
export const dynamic = "force-dynamic";


const topicsPulm = [
{ title: "KOAH – Stabil ve Alevlenme", slug: "koah" },
{ title: "Astım – Kontrol ve Alevlenme", slug: "astim" },
{ title: "Pulmoner Emboli – Tanı/Tedavi", slug: "pulmoner-emboli" },
{ title: "Pnömoni (Toplum/Nozokomiyal)", slug: "pnomoni-pulm" },
{ title: "İnterstisyel Akciğer Hastalıkları", slug: "iah" },
{ title: "Sarkoidoz – Akciğer", slug: "sarkoidoz-akciger" },
{ title: "Pnömotoraks", slug: "pnomotoraks" },
{ title: "Pulmoner Hipertansiyon", slug: "pulmoner-hipertansiyon" },
{ title: "Obstrüktif Uyku Apnesi", slug: "oua" },
{ title: "Bronşiektazi", slug: "bronsiektazi" },
{ title: "Hemoptizi Yaklaşımı", slug: "hemoptizi" },
{ title: "Akciğer Kanseri – Özet", slug: "akciger-kanseri" },
{ title: "Tüberküloz – Akciğer", slug: "tuberkuloz-pulm" },
{ title: "Mesleki Akciğer Hastalıkları", slug: "mesleki-akciger" },
];


export default function GogusSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">Göğüs Hastalıkları</h1>
</div>
<div className="text-sm"><Link href="/" className="underline">Ana Sayfa</Link><span className="mx-2">/</span><span className="text-gray-500">Göğüs Hast.</span></div>
</div>
<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsPulm.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}