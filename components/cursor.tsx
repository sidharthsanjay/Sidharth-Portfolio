"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

// Custom cursor: a dot that tracks the pointer exactly and a ring that trails
// it on a spring. Over links and buttons the ring grows and inverts what's
// under it; over anything with data-cursor="Label" it becomes a labelled disc,
// and data-cursor="" keeps the plain cursor inside an otherwise labelled area.
// Only for mouse-like pointers without reduced motion; everyone else keeps the
// native cursor (it is hidden only while this component is active).

const query = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

type Mode = "default" | "hover" | "label";
type Ripple = { id: number; x: number; y: number; color: string };

const interactive = 'a, button, [role="button"], [data-cursor], summary, label';
const rippleColors = ["#8b6bff", "#2ec4b6", "#ff6b4a", "#ffd23f"];

export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });

  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const readTarget = (target: Element | null) => {
      const el = target?.closest?.(interactive);
      const text = el?.getAttribute("data-cursor");
      if (text) {
        setMode("label");
        setLabel(text);
      } else {
        setMode(el && text !== "" ? "hover" : "default");
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      readTarget(e.target as Element | null);
    };
    // Content moves under a still pointer while scrolling.
    const onScroll = () => readTarget(document.elementFromPoint(x.get(), y.get()));
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setPressed(true);
      const id = ++rippleId.current;
      const color = rippleColors[id % rippleColors.length];
      setRipples((r) => [...r.slice(-4), { id, x: e.clientX, y: e.clientY, color }]);
    };
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = {
    default: { width: 36, height: 36, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0.45)" },
    hover: { width: 64, height: 64, backgroundColor: "rgba(255,255,255,1)", borderColor: "rgba(255,255,255,0)" },
    label: { width: 92, height: 92, backgroundColor: "rgba(139,107,255,0.92)", borderColor: "rgba(255,255,255,0.25)" },
  }[mode];

  return (
    // Each layer is its own fixed element: a shared z-indexed wrapper would form
    // a stacking context and the ring's mix-blend-mode would only see the wrapper.
    <>
      {/* Ring */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[200] grid place-items-center rounded-full border ${
          mode === "hover" ? "mix-blend-difference" : ""
        }`}
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ ...ring, opacity: visible ? 1 : 0, scale: pressed ? 0.82 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.6 }}
      >
        <AnimatePresence>
          {mode === "label" ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="absolute whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[201] size-2 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && mode === "default" ? 1 : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Click ripples */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[199]">
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="absolute size-10 rounded-full border-2"
              style={{ left: r.x - 20, top: r.y - 20, borderColor: r.color }}
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => setRipples((rs) => rs.filter((item) => item.id !== r.id))}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
