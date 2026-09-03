"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    const data = new FormData(event.currentTarget);
    const { error: authError } = await createClient().auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) });
    setBusy(false);
    if (authError) { setError(authError.message.includes("confirm") ? "يرجى تأكيد بريدك الإلكتروني أولًا." : "البريد الإلكتروني أو كلمة المرور غير صحيحة."); return; }
    window.location.href = "/account";
  }
  return <main className="flex flex-1 items-center justify-center px-4 py-16"><form onSubmit={submit} className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-xl"><div><p className="font-bold text-primary">مرحبًا بعودتك</p><h1 className="mt-2 text-3xl font-extrabold">تسجيل الدخول</h1><p className="mt-2 text-sm text-muted-foreground">ادخل إلى مساحة عملك ومشاريعك.</p></div><label className="flex flex-col gap-2 font-semibold">البريد الإلكتروني<input name="email" required type="email" className="rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary" /></label><label className="flex flex-col gap-2 font-semibold">كلمة المرور<input name="password" required minLength={8} type="password" className="rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary" /></label>{error&&<p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<button disabled={busy} className="rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground disabled:opacity-60">{busy ? "جارٍ الدخول..." : "دخول"}</button><p className="text-center text-sm text-muted-foreground">ليس لديك حساب؟ <Link href="/register" className="font-bold text-primary">إنشاء حساب</Link></p></form></main>;
}
