// FILE: web/app/topics/[slug]/[child]/[id]/page.tsx
"use client";
import React from "react";
import Lock from "@/components/Lock";
import Link from "next/link";

type Resp = {
  ok: boolean;
  locked?: boolean;
  minimal?: { id:string; title:string; type:string; access:"V"|"M"|"P"; childKey:string };
  content?: {
    _id:string; title:string; type:string; access:"V"|"M"|"P"; body:any;
    options?: Array<{key:string; text:string}>;
    answerKey?: string; explanations?: Record<string,string>;
    mediaUrl?: string;
  };
  error?: string;
};

function getRole(){
  if (typeof document==="undefined") return "V";
  const m = document.cookie.match(/(?:^|; )mk_plan=([^;]+)/);
  const v = m?.[1]?.toUpperCase();
  return v==="P"||v==="M"||v==="V" ? v : "V";
}

export default function ContentView({ params }: { params: { slug:string; child:string; id:string } }){
  const slug  = decodeURIComponent(params.slug);
  const child = decodeURIComponent(params.child);
  const id    = decodeURIComponent(params.id);
  const role  = getRole();

  const [data, setData] = React.useState<Resp|null>(null);
  const [err, setErr] = React.useState<string|null>(null);

  React.useEffect(()=>{
    (async ()=>{
      try{
        const r = await fetch(`/api/topics/${encodeURIComponent(slug)}/contents/${encodeURIComponent(id)}?role=${role}`, { cache:"no-store" });
        const j = (await r.json()) as Resp;
        if (!j.ok) throw new Error(j.error || "load");
        setData(j);
      }catch(e:any){ setErr(e.message); }
    })();
  },[slug, id, role]);

  if (!data) return <div className="p-4 md:p-8 max-w-3xl mx-auto"><div className="h-32 bg-gray-100 rounded"/></div>;

  if (data.locked) {
    const min = data.minimal?.access==="M" ? "M" : "P";
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
        <div className="text-xl font-semibold">{data.minimal?.title}</div>
        <Lock min={min as any} />
        <div className="text-xs">
          <Link href={`/topics/${encodeURIComponent(slug)}/${encodeURIComponent(child)}`} className="underline">â† Listeye dÃ¶n</Link>
        </div>
      </div>
    );
  }

  const c = data.content!;
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-4">
      <div className="text-xs">
        <Link href={`/topics/${encodeURIComponent(slug)}/${encodeURIComponent(child)}`} className="underline">â† Listeye dÃ¶n</Link>
      </div>
      <h1 className="text-2xl font-bold">{c.title}</h1>

      {c.type==="note" && (
        <article className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: (c.body?.html || "").toString() }} />
          {!c.body?.html && c.body?.md && <pre className="text-sm whitespace-pre-wrap">{c.body.md}</pre>}
        </article>
      )}

      {c.type==="video" && c.mediaUrl && (
        <video src={c.mediaUrl} controls className="w-full rounded-xl border" />
      )}

      {(c.type==="question" || c.type==="case") && <QuestionRunner content={c} />}

      {err && <div className="text-sm text-red-600">{err}</div>}
    </div>
  );
}

/* Basit soru Ã§alÄ±ÅŸtÄ±rÄ±cÄ± */
function QuestionRunner({ content }: { content: any }){
  const [picked, setPicked] = React.useState<string>("");
  const correct = content.answerKey as string | undefined;

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="text-sm">{content.body?.stem}</div>
      <ul className="space-y-2">
        {(content.options||[]).map((op:any)=>(
          <li key={op.key}>
            <button
              onClick={()=>setPicked(op.key)}
              className={`px-3 py-2 rounded-lg border text-left w-full ${picked===op.key?"bg-gray-50":""}`}
            >
              <b>{op.key}.</b> {op.text}
            </button>
          </li>
        ))}
      </ul>
      {!!picked && (
        <div className="mt-2 text-sm">
          {picked===correct ? (
            <div className="text-green-700">
              âœ… DoÄŸru. {content.explanations?.[picked] || ""}
              <div className="mt-2 flex gap-2">
                <a href="/premium" className="underline">AÃ§Ä±klamayÄ± detaylÄ± gÃ¶r</a>
                <a href={`/topics/${encodeURIComponent(content.topicSlug||"")}/${encodeURIComponent(content.childKey||"")}`} className="underline">Yeni soruya geÃ§</a>
              </div>
            </div>
          ) : (
            <div className="text-red-700">
              âŒ YanlÄ±ÅŸ. {content.explanations?.[picked] || "Bu seÃ§enek doÄŸru deÄŸil."}
              <div className="mt-2 text-xs opacity-70">Ä°stersen diÄŸer seÃ§enekleri dene veya doÄŸru cevabÄ± gÃ¶r.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
