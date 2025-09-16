 FILE webappcomponentsNavCard.tsx
import Link from nextlink;

export default function NavCard({
  href, title, desc, badge,
} { href string; title string; desc string; badge string; }){
  return (
    Link href={href} className=rounded-2xl border p-5 hovershadow-sm transition flex flex-col gap-2
      div className=flex items-center justify-between
        h3 className=text-lg font-semibold{title}h3
        {badge && span className=text-xs px-2 py-1 rounded-full border{badge}span}
      div
      p className=text-sm text-gray-600{desc}p
    Link
  );
}
