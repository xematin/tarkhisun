import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Register Service Worker for PWA
import "./registerSW";

// Phase 1 SEO: HTTPS and WWW redirects
if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
  // Redirect HTTP to HTTPS
  if (window.location.protocol === "http:") {
    window.location.href = window.location.href.replace("http:", "https:");
  }

  // Redirect www to non-www
  if (window.location.hostname === "www.tarkhisun.com") {
    window.location.href = window.location.href.replace("www.tarkhisun.com", "tarkhisun.com");
  }
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);

// Remove the initial HTML app skeleton once React has painted the first frame.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const sk = document.getElementById("app-skeleton");
    if (sk) {
      sk.classList.add("sk-hide");
      setTimeout(() => sk.remove(), 300);
    }
    // Also remove any legacy pre-injected hero image from cached builds
    const legacyHero = document.getElementById("hero-initial-image");
    if (legacyHero) legacyHero.remove();
  });
});
