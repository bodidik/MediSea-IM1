export const revalidate = 0;
export const dynamic = "force-dynamic";
import Link from "next/link";

export default function Page() {
  return (
    <article className="prose prose-neutral max-w-4xl mx-auto p-6">
      <h1>İrritabl Bağırsak Sendromu (IBS) — Patogenez / Fizyoloji</h1>
      <p className="opacity-70">Bu sayfa için içerik yakında eklenecek.</p>
      <hr />
      <p><Link className="underline" href="/topics/gastroenteroloji/irritabl-bagirsak-sendromu-ibs">← Konu dizinine dön</Link></p>
    </article>
  );
}