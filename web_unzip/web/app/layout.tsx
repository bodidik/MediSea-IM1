// FILE: web/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/app/components/AppShell";

export const metadata: Metadata = {
  title: "Medknowledge",
  description: "İç hastalıkları eğitim ve sınav platformu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
