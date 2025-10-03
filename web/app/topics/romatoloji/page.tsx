export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

const items = [{"href":"/topics/romatoloji/behcet","title":"Behçet Sendromu"},{"href":"/topics/romatoloji/sistemik-lupus-eritematozus","title":"Sistemik Lupus Eritematozus (SLE)"},{"href":"/topics/romatoloji/antifosfolipid-sendromu","title":"Antifosfolipid Sendromu (APS)"},{"href":"/topics/romatoloji/romatoid-artrit","title":"Romatoid Artrit (RA)"},{"href":"/topics/romatoloji/akut-romatizmal-ates","title":"Akut Romatizmal Ateş"},{"href":"/topics/romatoloji/sistemik-skleroz","title":"Sistemik Skleroz (Skleroderma) ve İlişkili Bozukluklar"},{"href":"/topics/romatoloji/sjogrens-hastaligi","title":"Sjögren Hastalığı"},{"href":"/topics/romatoloji/spondiloartrit","title":"Spondiloartrit"},{"href":"/topics/romatoloji/vaskulit-sindromlari","title":"Vaskülit Sendromları"},{"href":"/topics/romatoloji/inflamatuvar-miyopatiler","title":"İnflamatuvar Miyopatiler"},{"href":"/topics/romatoloji/tekrarlayan-polikondrit","title":"Tekrarlayan Polikondrit"},{"href":"/topics/romatoloji/sarkoidoz","title":"Sarkoidoz"},{"href":"/topics/romatoloji/igg4-iliskili-hastalik","title":"IgG4-İlişkili Hastalık"},{"href":"/topics/romatoloji/ailevi-akdeniz-atesi-otoenflamatuvar","title":"Ailevi Akdeniz Ateşi ve Diğer Otoenflamatuvar Hastalıklar"},{"href":"/topics/romatoloji/osteoartrit","title":"Osteoartrit"},{"href":"/topics/romatoloji/gut-ve-diger-kristal-artropatileri","title":"Gut ve Diğer Kristal Artropatileri"}];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Romatoloji — Dizin</h1>
      <p className="opacity-70 mb-6">Harrison temelli başlıklar; içerikler kademeli olarak eklenecektir.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it:any) => (
          <Link key={it.href} href={it.href} className="block border rounded-xl p-4 hover:shadow">
            <div className="font-semibold">{it.title}</div>
            <div className="text-xs opacity-60">{it.href.split("/").slice(-1)[0]}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}