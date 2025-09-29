export default function Page({ params }: { params: { slug: string } }) {
  /* PLACEHOLDER_GATE */
  if (process.env.NEXT_PUBLIC_PLACEHOLDER === "1") {
    return (
      <div className="mx-auto max-w-3xl p-4 text-gray-600">
        Sayfa içeriği yakında.
      </div>
    );
  }
  const slug = decodeURIComponent(params?.slug ?? "");
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold">Topic: {slug}</h1>
      <p className="text-gray-600">İçerik yakında burada.</p>
    </div>
  );
}

