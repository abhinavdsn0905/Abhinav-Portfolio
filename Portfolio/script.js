/* =============================================
   PORTFOLIO – SCRIPT.JS
   ============================================= */

// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .project-card, .skill-category, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      cursor.style.background = 'var(--accent2)';
      follower.style.width = '60px';
      follower.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--accent)';
      follower.style.width = '36px';
      follower.style.height = '36px';
    });
  });
}

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- MOBILE MENU ----
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- TYPED TEXT ----
const words = [
  'full-stack apps.',
  'ML pipelines.',
  'smart systems.',
  'clean code.',
  'cool stuff. 🚀',
];
let wordIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const word = words[wordIdx];
  if (!deleting) {
    typedEl.textContent = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 90);
}
setTimeout(typeLoop, 2200);

// ---- PARTICLE CANVAS ----
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108,99,255,${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card, .extra-card, .contact-card, .stat-card, .about-grid, .training-banner');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ---- SMOOTH ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = parseFloat((eased * parseFloat(target)).toFixed(2));
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.trim();
      const suffix = raw.includes('%') ? '%' : (raw.includes('+') ? '+' : '');
      const num = raw.replace('%','').replace('+','');
      animateCounter(el, num, suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));
