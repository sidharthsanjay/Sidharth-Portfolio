"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { categories, projects, type Category, type Project } from "@/lib/site";
import validationShot from "@/assets/autopal/validation-tool.png";
import engineShot from "@/assets/autopal/engine-dashboard.png";
import errorsShot from "@/assets/autopal/error-log-viewer.png";
import { ArrowUpRight, Close, Expand, Github } from "./icons";
import { Reveal, SectionHeading, WordReveal, trackSpotlight } from "./motion-primitives";

const shots: Record<NonNullable<Project["gallery"]>[number]["key"], StaticImageData> = {
  validation: validationShot,
  engine: engineShot,
  errors: errorsShot,
};

const categoryStyle: Record<Category, { text: string; spot: string }> = {
  "Data & BI": { text: "text-teal", spot: "46 196 182" },
  "AI / ML": { text: "text-coral", spot: "255 107 74" },
  Web: { text: "text-violet", spot: "139 107 255" },
  Automation: { text: "text-amber", spot: "255 210 63" },
};

type Shot = { src: StaticImageData; label: string };

function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      prev?.focus({ preventScroll: true });
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={shot.label}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-cursor="Close"
    >
      <motion.figure
        layoutId={`shot-${shot.label}`}
        className="relative max-w-6xl overflow-hidden rounded-2xl border border-line bg-surface"
        onClick={(e) => e.stopPropagation()}
        data-cursor=""
      >
        <Image src={shot.src} alt={`Auto Pal: ${shot.label}`} className="h-auto max-h-[80svh] w-auto" placeholder="blur" />
        <figcaption className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-muted">
          Auto Pal · {shot.label}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="grid size-9 place-items-center rounded-full border border-line text-fg"
          >
            <Close size={16} />
          </button>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

function ProjectCard({ project, onShot }: { project: Project; onShot: (s: Shot) => void }) {
  const style = categoryStyle[project.category];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onPointerMove={trackSpotlight}
      style={{ ["--spot" as string]: style.spot }}
      className="spotlight group flex flex-col rounded-3xl border border-line bg-surface p-6 transition-colors hover:bg-surface-2 sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${style.text}`}>{project.category}</span>
        <span className="font-mono text-xs text-faint">
          {project.note ? <span className="mr-2 rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">{project.note}</span> : null}
          {project.year}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

      {project.gallery ? (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {project.gallery.map((g) => (
            <motion.button
              key={g.key}
              layoutId={`shot-${g.label}`}
              type="button"
              onClick={() => onShot({ src: shots[g.key], label: g.label })}
              data-cursor="Zoom"
              className="group/shot relative aspect-[16/10] overflow-hidden rounded-lg border border-line"
              aria-label={`Open screenshot: ${g.label}`}
            >
              <Image
                src={shots[g.key]}
                alt=""
                fill
                sizes="(min-width: 1024px) 120px, 30vw"
                className="object-cover object-top transition-transform duration-500 group-hover/shot:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/50 opacity-0 transition-opacity group-hover/shot:opacity-100">
                <Expand size={16} />
              </span>
            </motion.button>
          ))}
        </div>
      ) : null}

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.tags.map((t) => (
          <li key={t} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 pt-6">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs text-fg transition-colors hover:border-line-strong hover:bg-white/5"
          >
            <Github size={14} /> Code
          </a>
        ) : null}
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="group/demo inline-flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-2 text-xs font-medium text-bg"
          >
            Live demo
            <ArrowUpRight size={14} className="transition-transform group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [shot, setShot] = useState<Shot | null>(null);
  const close = useCallback(() => setShot(null), []);
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="More projects"
          title={<WordReveal text="Dashboards, models and tools along the way." />}
          description="Data products, BI reports, ML experiments and small tools, most with code on GitHub."
        />
        <Reveal delay={0.2}>
          <div role="group" aria-label="Filter projects" className="glass flex max-w-full gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none]">
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={filter === c}
                type="button"
                onClick={() => setFilter(c)}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  filter === c ? "text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {filter === c ? (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div layout className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <ProjectCard key={p.title} project={p} onShot={setShot} />
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-10 flex justify-center">
        <a
          href="https://github.com/sidharthsanjay?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <Github size={16} /> Everything else on GitHub
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>

      <AnimatePresence>{shot ? <Lightbox shot={shot} onClose={close} /> : null}</AnimatePresence>
    </section>
  );
}
