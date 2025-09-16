"use client";
import React, { useEffect, useState } from "react";

export default function GuidelinesPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/guidelines")
      .then(r => r.json())
      .then(d => { if (d.ok) setList(d.items); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Kılavuzlar</h1>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : list.length === 0 ? (
        <div>Henüz kayıt yok</div>
      ) : (
        <ul className="divide-y rounded-2xl border">
          {list.map(g => (
            <li key={g._id} className="p-4 flex justify-between">
              <span>
                {g.title} ({g.org}, {g.year}, {g.lang})
              </span>
              {g.url && <a href={g.url} target="_blank" className="underline">Aç</a>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
