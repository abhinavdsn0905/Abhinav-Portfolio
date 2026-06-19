"use client";

import { motion, Variants } from "framer-motion";
import { useRef } from "react";

interface Project {
  title: string;
  date: string;
  description: string;
  bullets: string[];
  tech: string[];
  github?: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    title: "RailConnect – Smart Train Reservation System",
    date: "Feb '26",
    category: "Full-Stack Web",
    description:
      "Full-track train reservation platform with live seat availability, dynamic pricing, and auto-generated PNR codes.",
    bullets: [
      "Normalised relational DB schema with Django ORM",
      "Segment-based dynamic pricing & order validation",
      "Admin panel for trains, routes, fares, capacity",
    ],
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/abhinav-dsn0905",
  },
  {
    title: "MENZONE – E-Commerce Web Application",
    date: "Dec '25",
    category: "Full-Stack Web",
    description:
      "Men's fashion e-commerce platform with cart management, streamlined checkout, and Email OTP authentication.",
    bullets: [
      "Session-based login with PBKDF2 password hashing",
      "Normalised MySQL schema for products, users, orders",
      "Full CRUD admin dashboard without code changes",
    ],
    tech: ["Python", "Django", "HTML", "CSS", "MySQL", "SMTP"],
    github: "https://github.com/abhinav-dsn0905",
  },
  {
    title: "ML-Based Route Optimization for E-Commerce Delivery",
    date: "Oct '25",
    category: "Machine Learning",
    description:
      "Machine learning model classifying delivery routes as efficient/inefficient using real order & delivery data.",
    bullets: [
      "Logistic Regression, Random Forest, SVM comparison",
      "ROC-AUC tuning for precision reliability",
      "Haversine-based GPS distance features",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    github: "https://github.com/abhinav-dsn0905",
  },
  {
    title: "Mental Health Check-in Simulator",
    date: "Aug '25",
    category: "C++ / OOP",
    description:
      "Modular C++ mental health app with mood-based content recommendations, enabling 200+ simulated self-check sessions.",
    bullets: [
      "Mood Tracker, Quote Provider, Calming Exercise modules",
      "Randomisation for personalised mood-based interactions",
      "32% higher user retention in simulated testing",
    ],
    tech: ["C++", "OOP", "DSA"],
    github: "https://github.com/abhinav-dsn0905",
  },
  {
    title: "Secure Authentication Module",
    date: "Nov '24",
    category: "Security",
    description:
      "Multi-factor authentication system integrating password-based login and OTP verification via Telegram Bot.",
    bullets: [
      "PBKDF2-HMAC-SHA256 + HMAC-based verification",
      "Protection against brute-force, replay, credential leak",
      "SQLite credential storage with 40% lower latency",
    ],
    tech: ["Python", "SQLite", "Telegram Bot"],
    github: "https://github.com/abhinav-dsn0905",
  },
];

const categoryColors: Record<string, string> = {
  "Full-Stack Web": "from-cyan-500/20 to-blue-500/20 border-cyan-500/20",
  "Machine Learning": "from-purple-500/20 to-pink-500/20 border-purple-500/20",
  "C++ / OOP": "from-green-500/20 to-emerald-500/20 border-green-500/20",
  Security: "from-orange-500/20 to-red-500/20 border-orange-500/20",
};

const categoryAccent: Record<string, string> = {
  "Full-Stack Web": "#00e5ff",
  "Machine Learning": "#a855f7",
  "C++ / OOP": "#22c55e",
  Security: "#f97316",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 lg:px-16">
      {/* Background glow blob */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            Selected Work
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Projects
          </h2>
          <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent = categoryAccent[project.category] || "#00e5ff";
  const gradClass =
    categoryColors[project.category] || "from-white/5 to-white/5 border-white/5";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl border bg-gradient-to-br ${gradClass} glass p-6 group cursor-default overflow-hidden`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${accent}20, inset 0 0 40px ${accent}05`,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 pointer-events-none"
        style={{ background: accent }}
      />

      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-medium px-2 py-1 rounded-full border"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            background: `${accent}10`,
          }}
        >
          {project.category}
        </span>
        <span className="text-xs text-text-secondary">{project.date}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-white text-lg leading-tight mb-3 group-hover:text-text-primary transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-1 mb-5">
        {project.bullets.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-text-secondary">
            <span style={{ color: accent }} className="mt-0.5 flex-shrink-0">
              ▸
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-text-secondary"
          >
            {t}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium transition-colors relative z-10 pointer-events-auto"
          style={{ color: accent }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.577 9.577 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          View on GitHub →
        </a>
      )}
    </motion.div>
  );
}
