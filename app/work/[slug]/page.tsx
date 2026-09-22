import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Info,
  Layers3,
  UserRound,
  UsersRound,
} from "lucide-react";

import { hasCompleteCaseStudy, portfolioData, type Project } from "@/data/portfolio";
import { CaseStudyEvidence } from "./CaseStudyEvidence";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

const defaultRoles: Record<Project["category"], string> = {
  uiux: "Product Designer",
  brand: "Brand & Visual Designer",
  frontend: "Frontend Developer",
};

const caseStudyProjects = portfolioData.filter(hasCompleteCaseStudy);

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudyProjects.find((item) => item.slug === slug);

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
  const projectIndex = caseStudyProjects.findIndex((item) => item.slug === slug);

  if (projectIndex === -1) notFound();

  const project = caseStudyProjects[projectIndex];
  const previousProject = caseStudyProjects[(projectIndex - 1 + caseStudyProjects.length) % caseStudyProjects.length];
  const nextProject = caseStudyProjects[(projectIndex + 1) % caseStudyProjects.length];
  const prototypeUrl = project.prototypeUrl ?? project.figmaEmbedUrl;

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />

      <header className="relative border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12 2xl:px-8">
          <Link href="/" className="flex min-h-11 items-center gap-3 text-sm font-semibold text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">
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
        <section className="mx-auto max-w-[90rem] px-5 pt-20 pb-16 sm:px-8 sm:pt-28 lg:px-12 2xl:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="case-reveal lg:col-span-9 xl:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
                  {project.categoryLabel}
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-400">{tag}</span>
                ))}
              </div>
              <h1 className="mt-8 text-[clamp(3rem,7vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.065em] text-white">
                {project.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-400 sm:text-xl">
                {project.summary ?? project.description}
              </p>
            </div>
            <aside className="case-reveal hidden rounded-2xl border border-violet-400/20 bg-violet-400/8 p-5 lg:col-span-3 lg:block xl:col-span-3 xl:col-start-10" style={{ animationDelay: "100ms" }}>
              <p className="font-mono text-xs text-violet-300">CASE / {String(projectIndex + 1).padStart(2, "0")}</p>
              <p className="mt-6 text-sm leading-6 text-zinc-300">
                A {project.category === "uiux" ? "product" : project.category === "brand" ? "visual identity" : "frontend"} story told through decisions, not just deliverables.
              </p>
              <div className="mt-6 h-px bg-violet-300/20" />
              <p className="mt-3 text-xs text-zinc-500">Scroll to explore the evidence</p>
            </aside>
          </div>

          <div className="case-reveal mt-14 grid gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: "160ms" }}>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <CalendarDays className="mt-0.5 size-4 text-violet-300" />
              <div><p className="text-xs text-zinc-400">Timeline</p><p className="mt-1 text-sm text-zinc-200">{project.timeline ?? "Independent project"}</p></div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <UserRound className="mt-0.5 size-4 text-violet-300" />
              <div><p className="text-xs text-zinc-400">My role</p><p className="mt-1 text-sm text-zinc-200">{project.role ?? defaultRoles[project.category]}</p></div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <BriefcaseBusiness className="mt-0.5 size-4 text-violet-300" />
              <div><p className="text-xs text-zinc-400">Project type</p><p className="mt-1 text-sm text-zinc-200">{project.projectType ?? project.categoryLabel}</p></div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <UsersRound className="mt-0.5 size-4 text-violet-300" />
              <div><p className="text-xs text-zinc-400">Team / status</p><p className="mt-1 text-sm text-zinc-200">{project.team ?? "Independent"} · {project.status ?? "Case study"}</p></div>
            </div>
          </div>
        </section>

        {project.image && (
          <div className="case-reveal mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 2xl:px-8" style={{ animationDelay: "220ms" }}>
            <div className="aspect-video max-h-[52rem] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-[0_30px_100px_-50px_rgba(139,92,246,0.35)]">
              <Image
                src={project.image}
                alt={`${project.title} overview`}
                width={1600}
                height={900}
                quality={90}
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="size-full object-cover transition-transform duration-700 ease-out hover:scale-[1.015]"
              />
            </div>
          </div>
        )}

        <section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-32 2xl:px-8">
          <div className="lg:col-span-3">
            <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">01 / Context</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Overview &amp; Problem</h2>
          </div>
          <div className="grid gap-5 lg:col-span-8 lg:col-start-5 xl:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-zinc-100">Overview</h3>
              <p className="mt-4 leading-7 text-zinc-400">{project.overview}</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-zinc-100">Problem statement</h3>
              <p className="mt-4 leading-7 text-zinc-400">{project.problem}</p>
            </div>
          </div>
        </section>

        <CaseStudyEvidence project={project} />

        <section className="border-y border-zinc-900 bg-zinc-900/20 py-24 lg:py-32">
          <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 2xl:px-8">
            <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">03 / Working model</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Method, Ownership &amp; Constraints</h2>
            <div className="mt-12 rounded-2xl border border-violet-400/20 bg-violet-400/8 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Layers3 className="size-5 text-violet-300" />
                <h3 className="text-lg font-semibold text-zinc-100">Methodology</h3>
              </div>
              <ul className="mt-6 grid gap-4 md:grid-cols-3">
                {project.methodology.map((item) => (
                  <li key={item} className="rounded-xl border border-white/8 bg-zinc-950/35 p-4 text-sm leading-6 text-zinc-300">{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-100">My responsibilities</h3>
                <ul className="mt-6 space-y-5">
                  {project.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><CheckCircle2 className="mt-1 size-4 shrink-0 text-violet-300" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-100">Constraints &amp; challenges</h3>
                <ul className="mt-6 space-y-5">
                  {project.challenges.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 2xl:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">04 / Experience</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Interactive Prototype</h2>
            </div>
            {prototypeUrl && <a href={prototypeUrl} target="_blank" rel="noreferrer" className="hidden min-h-11 items-center gap-2 text-sm text-zinc-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 md:flex">Open in new tab <ExternalLink className="size-4" /></a>}
          </div>
          {prototypeUrl ? (
            <>
              <div className="mt-8 md:hidden">
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={`${project.title} prototype preview`}
                      width={800}
                      height={450}
                      quality={85}
                      sizes="100vw"
                      className="size-full object-cover opacity-65"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <p className="absolute right-5 bottom-5 left-5 text-sm leading-6 text-zinc-200">
                    Open the full prototype for a more usable mobile experience.
                  </p>
                </div>
                <a
                  href={prototypeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  Open interactive prototype <ExternalLink className="size-4" />
                </a>
              </div>
              <div className="mt-10 hidden aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl md:block">
                <iframe src={prototypeUrl} title={`${project.title} interactive prototype`} className="size-full border-0" allowFullScreen />
              </div>
            </>
          ) : (
            <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl">
              {project.image ? (
              <Image src={project.image} alt={`${project.title} high-resolution visual`} width={1600} height={900} quality={90} sizes="(max-width: 1280px) 100vw, 1280px" className="size-full object-cover" />
              ) : (
                <div className="grid size-full place-items-center text-sm text-zinc-400">Prototype preview unavailable.</div>
              )}
            </div>
          )}
        </section>

        <section className="border-y border-zinc-900 bg-zinc-900/20 py-24 lg:py-32">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12 2xl:px-8">
            <div className="lg:col-span-3">
              <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">05 / Outcome</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Outcome &amp; Evidence</h2>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
                <h3 className="text-sm font-semibold text-zinc-100">The solution</h3>
                <p className="mt-4 leading-7 text-zinc-400">{project.solution}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.impact.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-sm leading-6 text-zinc-400"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />{item}</div>
                ))}
              </div>
              <div className="mt-6 flex gap-3 rounded-xl border border-sky-400/20 bg-sky-400/8 p-5 text-sm leading-6 text-zinc-300">
                <Info className="mt-0.5 size-4 shrink-0 text-sky-300" />
                <div>
                  <p className="font-medium text-zinc-100">Evidence boundary</p>
                  <p className="mt-1 text-zinc-400">{project.outcomeNote}</p>
                </div>
              </div>
              {project.metrics && project.metrics.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-xs font-medium tracking-[0.16em] text-zinc-400 uppercase">Deliverable snapshot</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-violet-400/20 bg-violet-400/8 p-5">
                        <p className="text-xl font-semibold text-white">{metric.value}</p><p className="mt-1 text-xs text-zinc-400">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <nav className="mx-auto grid max-w-[90rem] gap-4 px-5 py-20 sm:grid-cols-2 sm:px-8 lg:px-12 2xl:px-8" aria-label="Case study navigation">
          <Link href={`/work/${previousProject.slug}`} className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
            <span className="flex items-center gap-2 text-xs text-zinc-400"><ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />Previous case study</span>
            <span className="mt-3 block text-lg font-semibold text-zinc-100">{previousProject.title}</span>
          </Link>
          <Link href={`/work/${nextProject.slug}`} className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-right transition hover:-translate-y-1 hover:border-zinc-600">
            <span className="flex items-center justify-end gap-2 text-xs text-zinc-400">Next case study<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            <span className="mt-3 block text-lg font-semibold text-zinc-100">{nextProject.title}</span>
          </Link>
        </nav>
      </article>
    </main>
  );
}
