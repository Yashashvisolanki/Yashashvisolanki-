// ===== 1. EDIT YOUR LINKS HERE =====
const LINKS = {
  linkedin: "",   // e.g. "https://www.linkedin.com/in/your-name"
  behance:  "",   // e.g. "https://www.behance.net/your-name"
  email:    "",   // e.g. "you@example.com"
  figma:    ""    // e.g. "https://www.figma.com/@your-name"
};

document.querySelectorAll("[data-link]").forEach((a) => {
  const key = a.dataset.link;
  const val = (LINKS[key] || "").trim();
  if (!val) { a.style.display = "none"; return; } // hide chips with no link yet
  a.href = key === "email" ? "mailto:" + val : val;
  if (key !== "email") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
});

// ===== 2. THEME TOGGLE (remembers choice) =====
const root = document.documentElement;
const btn = document.getElementById("theme");
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}
btn.addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// ===== 3. SCROLL REVEAL =====
const items = document.querySelectorAll("section, .proj");
items.forEach((el) => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}
