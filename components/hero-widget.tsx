"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Counter, Tilt } from "./motion-primitives";

// A decorative "ops console" that hints at the kind of work on the page:
// ERP sync, embeddings, matching, routing, dashboards.
const logLines = [
  { cmd: "sync", arg: "ln.item_master", ms: "0.8s" },
  { cmd: "embed", arg: "catalogue → pgvector", ms: "2.1s" },
  { cmd: "match", arg: "rfq_lines --top 5", ms: "0.3s" },
  { cmd: "route", arg: "optimise --stops 24", ms: "1.4s" },
  { cmd: "build", arg: "exec_dashboard", ms: "0.6s" },
  { cmd: "deploy", arg: "edge → workers", ms: "3.2s" },
];

// Smooth upward series for the sparkline.
const series = [18, 22, 20, 28, 26, 34, 31, 40, 38, 47, 52, 49, 58, 63, 61, 70];
const W = 320;
const H = 96;
const max = Math.max(...series);
const pts = series.map((v, i) => [(i / (series.length - 1)) * W, H - (v / max) * (H - 10) - 4] as const);
const line = pts
  .map(([x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `C${cx},${py} ${cx},${y} ${x},${y}`;
  })
  .join(" ");
const area = `${line} L${W},${H} L0,${H} Z`;
const last = pts[pts.length - 1];

function Log() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + 1), 1500);
    return () => clearInterval(t);
  }, []);
  const visible = Array.from({ length: Math.min(n, 4) }, (_, k) => {
    const idx = n - Math.min(n, 4) + k;
    return { ...logLines[idx % logLines.length], key: idx };
  });

  return (
    <div className="h-[104px] overflow-hidden font-mono text-[11.5px] leading-[26px]">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((l) => (
          <motion.div
            key={l.key}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-violet">❯</span>
            <span className="text-fg">{l.cmd}</span>
            <span className="truncate text-muted">{l.arg}</span>
            <span className="ml-auto flex items-center gap-1.5 text-ok">
              <span className="text-faint">{l.ms}</span>✓
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function HeroWidget() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Floating chips */}
      {[
        // Placed on the card's padding so they never cover its content.
        { label: "Power BI", cls: "-left-14 top-24", d: 0 },
        { label: "Next.js 16", cls: "-top-4 right-10", d: 1.2 },
        { label: "pgvector", cls: "-right-12 top-[52%]", d: 0.6 },
        { label: "Infor LN", cls: "-bottom-4 left-12", d: 1.8 },
      ].map((c) => (
        <motion.span
          key={c.label}
          aria-hidden="true"
          className={`glass absolute z-20 hidden rounded-full px-3 py-1.5 font-mono text-[11px] text-fg/90 shadow-lg sm:block ${c.cls}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: c.d }}
        >
          {c.label}
        </motion.span>
      ))}

      <Tilt max={6}>
        <div
          aria-hidden="true"
          className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-5 shadow-[0_30px_120px_-30px_rgb(139_107_255/0.45)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

          {/* Title bar */}
          <div className="relative mb-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-coral/80" />
              <span className="size-2.5 rounded-full bg-amber/80" />
              <span className="size-2.5 rounded-full bg-ok/80" />
              <span className="ml-3 font-mono text-[11px] text-muted">next / ops · live</span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-ok/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ok">
              <span className="size-1.5 animate-pulse rounded-full bg-ok" /> synced
            </span>
          </div>

          {/* KPIs */}
          <div className="relative grid grid-cols-3 gap-2.5">
            {[
              { to: 50000, suffix: "+", label: "items indexed" },
              { to: 3, suffix: "", label: "countries live" },
              { to: 3, suffix: "", label: "systems shipped" },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl border border-line bg-white/[0.02] p-3">
                <Counter to={k.to} suffix={k.suffix} className="block text-xl font-semibold tracking-tight tabular-nums" />
                <span className="mt-0.5 block text-[10.5px] leading-tight text-muted">{k.label}</span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="relative mt-3 rounded-2xl border border-line bg-white/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] text-muted">Pipeline throughput</span>
              <span className="font-mono text-[11px] text-teal">▲ trending</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="h-24 w-full overflow-visible">
              <defs>
                <linearGradient id="hw-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b6bff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b6bff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hw-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b6bff" />
                  <stop offset="100%" stopColor="#2ec4b6" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgb(255 255 255 / 0.06)" strokeDasharray="3 5" />
              ))}
              <motion.path
                d={area}
                fill="url(#hw-fill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
              />
              <motion.path
                d={line}
                fill="none"
                stroke="url(#hw-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 300, damping: 15 }}
                style={{ originX: `${last[0]}px`, originY: `${last[1]}px` }}
              >
                <circle cx={last[0]} cy={last[1]} r="9" fill="#2ec4b6" opacity="0.2">
                  <animate attributeName="r" values="5;12;5" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={last[0]} cy={last[1]} r="4" fill="#2ec4b6" stroke="#07080c" strokeWidth="2" />
              </motion.g>
            </svg>
          </div>

          {/* Log */}
          <div className="relative mt-3 rounded-2xl border border-line bg-black/30 px-3 py-2">
            <Log />
          </div>
        </div>
      </Tilt>
    </div>
  );
}
