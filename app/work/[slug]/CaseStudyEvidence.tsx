import Image from "next/image";
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  CircleDot,
  Component,
  MousePointer2,
  Palette,
  Smartphone,
} from "lucide-react";

import type { Project } from "@/data/portfolio";

type EvidenceProps = {
  project: Project;
};

const sectionShell = "mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 2xl:px-8";

function SectionIntroduction({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof MousePointer2;
}) {
  return (
    <div className="case-reveal lg:sticky lg:top-28 lg:self-start">
      <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">
        <Icon className="size-4" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
        {title}
      </h2>
      <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">{description}</p>
    </div>
  );
}

function ComparisonPanel({ project }: EvidenceProps) {
  const comparison = project.caseStudyVisuals?.comparison;

  if (!comparison) return null;

  return (
    <div className="case-reveal overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80" style={{ animationDelay: "160ms" }}>
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-zinc-800 p-6 sm:p-8 lg:border-r lg:border-b-0">
          <p className="font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">Before / {comparison.beforeLabel}</p>
          <div className="mt-8 space-y-3 opacity-70" aria-hidden="true">
            <span className="block h-2 w-3/4 rounded-full bg-zinc-800" />
            <span className="block h-2 w-full rounded-full bg-zinc-800" />
            <span className="block h-2 w-2/3 rounded-full bg-zinc-800" />
          </div>
          <p className="mt-8 max-w-md text-sm leading-7 text-zinc-400">{comparison.before}</p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-400/10 via-transparent to-cyan-400/10 p-6 sm:p-8">
          <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-violet-300 via-cyan-300 to-transparent lg:h-full lg:w-px lg:bg-gradient-to-b" />
          <p className="font-mono text-[11px] tracking-[0.16em] text-cyan-200 uppercase">After / {comparison.afterLabel}</p>
          <div className="mt-8 flex items-center gap-3" aria-hidden="true">
            <span className="grid size-10 place-items-center rounded-xl border border-violet-300/30 bg-violet-300/10"><CircleDot className="size-4 text-violet-200" /></span>
            <span className="h-px flex-1 bg-gradient-to-r from-violet-300/70 to-cyan-300/20" />
            <span className="grid size-10 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10"><CheckCircle2 className="size-4 text-cyan-200" /></span>
          </div>
          <p className="mt-8 max-w-md text-sm leading-7 text-zinc-300">{comparison.after}</p>
        </div>
      </div>
      <div className="flex gap-3 border-t border-zinc-800 bg-zinc-900/55 px-6 py-5 text-sm leading-6 text-zinc-400 sm:px-8">
        <ArrowRight className="mt-1 size-4 shrink-0 text-violet-300" aria-hidden="true" />
        <p><span className="font-medium text-zinc-200">Why this direction:</span> {comparison.rationale}</p>
      </div>
    </div>
  );
}

