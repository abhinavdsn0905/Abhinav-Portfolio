import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import {
  Github, Linkedin, Mail, Download, Globe, Layers, Brain,
  Menu, X, Zap, ArrowUpRight, Phone, Star, Cpu, Terminal,
  Award, GraduationCap, MapPin, ExternalLink, FileText
} from 'lucide-react'
import ThreeBackground from './components/ThreeBackground'

// ─── FULL CV DATA ────────────────────────────────────────────────────────
const PERSONAL = {
  name: 'Siva Narasimha Abhinav D',
  email: 'abhinav.160905@gmail.com',
  phone: '+91 9000417957',
  github: 'https://github.com/abhinavdsn0905',
  linkedin: 'https://www.linkedin.com/in/abhinav-dsn',
  location: 'Phagwara, Punjab',
  role: 'B.Tech CSE (AI & ML) @ LPU',
  cgpa: '7.71',
  tagline: 'I build smart systems.',
  education_string: 'B.Tech CSE (AI & ML) @ Lovely Professional University · CGPA: 7.71'
}

const PRIMARY_SKILLS = ['Python', 'Django']

const SKILLS = [
  { category: 'Languages', icon: Terminal, color: '#6366f1', items: ['Python', 'C++', 'C', 'SQL'] },
  { category: 'Web Tech', icon: Globe, color: '#06b6d4', items: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs'] },
  { category: 'Frameworks', icon: Layers, color: '#f472b6', items: ['Django', 'Flask'] },
  { category: 'Tools', icon: Cpu, color: '#34d399', items: ['MySQL', 'Git', 'GitHub', 'SQLite', 'Postman', 'VS Code', 'Linux'] },
  { category: 'Libraries', icon: Brain, color: '#818cf8', items: ['NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'] },
  { category: 'Soft Skills', icon: Star, color: '#fbbf24', items: ['Time Management', 'Analytical Reasoning', 'Critical Thinking'] },
]

const PROJECTS = [
  {
    title: 'RailConnect',
    subtitle: 'Smart Train Reservation System',
    date: 'Feb 2026',
    github: 'https://github.com/abhinavdsn0905/RailConnect',
    demo: '#',
    icon: '🚂',
    color: '#00f0ff',
    tech: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    bullets: [
      'Full track reservation web app — search trains, book tickets, manage reservations with live seat availability.',
      'Normalized relational schema covering trains, stations, routes, bookings & seat inventory via Django ORM.',
      'Segment-based dynamic pricing, station-order route validation, auto-generated PNR codes per booking.',
      'Admin panel to manage trains, stations, routes, fares, and seat capacity without touching codebase.',
    ],
  },
  {
    title: 'MENZONE',
    subtitle: "E-Commerce Web Application",
    date: 'Dec 2025',
    github: 'https://github.com/abhinavdsn0905/Menzone-ecommerce',
    demo: '#',
    icon: '🛍️',
    color: '#b026ff',
    tech: ['Python', 'Django', 'HTML', 'CSS', 'MySQL', 'SMTP'],
    bullets: [
      "Full-stack e-commerce platform for men's fashion — product browsing, cart, end-to-end order placement.",
      'Email OTP verification & session-based login for account security and identity validation.',
      'Normalized relational schema using Django ORM & MySQL with referential integrity on all tables.',
      'Custom admin dashboard supporting full CRUD on products, users, carts, orders & order line items.',
    ],
  },
  {
    title: 'ML Route Optimizer',
    subtitle: 'ML-BASED DELIVERY OPTIMIZATION',
    date: 'Oct 2025',
    github: 'https://github.com/abhinavdsn0905/Route_Optimisation_For_E-commerce_Delivery',
    icon: '📦',
    color: '#00ff41',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    bullets: [
      'ML model to classify delivery routes as efficient or inefficient for last-mile logistics optimization.',
      'Trained & compared Logistic Regression, Random Forest, and SVM; evaluated with ROC-AUC scores.',
      'Computed Haversine-based distance features from GPS coordinates to fill missing route distance values.',
    ],
  },
  {
    title: 'Mental Health Check-in',
    subtitle: 'Mental Health Check-in Simulator',
    date: 'Aug 2025',
    github: 'https://github.com/abhinavdsn0905/Mental_Health_Simulator',
    icon: '🧠',
    color: '#00f0ff',
    tech: ['C++', 'OOPs', 'DSA'],
    bullets: [
      'Modular mental health app using C++ & OOP principles — mood-based content recommendation engine.',
      'Modules: User, Mood Tracker, Quote Provider, Calming Exercise Provider, Assistant via randomization.',
      'Personalized mood-based interactions — 200+ simulated test users, 32% higher session retention rate.',
    ],
  },
  {
    title: 'Secure Auth Module',
    subtitle: 'Secure Authentication Module',
    date: 'Nov 2024',
    github: 'https://github.com/abhinavdsn0905/Secure-Authentication-Module',
    icon: '🔐',
    color: '#ff003c',
    tech: ['Python', 'SQLite', 'Telegram Bot'],
    bullets: [
      'Multi-factor authentication system: password-based login + OTP via Telegram Bot — 85% fewer unauthorized logins.',
      'PBKDF2-HMAC-SHA256 hashing & HMAC-based verification against brute-force, replay & credential-leak attacks.',
      'Secure credential storage layer using SQLite, reducing authentication latency by 40%.',
    ],
  },
]

const EDUCATION = [
  { degree: 'Bachelor of Technology', field: 'CSE (AI & ML)', school: 'Lovely Professional University', location: 'Phagwara, Punjab', period: 'Aug 2023 – Present', grade: '7.71 / 10 (Ongoing)', icon: '🎓' },
  { degree: 'Intermediate (MPC)', field: 'Class XII', school: 'Narayana Junior College', location: 'Proddatur, Andhra Pradesh', period: 'Sep 2021 – May 2023', grade: '95.8%', icon: '📚' },
  { degree: 'Matriculation', field: 'Class X (SSC)', school: 'Gautam High School', location: 'Proddatur, Andhra Pradesh', period: 'Jun 2020 – May 2021', grade: '100%', icon: '🏆' },
]

const CERTS = [
  { name: 'Master Generative AI & Generative AI Tools', org: 'Infosys SpringBoard', date: 'Aug 2025', color: '#00f0ff', link: 'https://drive.google.com/file/d/1Yd7ifyEPbZrS-3QVZt-R4jzmCwXTEJ4k/view' },
  { name: 'Computer Communications', org: 'Coursera', date: 'Nov 2024', color: '#00ccff', link: 'https://drive.google.com/file/d/1H1kqDkaM__yD98WTkI3GItDr9_556gA-/view' },
  { name: 'Python Programming', org: 'CSE Pathshala', date: 'Mar 2024', color: '#00f0ff', link: 'https://drive.google.com/file/d/1TE18jPIkantsz3mM61C4U-ui-kt1u5JA/view' },
  { name: 'Responsive Web Design', org: 'FreeCodeCamp', date: 'Dec 2023', color: '#00ccff', link: 'https://drive.google.com/file/d/14gYGBzOWcHo_swQH_WYMhYVJhGsmYaRN/view' },
]

const TRAINING = {
  company: 'Cipher Schools',
  role: 'Data Structures and Algorithms using C++',
  date: 'Jul 2025',
  highlights: [
    'Completed an intensive DSA bootcamp covering Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graph Algorithms, Hashing, and Heaps using C++',
    'Built a strong foundation in algorithmic thinking and problem-solving techniques for real-world software development',
    'Mastered core paradigms including Recursion, Backtracking, Greedy Algorithms, Divide-and-Conquer, Dynamic Programming, and Two-Pointer Techniques',
    'Applied DSA concepts to personal projects, improving code quality, efficiency, and overall solution design'
  ],
  fileLink: 'https://www.cipherschools.com/certificate/preview?id=6880d4867efd6d50907051be'
}

// ─── UNIQUE TECH UI COMPONENTS ───────────────────────────────────────────────

function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    const onDown = () => setActive(true)
    const onUp = () => setActive(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div className="cyber-cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className={`cyber-cursor-ring ${active ? 'active' : ''}`} style={{ left: pos.x, top: pos.y }} />
    </>
  )
}

