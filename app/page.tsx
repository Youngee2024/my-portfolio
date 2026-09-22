"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { SiBehance, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  FileText,
  Mail,
  Loader2,
  MapPin,
  Maximize2,
  Menu,
  Palette,
  Phone,
  PenTool,
  Send,
  X,
} from "lucide-react";

import { personalInfo } from "@/data/personalInfo";
import { hasCompleteCaseStudy, portfolioData, type Project } from "@/data/portfolio";

type Filter = "all" | Project["category"];
type FormStatus = "idle" | "submitting" | "success" | "error";
type FormErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const filters: { label: string; value: Filter }[] = [
  { label: "All Work", value: "all" },
  { label: "UI/UX & Product Design", value: "uiux" },
  { label: "Brand & Visual Identity", value: "brand" },
  { label: "Frontend & Technical Code", value: "frontend" },
];

const projectOrder = [
  "pulse",
  "ar-mechanic",
  "vitalcare",
  "fashion-xpress",
  "ai-interviewer",
  "maya-insurance",
  "voya-ui",
  "cropcura",
  "sara-handcraft",
];

const orderedPortfolioData = [...portfolioData].sort(
  (first, second) => projectOrder.indexOf(first.id) - projectOrder.indexOf(second.id),
);

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
  { label: "GitHub", href: personalInfo.socials.github, icon: SiGithub },
  { label: "LinkedIn", href: personalInfo.socials.linkedin, icon: SiLinkedin },
  { label: "Behance", href: personalInfo.socials.behance, icon: SiBehance },
  { label: "X / Twitter", href: personalInfo.socials.twitter, icon: SiX },
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
          <span className="text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFigmaUrl, setSelectedFigmaUrl] = useState<string | null>(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const formErrorRef = useRef<HTMLDivElement>(null);
  const visibleProjects = orderedPortfolioData.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  const closeFigmaModal = () => {
    setSelectedFigmaUrl(null);
    setSelectedProjectTitle(null);
  };

  const openFigmaModal = (project: Project, trigger?: HTMLElement) => {
    if (!project.figmaEmbedUrl) return;

    modalTriggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setSelectedFigmaUrl(project.figmaEmbedUrl);
    setSelectedProjectTitle(project.title);
  };

  useEffect(() => {
    if (!selectedFigmaUrl) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("header, #main-content, footer"),
    );
    const previousAriaHidden = backgroundElements.map((element) =>
      element.getAttribute("aria-hidden"),
    );
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    const focusableSelector =
      'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
    const focusCloseButton = window.requestAnimationFrame(() => modalCloseButtonRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedFigmaUrl(null);
        setSelectedProjectTitle(null);
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (!firstElement || !lastElement) return;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      backgroundElements.forEach((element, index) => {
        element.inert = false;
        const ariaHidden = previousAriaHidden[index];
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      });
      modalTriggerRef.current?.focus();
    };
  }, [selectedFigmaUrl]);

  useEffect(() => {
    if (status !== "success") return;

    const resetTimer = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(resetTimer);
  }, [status]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const firstLink = mobileNavigationRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: FormErrors = {};
    if (!name.trim()) errors.name = "Please enter your name.";
    if (!email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!message.trim()) errors.message = "Please tell me a little about your project.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus("error");
      window.requestAnimationFrame(() => {
        if (errors.name) nameInputRef.current?.focus();
        else if (errors.email) emailInputRef.current?.focus();
        else if (errors.message) messageInputRef.current?.focus();
      });
      return;
    }

    setValidationErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Your message could not be sent.");
      }

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setStatus("success");
    } catch (error) {
      setValidationErrors({
        form:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again or email me directly.",
      });
      setStatus("error");
      window.requestAnimationFrame(() => formErrorRef.current?.focus());
    }
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100 selection:bg-violet-400 selection:text-zinc-950">
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-full bg-violet-300 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-white/6 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex min-h-11 min-w-11 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" aria-label="Back to top">
            <span className="grid size-9 place-items-center rounded-full border border-violet-400/35 bg-violet-400/10 text-xs font-bold tracking-tight text-violet-300 transition group-hover:bg-violet-400 group-hover:text-zinc-950">
              IO
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-zinc-100 sm:block">
              {personalInfo.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-zinc-400 lg:flex" aria-label="Main navigation">
            <a className="flex min-h-11 items-center transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" href="#work">Work</a>
            <a className="flex min-h-11 items-center transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" href="#capabilities">Capabilities</a>
            <a className="flex min-h-11 items-center transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" href="#about">About</a>
            <Link className="flex min-h-11 items-center transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" href="/resume">Résumé</Link>
            <a className="flex min-h-11 items-center transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" href="#contact">Contact</a>
          </nav>

          <a
            href={`mailto:${personalInfo.email}`}
            className="hidden min-h-11 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-200 transition hover:border-violet-400/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 xl:flex"
          >
            <Mail className="size-3.5" />
            {personalInfo.email}
          </a>
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-zinc-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav
            ref={mobileNavigationRef}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-zinc-800 bg-zinc-950/95 px-5 py-4 shadow-2xl lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1 sm:px-3">
              {[
                ["Work", "#work"],
                ["Capabilities", "#capabilities"],
                ["About", "#about"],
                ["Résumé", "/resume"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-4 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
                >
                  {label}
                </a>
              ))}
              <a
                href={`mailto:${personalInfo.email}`}
                className="mt-2 flex min-h-12 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium text-zinc-200 transition hover:border-violet-400/60 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                <Mail className="size-4" /> Email me
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="hero" className="relative isolate overflow-hidden">
          <div className="absolute top-0 left-1/2 -z-10 h-[42rem] w-[64rem] -translate-x-1/2 rounded-full bg-violet-600/8 blur-3xl" />
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-16 lg:grid-cols-12 lg:pt-32">
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={heroContainerVariants}
            >
              <motion.div
                variants={heroItemVariants}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-zinc-400 uppercase"
              >
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                Available for projects
              </motion.div>
              <motion.h1
                variants={heroItemVariants}
                className="mb-6 max-w-xl text-3xl leading-[1.15] font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl"
              >
                Designing &amp; building digital experiences
                <span className="mt-4 block bg-gradient-to-r from-zinc-500 via-zinc-200 to-violet-300 bg-clip-text text-transparent">
                  that work beautifully.
                </span>
              </motion.h1>
              <motion.p
                variants={heroItemVariants}
                className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
              >
                {personalInfo.bio}
              </motion.p>
              <motion.p
                variants={heroItemVariants}
                className="mt-5 max-w-3xl text-xs leading-6 font-medium tracking-wide text-zinc-400 uppercase"
              >
                60% UI/UX &amp; Product Design <span className="mx-2 text-violet-400">•</span>
                20% Brand &amp; Visual Systems <span className="mx-2 text-violet-400">•</span>
                20% Frontend &amp; Technical Code
              </motion.p>

              <motion.div variants={heroItemVariants} className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300"
                >
                  View Work
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-6 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                >
                  Contact Me
                  <Mail className="size-4" />
                </a>
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            <div className="relative mx-auto w-full max-w-sm lg:col-span-5" aria-hidden="true">
              <div className="absolute -inset-12 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/55 p-5 shadow-2xl shadow-black/50">
                <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/8 bg-[linear-gradient(145deg,#18181b_0%,#09090b_65%)] p-7">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    <span>Design to build</span><span>2026</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.2em] text-violet-300 uppercase">From problem to product</p>
                    <p className="mt-4 max-w-64 text-4xl leading-[1.05] font-semibold tracking-[-0.05em] text-white">Design with intent. Build with care.</p>
                    <div className="mt-7 h-px bg-gradient-to-r from-violet-400 via-zinc-700 to-transparent" />
                    <div className="mt-5 grid gap-3 text-xs text-zinc-400">
                      <span><span className="mr-3 font-mono text-violet-300">01</span>Understand the context</span>
                      <span><span className="mr-3 font-mono text-violet-300">02</span>Shape a coherent system</span>
                      <span><span className="mr-3 font-mono text-violet-300">03</span>Deliver the experience</span>
                    </div>
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

        <section id="work" className="scroll-mt-24 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-8 border-b border-zinc-800 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Portfolio / 01</p>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Selected Works</h2>
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-2" aria-label="Filter projects">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={activeFilter === filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`min-h-11 shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
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
                      <span className="font-mono text-xs text-zinc-500">0{orderedPortfolioData.indexOf(project) + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-6 flex min-h-9 flex-wrap items-center gap-5 border-t border-zinc-800">
                      {hasCompleteCaseStudy(project) && (
                        <Link
                          href={`/work/${project.slug}`}
                          className="flex min-h-11 items-center gap-1.5 pt-3 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                          View Case Study <ArrowUpRight className="size-3.5" />
                        </Link>
                      )}
                      {project.figmaEmbedUrl && (
                        <button
                          type="button"
                          onClick={(event) => openFigmaModal(project, event.currentTarget)}
                          className="flex min-h-11 items-center gap-1.5 pt-3 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                          View Prototype <Maximize2 className="size-3.5" />
                        </button>
                      )}
                      {project.liveLink && !project.figmaEmbedUrl && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex min-h-11 items-center gap-1.5 pt-3 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                          Live App <ExternalLink className="size-3.5" />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex min-h-11 items-center gap-1.5 pt-3 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          Source <SiGithub className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-zinc-950 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-5 border-b border-zinc-800 pb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-4 text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">About / 02</p>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-6xl">About &amp; Philosophy</h2>
              </div>
              <span className="w-fit rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-xs font-medium text-violet-200">
                How I work
              </span>
            </div>

            <p className="mt-12 max-w-5xl text-2xl leading-snug font-medium tracking-[-0.025em] text-zinc-100 sm:text-4xl sm:leading-tight">
              I treat design and implementation as one continuous problem-solving process: clarify what matters, shape a coherent system, and carry that intent through to the final interface.
            </p>

            <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
                {[
                  {
                    number: "01",
                    title: "Start with the problem",
                    description: "Understand the people, context, constraints, and decisions that matter before polishing the interface.",
                    icon: PenTool,
                  },
                  {
                    number: "02",
                    title: "Build the system, not the screen",
                    description: "Create reusable visual and interaction patterns that keep products and brands coherent as they grow.",
                    icon: Palette,
                  },
                  {
                    number: "03",
                    title: "Close the design–code gap",
                    description: "Carry intent into responsive, accessible implementation so the delivered experience matches the design promise.",
                    icon: Code2,
                  },
                ].map(({ number, title, description, icon: Icon }) => (
                  <article key={number} className="grid gap-5 border-b border-zinc-800 p-6 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start sm:p-7">
                    <span className="font-mono text-xs text-violet-300">{number}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>
                    </div>
                    <Icon className="size-5 text-zinc-500" />
                  </article>
                ))}
              </div>

              <aside className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <p className="text-xs font-medium tracking-[0.16em] text-zinc-400 uppercase">Quick info</p>
                <div className="mt-7 flex items-start gap-3 border-b border-zinc-800 pb-6">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-violet-300" />
                  <div>
                    <p className="text-xs text-zinc-400">Based in</p>
                    <p className="mt-1 text-sm font-medium text-zinc-100">{personalInfo.location}</p>
                  </div>
                </div>
                <div className="py-6">
                  <p className="text-xs text-zinc-400">Core design &amp; dev stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Figma", "React", "Next.js", "Tailwind CSS", "Framer", "Vercel"].map((tool) => (
                      <span key={tool} className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2.5 py-1.5 text-[11px] text-zinc-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto grid gap-3">
                  <Link
                    href="/resume"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                  >
                    View Résumé <FileText className="size-4" />
                  </Link>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300"
                  >
                    Get in Touch
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-y border-zinc-900 bg-zinc-900/20 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Experience / 03</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
                Independent practice, documented proof.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
                Over two years of self-directed design and frontend practice spanning product flows, visual identity systems, responsive React applications, and production deployments.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/resume" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300">
                  View full résumé <FileText className="size-4" />
                </Link>
                <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-700 px-5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white">
                  Review GitHub <SiGithub className="size-4" />
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["2+ years", "Independent UI/UX, brand, and frontend practice"],
                ["3 deep dives", "Documented methodology, ownership, constraints, and evidence boundaries"],
                ["3 live builds", "Public React applications with accessible source repositories"],
                ["End to end", "From product framing and visual systems through implementation and deployment"],
              ].map(([value, label]) => (
                <article key={value} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
                  <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-24 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Capabilities / 04</p>
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
            <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="flex flex-col">
                <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">Have a project in mind?</p>
                <h2 className="mt-6 max-w-xl text-4xl leading-tight font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                  Let&apos;s build something exceptional together.
                </h2>
                <a href={`mailto:${personalInfo.email}`} className="group mt-10 inline-flex min-h-11 w-fit items-center gap-3 border-b border-zinc-600 pb-2 text-base font-medium text-zinc-200 transition hover:border-violet-300 hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:text-lg">
                  {personalInfo.email}<ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <div className="mt-12 flex flex-col gap-5 border-t border-zinc-800 pt-7 text-sm text-zinc-400 sm:flex-row sm:gap-8 lg:mt-auto">
                  <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center gap-2 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"><Phone className="size-4" />{personalInfo.phone}</a>
                  <span className="flex items-center gap-2"><MapPin className="size-4" />{personalInfo.location}</span>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-zinc-800 bg-zinc-950/65 p-5 shadow-2xl shadow-black/20 sm:p-7"
              >
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>
                {status === "success" && (
                  <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300" role="status" aria-live="polite">
                    <Check className="size-4 shrink-0" />
                    Thanks—your message was sent successfully.
                  </div>
                )}
                {status === "error" && validationErrors.form && (
                  <div
                    ref={formErrorRef}
                    className="mb-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300 outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    role="alert"
                    tabIndex={-1}
                  >
                    {validationErrors.form}
                  </div>
                )}
                {status === "error" &&
                  !validationErrors.form &&
                  (validationErrors.name || validationErrors.email || validationErrors.message) && (
                    <div className="mb-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
                      Please correct the highlighted fields before sending your message.
                    </div>
                  )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-xs font-medium text-zinc-300">Name</label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setValidationErrors((current) => ({ ...current, name: undefined }));
                      }}
                      disabled={status === "submitting"}
                      aria-invalid={Boolean(validationErrors.name)}
                      aria-describedby={validationErrors.name ? "contact-name-error" : undefined}
                      className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-violet-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Your name"
                    />
                    {validationErrors.name && <p id="contact-name-error" className="mt-2 text-xs text-red-300">{validationErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-xs font-medium text-zinc-300">Email</label>
                    <input
                      ref={emailInputRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setValidationErrors((current) => ({ ...current, email: undefined }));
                      }}
                      disabled={status === "submitting"}
                      aria-invalid={Boolean(validationErrors.email)}
                      aria-describedby={validationErrors.email ? "contact-email-error" : undefined}
                      className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-violet-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="you@example.com"
                    />
                    {validationErrors.email && <p id="contact-email-error" className="mt-2 text-xs text-red-300">{validationErrors.email}</p>}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-message" className="mb-2 block text-xs font-medium text-zinc-300">Message</label>
                  <textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    maxLength={5000}
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      setValidationErrors((current) => ({ ...current, message: undefined }));
                    }}
                    disabled={status === "submitting"}
                    aria-invalid={Boolean(validationErrors.message)}
                    aria-describedby={validationErrors.message ? "contact-message-error" : undefined}
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-violet-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="Tell me about your project, timeline, and goals..."
                  />
                  {validationErrors.message && <p id="contact-message-error" className="mt-2 text-xs text-red-300">{validationErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <><Loader2 className="size-4 animate-spin" />Sending...</>
                  ) : status === "success" ? (
                    <><Check className="size-4" />Message Sent!</>
                  ) : (
                    <><Send className="size-4" />Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
            <p>Designed with intent. Built with care.</p>
          </div>
        </div>
      </footer>

      {selectedFigmaUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeFigmaModal();
          }}
        >
          <div
            ref={modalRef}
            className="relative flex h-[80vh] max-h-[800px] w-[90vw] max-w-5xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="figma-modal-title"
            aria-describedby="figma-modal-description"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-[0.16em] text-violet-300 uppercase">Interactive Figma prototype</p>
                <h2 id="figma-modal-title" className="mt-1 truncate text-sm font-semibold text-zinc-100 sm:text-base">
                  {selectedProjectTitle}
                </h2>
                <p id="figma-modal-description" className="sr-only">
                  Interactive project prototype. Use Escape to close this dialog.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedFigmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-700 px-4 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
                >
                  <span className="hidden sm:inline">Open in Figma</span>
                  <span className="sm:hidden">Open</span>
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  ref={modalCloseButtonRef}
                  type="button"
                  onClick={closeFigmaModal}
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-zinc-700 bg-zinc-950/60 text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none"
                  aria-label="Close Figma prototype"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>
            <div className="relative h-full w-full flex-1 overflow-hidden bg-black">
              <iframe
                src={selectedFigmaUrl}
                title={`${selectedProjectTitle ?? "Project"} Figma prototype`}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
