"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { approach, site, skills } from "@/lib/site";
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "./icons";
import { Magnetic, Reveal, SectionHeading, WordReveal, trackSpotlight } from "./motion-primitives";

const accentRgb = {
  violet: "139 107 255",
  teal: "46 196 182",
  coral: "255 107 74",
  amber: "255 210 63",
} as const;

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="Toolkit"
        title={<WordReveal text="From the ERP table to the dashboard." />}
        description="The tools I reach for at each layer of a data product, and what I use them for."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.08}>
            <article
              onPointerMove={trackSpotlight}
              style={{ ["--spot" as string]: accentRgb[group.accent] }}
              className="spotlight group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-6 select-none text-[7rem] font-semibold leading-none tracking-tighter text-white/[0.03] transition-colors duration-500 group-hover:text-white/[0.06]"
              >
                0{i + 1}
              </span>
              <span
                aria-hidden="true"
                className="block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-16"
                style={{ background: `rgb(${accentRgb[group.accent]})` }}
              />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-2 text-sm text-muted">{group.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {group.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.04, duration: 0.4 }}
                    className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-xs text-fg/85 transition-colors hover:border-line-strong"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section aria-labelledby="approach-title" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="How I work"
        title={
          <span id="approach-title">
            <WordReveal text="Numbers people can trust." />
          </span>
        }
      />
      <div ref={ref} className="relative mt-14">
        {/* Track and the part already scrolled past */}
        <span aria-hidden="true" className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[11px] md:h-px md:w-full" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-violet via-teal to-coral md:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute left-0 top-[11px] hidden h-px w-full origin-left bg-gradient-to-r from-violet via-teal to-coral md:block"
        />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {approach.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="relative pl-10 md:pl-0 md:pt-12"
            >
              <span className="absolute left-0 top-0 grid size-[23px] place-items-center rounded-full border border-line-strong bg-bg font-mono text-[10px] text-fg">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  const now = [
    { k: "Currently", v: `Building internal platforms at ${site.company.name}` },
    { k: "Focus", v: "ERP data, AI search and BI" },
    { k: "Go-to stack", v: "Next.js · Python · PostgreSQL · Power BI" },
    { k: "Open to", v: "Data analyst, BI and full-stack roles" },
  ];
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="About" title={<WordReveal text="Analyst by training, builder by habit." />} />
          <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            <Reveal>
              <p>
                I started in data analysis: cleaning, joining and visualising datasets until they told a clear story
                in Power BI, Tableau or a Streamlit app. I kept building the tools around the dashboards, and now I
                build the whole system.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                At <span className="text-fg">{site.company.name}</span>, {site.company.blurb}, I work on the platforms
                behind a hospitality supply business: a stock-aware catalogue portal, an AI system that matches customer
                enquiries to ERP items, and a delivery management platform, with Infor LN and iSeries data underneath
                all of them.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                I care about numbers people can trust, so I write the rules down, measure before shipping and leave an
                audit trail behind.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5 lg:pt-24">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-2">
            <div className="rounded-[1.25rem] border border-line bg-gradient-to-br from-violet/10 via-transparent to-teal/10 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-violet to-teal text-xl font-semibold text-white">
                  SS
                  <span className="absolute -bottom-1 -right-1 size-4 rounded-full border-[3px] border-surface bg-ok" />
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-tight">{site.name}</p>
                  <p className="text-sm text-muted">{site.role}</p>
                </div>
              </div>
              <dl className="mt-7 divide-y divide-line">
                {now.map((row) => (
                  <div key={row.k} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{row.k}</dt>
                    <dd className="text-sm text-fg/90 sm:text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-full size-[46rem] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-gradient-to-tr from-violet/40 via-teal/25 to-coral/20 blur-[100px]" />
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
          </div>

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Contact</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              <WordReveal text="Got a dataset that needs a" />{" "}
              <span className="text-gradient animate-shimmer font-serif font-normal italic">story?</span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Open to data analyst, BI and full-stack roles. Happy to talk dashboards, pipelines or your next project.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${site.email}`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-4 text-sm font-medium text-bg"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet to-teal transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <Mail className="relative z-10 transition-colors group-hover:text-white" />
                  <span className="relative z-10 transition-colors group-hover:text-white">{site.email}</span>
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copy}
                className="glass inline-flex h-[52px] items-center gap-2 rounded-full px-5 text-sm text-fg"
                aria-label="Copy email address"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{ opacity: 0, y: 8, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-2 ${copied ? "text-ok" : ""}`}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span role="status" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {[
                { href: site.links.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: site.links.github, label: "GitHub", Icon: Github },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Icon size={16} />
                  {label}
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line px-5 py-10 text-sm text-faint sm:flex-row sm:px-8">
      <p>
        © {new Date().getFullYear()} {site.name}. Built with Next.js, Tailwind CSS and Motion.
      </p>
      <a href="#top" className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
        Back to top
        <span className="grid size-8 place-items-center rounded-full border border-line transition-transform group-hover:-translate-y-1">
          <ArrowUp size={14} />
        </span>
      </a>
    </footer>
  );
}
