"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/6 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight group"
        >
          <span className="text-white">SNA</span>
          <span
            className="text-accent"
            style={{ textShadow: "0 0 10px rgba(0,229,255,0.5)" }}
          >
            .
          </span>
          <span className="sr-only">— Siva Narasimha Abhinav D</span>
        </a>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-white transition-colors duration-200 tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-4 py-2 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-bg transition-all duration-300"
          >
            [ RESUME ]
          </a>
        </div>

        {/* Mobile menu — minimal */}
        <div className="sm:hidden">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-accent/40 text-accent"
          >
            RESUME
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
