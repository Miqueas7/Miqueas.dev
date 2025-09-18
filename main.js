// ==============
// Utilidades
// ==============
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ==============
// Tema (dark/light)
// ==============
const themeBtn = $("#themeToggle");
const root = document.documentElement;
const userPref = localStorage.getItem("theme");
if (userPref) document.documentElement.dataset.theme = userPref;

function toggleTheme() {
  const cur = document.documentElement.dataset.theme || "dark";
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
}
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

// ==============
// Nav móvil + Scrollspy
// ==============
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navMenu a").forEach((a) =>
    a.addEventListener("click", () => navMenu.classList.remove("is-open"))
  );
}

const sections = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "teaching",
  "publications",
  "education",
  "contact",
];
const navLinks = $$("#navMenu a");

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`)
        );
      }
    });
  },
  { rootMargin: "-50% 0px -45% 0px", threshold: 0 }
);

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) spy.observe(el);
});

// ==============
// Reveal on scroll
// ==============
const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.2 }
);
$$(".reveal").forEach((el) => revealer.observe(el));

// ==============
// Filtros de proyectos
if (yearEl) yearEl.textContent = new Date().getFullYear();
