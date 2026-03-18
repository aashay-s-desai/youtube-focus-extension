# 📺 YouTube Focus Mode

A Chrome extension that strips YouTube down to what actually matters — your subscriptions, the video, and nothing else.

---

## ✨ What It Does

| Feature | Description |
|---|---|
| 🏠 **Redirects Homepage** | Going to `youtube.com` automatically takes you to your **Subscriptions feed** |
| 🧹 **Cleans the Sidebar** | Removes the Home button, Explore, Shopping, Music, Movies & TV, YouTube Premium, YouTube Kids, Report History, and all footer clutter |
| 📺 **Focused Watch Page** | Hides the recommendations panel on the right side when watching a video — just the video and comments |
| 🚫 **Removes Shorts from Feeds** | Strips Shorts shelves from the home/subscriptions feed and Shorts entries from search results |
| 🔀 **Redirects Shorts** | Clicking any Shorts link (including the sidebar button and external links) redirects you to your Subscriptions feed instead — it can't be hidden via CSS, so it's been neutered |

---

## 🔧 Installation

> Chrome doesn't allow side-loaded extensions from the Web Store without a developer account, so you'll load it manually. It takes about 60 seconds.

### Step 1 — Download
Download the ZIP from wherever you got this extension.

### Step 2 — Extract
Unzip the downloaded file. You should see a folder containing:

```
manifest.json
content.js
hide.css
icons/
```

### Step 3 — Load in Chrome
1. Open Chrome and go to **`chrome://extensions`**
2. Toggle **Developer mode** on (top-right corner)
3. Click **Load unpacked**
4. Select the unzipped folder

That's it — the extension activates immediately. No restart needed.

---

## 🔄 Updating

When a new version is available:
1. Download the new ZIP and extract it (replace the old folder, or use a new one)
2. Go to `chrome://extensions`
3. Click the **refresh icon** on the YouTube Focus Mode card

---

## 🛠 Troubleshooting

**The Shorts button is still visible in the sidebar**
YouTube injects this button in a way that defeats CSS hiding. This is a known YouTube limitation — the button is intentionally left visible but fully intercepted. Clicking it will always redirect you to Subscriptions instead of Shorts.

**Something stopped working after a YouTube update**
YouTube occasionally changes its internal element structure. If a feature breaks, get an updated version of the extension.

**The extension shows a "Developer mode" banner**
This is normal for manually loaded extensions. Chrome shows this warning because the extension isn't from the Web Store. You can dismiss it — it doesn't affect functionality.

---

## 🔗 Bonus Extension — Instagram Redirector

Also included in this repo is a second extension: **`ig-redirect-extension/`**

It redirects every Instagram URL (`instagram.com/*`) to a specified page — in this case, a college application PDF. Same idea as the YouTube homepage redirect, but for Instagram and using Chrome's network-level interception so the redirect happens before the page even begins to load.

### Installation
Same steps as above — just point **Load unpacked** at the `ig-redirect-extension` folder instead.

---

*Built because the algorithm deserves a mute button.*
