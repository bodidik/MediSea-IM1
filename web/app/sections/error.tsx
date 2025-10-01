"use client";
import { useEffect } from "react";

export default function ErrorSectionsIndex({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("sections/error:", error);
  }, [error]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold">Bir şeyler ters gitti</h1>
      <p className="text-gray-600 mt-2">Sayfa yüklenirken beklenmeyen bir hata oluştu.</p>
      {error?.digest && (
        <p className="mt-2 text-xs text-gray-500">Hata kodu: {error.digest}</p>
      )}
      <div className="mt-4 flex gap-3">
        <button onClick={() => reset()} className="px-3 py-2 rounded bg-blue-600 text-white">
          Tekrar dene
        </button>
        <a href="/sections" className="px-3 py-2 rounded border">Bölümlere dön</a>
      </div>
    </div>
  );
}


