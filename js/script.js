/* ---- YEAR ---- */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ---- TYPING EFFECT ---- */
    const fullName = 'Christophe Vallot';
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
    // Close on link click
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
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + (target > 10 ? '+' : '');
          if (current >= target) clearInterval(timer);
        }, 35);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    /* ---- CAROUSEL ---- */
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let autoTimer;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    document.getElementById('prev-btn').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.getElementById('next-btn').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach(dot => {
      dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.index)); resetAuto(); });
    });

    startAuto();

    // Keyboard: pause on focus inside carousel
    document.getElementById('carousel').addEventListener('focusin', () => clearInterval(autoTimer));
    document.getElementById('carousel').addEventListener('focusout', startAuto);

    /* ---- FORM VALIDATION ---- */
    const form = document.getElementById('contact-form');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(input, errorId, condition) {
      const err = document.getElementById(errorId);
      if (condition) {
        input.classList.add('error');
        err.classList.add('show');
        return false;
      } else {
        input.classList.remove('error');
        err.classList.remove('show');
        return true;
      }
    }

    // Live validation on blur
    document.getElementById('prenom').addEventListener('blur', function() {
      setError(this, 'prenom-error', !this.value.trim());
    });
    document.getElementById('nom').addEventListener('blur', function() {
      setError(this, 'nom-error', !this.value.trim());
    });
    document.getElementById('email').addEventListener('blur', function() {
      setError(this, 'email-error', !emailRegex.test(this.value.trim()));
    });
    document.getElementById('message').addEventListener('blur', function() {
      setError(this, 'message-error', this.value.trim().length < 20);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const prenom = document.getElementById('prenom');
      const nom = document.getElementById('nom');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      const v1 = setError(prenom, 'prenom-error', !prenom.value.trim());
      const v2 = setError(nom, 'nom-error', !nom.value.trim());
      const v3 = setError(email, 'email-error', !emailRegex.test(email.value.trim()));
      const v4 = setError(message, 'message-error', message.value.trim().length < 20);

      if (v1 && v2 && v3 && v4) {
        // Simulate sending
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours…';
        setTimeout(() => {
          form.reset();
          document.getElementById('form-success').classList.add('show');
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
          setTimeout(() => document.getElementById('form-success').classList.remove('show'), 6000);
        }, 1500);
      }
    });