function ProcessRail({ project, labels }: EvidenceProps & { labels: string[] }) {
  return (
    <div className="case-reveal rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8" style={{ animationDelay: "220ms" }}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-zinc-100">Process trail</h3>
        <span className="font-mono text-[11px] text-zinc-600">{String(project.process?.length ?? 0).padStart(2, "0")} decisions</span>
      </div>
      <ol className="mt-8 grid gap-0 md:grid-cols-3">
        {labels.map((label, index) => (
          <li key={label} className="relative border-l border-zinc-800 py-1 pb-8 pl-6 last:pb-0 md:border-t md:border-l-0 md:pt-7 md:pr-7 md:pb-0 md:pl-0">
            <span className="absolute top-1 -left-1.5 size-3 rounded-full border-2 border-zinc-950 bg-violet-300 md:-top-1.5 md:left-0" />
            <p className="font-mono text-[11px] text-violet-300">0{index + 1} / {label}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{project.process?.[index] ?? "Refined the direction against the project constraints."}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProductEvidence({ project }: EvidenceProps) {
  const visuals = project.caseStudyVisuals;
  const markerPositions = project.slug === "ar-mechanic"
    ? ["top-[28%] left-[70%]", "top-[50%] left-[78%]", "top-[72%] left-[66%]"]
    : ["top-[34%] left-[58%]", "top-[58%] left-[73%]", "top-[74%] left-[83%]"];

  return (
    <section className="border-y border-zinc-900 bg-zinc-900/20 py-24 lg:py-32">
      <div className={`${sectionShell} grid gap-12 xl:grid-cols-12 xl:gap-16`}>
        <div className="xl:col-span-4">
          <SectionIntroduction
            eyebrow="02 / Product evidence"
            title="Decisions mapped to the experience"
            description="Research signals are connected to concrete interface responses, showing how the product moved from uncertainty to a clearer path through the task."
            icon={MousePointer2}
          />
        </div>

        <div className="space-y-6 xl:col-span-8">
          <figure className="case-reveal overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80" style={{ animationDelay: "80ms" }}>
            <div className="grid xl:grid-cols-[minmax(0,1.3fr)_22rem]">
              <div className="relative min-h-80 overflow-hidden border-b border-zinc-800 xl:min-h-[34rem] xl:border-r xl:border-b-0">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} annotated interface artefact`}
                    fill
                    quality={90}
                    sizes="(max-width: 1280px) 100vw, 760px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-zinc-950/10" />
                {visuals?.annotations.map((annotation, index) => (
                  <span
                    key={annotation.label}
                    className={`absolute ${markerPositions[index]} hidden size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-zinc-950/85 font-mono text-xs text-white shadow-[0_0_0_8px_rgba(139,92,246,0.15)] backdrop-blur md:grid`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                ))}
                <figcaption className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/10 bg-zinc-950/75 p-5 backdrop-blur-md sm:right-auto sm:max-w-md">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-violet-300 uppercase">{visuals?.artefactLabel ?? "Interaction artefact"}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{visuals?.artefactTitle ?? project.title}</p>
                </figcaption>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-7 text-zinc-400">{visuals?.artefactDescription}</p>
                <ol className="mt-8 space-y-6">
                  {visuals?.annotations.map((annotation, index) => (
                    <li key={annotation.label} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="grid size-8 place-items-center rounded-full border border-violet-300/30 bg-violet-300/10 font-mono text-[11px] text-violet-200">{index + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-zinc-100">{annotation.label}</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">{annotation.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </figure>

          <div className="case-reveal grid gap-px overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-800 md:grid-cols-3" style={{ animationDelay: "120ms" }}>
            {project.research?.slice(0, 3).map((insight, index) => (
              <article key={insight} className="bg-zinc-950 p-6">
                <p className="font-mono text-[10px] tracking-[0.16em] text-zinc-600 uppercase">Signal 0{index + 1}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-300">{insight}</p>
                <div className="mt-6 flex items-start gap-2 border-t border-zinc-800 pt-4 text-xs leading-5 text-violet-200">
                  <ArrowRight className="mt-0.5 size-3.5 shrink-0" />
                  <span>{project.process?.[index]}</span>
                </div>
              </article>
            ))}
          </div>

          <ComparisonPanel project={project} />
        </div>
      </div>
    </section>
  );
}

function BrandEvidence({ project }: EvidenceProps) {
  const visuals = project.caseStudyVisuals;
  const palette = visuals?.palette ?? [
    { name: "Primary", value: "#7C3AED" },
    { name: "Secondary", value: "#22D3EE" },
    { name: "Neutral", value: "#18181B" },
  ];

  return (
    <section className="border-y border-zinc-900 bg-[linear-gradient(180deg,rgba(24,24,27,0.35),rgba(9,9,11,0.8))] py-24 lg:py-32">
      <div className={sectionShell}>
        <div className="grid gap-12 xl:grid-cols-12 xl:gap-16">
          <div className="xl:col-span-4">
            <SectionIntroduction
              eyebrow="02 / Identity evidence"
              title="A visual language built to travel"
              description="The mark is only the beginning. Color, typography, hierarchy, and application rules work together to keep the identity recognizable and useful."
              icon={Palette}
            />
          </div>

          <div className="space-y-6 xl:col-span-8">
            <div className="case-reveal grid overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 lg:grid-cols-[minmax(0,1.25fr)_20rem]" style={{ animationDelay: "80ms" }}>
              <figure className="relative min-h-80 overflow-hidden border-b border-zinc-800 bg-white lg:min-h-[34rem] lg:border-r lg:border-b-0">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} identity construction board`}
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                )}
                <figcaption className="absolute right-5 bottom-5 left-5 rounded-2xl border border-black/10 bg-white/90 p-5 text-zinc-950 shadow-xl backdrop-blur sm:right-auto sm:max-w-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-700 uppercase">{visuals?.artefactLabel ?? "Identity artefact"}</p>
                  <p className="mt-2 text-lg font-semibold">{visuals?.artefactTitle ?? project.title}</p>
                </figcaption>
              </figure>

              <div className="p-6 sm:p-8">
                <p className="text-sm leading-7 text-zinc-400">{visuals?.artefactDescription}</p>
                <ol className="mt-8 space-y-6">
                  {visuals?.annotations.map((annotation, index) => (
                    <li key={annotation.label}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-violet-300">0{index + 1}</span>
                        <span className="h-px flex-1 bg-zinc-800" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-zinc-100">{annotation.label}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">{annotation.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="case-reveal grid gap-px overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-800 md:grid-cols-3" style={{ animationDelay: "100ms" }}>
              {project.research?.slice(0, 3).map((item, index) => (
                <article key={item} className="bg-zinc-950 p-6">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-violet-300 uppercase">Strategic input 0{index + 1}</p>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">{item}</p>
                </article>
              ))}
            </div>

            <div className="case-reveal grid gap-6 lg:grid-cols-[1.15fr_0.85fr]" style={{ animationDelay: "120ms" }}>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-violet-300 uppercase">Colour roles</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">Built for clarity and reassurance</h3>
                  </div>
                  <Palette className="size-5 text-zinc-600" aria-hidden="true" />
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {palette.map((color) => (
                    <div key={color.name}>
                      <span className="block aspect-square rounded-2xl border border-white/10 shadow-inner" style={{ backgroundColor: color.value }} />
                      <p className="mt-3 text-xs font-medium text-zinc-300">{color.name}</p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-600">{color.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-[#f7fafc] p-6 text-[#082b3a] sm:p-8">
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#237fbd] uppercase">Type hierarchy</p>
                <p className="mt-8 text-4xl leading-none font-semibold tracking-tight">Care,<br />made clear.</p>
                <p className="mt-6 max-w-xs text-sm leading-6 text-[#47616c]">A direct headline voice supported by calm, highly legible body copy.</p>
                <div className="mt-8 flex items-end justify-between border-t border-[#237fbd]/20 pt-4">
                  <span className="text-xs font-medium">Aa / 48</span>
                  <span className="text-xs text-[#47616c]">Regular — Semibold</span>
                </div>
              </div>
            </div>

            <ComparisonPanel project={project} />
            <ProcessRail project={project} labels={["Position", "Construct", "Apply"]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FrontendEvidence({ project }: EvidenceProps) {
  const highlights = project.technicalHighlights ?? project.process ?? [];

  return (
    <section className="border-y border-zinc-900 bg-zinc-900/20 py-24 lg:py-32">
      <div className={`${sectionShell} grid gap-12 xl:grid-cols-12 xl:gap-16`}>
        <div className="xl:col-span-4">
          <SectionIntroduction
            eyebrow="02 / Build evidence"
            title="The interface as a working system"
            description="Responsive behavior, reusable components, and implementation constraints are presented as product decisions—not hidden engineering details."
            icon={Braces}
          />
        </div>
        <div className="space-y-6 xl:col-span-8">
          <div className="case-reveal rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-violet-300 uppercase">Responsive composition</p>
                <h3 className="mt-2 text-lg font-semibold text-white">One hierarchy across three viewports</h3>
              </div>
              <Component className="size-5 text-zinc-600" aria-hidden="true" />
            </div>
            <div className="mt-10 flex items-end justify-center gap-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:gap-8 sm:p-10">
              {[{ label: "Mobile", width: "w-20", height: "h-36" }, { label: "Tablet", width: "w-36", height: "h-48" }, { label: "Desktop", width: "w-64", height: "h-56" }].map((viewport) => (
                <div key={viewport.label} className="text-center">
                  <div className={`${viewport.width} ${viewport.height} max-w-full rounded-xl border border-zinc-700 bg-zinc-950 p-2 shadow-2xl`}>
                    <div className="h-2 w-1/2 rounded bg-violet-300/60" />
                    <div className="mt-3 h-8 rounded bg-zinc-800" />
                    <div className="mt-2 grid grid-cols-2 gap-1"><span className="h-10 rounded bg-zinc-800" /><span className="h-10 rounded bg-cyan-300/15" /></div>
                  </div>
                  <p className="mt-3 text-[10px] text-zinc-500">{viewport.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="case-reveal grid gap-4 sm:grid-cols-2" style={{ animationDelay: "100ms" }}>
            {highlights.map((item, index) => (
              <article key={item} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/35">
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-violet-300">0{index + 1}</span><Smartphone className="size-4 text-zinc-600" /></div>
                <p className="mt-8 text-sm leading-7 text-zinc-300">{item}</p>
              </article>
            ))}
          </div>
          <ComparisonPanel project={project} />
          <ProcessRail project={project} labels={["Model", "Build", "Verify"]} />
        </div>
      </div>
    </section>
  );
}

export function CaseStudyEvidence({ project }: EvidenceProps) {
  if (project.category === "brand") return <BrandEvidence project={project} />;
  if (project.category === "frontend") return <FrontendEvidence project={project} />;
  return <ProductEvidence project={project} />;
}
