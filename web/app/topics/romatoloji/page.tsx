export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";
export default function RomatolojiIndex(){
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-3">Romatoloji</h1>
      <ul className="list-disc pl-5">
        <li><Link className="underline" href="/topics/romatoloji/behcet">Behçet Hastalığı</Link></li>
      </ul>
    </div>
  );
}
