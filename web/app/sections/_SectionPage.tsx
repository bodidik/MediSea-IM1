import Link from "next/link";
export default function SectionPageView({ section }: { section: string }) {
  const s = section.toLowerCase();
  const title = s === "behcet" ? "Behçet Hastalığı" : section.charAt(0).toUpperCase() + section.slice(1);
  return (
    <div className="mx-auto max-w-4xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">Bu sayfa <code>/sections/{section}</code> için placeholder.</p>
      {s === "behcet" && (
        <ul className="list-disc pl-5">
          <li><Link className="underline" href="/topics/romatoloji/behcet">Romatoloji → Behçet</Link></li>
          <li><Link className="underline" href="/topics/romatoloji/behcet/tromboz">Behçet ve Tromboz</Link></li>
          <li><Link className="underline" href="/topics/romatoloji/behcet/behcet-disbiyoz">Behçet ve Mikrobiyota</Link></li>
        </ul>
      )}
    </div>
  );
}


