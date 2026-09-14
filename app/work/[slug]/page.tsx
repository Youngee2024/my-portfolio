import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  UserRound,
} from "lucide-react";

import { portfolioData, type Project } from "@/data/portfolio";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

const defaultRoles: Record<Project["category"], string> = {
  uiux: "Product Designer",
  brand: "Brand & Visual Designer",
  frontend: "Frontend Developer",
};

export function generateStaticParams() {
  return portfolioData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.find((item) => item.slug === slug);

  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.summary ?? project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary ?? project.description,
      images: project.image ? [{ url: project.image, alt: `${project.title} case study` }] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = portfolioData.findIndex((item) => item.slug === slug);

  if (projectIndex === -1) notFound();

  const project = portfolioData[projectIndex];
  const previousProject = portfolioData[(projectIndex - 1 + portfolioData.length) % portfolioData.length];
  const nextProject = portfolioData[(projectIndex + 1) % portfolioData.length];
  const prototypeUrl = project.prototypeUrl ?? project.figmaEmbedUrl;

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />

      <header className="relative border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-zinc-100">
            <span className="grid size-9 place-items-center rounded-full border border-violet-400/35 bg-violet-400/10 text-xs text-violet-300">IO</span>
            <span className="hidden sm:inline">Ibraheem Olawale</span>
          </Link>
          <Link
            href="/#work"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Work
          </Link>
        </div>
      </header>

      <article className="relative">
        <section className="mx-auto max-w-7xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 lg:px-12">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
                {project.categoryLabel}
              </span>
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-400">{tag}</span>
              ))}
            </div>
            <h1 className="mt-8 text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-semibold tracking-[-0.06em] text-white">
              {project.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-400 sm:text-xl">
              {project.summary ?? project.description}
            </p>
          </div>

          <div className="mt-14 grid gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <CalendarDays className="mt-0.5 size-4 text-violet-300" />
              <div><p className="text-xs text-zinc-500">Timeline</p><p className="mt-1 text-sm text-zinc-200">{project.timeline ?? "Independent project"}</p></div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <UserRound className="mt-0.5 size-4 text-violet-300" />
              <div><p className="text-xs text-zinc-500">My role</p><p className="mt-1 text-sm text-zinc-200">{project.role ?? defaultRoles[project.category]}</p></div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-xs text-zinc-500">Discipline</p><p className="mt-1 text-sm text-zinc-200">{project.categoryLabel}</p>
            </div>
          </div>
        </section>

        {project.image && (
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <Image
                src={project.image}
                alt={`${project.title} overview`}
                width={1600}
                height={900}
                quality={90}
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="size-full object-cover"
              />
            </div>
          </div>
        )}

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:px-12 lg:py-32">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">01 / Context</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Overview &amp; Problem</h2>
          </div>
          <div className="grid gap-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-zinc-100">Overview</h3>
              <p className="mt-4 leading-7 text-zinc-400">{project.summary ?? project.description}</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-zinc-100">Problem statement</h3>
              <p className="mt-4 leading-7 text-zinc-400">{project.problem ?? "A detailed problem statement for this project is currently being prepared."}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-900 bg-zinc-900/20 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">02 / Discovery &amp; Delivery</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Research &amp; Process Highlights</h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-100">User research</h3>
                <ul className="mt-6 space-y-5">
                  {(project.research ?? ["Research documentation for this project is coming soon."]).map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-100">Process</h3>
                <ol className="mt-6 space-y-5">
                  {(project.process ?? ["Process documentation for this project is coming soon."]).map((item, index) => (
                    <li key={item} className="flex gap-4 text-sm leading-6 text-zinc-400"><span className="font-mono text-xs text-violet-300">{String(index + 1).padStart(2, "0")}</span>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">03 / Experience</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Interactive Prototype</h2>
            </div>
            {prototypeUrl && <a href={prototypeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">Open in new tab <ExternalLink className="size-4" /></a>}
          </div>
          <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl">
            {prototypeUrl ? (
              <iframe src={prototypeUrl} title={`${project.title} interactive prototype`} className="size-full border-0" allowFullScreen />
            ) : project.image ? (
              <Image src={project.image} alt={`${project.title} high-resolution visual`} width={1600} height={900} quality={90} sizes="(max-width: 1280px) 100vw, 1280px" className="size-full object-cover" />
            ) : (
              <div className="grid size-full place-items-center text-sm text-zinc-500">Prototype preview coming soon.</div>
            )}
          </div>
        </section>

        <section className="border-y border-zinc-900 bg-zinc-900/20 py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">04 / Outcome</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Results, Impact &amp; Metrics</h2>
            </div>
            <div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
                <h3 className="text-sm font-semibold text-zinc-100">The solution</h3>
                <p className="mt-4 leading-7 text-zinc-400">{project.solution ?? project.description}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(project.impact ?? ["A full impact review for this project is coming soon."]).map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-sm leading-6 text-zinc-400"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />{item}</div>
                ))}
              </div>
              {project.metrics && project.metrics.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-violet-400/20 bg-violet-400/8 p-5">
                      <p className="text-xl font-semibold text-white">{metric.value}</p><p className="mt-1 text-xs text-zinc-400">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <nav className="mx-auto grid max-w-7xl gap-4 px-5 py-20 sm:grid-cols-2 sm:px-8 lg:px-12" aria-label="Case study navigation">
          <Link href={`/work/${previousProject.slug}`} className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
            <span className="flex items-center gap-2 text-xs text-zinc-500"><ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />Previous case study</span>
            <span className="mt-3 block text-lg font-semibold text-zinc-100">{previousProject.title}</span>
          </Link>
          <Link href={`/work/${nextProject.slug}`} className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-right transition hover:-translate-y-1 hover:border-zinc-600">
            <span className="flex items-center justify-end gap-2 text-xs text-zinc-500">Next case study<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            <span className="mt-3 block text-lg font-semibold text-zinc-100">{nextProject.title}</span>
          </Link>
        </nav>
      </article>
    </main>
  );
}
