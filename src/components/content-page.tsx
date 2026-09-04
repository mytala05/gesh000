import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

const content: Record<string, { eyebrow: string; title: string; description: string; bullets: string[] }> = {
  web: { eyebrow: "حلول الويب", title: "حوّل فكرتك إلى تطبيق ويب متكامل", description: "ابنِ واجهات حديثة وسريعة ومتجاوبة بالذكاء الاصطناعي، مع كود قابل للصيانة ومعاينة فورية ونشر آمن.", bullets: ["واجهات متجاوبة لكل الشاشات", "قاعدة بيانات ومصادقة جاهزة", "معاينة مباشرة ونشر بنقرة واحدة"] },
  mobile: { eyebrow: "تطبيقات الهاتف", title: "تجربة موبايل تبدأ من وصفك", description: "صمّم تجربة Android وiPhone احترافية من خلال محادثة بسيطة، ثم طوّرها وصدّر مشروعك بسهولة.", bullets: ["تجربة موحدة على Android وiPhone", "مكونات أصلية وأداء سريع", "تحديثات وتوسعات بلا تعقيد"] },
  projects: { eyebrow: "المشاريع الكاملة", title: "كل ما تحتاجه لإطلاق مشروعك", description: "من الفكرة الأولى إلى المنتج المنشور، تجمع مستر جيشو أدوات التصميم والبرمجة والبيانات في مساحة واحدة.", bullets: ["إدارة الإصدارات والتغييرات", "ربط GitHub وخدمات الاستضافة", "أدوات قاعدة البيانات والنطاقات"] },
  about: { eyebrow: "من نحن", title: "نبني مستقبل تطوير البرمجيات بالعربية", description: "مستر جيشو منصة عربية تضع قوة الذكاء الاصطناعي بين يدي المطورين ورواد الأعمال والفرق التقنية.", bullets: ["لغة عربية أولًا وتجربة واضحة", "أمان وصلاحيات مصممة للفرق", "منصة تتطور مع احتياجاتك"] },
};

export function ContentPage({ type }: { type: keyof typeof content }) {
  const item = content[type];
  return <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-16 md:px-8 md:py-24"><div className="max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary"><Sparkles data-icon="inline-start" /> {item.eyebrow}</div><h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">{item.title}</h1><p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground md:text-xl">{item.description}</p><div className="mt-10 flex flex-col gap-4">{item.bullets.map((bullet) => <div key={bullet} className="flex items-center gap-3 font-semibold"><CheckCircle2 className="text-primary" />{bullet}</div>)}</div><div className="mt-12 flex flex-wrap gap-3"><Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90">ابدأ بناء مشروعك <ArrowLeft data-icon="inline-end" /></Link><Link href="/pricing" className="rounded-lg border border-border px-5 py-3 font-bold hover:bg-accent">استكشف الأسعار</Link></div></div></main>;
}
