"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { nav, site } from "@/lib/site";
import { Close, Menu } from "./icons";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet via-teal to-coral"
    />
  );
}

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = nav.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView();
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -96 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 34 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Main"
          className={`flex w-full max-w-5xl items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ${
            scrolled
              ? "border border-line bg-surface/75 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl backdrop-saturate-150"
              : "border border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label={`${site.name}, back to top`}>
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet via-violet/60 to-teal text-[13px] font-semibold tracking-tight text-white">
              <span className="relative z-10">SS</span>
              <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 group-hover:translate-y-0" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {site.name}
              <span className="text-violet">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="group relative hidden overflow-hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg sm:block"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-ok" />
                </span>
                Let&apos;s talk
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-line text-fg md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-surface px-6 pb-10 pt-6 md:hidden"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-line"
                aria-label="Close menu"
                autoFocus
              >
                <Close />
              </button>
            </div>
            <ul className="mt-14 flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => goTo(e, item.id)}
                    className="flex items-baseline gap-4 py-2 text-5xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-sm text-faint">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-1 text-sm text-muted">
              <a href={`mailto:${site.email}`} className="text-fg">
                {site.email}
              </a>
              <span>{site.role}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
