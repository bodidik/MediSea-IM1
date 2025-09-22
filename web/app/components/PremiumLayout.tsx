"use client";

import React from "react";

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Üst kısım */}
        <header className="mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-yellow-700">Premium Alan</h1>
          <p className="text-sm text-gray-600">
            Bu alan yalnızca premium üyeler için hazırlanmıştır.
          </p>
        </header>

        {/* İçerik */}
        <main>{children}</main>
      </div>
    </div>
  );
}