function TextDecrypt({ text, speed = 40, className, style }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?{}[]'
  const [display, setDisplay] = useState(text.replace(/./g, '0'))
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    let iterations = 0
    let interval = setInterval(() => {
      setDisplay(text.split('').map((letter, index) => {
        if (index < iterations) return text[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))

      if (iterations >= text.length) clearInterval(interval)
      iterations += 1 / 3
    }, speed)
    return () => clearInterval(interval)
  }, [inView, text, speed])

  return <span ref={ref} className={className} style={style}>{display}</span>
}

function CyberBootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const [text, setText] = useState('')
  const targetText = 'ABHINAV.dev'

  useEffect(() => {
    let charIdx = 0
    const typeInterval = setInterval(() => {
      if (charIdx <= targetText.length) {
        setText(targetText.slice(0, charIdx))
        charIdx++
      } else {
        clearInterval(typeInterval)
      }
    }, 80)

    let p = 0
    const progInterval = setInterval(() => {
      p += Math.floor(Math.random() * 10) + 2
      if (p >= 100) {
        p = 100
        clearInterval(progInterval)
        setTimeout(() => {
          setFading(true)
          setTimeout(() => onComplete(), 600)
        }, 600)
      }
      setProgress(p)
    }, 150)

    return () => {
      clearInterval(typeInterval)
      clearInterval(progInterval)
    }
  }, [onComplete])

  return (
    <div className={`boot-screen ${fading ? 'fade-out-boot' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', position: 'fixed', inset: 0, background: '#030303', zIndex: 9999 }}>

      {/* Central Spinning Core */}
      <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, transparent 70%, var(--primary) 100%)', animation: 'spin 1.5s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '4px', borderRadius: '50%', background: '#030303' }} />
        <div style={{ position: 'absolute', inset: '12px', borderRadius: '50%', border: '2px dashed rgba(0,255,255,0.4)', animation: 'spin 6s linear infinite reverse' }} />

        {/* Core Percentage */}
        <div style={{ position: 'relative', fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'monospace', textShadow: '0 0 15px var(--primary)' }}>
          {progress}%
        </div>
      </div>

      {/* Identity Text */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '4px', marginBottom: '1rem', animation: 'blink 2s infinite' }}>DECRYPTING IDENTITY</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '2px', margin: 0, height: '3.5rem' }}>
          {text}<span style={{ color: 'var(--primary)', animation: 'blink 1s infinite' }}>_</span>
        </h1>
      </div>

      {/* Bottom Progress Bar */}
      <div style={{ width: '300px', height: '3px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`, background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)', transition: 'width 0.2s ease-out' }} />
      </div>
    </div>
  )
}

