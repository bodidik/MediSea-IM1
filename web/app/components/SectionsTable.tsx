"use client";
import React from "react";
import Link from "next/link";

export default function SectionsTable({
  rows,
}: {
  rows: Array<{
    section: string;
    topics: number;
    boardQuestions: number;
    cases: number;
    videos: number;
    notes: number;
    total: number;
  }>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Bölüm</th>
            <th className="py-2 pr-4">Topik</th>
            <th className="py-2 pr-4">Board</th>
            <th className="py-2 pr-4">Vaka</th>
            <th className="py-2 pr-4">Video</th>
            <th className="py-2 pr-4">Not</th>
            <th className="py-2 pr-4">Toplam</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <Link
              key={r.section}
              href={`/sections/${encodeURIComponent(r.section)}`}
              className="contents"
            >
              <tr className="border-b hover:bg-muted/40 cursor-pointer">
                <td className="py-2 pr-4 font-medium">{r.section}</td>
                <td className="py-2 pr-4">{r.topics}</td>
                <td className="py-2 pr-4">{r.boardQuestions}</td>
                <td className="py-2 pr-4">{r.cases}</td>
                <td className="py-2 pr-4">{r.videos}</td>
                <td className="py-2 pr-4">{r.notes}</td>
                <td className="py-2 pr-4 font-semibold">{r.total}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}



