export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-text-secondary text-xs">
          © 2026 Siva Narasimha Abhinav D
        </p>
        <p className="text-text-secondary text-xs">
          Built with{" "}
          <span className="text-accent">Next.js</span>,{" "}
          <span className="text-accent">Framer Motion</span> &{" "}
          <span className="text-accent">❤</span>
        </p>
        <a
          href="https://github.com/abhinav-dsn0905"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary text-xs hover:text-accent transition-colors"
        >
          github.com/abhinav-dsn0905
        </a>
      </div>
    </footer>
  );
}
