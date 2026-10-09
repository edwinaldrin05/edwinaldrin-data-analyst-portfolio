const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const progressBar = document.querySelector(".scroll-progress");
const backToTop = document.querySelector(".back-to-top");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  siteNav?.classList.toggle("open", !expanded);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  backToTop?.classList.toggle("visible", window.scrollY > 450);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 65}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const lightbox = document.getElementById("certificate-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove("no-scroll");
};
document.querySelectorAll(".certificate-open").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.image || "assets/images/data-analyst-certificate.jpg";
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    lightbox.querySelector(".lightbox-close")?.focus();
  });
});
lightbox?.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

document.querySelector(".copy-email")?.addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const email = button.dataset.email;
  const feedback = document.querySelector(".copy-feedback");
  try {
    await navigator.clipboard.writeText(email);
    if (feedback) feedback.textContent = "Email address copied to clipboard.";
  } catch {
    if (feedback) feedback.textContent = `Email: ${email}`;
  }
});


// Project category filters

const projectFilterButtons = document.querySelectorAll(".filter-button");
const allProjectCards = document.querySelectorAll(".project-grid-all .project-card");

const projectGroups = {
  all: [
    "EV Charging Demand Analytics",
    "Train Enquiry System",
    "Online Shopping Analytics Dashboard",
    "Netflix Content Analytics",
    "Online Shopping Database",
    "Job Market Analytics Dashboard",
    "Student Placement Analytics",
    "Traffic Accident Dashboard",
    "Excel Sales Dashboard"
  ],

  powerbi: [
    "EV Charging Demand Analytics",
    "Online Shopping Analytics Dashboard",
    "Job Market Analytics Dashboard",
    "Student Placement Analytics",
    "Traffic Accident Dashboard"
  ],

  excel: [
    "Netflix Content Analytics",
    "Excel Sales Dashboard"
  ],

  sql: [
    "Online Shopping Database"
  ],

  python: [
    "Train Enquiry System"
  ]
};

projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "all";
    const allowedProjects = projectGroups[selectedFilter] || projectGroups.all;

    // Update the selected filter button
    projectFilterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Show only projects belonging to the selected category
    allProjectCards.forEach((card) => {
      const title = card.querySelector("h3")?.textContent.trim();

      card.hidden = !allowedProjects.includes(title);
    });
  });
});

