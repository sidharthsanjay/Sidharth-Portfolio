"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { featured, type FeaturedProject } from "@/lib/site";
import { ArrowUpRight, Close } from "./icons";
import { SectionHeading, WordReveal, trackSpotlight } from "./motion-primitives";
import { CatalogueVisual, MatchingVisual, RouteVisual } from "./visuals";

const accent = {
  violet: { text: "text-violet", glow: "rgb(139 107 255 / 0.22)", spot: "139 107 255", dot: "bg-violet" },
  teal: { text: "text-teal", glow: "rgb(46 196 182 / 0.2)", spot: "46 196 182", dot: "bg-teal" },
  coral: { text: "text-coral", glow: "rgb(255 107 74 / 0.18)", spot: "255 107 74", dot: "bg-coral" },
} as const;

const visuals = { rhsme: CatalogueVisual, aba: MatchingVisual, rdms: RouteVisual };

function StackCard({
  project,
  index,
  total,
  progress,
  onOpen,
}: {
  project: FeaturedProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  const a = accent[project.accent];
  const Visual = visuals[project.id];
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.05]);
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - index) * 0.25]);

  return (
    <div
      className="md:sticky"
      style={{ top: `calc(6.5rem + ${index * 22}px)`, paddingBottom: index < total - 1 ? "8vh" : 0 }}
    >
      <motion.article
        style={{ scale, transformOrigin: "top center", ["--spot" as string]: a.spot }}
        onPointerMove={trackSpotlight}
        onClick={(e) => {
          // The button handles keyboard and its own clicks; this makes the rest of the card a target too.
          if (!(e.target as Element).closest("a, button")) onOpen();
        }}
        data-cursor="Read"
        className="spotlight relative overflow-hidden rounded-[2rem] border border-line bg-surface"
        aria-labelledby={`${project.id}-title`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 size-[28rem] rounded-full blur-3xl"
          style={{ background: a.glow }}
        />
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:p-12">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className={`font-mono text-xs uppercase tracking-[0.18em] ${a.text}`}>
                0{index + 1} · {project.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
                <span className={`size-1.5 animate-pulse rounded-full ${a.dot}`} />
                {project.status}
              </span>
            </div>

            <h3 id={`${project.id}-title`} className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{project.tagline}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold tracking-tight sm:text-3xl">{m.value}</span>
                    <span className="mt-1 block text-xs leading-snug text-muted">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/[0.02] px-2.5 py-1 text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 lg:mt-auto lg:pt-8">
              <button
                type="button"
                onClick={onOpen}
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform active:scale-95"
              >
                Read the case study
                <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <span className="text-xs text-faint">{project.role}</span>
            </div>
          </div>

          {/* The illustration is for hovering, so it keeps the plain cursor and doesn't open the case study. */}
          <div className="lg:pt-2" data-cursor="" onClick={(e) => e.stopPropagation()}>
            <Visual />
          </div>
        </div>
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-bg" />
      </motion.article>
    </div>
  );
}

function CaseStudy({ project, onClose }: { project: FeaturedProject; onClose: () => void }) {
  const a = accent[project.accent];
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      prev?.focus({ preventScroll: true });
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        data-cursor="Close"
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] border border-line bg-surface sm:rounded-[2rem]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full blur-3xl"
          style={{ background: a.glow }}
        />
        <div className="relative flex items-start justify-between gap-4 border-b border-line p-6 sm:p-8">
          <div>
            <p className={`font-mono text-xs uppercase tracking-[0.18em] ${a.text}`}>{project.eyebrow}</p>
            <h3 id="case-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {project.role} · {project.status}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
          >
            <Close />
          </button>
        </div>

        <div className="relative overflow-y-auto overscroll-contain p-6 sm:p-8" data-lenis-prevent>
          <p className="text-pretty text-base leading-relaxed text-fg/90 sm:text-lg">{project.summary}</p>

          <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">Highlights</h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
              >
                <span className={`mt-2.5 size-1.5 shrink-0 rounded-full ${a.dot}`} />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {project.caseStudy.map((c) => (
              <section key={c.heading} className="rounded-2xl border border-line bg-white/[0.02] p-5">
                <h4 className="text-sm font-semibold">{c.heading}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </section>
            ))}
          </div>

          <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">Stack</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-relaxed text-faint">
            Built at NEXT for a client. The code and data are private, so the visuals on this page use sample data.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedWork() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const [open, setOpen] = useState<FeaturedProject | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="Selected work · 2026"
        title={<WordReveal text="Systems running a business across three countries." />}
        description="Three platforms I've built with the NEXT team for RHS Middle East, a hospitality supplier in Qatar, the UAE and Saudi Arabia. Each one puts ERP data in front of the people who need it."
      />

      <div ref={container} className="relative mt-16 flex flex-col gap-8 md:gap-0">
        {featured.map((p, i) => (
          <StackCard
            key={p.id}
            project={p}
            index={i}
            total={featured.length}
            progress={scrollYProgress}
            onOpen={() => setOpen(p)}
          />
        ))}
      </div>

      <AnimatePresence>{open ? <CaseStudy project={open} onClose={close} /> : null}</AnimatePresence>
    </section>
  );
}
