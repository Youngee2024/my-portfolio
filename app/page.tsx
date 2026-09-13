"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  Code2,
  CodeXml,
  ContactRound,
  GalleryHorizontalEnd,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  PenTool,
} from "lucide-react";

import { personalInfo } from "@/data/personalInfo";
import { portfolioData, type Project } from "@/data/portfolio";

type Filter = "all" | Project["category"];

const filters: { label: string; value: Filter }[] = [
  { label: "All Work", value: "all" },
  { label: "UI/UX & Product Design", value: "uiux" },
  { label: "Brand & Visual Identity", value: "brand" },
  { label: "Frontend & Technical Code", value: "frontend" },
];

const pillars = [
  {
    percentage: "60%",
    title: "UI/UX & Product Design",
    description: "Figma, User Research, Design Systems, Mobile & Web UX",
    icon: PenTool,
    accent: "from-violet-400 to-fuchsia-400",
  },
  {
    percentage: "20%",
    title: "Brand & Visual Identity",
    description: "Logo Systems, Guidelines, Brand Strategy",
    icon: Palette,
    accent: "from-amber-300 to-orange-400",
  },
  {
    percentage: "20%",
    title: "Frontend & Technical Code",
    description: "React, Tailwind CSS, Vercel Deployments",
    icon: Code2,
    accent: "from-cyan-300 to-emerald-400",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Product experiences",
    description:
      "Turning complex product ideas into intuitive journeys, thoughtful interfaces, and scalable systems.",
    skills: ["Figma", "User research", "Prototyping", "Design systems"],
  },
  {
    number: "02",
    title: "Visual systems",
    description:
      "Building memorable visual identities with clarity, consistency, and room to grow across touchpoints.",
    skills: ["Brand strategy", "Logo systems", "Framer", "Guidelines"],
  },
  {
    number: "03",
    title: "Frontend builds",
    description:
      "Bringing approved designs to life as responsive, polished interfaces ready for real users.",
    skills: ["React", "Tailwind CSS", "VSCode", "Vercel"],
  },
];

const socialLinks = [
  { label: "GitHub", href: personalInfo.socials.github, icon: CodeXml },
  { label: "LinkedIn", href: personalInfo.socials.linkedin, icon: ContactRound },
  { label: "Behance", href: personalInfo.socials.behance, icon: GalleryHorizontalEnd },
  { label: "X / Twitter", href: personalInfo.socials.twitter, icon: AtSign },
].filter((social): social is typeof social & { href: string } => Boolean(social.href));

