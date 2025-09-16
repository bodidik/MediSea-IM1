"use client";
import React from "react";

export default function AddToSRButton({ contentId }: { contentId: string }) {
  return (
    <button className="px-3 py-1 rounded border text-sm" onClick={()=>alert(`SR eklenecek: ${contentId}`)}>
      SR'ye ekle
    </button>
  );
}
