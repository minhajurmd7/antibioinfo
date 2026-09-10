// ===== NAVBAR, LEARNING PATH & PWA CONTROLLER =====

// 1. Mobile Menu Toggle & Accessibility
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu when clicking any nav link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}

// 2. Dual Learning Path Mode ("public" vs "academic")
let currentPath = localStorage.getItem("abinfo_learning_path") || "public";

function setLearningPath(path) {
  currentPath = path;
  localStorage.setItem("abinfo_learning_path", path);

  if (path === "academic") {
    document.body.classList.add("path-academic");
    document.body.classList.remove("path-public");
  } else {
    document.body.classList.add("path-public");
    document.body.classList.remove("path-academic");
  }

  // Update active status on path buttons
  document.querySelectorAll(".path-btn").forEach(btn => {
    const isSelected = btn.getAttribute("data-path") === path;
    btn.classList.toggle("active", isSelected);
    btn.setAttribute("aria-pressed", isSelected);
  });

  // Sync index.html view toggle buttons if present
  const viewSimpleBtn = document.getElementById("viewSimpleBtn");
  const viewDetailedBtn = document.getElementById("viewDetailedBtn");
  if (viewSimpleBtn && viewDetailedBtn) {
    if (path === "academic") {
      viewDetailedBtn.classList.add("active");
      viewSimpleBtn.classList.remove("active");
    } else {
      viewSimpleBtn.classList.add("active");
      viewDetailedBtn.classList.remove("active");
    }
  }

  // Re-render drug cards if on catalog page
  if (typeof renderDrugsFromCurrentState === "function") {
    renderDrugsFromCurrentState();
  }
}

// 3. WhatsApp Share Helper
function shareOnWhatsApp(customText) {
  const currentUrl = window.location.href;
  const defaultText = `💊 Check out AB|Info — India's Antibiotic Medicine Information & AMR Awareness Portal: ${currentUrl}`;
  const textToShare = customText || defaultText;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// 4. Initialization & Service Worker Registration
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved learning path
  setLearningPath(currentPath);

  // Attach click listeners to path toggle buttons
  document.querySelectorAll(".path-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-path");
      setLearningPath(selected);
    });
  });

  // Register PWA Service Worker for offline capability
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").then(registration => {
        console.log("AB|Info ServiceWorker registered with scope:", registration.scope);
      }).catch(err => {
        console.warn("ServiceWorker registration failed:", err);
      });
    });
  }
});