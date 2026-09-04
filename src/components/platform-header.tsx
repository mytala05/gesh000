"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const links = [
  { href: "/web", label: "ويب" },
  { href: "/mobile", label: "تطبيقات الجوال" },
  { href: "/projects", label: "مشاريع كاملة" },
  { href: "/pricing", label: "خطط الأسعار" },
  { href: "/about", label: "من نحن" },
];

export function PlatformHeader() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)} aria-label="العودة إلى الصفحة الرئيسية">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/20">م</span>
          <span className="text-lg font-extrabold tracking-tight">مستر جيشو</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
          {links.map((link) => <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="تبديل الوضع الليلي والنهاري">
            {resolvedTheme === "dark" ? <Sun data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
          </Button>
          <Button asChild variant="outline" className="hidden sm:inline-flex"><Link href="/login">دخول</Link></Button>
          <Button asChild className="hidden sm:inline-flex"><Link href="/register">ابدأ الآن</Link></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}>
            {open ? <X data-icon="inline-start" /> : <Menu data-icon="inline-start" />}
          </Button>
        </div>
      </div>
      {open && <nav className="flex flex-col gap-1 border-t border-border/70 px-4 py-3 lg:hidden" aria-label="قائمة الهاتف">
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold hover:bg-accent">{link.label}</Link>)}
        <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden"><Button asChild variant="outline"><Link href="/login">دخول</Link></Button><Button asChild><Link href="/register">إنشاء حساب</Link></Button></div>
      </nav>}
    </header>
  );
}

export function PlatformFooter() {
  return <footer className="border-t border-border/70 bg-muted/30"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8"><div className="md:col-span-2"><div className="mb-4 flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-primary font-extrabold text-primary-foreground">م</span><span className="font-extrabold">مستر جيشو</span></div><p className="max-w-md leading-7 text-muted-foreground">منصة عربية متقدمة لبناء التطبيقات والمشاريع الرقمية بالذكاء الاصطناعي، من الفكرة إلى الإطلاق.</p></div><div><h2 className="mb-4 font-bold">المنصة</h2><div className="flex flex-col items-start gap-3 text-sm text-muted-foreground">{links.map((link) => <Link key={link.href} href={link.href} className="hover:text-foreground">{link.label}</Link>)}</div></div><div><h2 className="mb-4 font-bold">الدعم والسياسات</h2><div className="flex flex-col items-start gap-3 text-sm text-muted-foreground"><Link href="/help">مركز المساعدة</Link><Link href="/faq">الأسئلة الشائعة</Link><Link href="/contact">تواصل معنا</Link><Link href="/privacy">سياسة الخصوصية</Link><Link href="/terms">الشروط والأحكام</Link></div></div></div><div className="border-t border-border/70 px-4 py-5 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} مستر جيشو — جميع الحقوق محفوظة.</div></footer>;
}

export const navigationLinks = links;
