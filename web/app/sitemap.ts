// FILE: web/app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Ana kÄ±lavuz/araÃ§/bÃ¶lÃ¼m giriÅŸleri (gerektikÃ§e geniÅŸlet)
  const staticPaths = [
    "", "tools", "guidelines", "sections", "premium", "programs", "kayseritip"
  ];

  // BÃ¶lÃ¼m altÄ±: ilk etap Ã¶rnek
  const sections = [
    "nefroloji","gastroenteroloji","hematoloji","romatoloji",
    "kardiyoloji","endokrinoloji","infeksiyon","gogus"
  ].map(s => `sections/${encodeURIComponent(s)}`);

  const urls = [...staticPaths, ...sections].map(p => ({
    url: `${base}/${p}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: p ? 0.6 : 1.0,
  }));

  return urls;
}
