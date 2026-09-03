/* ---- YEAR ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- TYPING EFFECT ---- */
const fullName = 'Dady Kalangoso';
const typingEl = document.getElementById('typing-text');
let i = 0;
function typeChar() {
  if (i <= fullName.length) {
    typingEl.textContent = fullName.slice(0, i);
    i++;
    setTimeout(typeChar, i === 1 ? 500 : 90);
  }
}
typeChar();

/* ---- HEADER SCROLL ---- */
const header = document.getElementById('header');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 30);
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ---- BACK TO TOP ---- */
const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ---- DARK / LIGHT MODE ---- */
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function applyTheme() {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}
applyTheme();
themeBtn.addEventListener('click', () => { dark = !dark; applyTheme(); });

/* ---- LANGUE FR / EN ---- */
const langBtn = document.getElementById('lang-toggle');
const langLabel = document.getElementById('lang-label');
let currentLang = localStorage.getItem('lang') || 'fr';

function applyLang(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.hidden = el.getAttribute('data-lang') !== lang;
  });
  document.documentElement.setAttribute('lang', lang);
  langLabel.textContent = lang === 'fr' ? 'EN' : 'FR';
  langBtn.setAttribute(
    'aria-label',
    lang === 'fr' ? 'Switch to English' : 'Passer en français'
  );
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

applyLang(currentLang);

langBtn.addEventListener('click', () => {
  applyLang(currentLang === 'fr' ? 'en' : 'fr');
});

/* ---- SCROLL REVEAL ---- */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ---- ANIMATED COUNTERS ---- */
const counters = document.querySelectorAll('.stat-num[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40) || 1;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 35);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---- ANIMATED PROGRESS BARS (POSTES) ---- */
const posteBars = document.querySelectorAll('.poste-bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const targetWidth = el.style.width;
    el.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { el.style.width = targetWidth; }, 50);
    });
    barObserver.unobserve(el);
  });
}, { threshold: 0.4 });
posteBars.forEach(b => barObserver.observe(b));

/* ---- FLIP CARDS (support tactile / clic) ---- */
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});