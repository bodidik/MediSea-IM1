// FILE: web/app/sections/page.tsx
import Link from "next/link";
import navConfig from "@/app/config/nav";
export const revalidate = 0;
export const dynamic = "force-dynamic";
export default function SectionsIndex() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Bölümler</h1>
        <Link href="/topics" className="text-sm underline opacity-80 hover:opacity-100">Konular →</Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {navConfig.sections.map((s) => (
          <li key={s.href} className="rounded-2xl border p-4 bg-white hover:shadow-sm">
            <Link href={s.href} className="text-base font-semibold underline block">
              {s.label}
            </Link>
            <div className="text-xs text-gray-500 mt-1">Bölüm alanı</div>
          </li>
        ))}
      </ul>
    </div>
  );
}







