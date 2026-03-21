// =====================
// THEME TOGGLE
// =====================
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

// Default to dark theme for the modern look
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
if (savedTheme === 'dark') {
    body.classList.replace('light-theme', 'dark-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    body.classList.replace('dark-theme', 'light-theme');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('portfolio-theme', 'dark');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('portfolio-theme', 'light');
    }
    initCanvas();
});

// =====================
// MOBILE MENU & NAVBAR
// =====================
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// =====================
// SCROLL REVEAL (Intersection Observer)
// =====================
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// =====================
// COUNTER ANIMATION
// =====================
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / 50;
        const update = () => {
            count += inc;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(update, 35);
            } else {
                counter.innerText = target;
            }
        };
        update();
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// =====================
// ACTIVE NAV LINK ON SCROLL
// =====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (pageYOffset >= sec.offsetTop - sec.clientHeight / 3) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
});

// =====================
// 3D NEURAL NETWORK CANVAS
// =====================
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let nodes = [];
let mouse = { x: -9999, y: -9999 };
let animFrameId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
    resizeCanvas();
    initCanvas();
});

class Node {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 400 + 100; // depth
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.vz = (Math.random() - 0.5) * 0.5;
        this.baseSize = Math.random() * 2.5 + 0.5;
        this.pulse = Math.random() * Math.PI * 2;
    }

    project() {
        const fov = 500;
        const scale = fov / (fov + this.z);
        this.sx = canvas.width / 2 + (this.x - canvas.width / 2) * scale;
        this.sy = canvas.height / 2 + (this.y - canvas.height / 2) * scale;
        this.sr = this.baseSize * scale;
        this.scale = scale;
    }

    update() {
        this.pulse += 0.02;
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Mouse attraction
        const dx = mouse.x - this.sx;
        const dy = mouse.y - this.sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            this.vx += dx * 0.00015;
            this.vy += dy * 0.00015;
        }

        // Speed limit
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.5) { this.vx *= 0.97; this.vy *= 0.97; }

        // Bounds wrapping
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
        if (this.z < 50) this.z = 600;
        if (this.z > 600) this.z = 50;

        this.project();
    }

    draw() {
        const isDark = body.classList.contains('dark-theme');
        const pulse = Math.sin(this.pulse) * 0.3 + 0.7;
        const radius = this.sr * pulse;
        const alpha = this.scale * 0.8 * pulse;

        // Glow
        const grd = ctx.createRadialGradient(this.sx, this.sy, 0, this.sx, this.sy, radius * 5);
        if (isDark) {
            grd.addColorStop(0, `rgba(129, 140, 248, ${alpha * 0.8})`);
            grd.addColorStop(0.4, `rgba(99, 102, 241, ${alpha * 0.3})`);
            grd.addColorStop(1, 'transparent');
        } else {
            grd.addColorStop(0, `rgba(79, 70, 229, ${alpha * 0.6})`);
            grd.addColorStop(0.4, `rgba(99, 102, 241, ${alpha * 0.2})`);
            grd.addColorStop(1, 'transparent');
        }

        ctx.beginPath();
        ctx.arc(this.sx, this.sy, radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(this.sx, this.sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
            ? `rgba(165, 180, 252, ${alpha})`
            : `rgba(79, 70, 229, ${alpha})`;
        ctx.fill();
    }
}

function connectNodes() {
    const isDark = body.classList.contains('dark-theme');
    const maxDist = 180;

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const dx = a.sx - b.sx, dy = a.sy - b.sy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
                const alpha = (1 - dist / maxDist) * 0.5 * ((a.scale + b.scale) / 2);

                // Color shift based on depth
                const depthMix = (a.z + b.z) / 2;
                let r, g, bl;
                if (depthMix < 200) {
                    // Purple-ish
                    r = 99; g = 102; bl = 241;
                } else if (depthMix < 400) {
                    // Cyan
                    r = 6; g = 182; bl = 212;
                } else {
                    // Pink
                    r = 244; g = 114; bl = 182;
                }

                const gradient = ctx.createLinearGradient(a.sx, a.sy, b.sx, b.sy);
                const col = isDark
                    ? `rgba(${r},${g},${bl},${alpha})`
                    : `rgba(${r},${g},${bl},${alpha * 0.6})`;
                gradient.addColorStop(0, col);
                gradient.addColorStop(1, col);

                ctx.beginPath();
                ctx.moveTo(a.sx, a.sy);
                ctx.lineTo(b.sx, b.sy);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = Math.max(0.3, (a.scale + b.scale) * 0.4);
                ctx.stroke();
            }
        }
    }
}

function initCanvas() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
    nodes = Array.from({ length: count }, () => new Node());
    animate();
}

function animate() {
    animFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sort by Z for painter's algorithm
    nodes.sort((a, b) => b.z - a.z);

    connectNodes();
    nodes.forEach(n => { n.update(); n.draw(); });
}

initCanvas();

// =====================
// TYPING EFFECT
// =====================
const textEl = document.querySelector('.typing-text');
const roles = [
    'Computer Science Student (AI & ML)',
    'Full-Stack Developer',
    'Machine Learning Enthusiast',
    'Problem Solver'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
        textEl.innerText = current.slice(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 600);
            return;
        }
        setTimeout(type, 45);
    } else {
        textEl.innerText = current.slice(0, charIndex++);
        if (charIndex > current.length) {
            if (roleIndex === 0) {
                // First role: stay longer, don't cycle immediately
                setTimeout(() => { isDeleting = true; type(); }, 3000);
                return;
            }
            setTimeout(() => { isDeleting = true; type(); }, 2000);
            return;
        }
        setTimeout(type, 90);
    }
}
setTimeout(type, 800);

// =====================
// 3D CARD TILT EFFECT
// =====================
function initTilt() {
    const cards = document.querySelectorAll('.project-card, .cert-card, .stat-box, .skill-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transition = 'transform 0.1s ease';
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        });
    });
}

// Run tilt after a short delay to ensure DOM is ready
setTimeout(initTilt, 500);

// Re-init when reveals fire (new elements become visible)
const mutationObs = new MutationObserver(() => initTilt());
mutationObs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

// =====================
// CURSOR GLOW EFFECT
// =====================
const cursorGlow = document.createElement('div');
cursorGlow.id = 'cursor-glow';
cursorGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    mix-blend-mode: screen;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1'; });

// =====================
// SCROLL PROGRESS BAR
// =====================
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #6366f1, #06b6d4, #f472b6);
    z-index: 10000;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(99,102,241,0.8);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const totalH = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalH) * 100;
    progressBar.style.width = progress + '%';
});

// =====================
// FLOATING PARTICLES (extra ambient orbs)
// =====================
function createFloatingParticles() {
    const container = document.querySelector('.global-bg');
    const count = 8;
    const colors = ['#6366f1', '#06b6d4', '#f472b6', '#34d399'];

    for (let i = 0; i < count; i++) {
        const orb = document.createElement('div');
        const size = Math.random() * 6 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            box-shadow: 0 0 ${size * 3}px ${color};
            animation: floatOrb ${duration}s ${delay}s ease-in-out infinite;
            opacity: 0.7;
            pointer-events: none;
        `;
        container.appendChild(orb);
    }
}

createFloatingParticles();
