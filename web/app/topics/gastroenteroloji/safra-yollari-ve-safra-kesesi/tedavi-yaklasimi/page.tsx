export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>Safra Yolları ve Safra Kesesi Hastalıkları — Tedavi Yaklaşımı</h1>
      <p className="opacity-70">Bu sayfa için içerik yakında eklenecek.</p>
      <hr />
      <p><Link className="underline" href="/topics/gastroenteroloji/safra-yollari-ve-safra-kesesi">← Konu dizinine dön</Link></p>
    </article>
  );
}