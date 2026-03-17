// =============================================
// YouTube Focus Mode - content.js
// =============================================
(function () {
  "use strict";

  // --- INJECT STYLES INTO <head> AS EARLY AS POSSIBLE ---
  // This runs before YouTube renders, so elements are hidden from the start
  const EARLY_STYLE = `
    /* Shorts - expanded sidebar */
    ytd-guide-entry-renderer:has(a[href="/shorts"]) { display: none !important; }

    /* Shorts - collapsed mini sidebar */
    ytd-mini-guide-entry-renderer:has(a[href="/shorts"]) { display: none !important; }

    /* Home - expanded sidebar */
    ytd-guide-entry-renderer:has(a[href="/"]) { display: none !important; }

    /* Home - collapsed mini sidebar */
    ytd-mini-guide-entry-renderer:has(a[href="/"]) { display: none !important; }

    /* Shorts shelf in feed */
    ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer { display: none !important; }

    /* Shorts in search */
    ytd-reel-item-renderer { display: none !important; }

    /* Watch page right sidebar */
    #secondary.ytd-watch-flexy { display: none !important; }

    /* Shorts tab on channel pages */
    yt-tab-shape[tab-title="Shorts"] { display: none !important; }

    /* Explore / More from YouTube sections */
    ytd-guide-section-renderer:has(a[href="/feed/explore"]) { display: none !important; }
    ytd-guide-section-renderer:has(a[href*="/feed/storefront"]) { display: none !important; }
    ytd-guide-section-renderer:has(a[href*="music.youtube.com"]) { display: none !important; }
    ytd-guide-section-renderer:has(a[href*="youtube.com/premium"]) { display: none !important; }
    ytd-guide-section-renderer:has(a[href*="tv.youtube.com"]) { display: none !important; }
    ytd-guide-section-renderer:has(a[href*="youtube.com/kids"]) { display: none !important; }

    /* Individual clutter entries */
    ytd-guide-entry-renderer:has(a[href="/feed/explore"]) { display: none !important; }
    ytd-guide-entry-renderer:has(a[href*="/feed/storefront"]) { display: none !important; }
    ytd-guide-entry-renderer:has(a[href*="music.youtube.com"]) { display: none !important; }
    ytd-guide-entry-renderer:has(a[href*="youtube.com/premium"]) { display: none !important; }
    ytd-guide-entry-renderer:has(a[href*="tv.youtube.com"]) { display: none !important; }
    ytd-guide-entry-renderer:has(a[href*="youtube.com/kids"]) { display: none !important; }
    ytd-guide-entry-renderer:has(a[href*="reporthistory"]) { display: none !important; }
    ytd-guide-entry-renderer:has(a[href*="report_history"]) { display: none !important; }

    /* Footer */
    ytd-guide-renderer #footer,
    ytd-guide-renderer #footer-links,
    ytd-guide-signin-promo-renderer { display: none !important; }
  `;

  function injectStyle() {
    if (document.getElementById("yt-focus-style")) return;
    const style = document.createElement("style");
    style.id = "yt-focus-style";
    style.textContent = EARLY_STYLE;
    (document.head || document.documentElement).appendChild(style);
  }

  // Inject immediately
  injectStyle();

  // --- REDIRECT homepage → subscriptions ---
  function redirectHomeToSubscriptions() {
    if (/^https:\/\/www\.youtube\.com\/?(\?.*)?$/.test(location.href)) {
      location.replace("https://www.youtube.com/feed/subscriptions");
    }
  }
  redirectHomeToSubscriptions();

  // --- Hide sections by heading text (Explore / More from YouTube) ---
  const HIDDEN_SECTION_TITLES = ["explore", "more from youtube"];

  function hideSectionsByTitle() {
    document.querySelectorAll("ytd-guide-section-renderer").forEach((section) => {
      const heading = section.querySelector("h3, yt-formatted-string#title");
      if (heading) {
        const text = heading.textContent.trim().toLowerCase();
        if (HIDDEN_SECTION_TITLES.some((t) => text.includes(t))) {
          section.style.setProperty("display", "none", "important");
        }
      }
    });
  }

  // --- Brute-force: repeatedly re-hide Shorts entries for first 10s ---
  // YouTube sometimes re-renders the guide after a delay
  let attempts = 0;
  const forceHide = setInterval(() => {
    injectStyle();
    hideSectionsByTitle();

    // Directly hide any Shorts guide entries that slipped through
    document.querySelectorAll("ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer").forEach((el) => {
      const link = el.querySelector("a");
      if (link && (link.getAttribute("href") === "/shorts" || link.getAttribute("href") === "/")) {
        el.style.setProperty("display", "none", "important");
      }
    });

    attempts++;
    if (attempts >= 20) clearInterval(forceHide); // stop after 10s
  }, 500);

  // --- MutationObserver for dynamic changes ---
  const observer = new MutationObserver(() => {
    injectStyle();
    hideSectionsByTitle();

    document.querySelectorAll("ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer").forEach((el) => {
      const link = el.querySelector("a");
      if (link && (link.getAttribute("href") === "/shorts" || link.getAttribute("href") === "/")) {
        el.style.setProperty("display", "none", "important");
      }
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  // --- SPA navigation ---
  document.addEventListener("yt-navigate-finish", () => {
    redirectHomeToSubscriptions();
    injectStyle();
    hideSectionsByTitle();
  });

  window.addEventListener("popstate", redirectHomeToSubscriptions);
})();
