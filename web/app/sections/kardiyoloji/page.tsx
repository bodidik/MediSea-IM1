// FILE: web/app/sections/kardiyoloji/page.tsx
import Link from "next/link";
import NavCard from "@/app/components/NavCard";
export const dynamic = "force-dynamic";

const topicsCard = [
  { title: "AKS (NSTEMI/STEMI) – Özet", slug: "aks-ozet" },
  { title: "Stabil/Kronik Koroner Sendrom", slug: "kronik-koroner" },
  { title: "Kalp Yetmezliği (HFrEF/HFpEF)", slug: "kalp-yetmezligi" },
  { title: "Aritmiler – AF Yönetimi", slug: "atriyal-fibrilasyon" },
  { title: "SVT ve VT/VF Yaklaşımı", slug: "svt-vt-vf" },
  { title: "AV Bloklar ve Pacemaker", slug: "av-blok-pacemaker" },
  { title: "Hipertansiyon – Kılavuz Odaklı", slug: "hipertansiyon" },
  { title: "Hipertansif Aciller", slug: "hipertansif-acil" },
  { title: "Perikardit/Perikardiyal Efüzyon", slug: "perikardit" },
  { title: "Endokardit – Duke Kriterleri", slug: "endokardit" },
  { title: "Valvüler Hastalıklar – AS/AR/MS/MR", slug: "valvulopatiler" },
  { title: "Kardiyomiyopatiler (DCM/HCM/RCM)", slug: "kardiyomiyopatiler" },
  { title: "Aort Diseksiyonu ve AAA", slug: "aort-diseksiyon-aaa" },
  { title: "Pulmoner Emboli – Kardiyak", slug: "pe-kardiyak" },
  { title: "Kardiyorenal Sendrom", slug: "kardiyorenal" },
  { title: "Antitrombotikler ve Antikoagülanlar", slug: "antitrombotikler" },
  { title: "Lipit Yönetimi (ASCVD)", slug: "lipit-yonetimi" },
  { title: "Spesifik Durumlar: Gebelikte Kardiyoloji", slug: "gebelikte-kardiyoloji" },
];

export default function KardiyolojiSection() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">Bölümler</div>
          <h1 className="text-2xl md:text-3xl font-semibold mt-1">Kardiyoloji</h1>
        </div>
        <div className="text-sm"><Link href="/" className="underline">Ana Sayfa</Link><span className="mx-2">/</span><span className="text-gray-500">Kardiyoloji</span></div>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {topicsCard.map((t) => (
          <NavCard key={t.slug} href={`/topics/${t.slug}`} title={t.title} description="Konu sayfasını aç" />
        ))}
      </section>
    </div>
  );
}

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
