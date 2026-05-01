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
// --- PROFILS MULTI-CV ---

const profils = {
  "product-owner": {
    hero: "Gestion de produit · User Stories · Backlog · MVP · Vision orientée valeur",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en gestion de produit, analyse des besoins et pilotage de projets digitaux. Je transforme les besoins utilisateurs en fonctionnalités claires et priorisées.",
      "Passionné par la création de produits utiles et performants, j’assure la coordination entre équipes techniques et parties prenantes, tout en garantissant une vision produit cohérente et orientée valeur."
    ],
    skills: [
      "User Stories",
      "Backlog",
      "Scrum",
      "MVP",
      "UX (bases)",
      "KPI Produit",
      "Power BI",
      "Notion"
    ],
    projects: [
      {
        emoji: "📝",
        title: "Pilotage d’un site web",
        subtitle: "Gestion de projet",
        description: "Coordination d’équipe, recueil des besoins, cahier des charges, maquettes et reporting jusqu’à la présentation finale.",
        tags: ["Scrum", "UX", "Gestion"]
      },
      {
        emoji: "🚗",
        title: "Étude de faisabilité",
        subtitle: "Analyse produit",
        description: "Analyse des besoins, user stories, conception d’un MVP, estimation du budget et recommandation de non-lancement.",
        tags: ["User Stories", "MVP", "Analyse"]
      },
      {
        emoji: "📊",
        title: "Analyse Ferrari",
        subtitle: "Stratégie & performance",
        description: "Analyse des performances financières, commerciales et RSE d’un constructeur automobile premium.",
        tags: ["Stratégie", "Analyse", "RSE"]
      }
    ]
  },

  "webmaster": {
    hero: "WordPress · SEO · Maintenance web · Intégration HTML/CSS · Performance & accessibilité",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en gestion et maintenance de sites web. J’interviens sur l’administration de CMS, la mise à jour de contenus et le suivi des performances.",
      "Rigoureux et autonome, je souhaite être un point de contact fiable pour assurer la continuité, la performance et l’évolution de vos outils web."
    ],
    skills: [
      "WordPress",
      "Joomla",
      "Google Analytics",
      "Search Console",
      "HTML",
      "CSS",
      "cPanel",
      "FTP"
    ],
    projects: [
      {
        emoji: "🖥️",
        title: "Pilotage d’un site web",
        subtitle: "Gestion de projet digital",
        description: "Coordination d’équipe, cahier des charges, maquettes et présentation finale d’un site web.",
        tags: ["CMS", "Gestion", "Maquettes"]
      },
      {
        emoji: "📈",
        title: "Analyse de performance web",
        subtitle: "Web Analytics",
        description: "Rapport Google Analytics et identification des leviers d’amélioration d’un site.",
        tags: ["Analytics", "SEO", "Reporting"]
      },
      {
        emoji: "🧩",
        title: "Maintenance & documentation",
        subtitle: "WordPress",
        description: "Rédaction d’un guide de maintenance WordPress pour faciliter les mises à jour.",
        tags: ["WordPress", "Documentation", "Maintenance"]
      }
    ]
  },

  "dev-python": {
    hero: "Backend Python · API REST · Automatisation · SQL · Scripts & Data Processing",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des applications Python orientées backend et automatisation. J’ai une expérience dans la création d’API REST et la manipulation de bases de données.",
      "Je souhaite contribuer à vos projets en développant des scripts, des API et des outils internes permettant d’automatiser et fiabiliser les processus."
    ],
    skills: [
      "Python",
      "POO",
      "Flask",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "JSON/CSV",
      "Git / GitHub"
    ],
    projects: [
      {
        emoji: "💬",
        title: "Application de messagerie réseau",
        subtitle: "Sockets & GUI",
        description: "Développement d’une application client/serveur en Python avec interface graphique simple.",
        tags: ["Python", "Réseau", "GUI"]
      },
      {
        emoji: "🌦️",
        title: "API REST météo",
        subtitle: "Flask / FastAPI",
        description: "API REST avec CRUD complet sur PostgreSQL et filtrage des données météo.",
        tags: ["API", "PostgreSQL", "FastAPI"]
      },
      {
        emoji: "⚙️",
        title: "Scripts d’automatisation",
        subtitle: "ETL simple",
        description: "Manipulation de fichiers CSV/JSON, nettoyage et génération de datasets exploitables.",
        tags: ["ETL", "Automatisation", "Python"]
      }
    ]
  },

  "dev-web": {
    hero: "HTML · CSS · JavaScript · Intégration Figma · Responsive & UX Front‑End",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des interfaces web en HTML, CSS et JavaScript.",
      "Je souhaite contribuer à vos projets en développant des interfaces claires, performantes et adaptées aux besoins utilisateurs."
    ],
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive",
      "Figma → Web",
      "WordPress",
      "Git / GitHub",
      "VS Code"
    ],
    projects: [
      {
        emoji: "🌐",
        title: "Portfolio web personnel",
        subtitle: "Front-end",
        description: "Développement complet d’un site responsive présentant mes projets.",
        tags: ["HTML", "CSS", "JS"]
      },
      {
        emoji: "📱",
        title: "Intégration maquette Figma",
        subtitle: "UI/UX",
        description: "Reproduction fidèle d’une maquette Figma en HTML/CSS responsive.",
        tags: ["Figma", "Intégration", "Responsive"]
      },
      {
        emoji: "📊",
        title: "Générateur de rapports",
        subtitle: "Python + Web",
        description: "Transformation de données Excel en PDF avec graphiques automatisés.",
        tags: ["Python", "Automatisation", "Reporting"]
      }
    ]
  },

  "data-analyst": {
    hero: "Analyse de données · SQL · Power BI · KPI · Data Cleaning & Reporting",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en analyse de données et data visualisation.",
      "Je souhaite contribuer à l’amélioration de la qualité des données et à la production de reportings pour faciliter la prise de décision."
    ],
    skills: [
      "SQL",
      "Excel avancé",
      "Power BI",
      "Tableau (notions)",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "Agile (bases)"
    ],
    projects: [
      {
        emoji: "📱",
        title: "Marché du jeu mobile",
        subtitle: "Power BI",
        description: "Dashboard interactif analysant les performances de plusieurs entreprises entre 2020 et 2025.",
        tags: ["Power BI", "KPI", "Analyse"]
      },
      {
        emoji: "⚽",
        title: "Football Hub",
        subtitle: "Full Stack Data",
        description: "Architecture FastAPI + PostgreSQL + Streamlit pour analyser des KPI sportifs.",
        tags: ["FastAPI", "ETL", "Data Viz"]
      },
      {
        emoji: "☕",
        title: "Étude Nespresso",
        subtitle: "Stratégie",
        description: "Analyse SWOT, Forces de Porter, Business Model et Marketing Mix.",
        tags: ["Stratégie", "Business", "Analyse"]
      }
    ]
  },

  "business-analyst": {
    hero: "Analyse métier · Spécifications · Data‑Driven Decisions · KPI · Process & Reporting",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en analyse de données, compréhension des besoins métier et gestion de projet.",
      "Je souhaite contribuer à la prise de décision en traduisant les besoins métier en analyses concrètes et indicateurs pertinents."
    ],
    skills: [
      "SQL",
      "Excel avancé",
      "Power BI",
      "Tableau",
      "Analyse métier",
      "User Stories",
      "PostgreSQL",
      "Scrum"
    ],
    projects: [
      {
        emoji: "📱",
        title: "Marché du jeu mobile",
        subtitle: "Business & Data",
        description: "Analyse comparative des tendances du marché et identification des acteurs performants.",
        tags: ["KPI", "Analyse", "Marché"]
      },
      {
        emoji: "⚽",
        title: "Dashboard Real Madrid",
        subtitle: "KPI sportifs",
        description: "Conception d’un dashboard avec xG, possession et efficacité des joueurs.",
        tags: ["Power BI", "SQL", "Sport"]
      },
      {
        emoji: "🧭",
        title: "Projet Nexora",
        subtitle: "Pilotage digital",
        description: "Coordination, cahier des charges et alignement des besoins métier avec la solution.",
        tags: ["Gestion de projet", "Cahier des charges", "Digital"]
      }
    ]
  },

  "assistant-admin": {
    hero: "Gestion administrative · Reporting Excel · Organisation · Structuration & Process",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en analyse de données, gestion de projet et outils digitaux.",
      "Je souhaite contribuer à la fiabilité des informations, à l’organisation des activités et au suivi efficace des projets."
    ],
    skills: [
      "Facturation",
      "Suivi fournisseurs",
      "Excel",
      "Power BI",
      "Word",
      "PowerPoint",
      "Sage (notions)",
      "Organisation"
    ],
    projects: [
      {
        emoji: "📄",
        title: "Outils de gestion administrative",
        subtitle: "Excel & structuration",
        description: "Modèle de facture automatisé, tableau de bord d’activité et classement numérique.",
        tags: ["Excel", "Process", "Organisation"]
      },
      {
        emoji: "📱",
        title: "Marché du jeu mobile",
        subtitle: "Reporting",
        description: "Dashboard Power BI pour suivre les KPI et les tendances du marché.",
        tags: ["Power BI", "KPI", "Analyse"]
      },
      {
        emoji: "☕",
        title: "Étude Nespresso",
        subtitle: "Analyse économique",
        description: "Étude stratégique complète : SWOT, Forces de Porter, Business Model, Marketing Mix.",
        tags: ["Stratégie", "Business", "Analyse"]
      }
    ]
  },

  "assistant-gestion": {
    hero: "Suivi d’activité · Tableaux de bord · Organisation interne · Procédures & Notion",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en analyse de données, gestion de projet et outils digitaux.",
      "Je souhaite contribuer concrètement à vos projets en améliorant l’organisation, la fiabilité des données et le suivi des livrables."
    ],
    skills: [
      "Procédures",
      "Structuration de l’information",
      "Notion",
      "Excel",
      "Power BI",
      "Python (bases)",
      "SQL (bases)",
      "Outils collaboratifs"
    ],
    projects: [
      {
        emoji: "📚",
        title: "Wiki interne Notion",
        subtitle: "Organisation",
        description: "Conception d’un wiki pour centraliser procédures, ressources et onboarding.",
        tags: ["Notion", "Process", "Onboarding"]
      },
      {
        emoji: "🌐",
        title: "Projet de site web",
        subtitle: "Gestion de projet",
        description: "Coordination d’équipe, cahier des charges, maquettes et reporting.",
        tags: ["Gestion", "Digital", "Maquettes"]
      },
      {
        emoji: "📊",
        title: "Marché du jeu mobile",
        subtitle: "Data & analyse",
        description: "Dashboard Power BI et analyse des tendances 2020–2025.",
        tags: ["Power BI", "KPI", "Analyse"]
      }
    ]
  },

  "conducteur-travaux": {
    hero: "Suivi de chantier · Planification · Reporting · Coordination terrain & sécurité",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en gestion de projet, planification et suivi opérationnel.",
      "Je souhaite contribuer au bon déroulement des opérations sur chantier, au suivi des délais et à la structuration des comptes rendus."
    ],
    skills: [
      "Suivi d’avancement",
      "Lean (bases)",
      "Gantt (Excel)",
      "Comptes rendus",
      "Excel",
      "Power BI",
      "CATIA (bases)",
      "GMAO (bases)"
    ],
    projects: [
      {
        emoji: "🌐",
        title: "Projet de site web",
        subtitle: "Gestion de projet",
        description: "Coordination d’équipe, planning, cahier des charges et reporting.",
        tags: ["Gestion", "Planning", "Reporting"]
      },
      {
        emoji: "🛠️",
        title: "Modélisation industrielle",
        subtitle: "CATIA",
        description: "Modélisation de pièces mécaniques et assemblages sous contraintes techniques.",
        tags: ["CATIA", "Industrie", "Plans"]
      },
      {
        emoji: "📊",
        title: "Marché du jeu mobile",
        subtitle: "Analyse",
        description: "Dashboard Power BI pour visualiser les performances et tendances.",
        tags: ["Power BI", "KPI", "Analyse"]
      }
    ]
  },

  "chef-projet": {
    hero: "Gestion de projet · Agile · UX · Reporting · Coordination & Documentation",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en gestion de projet, analyse de données et développement informatique.",
      "Je souhaite contribuer au pilotage de projets digitaux en accompagnant les équipes dans l’organisation, le suivi et la structuration des activités."
    ],
    skills: [
      "Agile",
      "User Stories",
      "Lean Management",
      "Cahier des charges",
      "UX Design",
      "Excel",
      "Power BI",
      "Python / SQL / HTML / CSS / JS"
    ],
    projects: [
      {
        emoji: "🌐",
        title: "Projet de site web",
        subtitle: "Pilotage digital",
        description: "Coordination, planning, cahier des charges, maquettes et reporting.",
        tags: ["Agile", "Gestion", "UX"]
      },
      {
        emoji: "📱",
        title: "Marché du jeu mobile",
        subtitle: "Data & pilotage",
        description: "Dashboard Power BI pour suivre les KPI et tendances.",
        tags: ["Power BI", "KPI", "Analyse"]
      },
      {
        emoji: "🚗",
        title: "Étude d’aide à la conduite",
        subtitle: "Faisabilité",
        description: "Analyse des besoins, user stories, MVP et recommandation de non-lancement.",
        tags: ["User Stories", "MVP", "Analyse"]
      }
    ]
  },

  "support-it": {
    hero: "Support utilisateurs · Diagnostic · Résolution incidents · Windows · Documentation IT",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en support informatique et assistance aux utilisateurs.",
      "Rigoureux et pédagogue, je souhaite contribuer à la continuité des services IT et à l’amélioration de l’expérience utilisateur."
    ],
    skills: [
      "Support utilisateurs",
      "Diagnostic incidents",
      "Windows",
      "Bases réseaux",
      "Ticketing (notions)",
      "Microsoft 365",
      "Google Workspace",
      "Documentation"
    ],
    projects: [
      {
        emoji: "🖥️",
        title: "Assistant informatique",
        subtitle: "Kraft ONG",
        description: "Assistance aux utilisateurs, dépannage de premier niveau et aide aux logiciels.",
        tags: ["Support", "Bureautique", "Matériel"]
      },
      {
        emoji: "📘",
        title: "Procédures d’incidents",
        subtitle: "Documentation",
        description: "Rédaction de guides pour incidents courants et base de connaissances.",
        tags: ["Documentation", "FAQ", "Support"]
      },
      {
        emoji: "📊",
        title: "Suivi des incidents",
        subtitle: "Excel",
        description: "Tableau de suivi des demandes et incidents pour identifier les problèmes récurrents.",
        tags: ["Excel", "Suivi", "Support"]
      }
    ]
  },

  "qa": {
    hero: "Tests fonctionnels · Recette · Cas de tests · Suivi des anomalies · Qualité logicielle",
    about: [
      "Étudiant en Bachelor Data Science & Management à l’EPF Cachan, je développe des compétences en test et validation fonctionnelle.",
      "Je souhaite contribuer à la qualité des livrables en vérifiant la conformité des fonctionnalités et en identifiant les points d’amélioration avant mise en production."
    ],
    skills: [
      "Recette fonctionnelle",
      "Cas de tests (Gherkin)",
      "Tests manuels",
      "Suivi des bugs",
      "Excel (suivi)",
      "Agile (bases)",
      "JIRA / Mantis (notions)",
      "Documentation"
    ],
    projects: [
      {
        emoji: "🧪",
        title: "Plan de tests Nexora",
        subtitle: "Recette",
        description: "Rédaction d’un plan de tests structuré basé sur les exigences fonctionnelles.",
        tags: ["Tests", "Plan de tests", "Recette"]
      },
      {
        emoji: "📱",
        title: "Checklist de recette",
        subtitle: "Application mobile",
        description: "Création d’une checklist de vérification pour assurer la conformité fonctionnelle.",
        tags: ["Checklist", "Mobile", "Qualité"]
      },
      {
        emoji: "🐞",
        title: "Suivi des anomalies",
        subtitle: "Excel",
        description: "Mise en place d’un tableau de suivi des bugs (priorité, statut, correction).",
        tags: ["Bugs", "Suivi", "Reporting"]
      }
    ]
  }
};

