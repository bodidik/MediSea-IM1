// FILE: web/app/components/HeaderClient.tsx (Client Component)
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";


export default function HeaderClient({ navConfig }: { navConfig: any }) {
const pathname = usePathname();
const [mobileOpen, setMobileOpen] = useState(false);
const [sectionsOpen, setSectionsOpen] = useState(false);
const loginRef = useRef<HTMLDivElement>(null);
const sectRef = useRef<HTMLDivElement>(null);


const linkCls = (href: string) =>
`px-3 py-1.5 rounded-lg text-sm ${pathname === href || pathname.startsWith(href) ? "bg-gray-900 text-white" : "hover:bg-gray-50"}`;


useEffect(() => {
function onDoc(e: MouseEvent) {
if (loginRef.current && !loginRef.current.contains(e.target as Node)) {/* future: close login */}
if (sectRef.current && !sectRef.current.contains(e.target as Node)) setSectionsOpen(false);
}
document.addEventListener("click", onDoc);
return () => document.removeEventListener("click", onDoc);
}, []);


useEffect(() => {
setMobileOpen(false);
setSectionsOpen(false);
}, [pathname]);


return (
<div className="flex-1 flex items-center justify-center md:justify-between gap-3">
{/* Desktop nav */}
<nav className="hidden md:flex items-center gap-1">
{/* Bölümler dropdown */}
<div className="relative" ref={sectRef}>
<button onClick={() => setSectionsOpen(v => !v)} className={linkCls("/sections")} aria-haspopup="menu" aria-expanded={sectionsOpen}>Bölümler</button>
{sectionsOpen && (
<div className="absolute left-0 mt-2 w-[720px] max-w-[95vw] max-h-[60vh] overflow-auto rounded-2xl bg-white text-black shadow-xl p-3 grid grid-cols-2 md:grid-cols-3 gap-2 z-50 border" role="menu">
{navConfig.sections.map((s: any) => (
<Link key={s.href} href={s.href} className={`px-3 py-2 rounded-lg text-sm border ${pathname.startsWith(s.href) ? "bg-gray-900 text-white border-gray-900" : "hover:bg-gray-50"}`}>{s.label}</Link>
))}
</div>
)}
</div>
{/* Diğer linkler */}
{navConfig.topNav.filter((i: any) => i.label !== "Bölümler").map((item: any) => (
<Link key={item.href} href={item.href} className={linkCls(item.href)}>{item.label}</Link>
))}
</nav>


{/* Mobile hamburger */}
<button className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border hover:bg-gray-50" onClick={() => setMobileOpen(v=>!v)} aria-label="Menüyü Aç/Kapat">
{!mobileOpen ? (
<svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/></svg>
) : (
<svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.3 5.71L12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z"/></svg>
)}
</button>