// src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScriptExecutor } from "@/components/ScriptExecutor";
import { GlobalErrorCatcher } from "@/components/GlobalErrorCatcher";
import { Toaster } from "@/components/ui/sonner";
import { InsufficientCreditsModal } from "@/components/workspace/InsufficientCreditsModal";
import { PlatformFooter, PlatformHeader } from "@/components/platform-header";
import { ThemeProvider } from "@/components/theme-provider";

const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VibeBuild — منصة بناء التطبيقات بالذكاء الاصطناعي",
  description: "منصة عربية احترافية لبناء التطبيقات بالذكاء الاصطناعي ومعاينتها ونشرها.",
};

// SUPER IMPORTANT: NOT EDIT THE FOLLOWING 2 LINES TO FORCE NEXT.JS TO RENDER DYNAMICALLY
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="bg-background" suppressHydrationWarning>
      <body className={`${cairo.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <GlobalErrorCatcher />
          <ScriptExecutor />
          <Toaster position="top-right" richColors />
          <InsufficientCreditsModal />
          <div className="min-h-screen flex flex-col">
            <PlatformHeader />
            <main className="flex-1">{children}</main>
            <PlatformFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
