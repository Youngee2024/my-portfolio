"use client";

import { Download } from "lucide-react";

export function PrintResumeButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-300"
    >
      Save as PDF <Download className="size-4" />
    </button>
  );
}
