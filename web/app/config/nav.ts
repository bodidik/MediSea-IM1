// Ãœst gezinme menÃ¼sÃ¼
export const topNav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "BÃ¶lÃ¼mler", href: "#sections" },         // AppShell iÃ§inde dropdown tetikler
  { label: "Hesaplamalar", href: "/tools" },        // hesaplayÄ±cÄ± modÃ¼ller
  { label: "KÄ±lavuzlar", href: "/guidelines" },     // guideline sayfasÄ±
  { label: "Premium", href: "/premium" },
  { label: "YDUS", href: "/programs?track=YDUS" },
  { label: "USMLE", href: "/programs?track=USMLE" },
];

// Dahiliye alt bÃ¶lÃ¼mler
export const sections = [
  { label: "Nefroloji",        href: "/sections/nefroloji" },
  { label: "Gastroenteroloji", href: "/sections/gastroenteroloji" },
  { label: "Hematoloji",       href: "/sections/hematoloji" },
  { label: "Endokrinoloji",    href: "/sections/endokrinoloji" },
  { label: "Kardiyoloji",      href: "/sections/kardiyoloji" },
  { label: "Ä°nfeksiyon",       href: "/sections/infeksiyon" },
  { label: "GÃ¶ÄŸÃ¼s Hast.",      href: "/sections/gogus" },
  { label: "Romatoloji",       href: "/sections/romatoloji" },
  { label: "Geriatri",         href: "/sections/geriatri" },
  { label: "Ä°mmÃ¼noloji",       href: "/sections/immunoloji" },
  { label: "Onkoloji",         href: "/sections/onkoloji" },
];

// Tek export ile eriÅŸilebilir
const navConfig = { topNav, sections };
export default navConfig;
