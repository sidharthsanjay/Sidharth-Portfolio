"use client";

// Animated illustrations for the featured projects. They use invented sample
// data on purpose: the real systems hold a client's figures.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Ticks a phase counter while the element is on screen. */
function usePhase(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setPhase((p) => (p + 1) % count), ms);
    return () => clearInterval(t);
  }, [inView, reduce, count, ms]);
  return { ref, phase: reduce ? count - 1 : phase, inView };
}

function Frame({
  children,
  label,
  innerRef,
}: {
  children: React.ReactNode;
  label: string;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div ref={innerRef} className="relative">
      <div
        role="img"
        aria-label={label}
        className="relative aspect-[4/3.1] w-full overflow-hidden rounded-2xl border border-line bg-[#0a0c11] shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]"
      >
        {children}
      </div>
      <p className="mt-2.5 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
        Illustration · sample data
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RHSME: catalogue page with live stock on hover                      */
/* ------------------------------------------------------------------ */

const glassShapes: Record<string, React.ReactNode> = {
  wine: (
    <>
      <path d="M11 6h18c0 13-4 20-9 20s-9-7-9-20Z" />
      <path d="M20 26v19M13 47h14" />
    </>
  ),
  flute: (
    <>
      <path d="M15.5 4h9c0 17-2 24-4.5 24S15.5 21 15.5 4Z" />
      <path d="M20 28v17M13.5 47h13" />
    </>
  ),
  tumbler: <path d="M10 14l2.2 33h15.6L30 14Z M11 22h18" />,
  coupe: (
    <>
      <path d="M5 13h30c0 8-6.5 12-15 12S5 21 5 13Z" />
      <path d="M20 25v20M12.5 47h15" />
    </>
  ),
  highball: <path d="M12 5l1 42h14l1-42Z M12.4 18h15.2" />,
  carafe: <path d="M17 4h6v10c6 4 9 10 9 18 0 10-5 16-12 16S8 42 8 32c0-8 3-14 9-18Z" />,
};

const catalogueItems = [
  { shape: "wine", code: "GL-10421", name: "Bordeaux 53cl", stock: [1240, 860, 310], price: "18.50", tag: "In stock" },
  { shape: "flute", code: "GL-20118", name: "Flute 21cl", stock: [640, 1120, 95], price: "12.75", tag: "In stock" },
  { shape: "tumbler", code: "GL-30907", name: "Tumbler 35cl", stock: [2300, 1480, 760], price: "6.20", tag: "In stock" },
  { shape: "coupe", code: "GL-41230", name: "Coupe 23cl", stock: [120, 40, 0], price: "14.00", tag: "Clearance" },
  { shape: "highball", code: "GL-52004", name: "Highball 40cl", stock: [980, 0, 410], price: "7.90", tag: "In stock" },
  { shape: "carafe", code: "GL-60033", name: "Carafe 1L", stock: [0, 60, 0], price: "31.00", tag: "On order" },
] as const;

const countries = ["QA", "AE", "SA"] as const;

export function CatalogueVisual() {
  const { ref, phase } = usePhase(12, 2200);
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? phase % catalogueItems.length;
  const item = catalogueItems[active];
  const col = active % 3;
  const row = Math.floor(active / 3);
  const maxStock = 2400;
  const tagColor =
    item.tag === "Clearance" ? "text-amber bg-amber/10" : item.tag === "On order" ? "text-teal bg-teal/10" : "text-ok bg-ok/10";

  return (
    <Frame innerRef={ref} label="Animated mock-up of an interactive catalogue page showing per-country stock when a product is hovered">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgb(139_107_255/0.18),transparent_55%)]" />
      <div className="relative flex h-full flex-col p-[4%]">
        <div className="mb-[3%] flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet sm:text-[10px]">Catalogue</p>
            <p className="text-sm font-semibold tracking-tight sm:text-base">Glassware</p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-line bg-white/[0.03] p-0.5 font-mono text-[9px] sm:text-[10px]">
            {countries.map((c, i) => (
              <span key={c} className="relative rounded-full px-2 py-0.5">
                {Math.floor(phase / 4) % 3 === i ? (
                  <motion.span layoutId="cat-region" className="absolute inset-0 rounded-full bg-violet/30" />
                ) : null}
                <span className="relative">{c}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-[3%]">
          {catalogueItems.map((it, i) => (
            <div
              key={it.code}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              className={`relative flex flex-col items-center justify-center rounded-xl border transition-all duration-500 ${
                active === i ? "border-violet/60 bg-violet/[0.08]" : "border-line bg-white/[0.02]"
              }`}
            >
              <svg
                viewBox="0 0 40 52"
                className={`h-[46%] transition-colors duration-500 ${active === i ? "text-fg" : "text-muted/70"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                {glassShapes[it.shape]}
              </svg>
              <span className="mt-1.5 font-mono text-[8px] text-faint sm:text-[9px]">{it.code}</span>
              <span className="absolute right-[8%] top-[8%] flex size-2.5 items-center justify-center">
                <span className="absolute size-full animate-pulse-ring rounded-full bg-violet" />
                <span className="relative size-1.5 rounded-full bg-violet" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: row === 0 ? -8 : 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease }}
          className="glass pointer-events-none absolute z-10 w-[52%] rounded-xl p-2.5 shadow-2xl sm:p-3"
          style={{
            left: col === 0 ? "8%" : col === 1 ? "24%" : undefined,
            right: col === 2 ? "8%" : undefined,
            top: row === 0 ? "54%" : undefined,
            bottom: row === 1 ? "50%" : undefined,
            background: "rgb(17 20 28 / 0.92)",
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold leading-tight sm:text-xs">{item.name}</p>
              <p className="font-mono text-[9px] text-faint">{item.code}</p>
            </div>
            <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-medium sm:text-[9px] ${tagColor}`}>{item.tag}</span>
          </div>
          <div className="mt-2 space-y-1">
            {countries.map((c, i) => (
              <div key={c} className="flex items-center gap-1.5 font-mono text-[9px]">
                <span className="w-4 text-muted">{c}</span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-violet to-teal"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(2, (item.stock[i] / maxStock) * 100)}%` }}
                    transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.06 }}
                  />
                </span>
                <span className="w-8 text-right tabular-nums text-fg/80">{item.stock[i].toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-line pt-1.5 text-[9px]">
            <span className="text-muted">
              QAR <span className="text-fg">{item.price}</span>
            </span>
            <span className="rounded-md bg-fg px-1.5 py-0.5 font-medium text-bg">+ Add to RFQ</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* RFQ toast */}
      <AnimatePresence>
        {phase % 6 === 5 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease }}
            className="absolute bottom-[4%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-ok/30 bg-[#0d1a15] px-3 py-1.5 text-[10px] text-ok shadow-xl"
          >
            ✓ RFQ-2026-000128 sent to sales
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* ABA: an enquiry line resolved to an item code                       */
/* ------------------------------------------------------------------ */

const rawLine = "wine glss 35cl crystal - Crystalline";
const tokens = ["wine glass", "350 ml", "crystal", "brand: Crystalline"];
const candidates = [
  { id: "a", code: "GL-35190", name: "Wine glass 35cl", brand: "Vitra", raw: 0.82, ranked: 0.69 },
  { id: "b", code: "GL-10421", name: "Wine glass 35cl crystal", brand: "Crystalline", raw: 0.8, ranked: 0.91 },
  { id: "c", code: "GL-35022", name: "Red wine 37cl", brand: "Lumen", raw: 0.74, ranked: 0.61 },
  { id: "d", code: "GL-35400", name: "White wine 32cl crystal", brand: "Crystalline", raw: 0.71, ranked: 0.77 },
  { id: "e", code: "GL-20118", name: "Goblet 35cl", brand: "Glassmith", raw: 0.63, ranked: 0.48 },
];

export function MatchingVisual() {
  // 0 type · 1 normalise · 2 signals · 3 retrieve · 4 re-rank · 5 hold
  const { ref, phase } = usePhase(7, 1400);
  const step = Math.min(phase, 5);
  const reduce = useReducedMotion();

  const ranked = step >= 4;
  const list = [...candidates].sort((x, y) => (ranked ? y.ranked - x.ranked : y.raw - x.raw));

  return (
    <Frame innerRef={ref} label="Animated mock-up of a customer enquiry line being normalised, searched and re-ranked to an item code">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgb(46_196_182/0.16),transparent_55%)]" />
      <div className="relative flex h-full flex-col gap-[2.5%] p-[4%]">
        <div className="flex items-center justify-between font-mono text-[9px] text-muted sm:text-[10px]">
          <span>enquiry.xlsx · line 14 / 220</span>
          <span className="text-teal">{["reading", "normalising", "searching", "retrieving", "re-ranking", "ready"][step]}…</span>
        </div>

        <div className="rounded-lg border border-line bg-black/40 px-2.5 py-2 font-mono text-[10px] text-fg sm:text-[11px]">
          {phase === 0 && !reduce ? (
            <span key="typing">
              {rawLine.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ display: "none" }}
                  animate={{ display: "inline" }}
                  transition={{ delay: 0.15 + i * 0.03, duration: 0 }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ) : (
            <span key="full">{rawLine}</span>
          )}
          <span className="ml-px inline-block h-3 w-[5px] translate-y-0.5 animate-blink bg-teal" />
        </div>

        <div className="flex min-h-[18px] flex-wrap gap-1">
          {tokens.map((t, i) => (
            <motion.span
              key={t}
              initial={false}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 6 }}
              transition={{ delay: step >= 1 ? i * 0.08 : 0, duration: 0.35 }}
              className="rounded-md border border-teal/25 bg-teal/10 px-1.5 py-0.5 font-mono text-[8.5px] text-teal sm:text-[9.5px]"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { k: "Code", ok: false },
            { k: "Text", ok: true },
            { k: "Image", ok: true },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={false}
              animate={{
                opacity: step >= 2 ? 1 : 0.3,
                borderColor: step >= 2 && s.ok ? "rgb(46 196 182 / 0.45)" : "rgb(255 255 255 / 0.08)",
              }}
              transition={{ delay: step >= 2 ? i * 0.12 : 0 }}
              className="flex items-center justify-between rounded-md border bg-white/[0.02] px-2 py-1 text-[9px] sm:text-[10px]"
            >
              <span className="text-muted">{s.k}</span>
              <span className={s.ok ? "text-ok" : "text-faint"}>{step >= 2 ? (s.ok ? "✓" : "–") : "·"}</span>
            </motion.div>
          ))}
        </div>

        <ul className="relative flex flex-1 flex-col gap-1">
          {list.map((c, i) => {
            const score = ranked ? c.ranked : c.raw;
            const top = ranked && i === 0;
            return (
              <motion.li
                key={c.id}
                layout
                initial={false}
                animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : 12 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  delay: step === 3 ? i * 0.07 : 0,
                }}
                className={`flex flex-1 items-center gap-2 rounded-md border px-2 ${
                  top ? "border-teal/50 bg-teal/[0.08]" : "border-line bg-white/[0.015]"
                }`}
              >
                <span className="w-3 font-mono text-[9px] text-faint">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[9.5px] leading-tight text-fg sm:text-[10.5px]">{c.name}</span>
                  <span className="block truncate font-mono text-[8px] text-faint">
                    {c.code} · {c.brand}
                  </span>
                </span>
                {top ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="hidden rounded bg-ok/15 px-1 py-px text-[8px] text-ok sm:inline"
                  >
                    brand · in stock
                  </motion.span>
                ) : null}
                <span className="h-1 w-[18%] overflow-hidden rounded-full bg-white/5">
                  <motion.span
                    className={`block h-full rounded-full ${top ? "bg-teal" : "bg-muted/60"}`}
                    animate={{ width: step >= 3 ? `${score * 100}%` : 0 }}
                    transition={{ duration: 0.6, ease }}
                  />
                </span>
                <span className="w-7 text-right font-mono text-[9px] tabular-nums text-muted">{score.toFixed(2)}</span>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={false}
          animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 6 }}
          className="flex items-center justify-between rounded-md border border-line bg-white/[0.02] px-2.5 py-1.5 text-[9px] sm:text-[10px]"
        >
          <span className="text-muted">
            Suggested <span className="font-mono text-fg">GL-10421</span> · confidence 0.91
          </span>
          <span className="text-teal">→ review queue</span>
        </motion.div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* RDMS: live routes on a map                                          */
/* ------------------------------------------------------------------ */

const routes = [
  { id: "r1", color: "#8b6bff", d: "M70 236C118 206 138 150 186 136S252 96 300 62", dur: 9 },
  { id: "r2", color: "#2ec4b6", d: "M70 236C140 248 196 226 238 196S318 172 352 140", dur: 11 },
  { id: "r3", color: "#ff6b4a", d: "M70 236C92 176 78 118 120 86S182 42 226 52", dur: 8 },
];
const stopAt = [0.35, 0.62, 0.85, 1];

export function RouteVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [stops, setStops] = useState<{ x: number; y: number; c: string }[][]>([]);
  const { ref: phaseRef, phase } = usePhase(8, 1600);

  useEffect(() => {
    setStops(
      routes.map((r, i) => {
        const p = pathRefs.current[i];
        if (!p) return [];
        const len = p.getTotalLength();
        return stopAt.map((f) => {
          const pt = p.getPointAtLength(len * f);
          return { x: pt.x, y: pt.y, c: r.color };
        });
      }),
    );
  }, []);

  return (
    <div ref={ref}>
      <Frame innerRef={phaseRef} label="Animated mock-up of a live operations map with three delivery routes and moving vehicles">
        <svg viewBox="0 0 400 310" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="rv-grid" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0H0V22" fill="none" stroke="rgb(255 255 255 / 0.035)" />
            </pattern>
            <radialGradient id="rv-glow" cx="0.2" cy="0.8" r="0.7">
              <stop offset="0" stopColor="#ff6b4a" stopOpacity="0.14" />
              <stop offset="1" stopColor="#ff6b4a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="310" fill="url(#rv-grid)" />
          <rect width="400" height="310" fill="url(#rv-glow)" />
          {/* Coastline and streets */}
          <path d="M400 0V310H372C356 268 380 230 366 196S320 150 336 110 392 60 384 0Z" fill="rgb(46 196 182 / 0.06)" />
          <g stroke="rgb(255 255 255 / 0.07)" strokeWidth="1.2" fill="none">
            <path d="M0 196C80 180 160 190 240 150S360 90 400 96" />
            <path d="M40 0C60 80 120 140 110 220S150 300 170 310" />
            <path d="M0 110C90 120 170 80 260 100" />
            <path d="M200 0C210 70 260 120 250 200S270 280 300 310" />
            <path d="M0 270C100 260 200 280 330 250" />
          </g>

          {routes.map((r, i) => (
            <g key={r.id}>
              <path d={r.d} fill="none" stroke={r.color} strokeOpacity="0.12" strokeWidth="7" strokeLinecap="round" />
              <motion.path
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                id={`rv-${r.id}`}
                d={r.d}
                fill="none"
                stroke={r.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: 1.6, delay: 0.2 + i * 0.25, ease: [0.65, 0, 0.35, 1] }}
              />
            </g>
          ))}

          {stops.flatMap((rs, ri) =>
            rs.map((s, si) => (
              <motion.g
                key={`${ri}-${si}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + ri * 0.25 + si * 0.12, type: "spring", stiffness: 400, damping: 18 }}
                style={{ originX: `${s.x}px`, originY: `${s.y}px` }}
              >
                <circle cx={s.x} cy={s.y} r="5.5" fill="#0a0c11" stroke={s.c} strokeWidth="1.8" />
                <circle cx={s.x} cy={s.y} r="2" fill={s.c} />
              </motion.g>
            )),
          )}

          {/* Vehicles */}
          {inView && !reduce
            ? routes.map((r) => (
                <g key={`v-${r.id}`}>
                  <circle r="11" fill={r.color} opacity="0.18">
                    <animateMotion dur={`${r.dur}s`} repeatCount="indefinite" begin="1.8s" rotate="auto">
                      <mpath href={`#rv-${r.id}`} />
                    </animateMotion>
                  </circle>
                  <circle r="5" fill={r.color} stroke="#fff" strokeWidth="1.5">
                    <animateMotion dur={`${r.dur}s`} repeatCount="indefinite" begin="1.8s" rotate="auto">
                      <mpath href={`#rv-${r.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))
            : null}

          {/* Depot */}
          <g>
            <rect x="60" y="226" width="20" height="20" rx="5" fill="#eceef4" />
            <path d="M65 238l5-5 5 5M67 236v5h6v-5" fill="none" stroke="#07080c" strokeWidth="1.5" strokeLinejoin="round" />
          </g>
        </svg>

        {/* Overlay panels */}
        <div className="glass absolute left-[4%] top-[5%] rounded-xl px-3 py-2" style={{ background: "rgb(13 15 21 / 0.85)" }}>
          <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-coral">
            <span className="size-1.5 animate-pulse rounded-full bg-coral" /> Live operations
          </p>
          <div className="mt-1.5 flex gap-4 text-[10px]">
            <span>
              <span className="block text-sm font-semibold">3</span>
              <span className="text-muted">routes</span>
            </span>
            <span>
              <span className="block text-sm font-semibold">12</span>
              <span className="text-muted">stops</span>
            </span>
            <span>
              <span className="block text-sm font-semibold text-ok">92%</span>
              <span className="text-muted">on time</span>
            </span>
          </div>
        </div>

        <div className="glass absolute bottom-[5%] right-[4%] w-[44%] rounded-xl px-3 py-2" style={{ background: "rgb(13 15 21 / 0.85)" }}>
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-medium">Van 02</span>
            <span className="font-mono text-muted">ETA 14:{20 + (phase % 4) * 5}</span>
          </div>
          <div className="mt-1.5 flex gap-1">
            {[0, 1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors duration-700 ${s <= phase % 4 ? "bg-teal" : "bg-white/10"}`}
              />
            ))}
          </div>
          <p className="mt-1 text-[9px] text-muted">Stop {(phase % 4) + 1} of 4 · Al Sadd</p>
        </div>

        <AnimatePresence>
          {phase % 4 === 3 ? (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="absolute right-[4%] top-[5%] flex items-center gap-1.5 rounded-full border border-ok/30 bg-[#0d1a15] px-2.5 py-1 text-[10px] text-ok"
            >
              ✓ Proof of delivery captured
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Frame>
    </div>
  );
}
