"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

// Anchor offsets come from scroll-margin-top in globals.css, which Lenis honours.
// With reduced motion, Lenis stays mounted (so the tree never remounts) but
// scrolling is native.
export function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
      <ReactLenis root options={{ lerp: 0.1, anchors: true, smoothWheel: !reduce }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
