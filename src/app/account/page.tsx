import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: wallet }, { data: subscription }] = user
    ? await Promise.all([
        supabase.from("credit_wallets").select("balance").eq("user_id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("plan, status, current_period_end").eq("user_id", user.id).maybeSingle(),
      ])
    : [{ data: null }, { data: null }];

  const balance = wallet?.balance ?? 0;
  const plan = subscription?.plan === "pro" ? "المحترف" : "البداية";
  const status = subscription?.status === "active" ? "نشطة" : "غير نشطة";

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-8" dir="rtl">
      <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end">
        <div>
          <p className="font-bold text-primary">مساحة العمل</p>
          <h1 className="mt-2 text-4xl font-extrabold">لوحة التحكم</h1>
          <p className="mt-2 text-muted-foreground">
            {user ? `مرحبًا ${user.email ?? "بك"}، أدر مشاريعك ومواردك من مكان واحد.` : "أدر مشاريعك ومواردك من مكان واحد."}
          </p>
        </div>
        <Link href="/project/new" className="rounded-lg bg-primary px-5 py-3 text-center font-bold text-primary-foreground">مشروع جديد</Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">الرصيد المتاح</p>
          <p className="mt-3 text-3xl font-extrabold">{balance.toLocaleString("ar-EG")} <span className="text-base font-normal">وحدة</span></p>
          <Link href="/pricing" className="mt-5 inline-block text-sm font-bold text-primary">ترقية الخطة ←</Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">المشاريع</p>
          <p className="mt-3 text-3xl font-extrabold">0</p>
          <p className="mt-5 text-sm text-muted-foreground">ابدأ مشروعك الأول اليوم</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">الخطة الحالية</p>
          <p className="mt-3 text-3xl font-extrabold">{plan}</p>
          <p className="mt-2 text-sm text-muted-foreground">الحالة: {status}</p>
          <Link href="/settings/vcaas" className="mt-4 inline-block text-sm font-bold text-primary">الإعدادات ←</Link>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
        <h2 className="text-2xl font-extrabold">لا توجد مشاريع بعد</h2>
        <p className="mt-3 text-muted-foreground">صف فكرتك وسنساعدك على تحويلها إلى تطبيق.</p>
        <Link href="/project/new" className="mt-6 inline-block rounded-lg border border-border px-5 py-3 font-bold hover:bg-accent">إنشاء أول مشروع</Link>
      </section>
    </main>
  );
}
