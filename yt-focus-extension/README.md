# 📺 YouTube Focus Mode

A Chrome extension that strips YouTube down to what actually matters — your subscriptions, the video, and nothing else.

---

## ✨ What It Does

| Feature | Description |
|---|---|
| 🚫 **Blocks Shorts** | Removes the Shorts button from the sidebar (both expanded and collapsed), feed shelves, search results, and channel tabs |
| 🏠 **Redirects Homepage** | Going to `youtube.com` automatically takes you to your **Subscriptions feed** instead |
| 🧹 **Cleans the Sidebar** | Removes Home, Shorts, Explore, Shopping, Music, Movies & TV, YouTube Premium, YouTube Kids, and footer clutter |
| 📺 **Focused Watch Page** | Hides the recommendations panel on the right side when watching a video — just the video and comments |

---

## 🔧 Installation

> Chrome doesn't allow side-loaded extensions from the Web Store without a developer account, so you'll load it manually. It takes about 60 seconds.

### Step 1 — Download

Click the green **Code** button at the top of this page → **Download ZIP**

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

When a new version is released:

1. Download the new ZIP and extract it (replace the old folder, or use a new one)
2. Go to `chrome://extensions`
3. Click the **refresh icon** on the YouTube Focus Mode card

---

## 🛠 Troubleshooting

**The Shorts button still shows briefly**
YouTube loads its sidebar asynchronously, so there may be a very brief flash before the extension hides it. It should disappear within a second. This is a limitation of how Chrome extensions interact with YouTube's single-page app architecture.

**Something stopped working after a YouTube update**
YouTube occasionally changes its internal class names and element structure. If a feature breaks, open an issue on this repo and it'll get patched.

**The extension shows a "Developer mode" banner**
This is normal for manually loaded extensions. Chrome shows this warning because the extension isn't from the Web Store. You can dismiss it — it doesn't affect functionality.

---

## 🤝 Contributing

Found a bug or YouTube broke something? Open an issue or submit a pull request.

---

*Built because YouTube's algorithm deserves a mute button.*
