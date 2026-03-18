// =============================================
// YouTube Focus Mode - content.js
// =============================================
(function () {
  "use strict";

  // --- 1. REDIRECT rules ---
  function applyRedirects() {
    const url = location.href;

    // Homepage → Subscriptions
    if (/^https:\/\/www\.youtube\.com\/?(\?.*)?$/.test(url)) {
      location.replace("https://www.youtube.com/feed/subscriptions");
      return;
    }

    // Shorts page (any /shorts URL) → Subscriptions
    if (/^https:\/\/www\.youtube\.com\/shorts(\/.*)?(\?.*)?$/.test(url)) {
      location.replace("https://www.youtube.com/feed/subscriptions");
      return;
    }
  }

  applyRedirects();

  // --- 2. CSS-selector-based hiding ---
  const HIDE_SELECTORS = [
    // Shorts shelf in feed
    "ytd-rich-shelf-renderer[is-shorts]",
    "ytd-reel-shelf-renderer",
    // Shorts in search
    "ytd-reel-item-renderer",
    // Watch page right sidebar
    "#secondary.ytd-watch-flexy",
    // Shorts tab on channel pages
    'yt-tab-shape[tab-title="Shorts"]',
    // Expanded sidebar: Home row
    'ytd-guide-entry-renderer:has(> a[href="/"])',
    // Collapsed mini sidebar: Home
    'ytd-mini-guide-entry-renderer:has(a[href="/"])',
    // Known clutter entries by href
    'ytd-guide-entry-renderer:has(a[href="/feed/explore"])',
    'ytd-guide-entry-renderer:has(a[href*="/feed/storefront"])',
    'ytd-guide-entry-renderer:has(a[href*="music.youtube.com"])',
    'ytd-guide-entry-renderer:has(a[href*="youtube.com/premium"])',
    'ytd-guide-entry-renderer:has(a[href*="tv.youtube.com"])',
    'ytd-guide-entry-renderer:has(a[href*="youtube.com/kids"])',
    'ytd-guide-entry-renderer:has(a[href*="reporthistory"])',
    'ytd-guide-entry-renderer:has(a[href*="report_history"])',
    // Entire sections containing clutter
    'ytd-guide-section-renderer:has(a[href="/feed/explore"])',
    'ytd-guide-section-renderer:has(a[href*="/feed/storefront"])',
    'ytd-guide-section-renderer:has(a[href*="music.youtube.com"])',
    'ytd-guide-section-renderer:has(a[href*="youtube.com/premium"])',
    'ytd-guide-section-renderer:has(a[href*="tv.youtube.com"])',
    'ytd-guide-section-renderer:has(a[href*="youtube.com/kids"])',
    // Footer
    "ytd-guide-renderer #footer",
    "ytd-guide-renderer #footer-links",
    "ytd-guide-signin-promo-renderer",
  ];

  function hideBySelectors() {
    HIDE_SELECTORS.forEach((sel) => {
      try {
        document.querySelectorAll(sel).forEach((el) => {
          el.style.setProperty("display", "none", "important");
        });
      } catch (e) {}
    });
  }

  // --- 3. Hide guide sections by heading text ---
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

  // --- 4. Intercept clicks on Shorts links before navigation ---
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("/shorts") || href.includes("youtube.com/shorts")) {
      e.preventDefault();
      e.stopPropagation();
      location.href = "https://www.youtube.com/feed/subscriptions";
    }
  }, true); // capture phase so it fires before YouTube's own handlers

  // --- 5. Run everything ---
  function runAll() {
    hideBySelectors();
    hideSectionsByTitle();
  }

  runAll();

  const observer = new MutationObserver(runAll);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener("yt-navigate-finish", () => {
    applyRedirects();
    runAll();
  });

  window.addEventListener("popstate", applyRedirects);
})();
