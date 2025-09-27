// FILE: web/app/sections/hematoloji/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";


export const dynamic = "force-dynamic";


const topicsHeme = [
{ title: "Demir Eksikliği Anemisi", slug: "demir-eksikligi-anemisi" },
{ title: "Kronik Hastalık Anemisi", slug: "kronik-hastalik-anemisi" },
{ title: "B12 / Folat Eksikliği Anemisi", slug: "b12-folat-anemisi" },
{ title: "Hemolitik Anemiler – AIHA", slug: "aiha" },
{ title: "G6PD Eksikliği", slug: "g6pd-eksikligi" },
{ title: "Herediter Sferositoz", slug: "herediter-sferositoz" },
{ title: "Aplastik Anemi", slug: "aplastik-anemi" },
{ title: "MDS (Miyelodisplastik Sendrom)", slug: "mds" },
{ title: "MPN (PV/ET/MF)", slug: "mpn" },
{ title: "AML – Tanı ve Tedavi Prensipleri", slug: "aml" },
{ title: "ALL – Erişkin", slug: "all" },
{ title: "CML", slug: "cml" },
{ title: "CLL", slug: "cll" },
{ title: "Hodgkin Lenfoma", slug: "hodgkin-lenmoma" },
{ title: "DLBCL (Diffüz Büyük B Hücreli)", slug: "dlbcl" },
{ title: "Foliküler Lenfoma", slug: "folikuler-lenmoma" },
{ title: "Miyelom ve MGUS", slug: "miyelom-mgus" },
{ title: "ITP", slug: "itp" },
{ title: "TTP / HUS", slug: "ttp-hus" },
{ title: "HIT (Heparin İlişkili Trombositope)", slug: "hit" },
{ title: "DIC", slug: "dic" },
{ title: "Hemofili A/B", slug: "hemofili" },
{ title: "Von Willebrand Hastalığı", slug: "von-willebrand" },
{ title: "VTE (DVT/PE) – Tanı ve Tedavi", slug: "vte" },
{ title: "Trombofili – Kalıtsal/Kazanılmış", slug: "trombofili" },
{ title: "Febril Nötropeni", slug: "febril-notropeni" },
{ title: "Transfüzyon İlkeleri ve Reaksiyonlar", slug: "transfuzyon" },
{ title: "Demir, B12, Folat Tedavileri", slug: "demir-b12-folat-tedavi" },
{ title: "Hemostaz Laboratuvarı ve Yorum", slug: "hemostaz-lab" },
];


export default function HematolojiSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">Hematoloji</h1>
</div>
<div className="text-sm">
<Link href="/" className="underline">Ana Sayfa</Link>
<span className="mx-2">/</span>
<span className="text-gray-500">Hematoloji</span>
</div>
</div>


<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsHeme.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}