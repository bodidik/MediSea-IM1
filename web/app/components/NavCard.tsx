import Link from "next/link";
import * as React from "react";

type Props = {
  href: string;
  title: string;
  description?: string;
  badge?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export default function NavCard({
  href,
  title,
  description,
  badge,
  className = "",
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={
        "block rounded-2xl border p-4 hover:shadow-sm transition-shadow " + className
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-lg font-semibold">{title}</div>
        {badge ? <div className="text-xs px-2 py-0.5 rounded bg-gray-100">{badge}</div> : null}
      </div>
      {description && (
        <p className="mt-1 text-sm text-neutral-600">{description}</p>
      )}
      {children}
    </Link>
  );
}


