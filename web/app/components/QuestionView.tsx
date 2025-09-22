"use client";

import * as React from "react";
import ProtectedContent from "@/components/ProtectedContent";
import AddToSRButton from "@/components/AddToSRButton";
import type { Question } from "@/types/question";

type Props = {
  question: Question;
  chunkId?: string;           // render edilen parça id'si (UI attribute olarak işaretlenecek)
  isPremiumAllowed?: boolean; // premium/payload erişimi
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
    answer,
    explanation,
    vignette,
  } = question;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* (1) Protected alan—sadece erişim kontrolü */}
      <ProtectedContent isAllowed={isPremiumAllowed}>
        {/* chunkId artık prop değil; UI attribute olarak işaretleniyor */}
        <div data-chunk={chunkId ?? "unknown"} />
      </ProtectedContent>

      {/* (2) Vaka (varsa) */}
      {vignette ? (
        <div className="mt-1 rounded-lg bg-gray-50 p-3 text-[13px] text-gray-700">
          <div className="font-medium mb-1">Vaka</div>
          <div className="whitespace-pre-wrap">{vignette}</div>
        </div>
      ) : null}

      {/* (3) Soru kökü */}
      <div className="text-base leading-relaxed whitespace-pre-wrap">{stem}</div>

      {/* (4) Şıklar */}
      {options.length > 0 && (
        <ul className="grid gap-2">
          {options.map((opt) => (
            <li
              key={opt.key}
              className="rounded-lg border p-3 text-[14px] leading-snug"
            >
              <span className="font-medium mr-2">{opt.key}.</span>
              <span>{opt.text}</span>
            </li>
          ))}
        </ul>
      )}

      {/* (5) Doğru cevap / açıklama */}
      {(answer || explanation) && (
        <div className="rounded-xl border p-3 space-y-2">
          {answer && (
            <div className="text-sm">
              Doğru cevap: <b>{answer}</b>
            </div>
          )}
          {explanation && (
            <div className="text-[13px] text-gray-700 whitespace-pre-wrap">
              {explanation}
            </div>
          )}
        </div>
      )}

      {/* (6) SR butonu */}
      <div className="pt-1">
        <AddToSRButton
          contentId={contentId ?? id}
          label="SR'ye ekle"
          className="px-3 py-1 rounded border text-sm"
        />
      </div>
    </div>
  );
}
