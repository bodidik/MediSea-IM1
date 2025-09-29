export const dynamic = 'force-dynamic';

type TopicItem = {
  title?: string;
  sections?: Array<{ title?: string; html?: string; visibility?: string }>;
  [key: string]: any;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params?.slug ?? '');
  const API  = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://127.0.0.1:4000';

  let item: TopicItem | null = null;

  try {
    const r = await fetch(`${API}/api/topics/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (r.ok) {
      const data = await r.json();
      item = (data?.item ?? data) as TopicItem;
    }
  } catch (_) {
    // runtime hatası olursa sessiz geç; sayfa yine render olur
  }

  const html = item?.sections?.[0]?.html
    ?? '<p>Sayfa içeriği yakında burada.</p>';

  return (
    <div className="mx-auto max-w-3xl p-4 space-y-4">
      <h1 className="text-2xl font-bold">{item?.title ?? slug}</h1>
      <article className="prose prose-sm sm:prose lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
