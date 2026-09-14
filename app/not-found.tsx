"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4 text-center text-white"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.78)_72%)]" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-5 py-2 text-sm font-semibold tracking-[0.14em] text-violet-200 uppercase">
          404 — Page Not Found
        </span>
        <h1 className="mt-8 text-5xl font-bold tracking-[-0.05em] text-zinc-100 sm:text-7xl">
          Lost in space?
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg">
          The link you followed might be broken, or the page has been moved.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>
      </div>
    </motion.main>
  );
}
