"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  isAllowed: boolean;
};

export default function ProtectedContent({ children, fallback, isAllowed }: Props) {
  if (!isAllowed) {
    return <>{fallback ?? <div className="text-sm text-red-600">Yetkisiz içerik</div>}</>;
  }
  return <>{children}</>;
}


