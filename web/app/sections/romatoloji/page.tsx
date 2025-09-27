// FILE: web/app/sections/romatoloji/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";


export const dynamic = "force-dynamic";


const topicsRheum = [
{ title: "Romatoid Artrit", slug: "ra" },
{ title: "Sistemik Lupus Eritematozus (SLE)", slug: "sle" },
{ title: "Sjögren Sendromu", slug: "sjogren" },
{ title: "Sistemik Skleroz (Skleroderma)", slug: "skleroderma" },
{ title: "MCTD", slug: "mctd" },
{ title: "Polimiyaljia Romatika / Dev Hücreli Arterit", slug: "pmr-gca" },
{ title: "İnflamatuvar Miyopatiler (PM/DM/IMNM)", slug: "inflamatuvar-miyopatiler" },
{ title: "ANCA-Vaskülitleri (GPA/MPA)", slug: "anca-vaskulitleri" },
{ title: "Poliarteritis Nodoza (PAN)", slug: "pan" },
{ title: "IgA Vasküliti (HSP)", slug: "iga-vaskuliti" },
{ title: "Takayasu Arteriti", slug: "takayasu" },
{ title: "Behçet Hastalığı", slug: "behcet" },
{ title: "Gut", slug: "gut" },
{ title: "Psödogut (Kalsiyum Pirofosfat)", slug: "psodogut" },
{ title: "Psöriyatik Artrit", slug: "psoriatik-artrit" },
{ title: "Aksiyel Spondiloartrit / AS", slug: "aksiyel-spa" },
{ title: "Reaktif Artrit", slug: "reaktif-artrit" },
{ title: "Septik Artrit", slug: "septik-artrit" },
{ title: "Osteoartrit", slug: "osteoartrit" },
{ title: "Fibromiyalji", slug: "fibromiyalji" },
{ title: "FMF (Ailevi Akdeniz Ateşi)", slug: "fmf" },
{ title: "Sarkoidoz – Kas-İskelet Tutulumu", slug: "sarkoidoz" },
{ title: "Antifosfolipid Sendromu", slug: "aps" },
{ title: "Raynaud Fenomeni", slug: "raynaud" },
{ title: "DMARD’lar ve Biyolojikler – İzlem", slug: "dmards-biyolojikler" },
{ title: "Gebelikte Romatolojik Hastalıklar", slug: "gebelikte-romatoloji" },
];


export default function RomatolojiSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">Romatoloji</h1>
</div>
<div className="text-sm">
<Link href="/" className="underline">Ana Sayfa</Link>
<span className="mx-2">/</span>
<span className="text-gray-500">Romatoloji</span>
</div>
</div>


<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsRheum.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}