"use client";
import React from "react";

export default function Lock({ children }: { children?: React.ReactNode }) {
  return <div className="opacity-60">{children ?? "Kilitli içerik"}</div>;
}
