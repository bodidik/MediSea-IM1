export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";

const sections = [
  { href: "/en/sections/romatoloji", title: "Rheumatology" },
  { href: "/en/sections/hematoloji", title: "Hematology" },
  { href: "/en/sections/endokrinoloji", title: "Endocrinology" },
  { href: "/en/sections/nefroloji", title: "Nephrology" },
  { href: "/en/sections/gastroenteroloji", title: "Gastroenterology" },
  { href: "/en/sections/kardiyoloji", title: "Cardiology" },
  { href: "/en/sections/enfeksiyon-hastaliklari", title: "Infectious Diseases" },
  { href: "/en/sections/onkoloji-hematolojik-onkoloji", title: "Oncology & Hematologic Oncology" },
  { href: "/en/sections/pulmonoloji", title: "Pulmonology" },
  { href: "/en/sections/alerji-immunoloji", title: "Allergy & Immunology" },
  { href: "/en/sections/geriatri-genel-dahiliye", title: "Geriatrics & General Medicine" },
  { href: "/en/sections/yogun-bakim-acil-dahiliye", title: "Critical Care & Emergency Medicine" },
  { href: "/en/sections/palyatif-bakim", title: "Palliative Care" }
  // Health Board (saglik-kurulu) intentionally omitted in EN
];

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">MediSea — Internal Medicine (EN)</h1>
      <p className="opacity-70 mb-6">Pick a section to browse its topics in English.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(it => (
          <Link key={it.href} href={it.href} className="block border rounded-xl p-4 hover:shadow">
            <div className="font-semibold">{it.title}</div>
            <div className="text-xs opacity-60">{it.href}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}


