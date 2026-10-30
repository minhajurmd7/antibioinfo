// ===== NAVBAR, PWA CONTROLLER & DARK MODE =====

// 1. Theme Management (Light / Dark)
const THEME_KEY = "abinfo_theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    themeBtn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
  }

  // Update mobile browser status bar theme color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === "dark" ? "#0f172a" : "#0f766e");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
}

// 2. Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(
      (reg) => console.log("AB|Info Service Worker Registered. Scope:", reg.scope),
      (err) => console.log("Service Worker Registration Failed:", err)
    );
  });
}

// 3. Upgraded PWA Install Prompt Handler
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("pwaInstallBtn");
  if (installBtn) {
    installBtn.hidden = false;
  }
});

// Bind click listener directly so clicking always gives feedback
document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("pwaInstallBtn");
  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          alert("🎉 AB|Info is installing! Look for the AB|Info icon on your phone's Home Screen.");
          installBtn.hidden = true;
        }
        deferredPrompt = null;
      } else {
        // Helpful fallback for iPhone or unsupported browsers
        alert("📲 To install this Web App:\n\n1. Open your browser menu (⋮ on Android/Chrome or 'Share' on iPhone Safari)\n2. Tap 'Add to Home Screen'\n\nThen launch AB|Info directly from your phone's home screen!");
      }
    });
  }
});

window.addEventListener("appinstalled", () => {
  const installBtn = document.getElementById("pwaInstallBtn");
  if (installBtn) installBtn.hidden = true;
  console.log("AB|Info PWA installed successfully.");
});

// 4. Mobile Drawer Navbar Controller
document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("nav-active");
      navLinks.classList.toggle("open", isOpen);
      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    // Close mobile menu when tapping anywhere outside
    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains("nav-active")) {
        navLinks.classList.remove("nav-active", "open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
      }
    });

    // Close mobile menu when tapping any navigation link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active", "open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
      });
    });
  }
});