import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

import { PrintResumeButton } from "./PrintResumeButton";
import { personalInfo } from "@/data/personalInfo";
import { hasCompleteCaseStudy, portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Résumé — Ibraheem Olawale",
  description: "Résumé and selected product design, brand identity, and frontend work by Ibraheem Olawale Oladepo.",
};

const documentedProjects = portfolioData.filter(hasCompleteCaseStudy);
const frontendProjects = portfolioData.filter((project) => project.category === "frontend");

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="print-hidden border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white">
            <ArrowLeft className="size-4" /> Back to portfolio
          </Link>
          <PrintResumeButton />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <section className="border-b border-zinc-800 pb-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Résumé / Portfolio profile</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">{personalInfo.name}</h1>
              <p className="mt-4 text-xl text-zinc-300">{personalInfo.role}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400">{personalInfo.bio}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-end lg:grid-cols-1">
              <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/20">
                <Image
                  src="/images/ibraheem-passport.jpeg"
                  alt="Headshot of Ibraheem Olawale"
                  fill
                  quality={88}
                  sizes="112px"
                  className="object-cover object-top"
                />
              </div>
              <div className="grid shrink-0 gap-2 text-sm text-zinc-300">
                <span className="flex min-h-11 items-center gap-2"><MapPin className="size-4 shrink-0 text-violet-300" />{personalInfo.location}</span>
                <a href={`mailto:${personalInfo.email}`} className="flex min-h-11 items-center gap-2 break-all transition hover:text-white"><Mail className="size-4 shrink-0 text-violet-300" />{personalInfo.email}</a>
                <a href={`tel:${personalInfo.phone}`} className="flex min-h-11 items-center gap-2 transition hover:text-white"><Phone className="size-4 shrink-0 text-violet-300" />{personalInfo.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-b border-zinc-800 py-12 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-violet-300 uppercase">Experience</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Independent practice</h2>
          </div>
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">UI/UX Designer &amp; Frontend Builder</h3>
                <p className="mt-1 text-sm text-zinc-400">Self-directed product, identity, and web application work</p>
              </div>
              <span className="text-sm text-zinc-400">2+ years</span>
            </div>
            <ul className="mt-7 space-y-4 text-sm leading-7 text-zinc-300">
              <li>Frame product problems, map task flows, and create responsive high-fidelity prototypes and design systems in Figma.</li>
              <li>Develop visual identity systems covering positioning, logo behavior, typography, color, layout, and representative applications.</li>
              <li>Translate interface concepts into deployed React applications with reusable components, responsive layouts, accessible states, and documented demo boundaries.</li>
              <li>Maintain public project repositories and production builds for selected frontend work.</li>
            </ul>
          </div>
        </section>

        <section className="border-b border-zinc-800 py-12">
          <p className="text-xs font-medium tracking-[0.18em] text-violet-300 uppercase">Core capabilities</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              ["Product design", "Problem framing, task flows, wireframes, high-fidelity UI, prototyping, and design systems."],
              ["Brand systems", "Positioning, identity development, typography, color, application design, and guidelines."],
              ["Frontend", "React, Next.js, Vite, Tailwind CSS, responsive implementation, accessibility, and Vercel deployment."],
            ].map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                <h2 className="font-semibold text-zinc-100">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-zinc-800 py-12">
          <p className="text-xs font-medium tracking-[0.18em] text-violet-300 uppercase">Documented case studies</p>
          <div className="mt-7 grid gap-4">
            {documentedProjects.map((project) => (
              <article key={project.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs text-violet-300">{project.categoryLabel}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{project.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">{project.summary}</p>
                    <p className="mt-3 text-xs text-zinc-400">{project.role} · {project.projectType} · {project.status}</p>
                  </div>
                  <Link href={`/work/${project.slug}`} className="print-hidden inline-flex min-h-11 shrink-0 items-center gap-2 text-sm text-zinc-300 transition hover:text-white">
                    Case study <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-zinc-800 py-12">
          <p className="text-xs font-medium tracking-[0.18em] text-violet-300 uppercase">Frontend evidence</p>
          <div className="mt-7 grid gap-4">
            {frontendProjects.map((project) => (
              <article key={project.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">{project.description}</p>
                    {project.technicalHighlights && (
                      <ul className="mt-5 grid gap-2 text-sm leading-6 text-zinc-300 sm:grid-cols-2">
                        {project.technicalHighlights.map((highlight) => <li key={highlight}>• {highlight}</li>)}
                      </ul>
                    )}
                  </div>
                  <div className="print-hidden flex shrink-0 flex-wrap gap-3">
                    {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-700 px-4 text-xs font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white">Live app <ExternalLink className="size-3.5" /></a>}
                    {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-700 px-4 text-xs font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white">Source <SiGithub className="size-3.5" /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-6 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">Available for thoughtful product, brand, and frontend collaborations.</p>
            <p className="mt-2 text-sm text-zinc-400">Based in {personalInfo.location}.</p>
          </div>
          <div className="print-hidden flex flex-wrap gap-3">
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-300 transition hover:text-white"><SiGithub className="size-4" />GitHub</a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-300 transition hover:text-white"><SiLinkedin className="size-4" />LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-300 transition hover:text-white"><Mail className="size-4" />Email</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
