# Is it Base?

A Chrome extension (Manifest V3) that instantly tells you whether a website was built on **Base44** — and if not, which other platform it's using.

---

## What It Detects

| Primary | Answer |
|---|---|
| **Base44** | "YES! This is Base44" |

| Other platforms | Answer |
|---|---|
| Lovable | "Not Base44 — built on Lovable" |
| Bolt | "Not Base44 — built on Bolt" |
| v0 by Vercel | "Not Base44 — built on v0 by Vercel" |
| Replit | "Not Base44 — built on Replit" |
| Bubble | "Not Base44 — built on Bubble" |
| Webflow | "Not Base44 — built on Webflow" |
| Framer | "Not Base44 — built on Framer" |
| Glide | "Not Base44 — built on Glide" |
| Wix (regular) | "Not Base44 — built on Wix" |
| Squarespace | "Not Base44 — built on Squarespace" |
| None detected | "Not built on Base44" |

---

## Detection Methods

| Layer | Method |
|---|---|
| **Network calls** | Performance API — no extra permissions needed |
| **Scripts** | Scans `<script src>` attributes for platform CDN patterns |
| **Meta tags** | Checks `<meta name="generator">` |
| **JS globals** | Checks `window.*` for platform-specific objects |
| **Storage** | Checks `localStorage` and cookies |

---

## Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select this folder
5. Click the **B?** icon in your Chrome toolbar

---

## Permissions

| Permission | Reason |
|---|---|
| `activeTab` | Access the current tab when the user clicks the icon |
| `scripting` | Inject the detection script into the active tab |

No `webRequest`. No `<all_urls>`. No data ever leaves your browser.

---

## Privacy

This extension collects **no user data**. All analysis runs locally.
See [PRIVACY.md](PRIVACY.md).

---

## Chrome Web Store

[View on Chrome Web Store](#) ← link after publishing

---

## License

MIT
