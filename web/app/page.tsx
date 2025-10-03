export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const sections = [
  { href: "/sections/romatoloji", title: "Romatoloji" },
  { href: "/sections/hematoloji", title: "Hematoloji" },
  { href: "/sections/endokrinoloji", title: "Endokrinoloji" },
  { href: "/sections/nefroloji", title: "Nefroloji" },
  { href: "/sections/gastroenteroloji", title: "Gastroenteroloji" },
  { href: "/sections/kardiyoloji", title: "Kardiyoloji" },
  { href: "/sections/enfeksiyon-hastaliklari", title: "Enfeksiyon Hastalıkları" },
  { href: "/sections/onkoloji-hematolojik-onkoloji", title: "Onkoloji & Hematolojik Onkoloji" },
  { href: "/sections/pulmonoloji", title: "Göğüs Hastalıkları / Pulmonoloji" },
  { href: "/sections/alerji-immunoloji", title: "Alerji & İmmünoloji" },
  { href: "/sections/geriatri-genel-dahiliye", title: "Geriatri & Genel Dahiliye" },
  { href: "/sections/yogun-bakim-acil-dahiliye", title: "Yoğun Bakım & Acil Dahiliye" },
  { href: "/sections/saglik-kurulu", title: "Sağlık Kurulu" },
  { href: "/sections/palyatif-bakim", title: "Palyatif Bakım" },
];

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">İç Hastalıkları (MediSea)</h1>
      <p className="opacity-70 mb-6">Bölüm seçerek ilgili konu dizinine gidebilirsiniz.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(it => (
          <Link key={it.href} href={it.href} className="block border rounded-xl p-4 hover:shadow focus:outline-none focus:ring">
            <div className="font-semibold">{it.title}</div>
            <div className="text-xs opacity-60">{it.href}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}