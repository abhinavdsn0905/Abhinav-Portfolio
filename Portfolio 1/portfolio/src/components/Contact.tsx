"use client";

import { motion } from "framer-motion";

const SOCIALS = [
  {
    label: "Email",
    value: "abhinav.160905@gmail.com",
    href: "mailto:abhinav.160905@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abhinav-dsn",
    href: "https://www.linkedin.com/in/abhinav-dsn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/abhinav-dsn0905",
    href: "https://github.com/abhinav-dsn0905",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.577 9.577 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "Mobile",
    value: "+91 9000417957",
    href: "tel:+919000417957",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 lg:px-16">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            Let's Talk
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-text-secondary text-base leading-relaxed mb-2">
            Currently looking for placement opportunities and internships.
          </p>
          <p className="text-text-secondary text-base leading-relaxed mb-12">
            Let's connect!
          </p>

          <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent mb-12" />
        </motion.div>

        {/* Open To card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl border border-white/6 p-8 mb-8 text-left"
        >
          <p className="text-accent text-xs tracking-[0.2em] uppercase mb-5 font-medium">
            Open To
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Placement Opportunities",
              "Internships",
              "Freelance Projects",
              "Open Source Collaboration",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-text-secondary text-sm">
                <span className="text-green-400 text-base">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="mailto:abhinav.160905@gmail.com"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-accent-dim transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            Send Me an Email
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {SOCIALS.map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              target={label !== "Mobile" && label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl glass border border-white/5 hover:border-accent/25 hover:bg-accent/5 transition-all duration-300 group text-left"
            >
              <span className="text-accent group-hover:scale-110 transition-transform">
                {icon}
              </span>
              <div>
                <p className="text-xs text-text-secondary">{label}</p>
                <p className="text-white text-sm font-medium group-hover:text-accent transition-colors">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
