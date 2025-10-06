"use client";

import React, { useEffect } from "react";

export default function LiteProtected({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId?: string;
}) {
  // saÄŸ tÄ±k ve kopya Ã¶nleme
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
    };
  }, []);

  // watermark string
  const mark = `MedKnowledge â€¢ ${userId || "guest"} â€¢ ${new Date().toLocaleDateString()}`;

  return (
    <div className="relative select-none">
      {/* AsÄ±l iÃ§erik */}
      <div className="relative z-10">{children}</div>

      {/* Åeffaf watermark overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="w-[200%] h-[200%] opacity-10 text-gray-500 text-[14px] rotate-[-30deg]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent 0 40px, currentColor 40px 80px)`,
            WebkitMaskImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,.15) 0 80px, transparent 80px 160px)",
          }}
        >
          {/* yazÄ±yÄ± tekrar basmak iÃ§in */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
            {mark}
          </div>
        </div>
      </div>
    </div>
  );
}



