// FILE: web/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "Medknowledge",
    template: "%s Â· Medknowledge",
  },
  description: "Ä°Ã§ hastalÄ±klarÄ± eÄŸitim ve sÄ±nav platformu",
  applicationName: "Medknowledge",
  authors: [{ name: "Medknowledge" }],
  keywords: [
    "iÃ§ hastalÄ±klarÄ±",
    "nefroloji",
    "hematoloji",
    "endokrinoloji",
    "romatoloji",
    "kardiyoloji",
    "gastroenteroloji",
    "enfeksiyon",
    "YDUS",
    "USMLE",
  ],
  openGraph: {
    title: "Medknowledge",
    description: "Ä°Ã§ hastalÄ±klarÄ± eÄŸitim ve sÄ±nav platformu",
    type: "website",
    locale: "tr_TR",
    siteName: "Medknowledge",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb", // tailwind blue-600
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
