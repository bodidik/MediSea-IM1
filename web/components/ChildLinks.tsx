import fs from "fs";
import path from "path";
import Link from "next/link";

type Props = { appSubPath: string; premiumHref?: string; premiumLabel?: string };

const toTitle = (s: string) =>
  s.split("-").map(w => w && w[0].toLocaleUpperCase("tr-TR")+w.slice(1)).join(" ");

function getChildren(appSubPath: string){
  const base = path.join(process.cwd(), "app", appSubPath);
  try {
    return fs.readdirSync(base, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .filter(slug => fs.existsSync(path.join(base, slug, "page.tsx")))
      .map(slug => ({ slug, title: toTitle(slug), href: `/${appSubPath}/${slug}` }))
      .sort((a,b)=>a.title.localeCompare(b.title,"tr"));
  } catch { return []; }
}

export default function ChildLinks({ appSubPath, premiumHref, premiumLabel }: Props){
  const items = getChildren(appSubPath);
  if (!items.length && !premiumHref) return null;
  return (
    <section className="mt-10">
      {items.length>0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Alt Başlıklar</h2>
          <ul className="list-disc pl-5 space-y-1">
            {items.map(x=>(
              <li key={x.slug}><Link href={x.href}>{x.title}</Link></li>
            ))}
          </ul>
        </>
      )}
      {premiumHref && (
  <div className="mt-6">
    <Link
      className="inline-flex items-center rounded-2xl px-4 py-2 text-white font-semibold shadow-md transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
      href={premiumHref}
      style={{ backgroundImage: "linear-gradient(90deg,#7c3aed,#2563eb)" }}
    >
      {premiumLabel ?? "Premium"}
      <span className="ml-2">→</span>
    </Link>
  </div>
)}
    </section>
  );
}

