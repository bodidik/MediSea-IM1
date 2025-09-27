// FILE: web/app/sections/infeksiyon/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";
export const dynamic = "force-dynamic";


const topicsID = [
{ title: "Sepsis ve Septik Şok", slug: "sepsis" },
{ title: "Pnömoni (Toplum / Hastane)", slug: "pnomoni" },
{ title: "Tüberküloz – Erişkin", slug: "tuberkuloz" },
{ title: "Endokardit (İnfektif)", slug: "infektif-endokardit" },
{ title: "İYE – Komplike/Komplike Olmayan", slug: "iye" },
{ title: "Selülit ve Yumuşak Doku İnf.", slug: "selulit" },
{ title: "Menenjit – Erişkin", slug: "menenjit" },
{ title: "Viral Hepatitler B/C", slug: "viral-hepatit" },
{ title: "HIV – Tanı ve Tedavi Prensipleri", slug: "hiv" },
{ title: "COVID-19 – Güncel Yaklaşım", slug: "covid-19" },
{ title: "Antibiyotik Seçimi – Ampirik", slug: "antibiyotik-empirik" },
{ title: "Ateşsiz İltihap Odakları (FUO)", slug: "fuo" },
{ title: "İnvaziv Mantar İnfeksiyonları", slug: "invaziv-mantar" },
{ title: "Kateter İlişkili İnfeksiyonlar", slug: "kateter-inf" },
{ title: "İmmünsüprese Hastada İnfeksiyon", slug: "immunsuprese-infeksiyon" },
{ title: "Seyahat İlişkili İnfeksiyonlar", slug: "seyahat-inf" },
{ title: "Aşılar – Erişkin", slug: "asilar-eriski" },
];


export default function InfeksiyonSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">İnfeksiyon</h1>
</div>
<div className="text-sm"><Link href="/" className="underline">Ana Sayfa</Link><span className="mx-2">/</span><span className="text-gray-500">İnfeksiyon</span></div>
</div>
<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsID.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}