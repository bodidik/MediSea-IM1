export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"title":"Differential Diagnosis","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/differential-diagnosis"},{"title":"Epidemiology","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/epidemiology"},{"title":"Overview","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/overview"},{"title":"Clinical Features","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/clinical-features"},{"title":"Comorbidities And Complications","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/comorbidities-and-complications"},{"title":"Laboratory And İmaging","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/laboratory-and-imaging"},{"title":"Special Populations","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/special-populations"},{"title":"Pathogenesis","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/pathogenesis"},{"title":"Classification Diagnostic Criteria","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/classification-diagnostic-criteria"},{"title":"Treatment","href":"/en/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi/treatment"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Safra Yollari Ve Safra Kesesi — Index</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it:any) => (
          <Link key={it.href} href={it.href} className="block border rounded-xl p-4 hover:shadow">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm opacity-70">{it.href.split("/").slice(-1)[0]}</div>
          </Link>
        ))}
      </div>
      <hr className="my-6" />
      <p className="text-sm opacity-70">
        Looking for Turkish content?{" "}
        <Link className="underline" href={items.length ? items[0].href.replace('/en/','/').split('/').slice(0,-1).join('/') : "#"}>
          View TR topic
        </Link>
      </p>
    </main>
  );
}