function ProjectVisual({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group/visual relative aspect-video overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.2),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.12),transparent_40%)]" />
      <div className="absolute inset-6 rounded-xl border border-white/8 bg-zinc-950/65 shadow-2xl transition-transform duration-500 group-hover/visual:scale-[1.03]">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/8 px-3">
          <span className="size-1.5 rounded-full bg-violet-400" />
          <span className="size-1.5 rounded-full bg-zinc-600" />
          <span className="size-1.5 rounded-full bg-zinc-700" />
        </div>
        <div className="flex h-[calc(100%-2rem)] items-center justify-center px-6 text-center">
          <span className="text-xs font-medium tracking-[0.18em] text-zinc-500 uppercase">
            {project.categoryLabel}
          </span>
        </div>
      </div>
      {project.image && !failed ? (
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          width={800}
          height={450}
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 size-full object-cover transition duration-500 group-hover/visual:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/35 to-transparent" />
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const visibleProjects = portfolioData.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100 selection:bg-violet-400 selection:text-zinc-950">
      <header className="sticky top-0 z-50 border-b border-white/6 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="grid size-9 place-items-center rounded-full border border-violet-400/35 bg-violet-400/10 text-xs font-bold tracking-tight text-violet-300 transition group-hover:bg-violet-400 group-hover:text-zinc-950">
              IO
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-zinc-100 sm:block">
              {personalInfo.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-zinc-400 lg:flex" aria-label="Main navigation">
            <a className="transition hover:text-white" href="#work">Work</a>
            <a className="transition hover:text-white" href="#capabilities">Capabilities</a>
            <a className="transition hover:text-white" href="#about">About</a>
            <a className="transition hover:text-white" href="#contact">Contact</a>
          </nav>

          <a
            href={`mailto:${personalInfo.email}`}
            className="hidden items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-200 transition hover:border-violet-400/60 hover:text-white sm:flex"
          >
            <Mail className="size-3.5" />
            {personalInfo.email}
          </a>
          <a
            href="#contact"
            className="grid size-10 place-items-center rounded-full border border-zinc-800 text-zinc-300 sm:hidden"
            aria-label="Open contact section"
          >
            <Menu className="size-4" />
          </a>
        </div>
      </header>

      <main id="top">
        <section id="about" className="relative isolate scroll-mt-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -z-10 h-[42rem] w-[64rem] -translate-x-1/2 rounded-full bg-violet-600/8 blur-3xl" />
          <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:px-12 lg:py-28">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                Designer who ships
              </div>
              <h1 className="max-w-5xl text-[clamp(3.25rem,8vw,7.4rem)] leading-[0.88] font-semibold tracking-[-0.065em] text-white">
                {personalInfo.role}
                <span className="mt-4 block bg-gradient-to-r from-zinc-500 via-zinc-200 to-violet-300 bg-clip-text text-transparent">
                  {personalInfo.name}.
                </span>
              </h1>
              <p className="mt-9 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                {personalInfo.bio}
              </p>
              <p className="mt-5 max-w-3xl text-xs leading-6 font-medium tracking-wide text-zinc-500 uppercase">
                60% UI/UX &amp; Product Design <span className="mx-2 text-violet-400">•</span>
                20% Brand &amp; Visual Systems <span className="mx-2 text-violet-400">•</span>
                20% Frontend &amp; Technical Code
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300"
                >
                  Explore Work
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-12 place-items-center rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition hover:-translate-y-0.5 hover:border-zinc-600 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-sm lg:block" aria-hidden="true">
              <div className="absolute -inset-12 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/55 p-5 shadow-2xl shadow-black/50">
                <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/8 bg-[linear-gradient(145deg,#18181b_0%,#09090b_65%)] p-7">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    <span>Creative profile</span><span>2026</span>
                  </div>
                  <div>
                    <div className="mb-7 flex items-end gap-2">
                      <span className="text-8xl leading-none font-semibold tracking-[-0.08em] text-white">60</span>
                      <span className="pb-2 text-2xl text-violet-300">%</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-violet-400 via-zinc-700 to-transparent" />
                    <p className="mt-5 max-w-48 text-sm leading-6 text-zinc-400">
                      Thoughtful design, grounded in people and built to perform.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {["UX", "BR", "FE"].map((item) => (
                        <span key={item} className="grid size-9 place-items-center rounded-full border-2 border-zinc-900 bg-zinc-800 text-[9px] font-semibold text-zinc-300">{item}</span>
                      ))}
                    </div>
                    <ArrowUpRight className="size-5 text-zinc-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-900 bg-zinc-950/70">
          <div className="mx-auto grid max-w-7xl divide-y divide-zinc-900 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
            {pillars.map(({ percentage, title, description, icon: Icon, accent }) => (
              <article key={title} className="group py-9 md:px-7 md:first:pl-0 md:last:pr-0 lg:px-10">
                <div className="mb-7 flex items-start justify-between">
                  <span className={`bg-gradient-to-r ${accent} bg-clip-text text-4xl font-semibold tracking-[-0.05em] text-transparent`}>{percentage}</span>
                  <Icon className="size-5 text-zinc-600 transition group-hover:text-zinc-300" />
                </div>
                <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-24 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-8 border-b border-zinc-800 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Portfolio / 01</p>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Selected Works</h2>
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter projects">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium transition ${
                      activeFilter === filter.value
                        ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                        : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
              {visibleProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex animate-[fade-in_.35s_ease-out] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_20px_60px_-25px_rgba(139,92,246,0.3)]"
                >
                  <ProjectVisual project={project} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="rounded-full border border-zinc-700 bg-zinc-950/70 px-3 py-1.5 text-[10px] font-medium tracking-wide text-zinc-400 uppercase">
                        {project.categoryLabel}
                      </span>
                      <span className="font-mono text-xs text-zinc-600">0{portfolioData.indexOf(project) + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400">{tag}</span>
                      ))}
                    </div>
                    {(project.liveLink || project.caseStudyLink) && (
                      <div className="mt-6 flex flex-wrap gap-5 border-t border-zinc-800 pt-5 text-xs font-semibold">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-200 transition hover:text-violet-300">
                            Live App <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                        {project.caseStudyLink && (
                          <a href={project.caseStudyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-200 transition hover:text-violet-300">
                            View Case Study <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-24 border-y border-zinc-900 bg-zinc-900/20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Capabilities / 02</p>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Strategy to screen.<br />Design to deployment.</h2>
            </div>
            <div className="mt-16 grid border-t border-zinc-800 md:grid-cols-3 md:divide-x md:divide-zinc-800">
              {capabilities.map((capability) => (
                <article key={capability.number} className="border-b border-zinc-800 py-10 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                  <span className="font-mono text-xs text-violet-300">{capability.number}</span>
                  <h3 className="mt-12 text-xl font-semibold text-white">{capability.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">{capability.description}</p>
                  <ul className="mt-8 space-y-3">
                    {capability.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-3 text-sm text-zinc-300">
                        <span className="h-px w-4 bg-zinc-600" />{skill}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="scroll-mt-24 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div className="absolute right-0 bottom-0 size-72 translate-x-1/3 translate-y-1/3 rounded-full bg-violet-600/20 blur-3xl" />
            <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Have a project in mind?</p>
            <h2 className="mt-6 max-w-4xl text-4xl leading-tight font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Let&apos;s build something exceptional together.
            </h2>
            <a href={`mailto:${personalInfo.email}`} className="group mt-10 inline-flex items-center gap-3 border-b border-zinc-600 pb-2 text-base font-medium text-zinc-200 transition hover:border-violet-300 hover:text-violet-300 sm:text-xl">
              {personalInfo.email}<ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="mt-16 flex flex-col gap-5 border-t border-zinc-800 pt-8 text-sm text-zinc-400 sm:flex-row sm:gap-10">
              <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition hover:text-white"><Phone className="size-4" />{personalInfo.phone}</a>
              <span className="flex items-center gap-2"><MapPin className="size-4" />{personalInfo.location}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
            <p>Designed with intent. Built with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
