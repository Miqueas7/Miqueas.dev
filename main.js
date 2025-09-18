// =============================================
// PORTFOLIO - MIQUEAS QUINTANILLA
// Main JavaScript File
// =============================================

// =============================================
// DOM Elements
// =============================================
const elements = {
  loader: document.getElementById("loader"),
  navbar: document.getElementById("navbar"),
  navMenu: document.getElementById("navMenu"),
  navToggle: document.getElementById("navToggle"),
  navLinks: document.querySelectorAll(".nav-link"),
  themeToggle: document.getElementById("themeToggle"),
  themeIcon: document.getElementById("themeIcon"),
  terminalToggle: document.getElementById("terminalToggle"),
  terminalModal: document.getElementById("terminalModal"),
  terminalClose: document.getElementById("terminalClose"),
  backToTop: document.getElementById("backToTop"),
  typewriter: document.getElementById("typewriter"),
  year: document.getElementById("year"),
  contactForm: document.getElementById("contactForm"),
};

// =============================================
// Configuration
// =============================================
const config = {
  typewriterStrings: [
    "Ingeniero de Minas",
    "Data Scientist",
    "Machine Learning Engineer",
    "Software Developer",
    "Python Developer",
    "Mining Tech Innovator",
  ],
  typewriterSpeed: 100,
  typewriterDelay: 2000,
};

// =============================================
// State Management
// =============================================
const state = {
  theme: localStorage.getItem("theme") || "dark",
  isMenuOpen: false,
  isTerminalOpen: false,
  currentSection: "home",
};

// =============================================
// Initialize Application
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  // Hide loader after page loads
  setTimeout(() => {
    elements.loader.classList.add("hidden");
  }, 2000);

  // Initialize all modules
  initTheme();
  initNavigation();
  initScrollEffects();
  initTypewriter();
  initAnimations();
  initContactForm();
  initTerminal();
  loadDynamicContent();

  // Set current year
  if (elements.year) {
    elements.year.textContent = new Date().getFullYear();
  }

  // Initialize counter animations
  initCounters();

  // Initialize skill radar chart if canvas exists
  const skillsRadar = document.getElementById("skillsRadar");
  if (skillsRadar) {
    initSkillsRadar(skillsRadar);
  }
}

// =============================================
// Theme Management
// =============================================
function initTheme() {
  // Apply saved theme
  document.documentElement.setAttribute("data-theme", state.theme);
  updateThemeIcon();

  // Theme toggle handler
  elements.themeToggle?.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("theme", state.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  if (elements.themeIcon) {
    elements.themeIcon.className =
      state.theme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }
}

// =============================================
// Navigation
// =============================================
function initNavigation() {
  // Mobile menu toggle
  elements.navToggle?.addEventListener("click", toggleMobileMenu);

  // Navigation links
  elements.navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      smoothScroll(target);

      // Close mobile menu if open
      if (state.isMenuOpen) {
        toggleMobileMenu();
      }

      // Update active link
      updateActiveLink(link);
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      state.isMenuOpen &&
      !elements.navMenu.contains(e.target) &&
      !elements.navToggle.contains(e.target)
    ) {
      toggleMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  state.isMenuOpen = !state.isMenuOpen;
  elements.navToggle?.classList.toggle("active");
  elements.navMenu?.classList.toggle("active");
}

function updateActiveLink(activeLink) {
  elements.navLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

// =============================================
// Scroll Effects
// =============================================
function initScrollEffects() {
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Navbar scroll effect
    if (currentScroll > 100) {
      elements.navbar?.classList.add("scrolled");
    } else {
      elements.navbar?.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
      elements.navbar?.classList.add("hidden");
    } else {
      elements.navbar?.classList.remove("hidden");
    }

    // Back to top button
    if (currentScroll > 500) {
      elements.backToTop?.classList.add("visible");
    } else {
      elements.backToTop?.classList.remove("visible");
    }

    lastScroll = currentScroll;

    // Update active section
    updateActiveSection();
  });

  // Back to top click
  elements.backToTop?.addEventListener("click", () => {
    smoothScroll("#home");
  });
}

function updateActiveSection() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 200;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < top + height) {
      state.currentSection = id;
      const correspondingLink = document.querySelector(
        `.nav-link[href="#${id}"]`
      );
      if (correspondingLink) {
        updateActiveLink(correspondingLink);
      }
    }
  });
}

