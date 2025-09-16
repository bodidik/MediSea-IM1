"use client";

import React from "react";
import ProtectedContent from "@/components/ProtectedContent";
import LiteProtected from "@/components/LiteProtected";

/**
 * Soru gÃ¶vdesini gÃ¶rÃ¼ntÃ¼ler.
 * - Premium: DOM'a metin dÃ¼ÅŸmeden canvas'a Ã§izilir (ProtectedContent)
 * - DiÄŸerleri: LiteProtected ile (saÄŸ tÄ±k/kopya kapalÄ± + ÅŸeffaf watermark overlay)
 */
export default function QuestionView({
  premium,
  chunkId,
  stem,
  vignette,
}: {
  premium?: boolean;
  chunkId?: string; // genelde question._id
  stem?: string;
  vignette?: string;
}) {
  const userId = React.useMemo(() => {
    if (typeof document === "undefined") return "guest";
    const m = document.cookie.match(/(?:^|; )mk_uid=([^;]+)/);
    return m?.[1] || "guest";
  }, []);

  if (premium) {
    return (
      <div className="space-y-3">
        <ProtectedContent chunkId={chunkId || "unknown"} />
        {vignette ? (
          <div className="mt-1 rounded-lg bg-gray-50 p-3 text-[13px] text-gray-700">
            <div className="font-medium mb-1">Vaka</div>
            {/* Ä°stersek vignette'i de protected chunk'a taÅŸÄ±yabiliriz; ÅŸimdilik dÃ¼z metin. */}
            <div className="whitespace-pre-wrap">{vignette}</div>
          </div>
        ) : null}
      </div>
    );
  }

  // Premium deÄŸilse: hafif koruma + watermark overlay
  return (
    <LiteProtected userId={userId}>
      <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
        {stem || "Soru metni bulunamadÄ±."}
      </div>
      {vignette && (
        <div className="mt-3 rounded-lg bg-gray-50 p-3 text-[13px] text-gray-700">
          <div className="font-medium mb-1">Vaka</div>
          <div className="whitespace-pre-wrap">{vignette}</div>
        </div>
      )}
    </LiteProtected>
  );
}
