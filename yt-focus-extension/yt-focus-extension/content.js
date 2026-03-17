// =============================================
// YouTube Focus Mode - content.js
// =============================================

(function () {
  "use strict";

  // --- 1. REDIRECT: youtube.com homepage → subscriptions feed ---
  function redirectHomeToSubscriptions() {
    const url = location.href;
    // Match exactly youtube.com or youtube.com/ or youtube.com/?...
    if (/^https:\/\/www\.youtube\.com\/?(\?.*)?$/.test(url)) {
      location.replace("https://www.youtube.com/feed/subscriptions");
    }
  }

  redirectHomeToSubscriptions();

  // --- 2. DOM CLEANUP via MutationObserver ---
  // Some elements are injected dynamically after page load,
  // so we watch for them and remove them.

  const SELECTORS_TO_HIDE = [
    // Shorts shelf (home/subscriptions feed)
    "ytd-rich-shelf-renderer[is-shorts]",
    "ytd-reel-shelf-renderer",
    // Shorts items in search
    "ytd-reel-item-renderer",
    // Right-side recommendations on watch page
    "#secondary.ytd-watch-flexy",
    // Home entry in guide sidebar
    'ytd-guide-entry-renderer a[href="/"]',
    'ytd-mini-guide-entry-renderer a[href="/"]',
    // Shorts entry in guide sidebar
    'ytd-guide-entry-renderer a[href="/shorts"]',
    'ytd-mini-guide-entry-renderer a[href="/shorts"]',
    // Shorts tab on channel pages
    'yt-tab-shape[tab-title="Shorts"]',
    // Shorts chip in home filter row
    'yt-chip-cloud-chip-renderer[chip-title="Shorts"]',
    // Shorts in notifications
    "ytd-notification-renderer[is-shorts]",
    // Shorts category label in search filters
    'ytd-search-filter-renderer a[href*="sp=EgIQAQ"]',
  ];

  function hideElements() {
    SELECTORS_TO_HIDE.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        // For sidebar links, hide the whole parent entry
        if (
          sel.includes('a[href="/"]') ||
          sel.includes('a[href="/shorts"]')
        ) {
          const parent = el.closest(
            "ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer"
          );
          if (parent) parent.style.setProperty("display", "none", "important");
        } else {
          el.style.setProperty("display", "none", "important");
        }
      });
    });
  }

  // Run once immediately
  hideElements();

  // Then watch for dynamic content
  const observer = new MutationObserver(() => {
    hideElements();
    // Also re-check redirect (YouTube is a SPA, URL can change without reload)
    redirectHomeToSubscriptions();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // --- 3. Handle YouTube SPA navigation (yt-navigate-finish event) ---
  document.addEventListener("yt-navigate-finish", () => {
    redirectHomeToSubscriptions();
    hideElements();
  });

  // Also catch popstate
  window.addEventListener("popstate", () => {
    redirectHomeToSubscriptions();
  });
})();