// =============================================
// Smooth Scroll
// =============================================
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const offset = 80; // Navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// =============================================
// Typewriter Effect
// =============================================
function initTypewriter() {
  if (!elements.typewriter) return;

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentString = config.typewriterStrings[stringIndex];

    if (isDeleting) {
      elements.typewriter.textContent = currentString.substring(
        0,
        charIndex - 1
      );
      charIndex--;
    } else {
      elements.typewriter.textContent = currentString.substring(
        0,
        charIndex + 1
      );
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : config.typewriterSpeed;

    if (!isDeleting && charIndex === currentString.length) {
      typeSpeed = config.typewriterDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % config.typewriterStrings.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// =============================================
// Animations
// =============================================
function initAnimations() {
  // Intersection Observer for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Trigger counters if they're in view
        if (entry.target.classList.contains("stat-value")) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document
    .querySelectorAll(".fade-in, .slide-in, .stat-value")
    .forEach((el) => {
      observer.observe(el);
    });
}

// =============================================
// Counter Animation
// =============================================
function initCounters() {
  const counters = document.querySelectorAll(".stat-value");

  counters.forEach((counter) => {
    counter.textContent = "0";
  });
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target + "+";
    }
  };

  updateCounter();
}

// =============================================
// Skills Radar Chart
// =============================================
function initSkillsRadar(canvas) {
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 30;

  const skills = [
    { label: "Mining Engineering", value: 90 },
    { label: "Python", value: 95 },
    { label: "Machine Learning", value: 85 },
    { label: "Data Analysis", value: 90 },
    { label: "Software Dev", value: 88 },
    { label: "Leadership", value: 85 },
  ];

  // This is a placeholder - you might want to use Chart.js for a real implementation
  // For now, we'll just draw a simple representation
  ctx.strokeStyle = "#b87333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

// =============================================
// Load Dynamic Content
// =============================================
async function loadDynamicContent() {
  try {
    // Load experience timeline
    await loadExperienceTimeline();

    // Load projects
    await loadProjects();

    // Load skills
    await loadSkills();

    // Load certifications
    await loadCertifications();
  } catch (error) {
    console.error("Error loading dynamic content:", error);
  }
}

async function loadExperienceTimeline() {
  const timeline = document.getElementById("experienceTimeline");
  if (!timeline) return;

  const experiences = [
    {
      date: "Dic 2024 - Mar 2025",
      title: "Líder de Proyecto Software",
      company: "Proyecto Carreteras MTC",
      category: "software",
      description:
        "Liderando desarrollo de software para creación masiva de planos, implementación de ML para detección de zonas de riesgo geológico.",
      achievements: [
        "700+ planos en minutos",
        "Web Scraping MTC",
        "Machine Learning",
      ],
      tech: ["Python", "C#", "Selenium", "MySQL"],
    },
    {
      date: "Oct 2024 - Actualidad",
      title: "Docente Minería 4.0",
      company: "INARQ",
      category: "teaching",
      description:
        "Programa especializado en Minería 4.0: Innovación e implementación IA.",
      achievements: ["Python para minería", "Machine Learning", "IA aplicada"],
      tech: ["Python", "Colab", "Jupyter"],
    },
    {
      date: "Sep 2023 - Mar 2024",
      title: "Project Manager & AI Strategy",
      company: "EDT Consulting",
      category: "software",
      description:
        "Lideré equipo de Operaciones, gestionando proyectos de ML para minería.",
      achievements: [
        "15 analistas formados",
        "ML en sostenimiento",
        "Sistema gestor de aceros",
      ],
      tech: ["Python", "Power BI", "SQL Server", "Scrum"],
    },
  ];

  timeline.innerHTML = experiences
    .map(
      (exp, index) => `
        <div class="timeline-item ${
          index % 2 === 0 ? "left" : "right"
        }" data-category="${exp.category}">
            <div class="timeline-content">
                <span class="timeline-date">${exp.date}</span>
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
                <ul class="timeline-achievements">
                    ${exp.achievements.map((a) => `<li>${a}</li>`).join("")}
                </ul>
                <div class="timeline-tech">
                    ${exp.tech
                      .map((t) => `<span class="tech-badge">${t}</span>`)
                      .join("")}
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

async function loadProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  const projects = [
    {
      title: "Software Creación Masiva de Planos",
      category: "automation",
      description:
        "Automatización para generar 700+ planos en minutos con ML para riesgo geológico",
      tech: ["Python", "C#", "Machine Learning"],
      github: "https://github.com/Miqueas7/Repositorio-Freelancer",
      demo: "#",
    },
    {
      title: "ML para Sostenimiento Minero",
      category: "ml",
      description:
        "Modelo predictivo para selección óptima de sostenimiento en minas",
      tech: ["TensorFlow", "Python", "Scikit-learn"],
      github: "#",
      demo: "#",
    },
    {
      title: "Sistema Ventilación Minera",
      category: "mining",
      description:
        "Software para cálculo de cobertura de aire según DS 023-2017 EM",
      tech: ["Python", "VentSim", "Excel"],
      github: "#",
      demo: "#",
    },
  ];

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-header">
                <h3>${project.title}</h3>
                <div class="project-links">
                    <a href="${
                      project.github
                    }" target="_blank" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="${project.demo}" target="_blank" aria-label="Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.tech
                  .map((t) => `<span class="tech-tag">${t}</span>`)
                  .join("")}
            </div>
        </div>
    `
    )
    .join("");
}

async function loadSkills() {
  const miningSkills = document.getElementById("miningSkills");
  const devSkills = document.getElementById("devSkills");
  const dataSkills = document.getElementById("dataSkills");

  if (miningSkills) {
    miningSkills.innerHTML = createSkillBars([
      { name: "VentSim", level: 90 },
      { name: "Rocscience", level: 85 },
      { name: "Civil 3D", level: 88 },
      { name: "AutoCAD", level: 92 },
    ]);
  }

  if (devSkills) {
    devSkills.innerHTML = createSkillBars([
      { name: "Python", level: 95 },
      { name: "C# / .NET", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "SQL", level: 90 },
    ]);
  }

  if (dataSkills) {
    dataSkills.innerHTML = createSkillBars([
      { name: "TensorFlow", level: 85 },
      { name: "Power BI", level: 90 },
      { name: "Machine Learning", level: 88 },
      { name: "Data Visualization", level: 92 },
    ]);
  }
}

function createSkillBars(skills) {
  return skills
    .map(
      (skill) => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        </div>
    `
    )
    .join("");
}

async function loadCertifications() {
  const certSlider = document.getElementById("certSlider");
  if (!certSlider) return;

  const certifications = [
    { name: "Microsoft Office Specialist Expert", year: "2019" },
    { name: "Maestría Ingeniería de Software", year: "UNMSM" },
    { name: "Python para Minería", year: "2024" },
    { name: "Machine Learning Especialización", year: "2024" },
  ];

  certSlider.innerHTML = certifications
    .map(
      (cert) => `
        <div class="cert-card">
            <i class="fas fa-certificate"></i>
            <h4>${cert.name}</h4>
            <span>${cert.year}</span>
        </div>
    `
    )
    .join("");
}

// =============================================
// Contact Form
// =============================================
function initContactForm() {
  if (!elements.contactForm) return;

  elements.contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(elements.contactForm);
    const data = Object.fromEntries(formData);

    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    console.log("Form data:", data);

    // Show success message
    showNotification(
      "¡Mensaje enviado con éxito! Te contactaré pronto.",
      "success"
    );

    // Reset form
    elements.contactForm.reset();
  });

  // Floating labels effect
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea");
    const label = group.querySelector("label");

    if (input && label) {
      input.addEventListener("focus", () => {
        label.classList.add("active");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          label.classList.remove("active");
        }
      });
    }
  });
}

// =============================================
// Terminal
// =============================================
function initTerminal() {
  elements.terminalToggle?.addEventListener("click", () => {
    state.isTerminalOpen = true;
    elements.terminalModal?.classList.add("active");
    document.getElementById("terminalInput")?.focus();
  });

  elements.terminalClose?.addEventListener("click", closeTerminal);

  elements.terminalModal?.addEventListener("click", (e) => {
    if (e.target === elements.terminalModal) {
      closeTerminal();
    }
  });
}

function closeTerminal() {
  state.isTerminalOpen = false;
  elements.terminalModal?.classList.remove("active");
}

// =============================================
// Utility Functions
// =============================================
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// =============================================
// Export for other modules
// =============================================
window.portfolio = {
  state,
  config,
  showNotification,
  smoothScroll,
};
