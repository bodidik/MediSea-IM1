"use client";

import React from "react";
import ProtectedContent from "@/app/components/ProtectedContent";
import LiteProtected from "@/app/components/LiteProtected";

/**
 * Soru gövdesini görüntüler.
 * - Premium: DOM'a metin düşmeden canvas'a çizilir (ProtectedContent)
 * - Diğerleri: LiteProtected ile (sağ tık/kopya kapalı + şeffaf watermark overlay)
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
            {/* İstersek vignette'i de protected chunk'a taşıyabiliriz; şimdilik düz metin. */}
            <div className="whitespace-pre-wrap">{vignette}</div>
          </div>
        ) : null}
      </div>
    );
  }

  // Premium değilse: hafif koruma + watermark overlay
  return (
    <LiteProtected userId={userId}>
      <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
        {stem || "Soru metni bulunamadı."}
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
