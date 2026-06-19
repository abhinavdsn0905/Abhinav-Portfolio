"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Overlay from "./Overlay";

/**
 * ScrollySection — 500vh sticky scroll section.
 * Uses a scroll-driven animated gradient background instead of image frames.
 */
export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <GradientCanvas scrollYProgress={scrollYProgress} />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function GradientCanvas({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="absolute inset-0">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Animated pulse — always on, hue shifts with scroll */}
      <ScrollGlow scrollYProgress={scrollYProgress} />

      {/* Static bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Vignette edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(8,8,8,0.75) 100%)",
        }}
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}

/** Renders two layered motion.divs that animate their gradients based on scroll */
function ScrollGlow({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const glow1X = useTransform(scrollYProgress, [0, 0.5, 1], ["30%", "60%", "20%"]);
  const glow1Y = useTransform(scrollYProgress, [0, 0.5, 1], ["30%", "55%", "70%"]);
  const glow1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.15, 0.25, 0.18, 0.1]);

  const glow2X = useTransform(scrollYProgress, [0, 0.5, 1], ["70%", "40%", "80%"]);
  const glow2Y = useTransform(scrollYProgress, [0, 0.5, 1], ["60%", "30%", "40%"]);
  const glow2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.08, 0.15, 0.22, 0.12]);

  return (
    <>
      {/* Cyan glow — moves left→right→left */}
      <motion.div
        className="absolute w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: glow1X,
          top: glow1Y,
          opacity: glow1Opacity,
          background:
            "radial-gradient(circle, rgba(0,229,255,1) 0%, rgba(0,150,255,0.3) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Purple glow — moves opposite direction */}
      <motion.div
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: glow2X,
          top: glow2Y,
          opacity: glow2Opacity,
          background:
            "radial-gradient(circle, rgba(124,58,237,1) 0%, rgba(200,50,255,0.3) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
    </>
  );
}
