"use client";

import React, { useCallback, useState } from "react";

export type Props = {
  lang?: string;
  section?: string;
  q?: string;
  limit?: number;
  page?: number;
  total?: number;
  onChange?: (patch: Partial<{ section: string; q: string; page: number; limit: number }>) => void;
};

export default function TopicsFilters({
  lang,
  section,
  q,
  limit,
  page,
  total,
  onChange,
}: Props) {
  const [search, setSearch] = useState(q ?? "");
  const emit = useCallback(
    (patch: Partial<{ section: string; q: string; page: number; limit: number }>) => {
      onChange?.(patch);
    },
    [onChange]
  );

  return (
    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
      <input
        value={search}
        onChange={(e) => {
          const v = e.target.value;
          setSearch(v);
          emit({ q: v, page: 1 });
        }}
        placeholder={lang === "TR" ? "Ara..." : "Search..."}
        className="w-full md:w-64 px-3 py-2 border rounded-md"
      />
    </div>
  );
}
