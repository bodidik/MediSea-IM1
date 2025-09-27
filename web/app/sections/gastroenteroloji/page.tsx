// FILE: web/app/sections/gastroenteroloji/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";


export const dynamic = "force-dynamic";


const topicsGI = [
{ title: "GÖRH", slug: "gorh" },
{ title: "Peptik Ülser ve H. pylori", slug: "peptik-ulser-hpylori" },
{ title: "Üst GİS Kanama – Yaklaşım", slug: "ust-gis-kanama" },
{ title: "Alt GİS Kanama – Yaklaşım", slug: "alt-gis-kanama" },
{ title: "İrritabl Barsak Sendromu (IBS)", slug: "ibs" },
{ title: "Ülseratif Kolit", slug: "ulseratif-kolit" },
{ title: "Crohn Hastalığı", slug: "crohn" },
{ title: "Mikroskopik Kolit", slug: "mikroskopik-kolit" },
{ title: "Akut Pankreatit", slug: "akut-pankreatit" },
{ title: "Kronik Pankreatit", slug: "kronik-pankreatit" },
{ title: "Koledokolitiazis ve Kolanjit", slug: "koledok-kolanjit" },
{ title: "Kolesistit", slug: "kolesistit" },
{ title: "NAFLD/NASH", slug: "nafld-nash" },
{ title: "Viral Hepatit B", slug: "hepatit-b" },
{ title: "Viral Hepatit C", slug: "hepatit-c" },
{ title: "Siroz – Komplikasyonlar (Asit, Varis, HE)", slug: "siroz-komplikasyonlar" },
{ title: "HCC Tarama ve İzlem", slug: "hcc-tarama" },
{ title: "PSC ve PBC", slug: "psc-pbc" },
{ title: "Otoimmün Hepatit", slug: "otoimmun-hepatit" },
{ title: "Çölyak Hastalığı", slug: "colyak" },
{ title: "Malabsorpsiyon Sendromları", slug: "malabsorpsiyon" },
{ title: "Akut Kolestatik Sarılık", slug: "kolestatik-sarilik" },
{ title: "Divertikülit", slug: "divertikulit" },
{ title: "Kolorektal Kanser Tarama", slug: "kolorektal-tarama" },
{ title: "Polipler ve Yönetimi", slug: "polip-yonetimi" },
{ title: "SBBO (SIBO)", slug: "sibo" },
{ title: "Kısa Barsak Sendromu", slug: "kisa-barsak" },
{ title: "Motilite Bozuklukları (Akhalazi vb.)", slug: "motilite-bozukluklari" },
];


export default function GastroSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">Gastroenteroloji</h1>
</div>
<div className="text-sm">
<Link href="/" className="underline">Ana Sayfa</Link>
<span className="mx-2">/</span>
<span className="text-gray-500">Gastroenteroloji</span>
</div>
</div>


<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsGI.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}