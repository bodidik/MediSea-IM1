"use client";

import * as React from "react";
import ProtectedContent from "@/components/ProtectedContent";
import AddToSRButton from "@/components/AddToSRButton";
import type { Question } from "@/types/question";

type Props = {
  question: Question;
  chunkId?: string;            // UI attribute işaretlemesi
  isPremiumAllowed?: boolean;  // açıklama erişim kontrolü
  className?: string;
};

export default function QuestionView({
  question,
  chunkId,
  isPremiumAllowed = true,
  className = "",
}: Props) {
  const {
    id,
    contentId,
    stem,
    options = [],
    // Backend "correct/explain" döndürür; demo sayfa answer/explanation'a map ediyor.
    answer,
    explanation,
    vignette,
    title,
    section,
  } = question;

  // Adım adım gösterim kontrolleri
  const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
  const [showExplain, setShowExplain] = React.useState<boolean>(false);

  const correctKey: string | undefined = (answer as string) || undefined;

  return (
    <article className={`space-y-5 ${className}`} data-chunk={chunkId ?? "unknown"}>
      {/* (0) Üst meta (opsiyonel) */}
      {(title || section) && (
        <header className="space-y-1">
          {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
          {section ? (
            <div className="text-xs text-gray-500">Bölüm: {section}</div>
          ) : null}
        </header>
      )}

      {/* (1) Vaka (varsa) */}
      {vignette ? (
        <section className="rounded-lg bg-gray-50 p-3 text-[13px] text-gray-700">
          <div className="font-medium mb-1">Vaka</div>
          <div className="whitespace-pre-wrap">{vignette}</div>
        </section>
      ) : null}

      {/* (2) Soru kökü */}
      <section className="text-base leading-relaxed whitespace-pre-wrap">{stem}</section>

      {/* (3) Şıklar – responsive grid, doğru şık vurgulu */}
      {options.length > 0 && (
        <ul
          className="grid gap-2 sm:grid-cols-1 md:grid-cols-2"
          role="list"
          aria-label="Seçenekler"
        >
          {options.map((opt) => {
            const isCorrect = showAnswer && correctKey === opt.key;
            return (
              <li
                key={opt.key}
                className={[
                  "rounded-lg border p-3 text-[14px] leading-snug transition-colors",
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white",
                ].join(" ")}
              >
                <span className="font-medium mr-2">{opt.key}.</span>
                <span>{opt.text}</span>
              </li>
            );
          })}
        </ul>
      )}

      {/* (4) Adım adım butonları */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {!showAnswer && correctKey ? (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Cevabı Göster
          </button>
        ) : null}

        {showAnswer && explanation ? (
          <button
            type="button"
            onClick={() => setShowExplain((v) => !v)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            {showExplain ? "Açıklamayı Gizle" : "Açıklamayı Göster"}
          </button>
        ) : null}
      </div>

      {/* (5) Doğru cevap satırı */}
      {showAnswer && correctKey && (
        <div className="rounded-xl border border-green-500 bg-green-50 p-3 text-sm">
          Doğru cevap: <b>{correctKey}</b>
        </div>
      )}

      {/* (6) Açıklama – sadece Premium kilidi içinde; tipografi için prose */}
      {showAnswer && explanation ? (
        <ProtectedContent isAllowed={isPremiumAllowed}>
          <section className="rounded-xl border p-4">
            <h3 className="text-sm font-semibold mb-2">Açıklama</h3>
            {/* Açıklama düz metinse yine okunur; Markdown/HTML geliyorsa prose stil alır. */}
            <div className="prose prose-sm max-w-none prose-headings:font-semibold">
              <div className="whitespace-pre-wrap">{explanation}</div>
            </div>
          </section>
        </ProtectedContent>
      ) : null}

      {/* (7) SR butonu */}
      <footer className="pt-1">
        <AddToSRButton
          contentId={contentId ?? id}
          label="SR'ye ekle"
          className="px-3 py-1.5 rounded border text-sm"
        />
      </footer>
    </article>
  );
}