function FloatingSnippets() {
  const [snippets, setSnippets] = useState([])
  const strings = ['import numpy', 'git commit -m', 'def train():', 'SELECT * FROM', '0x1A3F', 'pip install', 'class Model:', 'return response', 'npm start', 'sudo apt install', 'import pandas as pd', 'model.fit(X, y)']

  useEffect(() => {
    const interval = setInterval(() => {
      setSnippets(prev => [
        ...prev.slice(-15),
        { id: Math.random(), text: strings[Math.floor(Math.random() * strings.length)], left: Math.random() * 90 + 5 + '%', duration: Math.random() * 4 + 6 }
      ])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {snippets.map(s => (
        <div key={s.id} style={{ position: 'absolute', left: s.left, bottom: '-5%', color: 'rgba(0, 255, 255, 0.08)', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 600, animation: `floatUp ${s.duration}s linear forwards` }}>
          {s.text}
        </div>
      ))}
    </div>
  )
}

function CyberSidePanels() {
  const [hexData, setHexData] = useState([])
  const [eqLevels, setEqLevels] = useState([])
  const [memNodes, setMemNodes] = useState([])

  useEffect(() => {
    const generateHex = () => [...Array(5)].map(() => `0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`)
    const generateEq = () => [...Array(8)].map(() => Math.floor(Math.random() * 80) + 10)
    const generateMem = () => [...Array(24)].map(() => Math.random() > 0.6 ? (Math.random() > 0.8 ? 'var(--accent)' : 'var(--primary)') : 'rgba(0,255,255,0.1)')

    setHexData(generateHex())
    setEqLevels(generateEq())
    setMemNodes(generateMem())

    const interval = setInterval(() => {
      setHexData(generateHex())
      setEqLevels(generateEq())
      setMemNodes(generateMem())
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="cyber-side-panels" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, display: 'flex', justifyContent: 'space-between', padding: '10vh 2vw', overflow: 'hidden' }}>

      {/* Left Data Column - Holographic Angle */}
      <div className="side-panel-left" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '220px', opacity: 0.5, color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.8rem', transform: 'perspective(800px) rotateY(25deg)' }}>
        <div style={{ padding: '1rem', border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '2px' }}>SYS.CORE // ACTIVE</div>
          <div style={{ height: '3px', background: 'rgba(0,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', animation: 'radar-sweep 2s linear infinite' }} />
          </div>
        </div>

        <div style={{ padding: '1rem', border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '2px' }}>NET.ROUTES</div>
          {hexData.map((hex, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', borderBottom: '1px solid rgba(0,255,255,0.1)' }}>
              <span style={{ opacity: Math.random() > 0.3 ? 1 : 0.5 }}>{hex}</span>
              <span style={{ color: Math.random() > 0.2 ? 'var(--primary)' : 'var(--accent)' }}>[{Math.random() > 0.5 ? 'OK' : 'RDY'}]</span>
            </div>
          ))}
        </div>

        {/* Rotating Tech HUD Ring */}
        <div style={{ position: 'relative', width: '120px', height: '120px', border: '2px dashed rgba(0,255,255,0.4)', borderRadius: '50%', animation: 'spin 15s linear infinite', margin: '2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: '10px', border: '3px solid rgba(0,255,255,0.1)', borderTopColor: 'var(--primary)', borderBottomColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 5s linear infinite reverse' }} />
          <div style={{ fontSize: '10px', fontWeight: 'bold', animation: 'spin 15s linear infinite reverse' }}>[ LOCK ]</div>
        </div>
      </div>

      {/* Right Data Column - Holographic Angle */}
      <div className="side-panel-right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '220px', opacity: 0.5, color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.8rem', textAlign: 'right', transform: 'perspective(800px) rotateY(-25deg)' }}>

        <div style={{ padding: '1rem', border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px' }}>OP.FREQ // 4.2GHz</div>
          {/* Vertical Equalizer Array */}
          <div style={{ display: 'flex', gap: '4px', height: '50px', justifyContent: 'flex-end', marginTop: '1rem', alignItems: 'flex-end' }}>
            {eqLevels.map((lvl, i) => (
              <div key={i} style={{ width: '8px', background: lvl > 70 ? 'var(--accent)' : 'var(--primary)', height: `${lvl}%`, transition: 'height 0.2s ease-out', boxShadow: `0 0 10px ${lvl > 70 ? 'var(--accent)' : 'var(--primary)'}` }} />
            ))}
          </div>
        </div>

        <div style={{ padding: '1rem', border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div style={{ marginBottom: '1rem', fontWeight: 700, letterSpacing: '2px' }}>MEM.ALLOC MATRIX</div>
          {/* Hex grid structural block */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
            {memNodes.map((bg, i) => (
              <div key={i} style={{ width: '100%', aspectRatio: '1', background: bg, transition: 'background 0.4s' }} />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }
const fadeLeft = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }
const scaleIn = { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }
const stagger = (delay = 0.1) => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: delay } } })

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h)
  }, [])
  const links = ['About', 'Skills', 'Projects', 'Education', 'Training', 'Contact']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      background: scrolled ? 'rgba(3,5,8,0.9)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(0,240,255,0.2)' : '1px solid transparent',
      backdropFilter: 'blur(20px)',
      padding: scrolled ? '1rem 0' : '1.5rem 0', transition: 'all 0.3s'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ fontWeight: 900, fontSize: '1.4rem' }}>
          Abhinav<span className="gradient-text">.dev</span>
        </a>
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{'/' + l}</a>)}
          <a href="abhinav_cv.pdf" target="_blank" className="btn-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem' }}>[ RESUME ]</a>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const roles = [
    'I build full-stack web systems_',
    'I engineer ML-powered solutions_',
    'I design secure authentication nodes_',
    'I deploy production-grade applications_'
  ]
  const [typed, setTyped] = useState('')
  const rRef = useRef({ i: 0, c: 0, dir: 1 })

  useEffect(() => {
    let t
    const tick = () => {
      const { i, c, dir } = rRef.current
      const word = roles[i]
      if (dir === 1) {
        setTyped(word.slice(0, c + 1))
        if (c + 1 >= word.length) { rRef.current.dir = -1; t = setTimeout(tick, 1500) }
        else { rRef.current.c++; t = setTimeout(tick, 60) }
      } else {
        setTyped(word.slice(0, c - 1))
        if (c <= 1) { rRef.current.dir = 1; rRef.current.c = 0; rRef.current.i = (i + 1) % roles.length; t = setTimeout(tick, 300) }
        else { rRef.current.c--; t = setTimeout(tick, 30) }
      }
    }
    t = setTimeout(tick, 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', position: 'relative', overflow: 'hidden' }}>

      <FloatingSnippets />
      <CyberSidePanels />
      <div className="radar-scanline" />
      <div className="sonar-dot"><div className="sonar-pulse" /></div>

      <div className="container hero-grid" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', zIndex: 10, position: 'relative' }}>
        <motion.div variants={stagger(0.2)} initial="hidden" animate="show">

          <motion.div variants={fadeUp} style={{ fontSize: '13px', color: 'var(--primary)', fontFamily: 'monospace', marginBottom: '1.5rem', letterSpacing: '2px' }}>
            [ IDENTITY: CONFIRMED ]
          </motion.div>

          <motion.h1 variants={fadeUp} className="glitch-text" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.5rem', letterSpacing: '-2px', background: 'linear-gradient(90deg, #00ffff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Abhinav D
          </motion.h1>

          <motion.div variants={fadeUp} style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', fontFamily: 'monospace', marginBottom: '1.5rem', letterSpacing: '1px' }}>
            Siva Narasimha Abhinav D
          </motion.div>

          <motion.div variants={fadeUp} style={{ fontSize: 'clamp(1.02rem, 2.55vw, 1.53rem)', fontWeight: 700, color: '#fff', height: 42, marginBottom: '2.5rem', letterSpacing: '1px' }}>
            <span className="gradient-text" style={{ fontFamily: 'monospace' }}>{typed}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="btn-container" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href="#projects" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem', borderRadius: '50px' }}>View Projects</a>
            <motion.a href="abhinav_cv.pdf" target="_blank" className="btn-ghost" style={{ padding: '1.2rem 3rem', fontSize: '1rem', borderRadius: '50px', borderColor: 'var(--secondary)', color: '#fff', background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }} whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(176,38,255,0.4)', background: 'rgba(176,38,255,0.1)' }} transition={{ duration: 0.2 }}>[ RESUME ]</motion.a>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="social-btn-container" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '4rem' }}>
            {[[Github, PERSONAL.github], [Linkedin, PERSONAL.linkedin], [Mail, `mailto:${PERSONAL.email}`]].map(([Icon, href], i) => (
              <motion.div key={i} variants={scaleIn}>
                <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.1}>
                  <a href={href} target="_blank" className="btn-ghost social-icon-btn"><Icon size={20} /></a>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '20px', height: '35px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '8px', background: 'var(--secondary)', borderRadius: '4px', animation: 'scrollDown 1.5s infinite' }} />
            </div>
            Scroll down
          </motion.div>

        </motion.div>
      </div>
      <style>{`
        @keyframes scrollDown {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 15px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-badge">[ SYSTEM.INFO ]</span>
          <h2 className="section-title"><TextDecrypt text="Profile" speed={40} /></h2>
        </motion.div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem', alignItems: 'center' }}>

          <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} perspective={800} transitionSpeed={1500} scale={1.05}>
              <div className="glass-card" style={{ width: '100%', maxWidth: '380px', aspectRatio: '4/5', padding: 0, borderWidth: '2px', borderColor: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                <img className="pop-out" src="profile.jpg" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9) grayscale(0.2)' }} />

                {/* Corner Markers */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '20px', height: '20px', borderTop: '3px solid var(--primary)', borderLeft: '3px solid var(--primary)', zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '20px', height: '20px', borderBottom: '3px solid var(--primary)', borderRight: '3px solid var(--primary)', zIndex: 2 }} />

                <div className="pop-out-extreme" style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>REC.01</div>
                <div className="pop-out-extreme" style={{ position: 'absolute', bottom: '15px', left: '15px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, padding: '2px 6px', background: 'rgba(0,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', animation: 'blink 1.5s infinite' }} />
                  [ ACTIVE ]
                </div>
              </div>
            </Tilt>
          </motion.div>

          <motion.div variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} transitionSpeed={1000}>
              <div className="glass-card">
                <div className="pop-out">
                  <motion.h3 variants={fadeUp} style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>Who I Am</motion.h3>
                  <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    I am <strong style={{ color: 'var(--primary)' }}>Siva Narasimha Abhinav D</strong>, a B.Tech Computer Science and Engineering (AI & ML) student at <strong style={{ color: 'var(--secondary)' }}>Lovely Professional University</strong>, Phagwara, Punjab, currently in my third year. I have a strong foundation in full-stack web development, machine learning. I have built 5 projects spanning intelligent web applications, ML-based optimization models tools — demonstrating my ability to translate academic knowledge into real-world solutions. I am passionate about building scalable, efficient, and impactful software. I am actively seeking internship and placement opportunities where I can contribute meaningfully, grow professionally, and work alongside experienced engineers on challenging problems.
                  </motion.p>
                </div>

                <motion.div variants={fadeUp} className="pop-out-extreme" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', marginTop: '2.5rem' }}>
                  {[
                    { id: 'SYS.DEGREE', val: 'B.Tech CSE (AI & ML)' },
                    { id: 'INT.SCORE', val: '7.71 / 10 (Ongoing)' },
                    { id: 'NODE.LOC', val: 'Punjab IN' },
                  ].map((r, i) => (
                    <div key={r.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '1px' }}>{r.id}</div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{r.val}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ───────────────────────────────────────────────────
function Skills() {
  const baseSkills = SKILLS.filter(s => s.category !== 'Soft Skills')
  const softSkills = SKILLS.find(s => s.category === 'Soft Skills')

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-badge" style={{ textTransform: 'lowercase' }}>[ what i know ]</span>
          <h2 className="section-title"><TextDecrypt text="Tech Stack" speed={30} /></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {baseSkills.map((s, i) => (
            <motion.div key={i} variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ delay: (i % 3) * 0.1 }}>
              <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={800} transitionSpeed={1000} scale={1.05}>
                <div className="glass-card" style={{ borderTop: `2px solid ${s.color}` }}>
                  <div className="pop-out-extreme" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '4px', background: `${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${s.color}44` }}>
                      <s.icon size={22} color={s.color} style={{ filter: `drop-shadow(0 0 8px ${s.color})` }} />
                    </div>
                    <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>{s.category}</h3>
                  </div>
                  <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="pop-out" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {s.items.map((item, idxx) => {
                      const isPrimary = PRIMARY_SKILLS.includes(item)
                      return (
                        <motion.span variants={fadeUp} key={item} className="tech-tag" style={{ borderLeft: `3px solid ${s.color}`, position: 'relative' }}>
                          {item}
                          {isPrimary && (
                            <span style={{ marginLeft: '6px', fontSize: '9px', color: '#fff', background: s.color, padding: '2px 4px', borderRadius: '3px', filter: `drop-shadow(0 0 4px ${s.color})` }}>
                              [ PRIMARY ]
                            </span>
                          )}
                        </motion.span>
                      )
                    })}
                  </motion.div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills Rendered Full-Width Below */}
        {softSkills && (
          <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1200} transitionSpeed={1000} scale={1.02}>
              <div className="glass-card" style={{ borderTop: `2px solid ${softSkills.color}`, background: 'linear-gradient(135deg, rgba(30, 20, 10, 0.7), rgba(5, 5, 5, 0.9))' }}>
                <div className="pop-out-extreme" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '4px', background: `${softSkills.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${softSkills.color}44` }}>
                    <softSkills.icon size={22} color={softSkills.color} style={{ filter: `drop-shadow(0 0 8px ${softSkills.color})` }} />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>{softSkills.category}</h3>
                </div>
                <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="pop-out" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {softSkills.items.map((item, idxx) => (
                    <motion.span variants={fadeUp} key={item} className="tech-tag" style={{ borderLeft: `3px solid ${softSkills.color}`, fontSize: '0.85rem' }}>
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// ─── PROJECTS ─────────────────────────────────────────────────────
function Projects() {
  const [active, setActive] = useState(null)
  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-badge">[ DATABANKS ]</span>
          <h2 className="section-title"><TextDecrypt text="Executed Projects" speed={30} /></h2>
        </motion.div>

        {/* Render 3 columns to force two rows of 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} transition={{ delay: (i % 3) * 0.1 }}>
              <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} perspective={800} transitionSpeed={800} scale={1.03}>

                <div className="glass-card" style={{ padding: '0', cursor: 'pointer', borderTop: `2px solid ${p.color}`, height: '100%', display: 'flex', flexDirection: 'column' }} onClick={() => setActive(active === i ? null : i)}>
                  <div className="glass-card-inner"></div>

                  <div className="pop-out-extreme" style={{ padding: '0.8rem 2rem', background: `linear-gradient(90deg, ${p.color}22, transparent)`, borderBottom: `1px solid ${p.color}44`, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: p.color, fontWeight: 900 }}>ADDR: 0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                    <span style={{ fontSize: '0.75rem', color: p.color, fontWeight: 900 }}>{active === i ? '[ OPEN ]' : '[ STAGING ]'}</span>
                  </div>

                  <div className="pop-out" style={{ padding: '2rem', flexGrow: 1 }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <span className="pop-out-extreme" style={{ fontSize: '3rem', filter: `drop-shadow(0 10px 10px rgba(0,0,0,0.8))` }}>{p.icon}</span>
                      <div>
                        <h3 className="pop-out-extreme" style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>{p.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: p.color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>{p.subtitle}</p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {active === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1.5rem' }}>
                            {p.bullets.map((b, bi) => (
                              <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { delay: bi * 0.1 } }} key={bi} style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                <span style={{ color: p.color, fontWeight: 900 }}>{">"}</span> {b}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!active || active !== i ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>{p.bullets[0]}</p>
                    ) : null}

                    <div className="pop-out-extreme" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
                      {p.tech.map((t, idx) => (
                        <span key={t} className="tech-tag" style={{ borderLeft: `3px solid ${p.color}` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pop-out" style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.6)', borderTop: `1px solid rgba(255,255,255,0.1)`, display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <a href={p.github} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.8rem', borderRadius: '4px' }}>
                      <Github size={16} /> GitHub
                    </a>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EDUCATION ────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-badge">[ RECORDS ]</span>
          <h2 className="section-title"><TextDecrypt text="Academics" speed={30} /></h2>
        </motion.div>

        <motion.div variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {EDUCATION.map((ed, i) => (
            <motion.div variants={fadeLeft} key={i}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={800} transitionSpeed={1000} glareEnable={true} glareMaxOpacity={0.05} scale={1.03}>
                <div className="glass-card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary)' }}>
                  <div className="glass-card-inner"></div>
                  <div className="pop-out" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h4 className="pop-out-extreme" style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}>{ed.degree}</h4>
                      <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>{ed.field}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{ed.school}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ed.location}</div>
                    </div>
                    <div className="pop-out-extreme" style={{ textAlign: 'right' }}>
                      <div style={{ padding: '0.5rem 1.2rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--primary)', borderRadius: '4px', color: 'var(--primary)', fontWeight: 900, fontSize: '0.9rem', marginBottom: '0.8rem', display: 'inline-block', boxShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>{ed.grade}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px' }}>{ed.period}</div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── TRAINING & CERTIFICATIONS ──────────────────────────────────────────
function Training() {
  return (
    <section id="training" className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title"><TextDecrypt text="Training" speed={30} /></h2>
        </motion.div>

        {/* Featured Training Card */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={scaleIn} style={{ marginBottom: '4rem' }}>
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} transitionSpeed={1000} glareEnable={true} glareMaxOpacity={0.05} scale={1.02}>
            <div className="glass-card" style={{ padding: '4rem', borderTop: '4px solid var(--primary)' }}>
              <div className="glass-card-inner"></div>

              <div className="pop-out-extreme" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '2.5rem' }}>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>{TRAINING.company}</h3>
                  <p style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem', letterSpacing: '1px' }}>{TRAINING.role}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end' }}>
                  <span style={{ padding: '0.6rem 1.5rem', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: '4px', fontWeight: 900, boxShadow: '0 0 10px rgba(0,255,255,0.2)' }}>{TRAINING.date}</span>
                  <motion.a href={TRAINING.fileLink} target="_blank" className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', color: 'var(--primary)', borderColor: 'var(--primary)', background: 'transparent', borderRadius: '4px', display: 'flex', gap: '0.5rem' }} whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,255,0.4)', background: 'rgba(0,255,255,0.1)' }} transition={{ duration: 0.2 }}>
                    <Award size={16} /> [ CERTIFICATE ]
                  </motion.a>
                </div>
              </div>

              <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }} className="pop-out" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {TRAINING.highlights.map((h, i) => (
                  <motion.div variants={fadeLeft} key={i} style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '1.3rem' }}>{'>>'}</span> {h}
                  </motion.div>
                ))}
              </motion.div>


            </div>
          </Tilt>
        </motion.div>

        {/* The Remaining Certifications rendering below in terminal card style */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '6rem' }}>
          <h2 className="section-title">
            <Award size={36} color="var(--primary)" style={{ display: 'inline', marginRight: '15px', verticalAlign: 'middle', filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.5))' }} />
            <TextDecrypt text="Certificates" speed={40} />
          </h2>
        </motion.div>
        <motion.div variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {CERTS.map((cert, i) => (
            <motion.div variants={scaleIn} key={i}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={800} scale={1.03}>
                <div className="glass-card" style={{ padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `6px solid ${cert.color}` }}>
                  <div className="glass-card-inner"></div>

                  <div className="pop-out-extreme">
                    <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900, textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}>{cert.name}</h4>
                    <div style={{ color: cert.color, fontSize: '0.9rem', fontWeight: 800, letterSpacing: '1px', marginTop: '6px' }}>{cert.org}</div>
                  </div>

                  <div className="pop-out" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 800 }}>{cert.date}</span>
                    <a href={cert.link} className="btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', gap: '0.5rem', borderRadius: '4px' }}>
                      <FileText size={14} /> [ ACCESS ]
                    </a>
                  </div>

                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="section" style={{ paddingBottom: '8rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-badge">[ CONTACT ]</span>
          <h2 className="section-title"><TextDecrypt text="LET'S CONNECT" speed={30} /></h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={scaleIn}>
          <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={800} transitionSpeed={1000} glareEnable={true} glareMaxOpacity={0.15} scale={1.05}>
            <div className="glass-card" style={{ padding: '4rem 4rem 5rem', textAlign: 'center', borderTop: '4px solid var(--primary)', borderBottom: '4px solid var(--secondary)' }}>
              <div className="glass-card-inner"></div>

              <div className="pop-out-extreme">
                <h3 style={{ color: 'var(--primary)', fontSize: '1.3rem', marginBottom: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 900, textShadow: '0 2px 10px rgba(0,255,255,0.4)' }}>Open To</h3>
              </div>

              <div className="pop-out-extreme" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {['[ INTERNSHIPS ]', '[ FULL TIME JOB ]', '[ FREELANCE ]'].map((tag, i) => (
                  <motion.span initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} key={tag} style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 900, letterSpacing: '2px', padding: '0.5rem 1rem', background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.3)', borderRadius: '4px' }}>
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Terminal Readout inside Contact Box */}
              <div className="pop-out" style={{ background: 'transparent', padding: '2rem 2rem 0', textAlign: 'left', marginBottom: '4rem', fontFamily: 'monospace', border: 'none', fontSize: '1.25rem', lineHeight: '2.2' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{'>'} NAME: <span style={{ color: '#fff' }}>Siva Narasimha Abhinav D</span></div>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{'>'} GMAIL: <span style={{ color: '#fff' }}>{PERSONAL.email}</span></div>
                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>{'>'} STATUS: <span style={{ color: 'var(--accent)', marginLeft: '12px' }}>[ ACTIVELY SEEKING ]</span> <span style={{ width: 12, height: 12, background: 'var(--accent)', borderRadius: '50%', marginLeft: 15, animation: 'blink 1s infinite', display: 'inline-block' }} /></div>
              </div>

              <div className="pop-out-extreme" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={PERSONAL.linkedin} target="_blank" className="btn-ghost" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                  <Linkedin size={20} /> Node: LinkedIn
                </a>
                <a href={PERSONAL.github} target="_blank" className="btn-ghost" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                  <Github size={20} /> [ REPO: GITHUB ]
                </a>
                <motion.a href="abhinav_cv.pdf" target="_blank" className="btn-ghost" style={{ padding: '1rem 2rem', fontSize: '1rem', color: 'var(--primary)', borderColor: 'var(--primary)', background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }} whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,255,0.4)', background: 'rgba(0,255,255,0.1)' }} transition={{ duration: 0.2 }}>
                  <Download size={20} /> [ RESUME ]
                </motion.a>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}

// ─── APP BASE ────────────────────────────────────────────────────────────────
export default function App() {
  const [booted, setBooted] = useState(false)

  // Use session storage to only boot sequence once per session
  useEffect(() => {
    if (sessionStorage.getItem('booted')) setBooted(true)
  }, [])

  const handleBootComplete = () => {
    sessionStorage.setItem('booted', 'true')
    setBooted(true)
  }

  if (!booted) return <CyberBootScreen onComplete={handleBootComplete} />

  return (
    <>
      <div className="crt-overlay" />
      <div className="global-scanline" />
      <CyberCursor />

      <ThreeBackground />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Training />
        <Education />
        <Contact />
      </main>
      <footer style={{ width: '100%', padding: '4rem 0 3rem 0', textAlign: 'center', backgroundColor: '#020202', borderTop: '2px solid rgba(0, 255, 255, 0.15)', marginTop: '2rem', zIndex: 10, position: 'relative' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.9rem', letterSpacing: '1px' }}>
            © 2026 Siva Narasimha Abhinav D. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
            <a href={PERSONAL.github} target="_blank" className="btn-ghost social-icon-btn" style={{ borderRadius: '50%', padding: '0.8rem' }}><Github size={20} /></a>
            <a href={PERSONAL.linkedin} target="_blank" className="btn-ghost social-icon-btn" style={{ borderRadius: '50%', padding: '0.8rem' }}><Linkedin size={20} /></a>
            <a href={`mailto:${PERSONAL.email}`} className="btn-ghost social-icon-btn" style={{ borderRadius: '50%', padding: '0.8rem' }}><Mail size={20} /></a>
          </div>
          <div style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.85rem', opacity: 0.5, letterSpacing: '2px' }}>
            Built with HTML · CSS · JavaScript
          </div>
        </div>
      </footer>
    </>
  )
}
