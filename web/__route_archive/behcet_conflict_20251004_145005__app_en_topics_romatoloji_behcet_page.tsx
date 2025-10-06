export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"title":"Behcet Disbiyoz","href":"/en/topics/romatoloji/behcet/behcet-disbiyoz"},{"title":"Behcet Mikroorganizmalar","href":"/en/topics/romatoloji/behcet/behcet-mikroorganizmalar"},{"title":"Gebelik","href":"/en/topics/romatoloji/behcet/gebelik"},{"title":"Mikrobiyota Modulasyon","href":"/en/topics/romatoloji/behcet/mikrobiyota-modulasyon"},{"title":"Mukokutanoz","href":"/en/topics/romatoloji/behcet/mukokutanoz"},{"title":"Neuro Behcet","href":"/en/topics/romatoloji/behcet/neuro-behcet"},{"title":"Oral Ulserler","href":"/en/topics/romatoloji/behcet/oral-ulserler"},{"title":"Treatment","href":"/en/topics/romatoloji/behcet/treatment"},{"title":"Uveit","href":"/en/topics/romatoloji/behcet/uveit"},{"title":"Vaskuler Tutulum","href":"/en/topics/romatoloji/behcet/vaskuler-tutulum"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Behcet — Index</h1>
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

