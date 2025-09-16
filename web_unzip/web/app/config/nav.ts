export const topNav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Bölümler", href: "#sections" }, // buton AppShell içinde açılır menüyü tetikliyor
  { label: "Hesaplamalar", href: "/tools" },     // ✅ eklendi
  { label: "Kılavuzlar", href: "/guidelines" },  // ✅ eklendi
  { label: "Premium", href: "/premium" },
  { label: "YDUS", href: "/programs?track=YDUS" },
  { label: "USMLE", href: "/programs?track=USMLE" },
];

export const sections = [
  { label: "Nefroloji",        href: "/sections/nefroloji" },
  { label: "Gastroenteroloji", href: "/sections/gastroenteroloji" },
  { label: "Hematoloji",       href: "/sections/hematoloji" },
  { label: "Endokrinoloji",    href: "/sections/endokrinoloji" },
  { label: "Kardiyoloji",      href: "/sections/kardiyoloji" },
  { label: "İnfeksiyon",       href: "/sections/infeksiyon" },
  { label: "Göğüs Hast.",      href: "/sections/gogus" },
  { label: "Romatoloji",       href: "/sections/romatoloji" },
  { label: "Geriatri",         href: "/sections/geriatri" },
  { label: "İmmünoloji",       href: "/sections/immunoloji" },
  { label: "Onkoloji",         href: "/sections/onkoloji" },
];

const navConfig = { topNav, sections };
export default navConfig;
