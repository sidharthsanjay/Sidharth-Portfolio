"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { heroWords, site } from "@/lib/site";
import { ArrowRight, Github, Linkedin, Mail } from "./icons";
import { Magnetic } from "./motion-primitives";
import { HeroWidget } from "./hero-widget";

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % heroWords.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="sr-only">{heroWords[0]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={heroWords[i]}
          aria-hidden="true"
          initial={{ y: "45%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-45%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease }}
          className="text-gradient inline-block animate-shimmer pr-2 font-serif font-normal italic"
        >
          {heroWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 sm:pt-36"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
    >
      {/* Background: aurora, dot grid and a light that follows the cursor. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-violet/25 blur-[120px]" />
        <div
          className="absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax] animate-aurora rounded-full bg-teal/15 blur-[120px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-[-30%] left-[30%] h-[40vmax] w-[40vmax] animate-aurora rounded-full bg-coral/10 blur-[120px]"
          style={{ animationDelay: "-12s" }}
        />
        <div className="bg-dots absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_var(--x,50%)_var(--y,30%),rgb(139_107_255/0.12),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs text-muted sm:text-sm"
          >
            <span className="relative flex size-2.5 items-center justify-center">
              <span className="absolute size-full animate-pulse-ring rounded-full bg-ok" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
            Open to Data, BI &amp; full-stack roles
          </motion.div>

          <h1 className="text-[clamp(2.4rem,5.6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease, delay: 0.2 }}
              >
                Turning messy data
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease, delay: 0.32 }}
              >
                into clear
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease, delay: 0.44 }}
              >
                <RotatingWord />
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m <span className="text-fg">{site.name}</span>, {site.role} at{" "}
            <span className="text-fg">{site.company.name}</span>. I build the systems behind the numbers:
            Next.js platforms on live ERP data, AI search that matches enquiries to catalogue items, and BI
            dashboards in Power BI, Python and SQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet to-teal transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">See my work</span>
                <ArrowRight className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-line-strong"
              >
                Get in touch
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: site.links.github, label: "GitHub", Icon: Github },
                { href: site.links.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.45 }}
          className="relative lg:col-span-5"
        >
          <HeroWidget />
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-faint sm:flex"
        aria-label="Scroll to work"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-fg"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
