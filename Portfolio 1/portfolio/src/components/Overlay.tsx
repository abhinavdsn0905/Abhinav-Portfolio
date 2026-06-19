"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import clsx from "clsx";

interface TextSection {
  text: string;
  subtext?: string;
  align: "center" | "left" | "right";
  start: number; // scroll progress 0-1
  end: number;
}

const SECTIONS: TextSection[] = [
  {
    text: "Siva Narasimha\nAbhinav D",
    subtext: "Creative Developer · AI/ML Engineer",
    align: "center",
    start: 0,
    end: 0.25,
  },
  {
    text: "I build\ndigital experiences.",
    subtext: "Full-stack systems that scale with precision.",
    align: "left",
    start: 0.28,
    end: 0.55,
  },
  {
    text: "Bridging design\nand engineering.",
    subtext: "Where algorithmic thinking meets creative vision.",
    align: "right",
    start: 0.58,
    end: 0.85,
  },
];

function TextPanel({
  section,
  scrollYProgress,
}: {
  section: TextSection;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    scrollYProgress,
    [
      section.start,
      section.start + 0.04,
      section.end - 0.04,
      section.end,
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [section.start, section.start + 0.08],
    [40, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [section.start, section.start + 0.08],
    [section.align === "left" ? -60 : section.align === "right" ? 60 : 0, 0]
  );

  const alignClass = {
    center: "items-center text-center",
    left: "items-start text-left pl-8 md:pl-20",
    right: "items-end text-right pr-8 md:pr-20",
  }[section.align];

  return (
    <motion.div
      style={{ opacity, y, x }}
      className={clsx(
        "absolute inset-0 flex flex-col justify-center pointer-events-none select-none",
        alignClass
      )}
    >
      <motion.h2
        className="font-display font-bold leading-none text-4xl sm:text-5xl md:text-7xl xl:text-8xl text-white glow-text"
        style={{ whiteSpace: "pre-line" }}
      >
        {section.text}
      </motion.h2>
      {section.subtext && (
        <motion.p
          className="mt-4 text-sm sm:text-base md:text-lg font-sans text-text-secondary tracking-widest uppercase"
        >
          {section.subtext}
        </motion.p>
      )}

      {/* Decorative accent line */}
      <motion.div
        className="mt-6 h-px w-24 bg-gradient-to-r from-accent to-transparent"
        style={{
          alignSelf:
            section.align === "right"
              ? "flex-end"
              : section.align === "center"
              ? "center"
              : "flex-start",
        }}
      />
    </motion.div>
  );
}

export default function Overlay({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {SECTIONS.map((section) => (
        <TextPanel
          key={section.text}
          section={section}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
