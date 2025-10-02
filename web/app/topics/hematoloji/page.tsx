export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"href":"/topics/hematoloji/demir-eksikligi-anemisi","title":"Demir Eksikliği Anemisi"},{"href":"/topics/hematoloji/b12-folat-eksikligi-anemileri","title":"B12/Folat Eksikliği Anemileri"},{"href":"/topics/hematoloji/hemolitik-anemiler","title":"Hemolitik Anemiler"},{"href":"/topics/hematoloji/talasemi-ve-hemoglobinopatiler","title":"Talasemi ve Hemoglobinopatiler"},{"href":"/topics/hematoloji/orak-hucre-hastaligi","title":"Orak Hücre Hastalığı"},{"href":"/topics/hematoloji/trombositopeniler-ve-itp","title":"Trombositopeniler ve ITP"},{"href":"/topics/hematoloji/kanama-bozukluklari-hemofili-vwd","title":"Kanama Bozuklukları (Hemofili, vWD)"},{"href":"/topics/hematoloji/tromboz-ve-trombofili","title":"Tromboz ve Trombofili"},{"href":"/topics/hematoloji/lenfomalar","title":"Lenfomalar"},{"href":"/topics/hematoloji/multiple-myelom-ve-mgüs","title":"Multiple Myelom ve MGÜS"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hematoloji — Dizin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it:any) => (
          <Link key={it.href} href={it.href} className="block border rounded-xl p-4 hover:shadow">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm opacity-70">{it.href.split("/").slice(-1)[0]}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}