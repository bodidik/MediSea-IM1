export const revalidate = 0;
export const dynamic = 'force-dynamic';

import Link from 'next/link'
import { loadCanonical, localize, siblingHref } from '@/lib/content.shared'

type Params = { lang: 'tr'|'en', section: string, slug: string }

export default async function Page({ params }: { params: Params }) {
  const { lang, section, slug } = params
  const doc = await loadCanonical(section, slug)
  if (!doc) {
    return (
      <main className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold'>İçerik bulunamadı</h1>
        <p className='opacity-70'>Henüz bu konu için kanonik içerik oluşturulmadı.</p>
        <p className='mt-4'>
          <Link href={'/sections/'+section} className='underline'>← {section} dizinine dön</Link>
        </p>
      </main>
    )
  }

  const ldoc = await localize(doc, lang)
  const sib  = siblingHref(lang, section, slug)

  return (
    <article className='prose prose-neutral max-w-3xl mx-auto p-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1>{ldoc.title}</h1>
        <Link href={sib} className='text-sm underline opacity-80'>
          {lang === 'tr' ? 'View English' : 'Türkçe Gör'}
        </Link>
      </div>

      {ldoc.sections.map((s, i) => (
        <section key={i} className='my-6'>
          {s.heading && <h2>{s.heading}</h2>}
          <p className='whitespace-pre-wrap'>{s.text}</p>
        </section>
      ))}

      <hr />
      <p>
        <Link className='underline' href={'/sections/'+section}>← {lang==='tr' ? 'Konu dizinine dön' : 'Back to index'}</Link>
      </p>
    </article>
  )
}
