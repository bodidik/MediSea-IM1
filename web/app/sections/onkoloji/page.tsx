// FILE: web/app/sections/onkoloji/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";
export const dynamic = "force-dynamic";


const topicsOnc = [
{ title: "Genel Onkoloji Prensipleri", slug: "onkoloji-prensipler" },
{ title: "Akciğer Kanseri – Küçük Hücreli Dışı", slug: "nsclc" },
{ title: "Akciğer Kanseri – Küçük Hücreli", slug: "sclc" },
{ title: "Meme Kanseri – Erken/Metastatik", slug: "meme-kanseri" },
{ title: "Kolorektal Kanser", slug: "kolorektal-kanser" },
{ title: "Pankreas ve Safra Yolu Kanserleri", slug: "pankreas-kolanjio" },
{ title: "Mide Kanseri", slug: "mide-kanseri" },
{ title: "Prostat Kanseri", slug: "prostat-kanseri" },
{ title: "Böbrek ve Mesane Kanserleri", slug: "urolojik-kanserler" },
{ title: "Over/Uterus Serviks Kanserleri", slug: "jinekolojik-kanserler" },
{ title: "Lenfomalar (Hodgkin/Dışı)", slug: "lenfomalar" },
{ title: "Multipl Miyelom", slug: "multipl-miyelom" },
{ title: "İmmünoterapi ve İlişkili Yan Etkiler", slug: "immunoterapi-yanetki" },
{ title: "Hedefe Yönelik Tedaviler – Özet", slug: "hedefe-yonelik" },
{ title: "Kansere Bağlı Aciller (SVC, TLS vb.)", slug: "onkolojik-aciller" },
{ title: "Palyatif Bakım Temelleri", slug: "palyatif-bakim" },
];


export default function OnkolojiSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">Onkoloji</h1>
</div>
<div className="text-sm"><Link href="/" className="underline">Ana Sayfa</Link><span className="mx-2">/</span><span className="text-gray-500">Onkoloji</span></div>
</div>
<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsOnc.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}