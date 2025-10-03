"use client";

import React from "react";
import LockComp from "@/components/Lock"; // default export
import Link from "next/link";

type Access = "V" | "M" | "P";
const Lock = LockComp as React.ComponentType<{ min: Exclude<Access, "V"> }>;

type Resp = {
  ok: boolean;
  locked?: boolean;
  minimal?: { id: string; title: string; type: string; access: Access; childKey: string };
  content?: {
    _id: string;
    title: string;
    type: string; // "note" | "video" | "question" | "case" ...
    access: Access;
    body: any;
    options?: Array<{ key: string; text: string }>;
    answerKey?: string;
    explanations?: Record<string, string>;
    mediaUrl?: string;
    topicSlug?: string;
    childKey?: string;
  };
  error?: string;
};

function getRole(): Access {
  if (typeof document === "undefined") return "V";
  const m = document.cookie.match(/(?:^|; )mk_plan=([^;]+)/);
  const v = m?.[1]?.toUpperCase();
  return v === "P" || v === "M" || v === "V" ? v : "V";
}

export default function ContentView({ params }: { params: { slug: string; child: string; id: string } }) {
  const slug = decodeURIComponent(params.slug);
  const child = decodeURIComponent(params.child);
  const id = decodeURIComponent(params.id);
  const role = getRole();

  const [data, setData] = React.useState<Resp | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          `/api/topics/${encodeURIComponent(slug)}/contents/${encodeURIComponent(id)}?role=${role}`,
          { cache: "no-store" }
        );
        const j = (await r.json()) as Resp;
        if (!j.ok) throw new Error(j.error || "load");
        setData(j);
      } catch (e: unknown) {
        setErr(e instanceof Error ? e.message : "load_error");
      }
    })();
  }, [slug, id, role]);

  if (!data)
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="h-32 bg-gray-100 rounded" />
      </div>
    );

  if (data.locked) {
    const min: Exclude<Access, "V"> = data.minimal?.access === "M" ? "M" : "P";
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
        <div className="text-xl font-semibold">{data.minimal?.title}</div>
        <Lock min={min} />
        <div className="text-xs">
          <Link href={`/topics/${encodeURIComponent(slug)}/${encodeURIComponent(child)}`} className="underline">
            ← Listeye dön
          </Link>
        </div>
      </div>
    );
  }

  const c = data.content!;
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
      <div className="text-xs">
        <Link href={`/topics/${encodeURIComponent(slug)}/${encodeURIComponent(child)}`} className="underline">
          ← Listeye dön
        </Link>
      </div>
      <h1 className="text-2xl font-bold">{c.title}</h1>

      {c.type === "note" && (
        <article className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: (c.body?.html || "").toString() }} />
          {!c.body?.html && c.body?.md && <pre className="text-sm whitespace-pre-wrap">{c.body.md}</pre>}
        </article>
      )}

      {c.type === "video" && c.mediaUrl && <video src={c.mediaUrl} controls className="w-full rounded-xl border" />}

      {(c.type === "question" || c.type === "case") && <QuestionRunner content={c} />}

      {err && <div className="text-sm text-red-600">{err}</div>}
    </div>
  );
}

/* Basit soru çalıştırıcı */
function QuestionRunner({ content }: { content: any }) {
  const [picked, setPicked] = React.useState<string>("");
  const correct = content.answerKey as string | undefined;

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="text-sm">{content.body?.stem}</div>
      <ul className="space-y-2">
        {(content.options || []).map((op: any) => (
          <li key={op.key}>
            <button
              onClick={() => setPicked(op.key)}
              className={`px-3 py-2 rounded-lg border text-left w-full ${picked === op.key ? "bg-gray-50" : ""}`}
            >
              <b>{op.key}.</b> {op.text}
            </button>
          </li>
        ))}
      </ul>

      {!!picked && (
        <div className="mt-2 text-sm">
          {picked === correct ? (
            <div className="text-green-700">
              ✅ Doğru. {content.explanations?.[picked] || ""}
              <div className="mt-2 flex gap-2">
                <Link href="/premium" className="underline">Açıklamayı detaylı gör</Link>
                <a
                  href={`/topics/${encodeURIComponent(content.topicSlug || "")}/${encodeURIComponent(
                    content.childKey || ""
                  )}`}
                  className="underline"
                >
                  Yeni soruya geç
                </a>
              </div>
            </div>
          ) : (
            <div className="text-red-700">
              ❌ Yanlış. {content.explanations?.[picked] || "Bu seçenek doğru değil."}
              <div className="mt-2 text-xs opacity-70">İstersen diğer seçenekleri dene veya doğru cevabı gör.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

