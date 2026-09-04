import Image from "next/image";

const projects = [
  { title: "لوحة مؤشرات ذكية", type: "تحليلات الأعمال", image: "/projects/dashboard-ar.png" },
  { title: "متجر أزياء عصري", type: "تجارة إلكترونية", image: "/projects/store-ar.png" },
  { title: "تطبيق إدارة مالية", type: "تطبيقات الجوال", image: "/projects/mobile-ar.png" },
];

export function ProjectShowcase() {
  return (
    <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6" aria-labelledby="showcase-title">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold text-primary">أفكار تتحول إلى واقع</p>
        <h2 id="showcase-title" className="text-balance text-3xl font-extrabold tracking-tight">نماذج من مشاريع صُنعت بإبداع</h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty leading-7 text-muted-foreground">استلهم من أعمال رقمية تجمع بين التصميم الجميل والأداء الموثوق، وابنِ مشروعك القادم بخطوات بسيطة.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5"><p className="text-sm text-primary">{project.type}</p><h3 className="mt-1 text-lg font-bold">{project.title}</h3></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectShowcase;
