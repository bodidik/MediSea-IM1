// FILE: web/app/sections/endokrinoloji/page.tsx
// FILE: web/app/sections/<bolum>/page.tsx
export { default } from "../[section]/page";
export const dynamic = "force-dynamic";


const topicsEndo = [
{ title: "Tip 2 Diyabet – Tanı ve Tedavi", slug: "t2dm-tani-tedavi" },
{ title: "Tip 1 Diyabet ve İnsülin Yönetimi", slug: "t1dm-insulin-yonetimi" },
{ title: "DKA (Diyabetik Ketoasidoz)", slug: "dka" },
{ title: "HHS (Hiperozmolar Hiperglisemik Durum)", slug: "hhs" },
{ title: "Hipoglisemi – Değerlendirme ve Yönetim", slug: "hipoglisemi" },
{ title: "Obezite – Tıbbi Tedavi", slug: "obezite-tedavi" },
{ title: "Dislipidemi – Kılavuz Odaklı Yaklaşım", slug: "dislipidemi" },
{ title: "Tiroid Nodülü ve TI-RADS", slug: "tiroid-nodulu" },
{ title: "Graves Hastalığı ve Tiroid Fırtınası", slug: "graves-tiroit-firtinasi" },
{ title: "Hipotiroidi ve Miksedema Koması", slug: "hipotiroidi-miksedema" },
{ title: "Tiroiditler (Hashimoto, Subakut)", slug: "tiroiditler" },
{ title: "Diferansiye Tiroid Kanseri (Papiller/Folliküler)", slug: "tiroid-kanseri" },
{ title: "Primer Hiperparatiroidi", slug: "primer-hiperparatiroidi" },
{ title: "Hipoparatiroidi ve Hipokalsemi", slug: "hipoparatiroidi-hipokalsemi" },
{ title: "Hiperkalsemi – Ayırıcı Tanı ve Tedavi", slug: "hiperkalsemi" },
{ title: "Osteoporoz – Tarama ve Tedavi", slug: "osteoporoz" },
{ title: "Cushing Sendromu", slug: "cushing-sendromu" },
{ title: "Primer Adrenal Yetmezlik (Addison)", slug: "addison" },
{ title: "Feokromositoma ve Paraganglioma", slug: "feokromositoma" },
{ title: "Primer Hiperaldosteronizm", slug: "primer-hiperaldosteronizm" },
{ title: "Adrenal İnsidentaloma", slug: "adrenal-insidentaloma" },
{ title: "Prolaktinoma ve Hiperprolaktinemi", slug: "prolaktinoma" },
{ title: "Akromegali", slug: "akromegali" },
{ title: "Hipofiz Yetmezliği", slug: "hipofiz-yetmezligi" },
{ title: "Hipogonadizm (Erkek / Kadın)", slug: "hipogonadizm" },
{ title: "PCOS – Tanı ve Yönetim", slug: "pcos" },
{ title: "Gebelikte Diyabet (GDM)", slug: "gebelikte-diyabet" },
{ title: "MEN Sendromları (MEN1/MEN2)", slug: "men-sendromlari" },
{ title: "DI (Santral/Nephrojenik)", slug: "diabetes-insipidus" },
{ title: "SIADH – Özet", slug: "siadh-ozet" },
];


export default function EndokrinolojiSection() {
return (
<div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
<div className="flex items-center justify-between">
<div>
<div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
<h1 className="text-2xl md:text-3xl font-semibold mt-1">Endokrinoloji</h1>
</div>
<div className="text-sm">
<Link href="/" className="underline">Ana Sayfa</Link>
<span className="mx-2">/</span>
<span className="text-gray-500">Endokrinoloji</span>
</div>
</div>


<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
{topicsEndo.map((t) => (
<NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
))}
</section>
</div>
);
}