// --- FONCTIONS D’INJECTION DE CONTENU ---

function renderSkills(skills) {
  const skillsList = document.querySelector("#a-propos .skills-list");
  if (!skillsList) return;
  skillsList.innerHTML = "";
  skills.forEach((skill) => {
    const span = document.createElement("span");
    span.className = "skill-chip";
    span.textContent = skill;
    skillsList.appendChild(span);
  });
}

function renderAbout(aboutParagraphs) {
  const aboutContent = document.querySelector("#a-propos .about-content");
  if (!aboutContent) return;
  const paragraphs = aboutContent.querySelectorAll("p.reveal");
  if (paragraphs.length >= 2) {
    paragraphs[0].textContent = aboutParagraphs[0] || "";
    paragraphs[1].textContent = aboutParagraphs[1] || "";
  }
}

function renderProjects(projects) {
  const grid = document.querySelector("#projets .projets-grid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach((proj, index) => {
    const delay = index + 1;
    const article = document.createElement("article");
    article.className = `flip-card reveal reveal-delay-${delay}`;
    article.setAttribute("role", "listitem");
    article.setAttribute("aria-label", `Projet ${index + 1}`);

    article.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front">
          <div class="flip-front-img" aria-hidden="true">${proj.emoji}</div>
          <div class="flip-front-body">
            <h3>${proj.title}</h3>
            <span>${proj.subtitle}</span>
          </div>
        </div>
        <div class="flip-back">
          <div>
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
          </div>
          <div class="flip-back-tags">
            ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
    grid.appendChild(article);

    // Re-observe les nouveaux éléments pour l'animation reveal
    observer.observe(article);
  });
}

function renderHero(heroText) {
  const heroTagline = document.getElementById("hero-tagline");
  if (!heroTagline) return;
  heroTagline.textContent = heroText;
}

function chargerProfil(slug) {
  const profil = profils[slug];
  if (!profil) return;
  renderHero(profil.hero);
  renderAbout(profil.about);
  renderSkills(profil.skills);
  renderProjects(profil.projects);
}

// --- INITIALISATION ---
// Appel direct (le script est en bas de page, le DOM est déjà prêt)
const selectProfil = document.getElementById("profil-selector");
if (selectProfil) {
  chargerProfil(selectProfil.value);
  selectProfil.addEventListener("change", () => {
    chargerProfil(selectProfil.value);
  });
}