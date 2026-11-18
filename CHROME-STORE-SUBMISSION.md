# Chrome Web Store — Submission Reference
# Is it Base?

All text to copy-paste when filling the Chrome Web Store listing.

---

## ZIP to Upload

Create the ZIP from INSIDE the folder:
```bash
cd "/Users/lizic/Desktop/Lizobsidian/Liz Obsidian/Is it Base"
zip ../is-it-base.zip manifest.json background.js content.js popup.html popup.js icons/icon16.png icons/icon48.png icons/icon128.png
```

Verify: `unzip -l ../is-it-base.zip` — manifest.json must be at the root (not inside a subfolder)

---

## Store Listing Tab

### Name
```
Is it Base?
```

### Short Description (max 132 chars)
```
Instantly detects if a website was built on Base44 or another vibe-coding platform.
```

### Full Description
```
Is it Base? is a developer tool that tells you instantly whether any website
was built on Base44 — the AI-powered app builder.

It also detects other popular vibe-coding and no-code platforms.

HOW IT WORKS

🔍 Network Inspection
Scans all network requests already made by the page using the browser's
built-in Performance API — no special permissions required.

📄 DOM & Script Analysis
Checks script sources, meta tags, and HTML structure for platform-specific
markers and signatures.

🗄️ Storage Analysis
Checks localStorage and cookies for platform-specific keys and tokens.

🌐 Global Variable Detection
Looks for JavaScript globals that platform SDKs expose on window.

WHAT YOU GET
A clear, instant verdict: "YES! This is Base44" or "Not Base44 — built on [Platform]"
or "Not built on Base44 — no known platform detected."

SUPPORTED PLATFORMS
Detects Base44 and several other well-known app-building platforms.

PRIVACY
This extension does not collect, transmit, or store any user data.
All analysis happens locally in your browser. Nothing leaves your device.
```

### Category
```
Developer Tools
```

### Language
```
English
```

### Store Icon (128×128)
Use `icons/icon128.png` — or create a separate higher-quality version.

### Screenshot
Take a screenshot of the popup open on a Base44 site.
Required size: 1280×800 or 640×400.

---

## Privacy Practices Tab

### Single Purpose Description
```
Detects whether a website was built on Base44 or another vibe-coding platform, by analyzing scripts, network requests, and storage in the active tab.
```

### activeTab — Justification
```
Required to access the currently active tab when the user clicks the extension icon, so the detection script can scan the page.
```

### scripting — Justification
```
Required to inject the detection script into the active tab. The script scans script sources, network requests via the Performance API, localStorage, cookies, and JavaScript globals to identify the platform.
```

### Remote Code — Justification
```
This extension does not use any remote code. All JavaScript is bundled locally within the extension package.
```

### Data Usage
Check **none** of the data collection checkboxes.
Then check the certification: "I certify that..."

### Privacy Policy URL
```
https://github.com/YOUR_USERNAME/is-it-base/blob/main/PRIVACY.md
```
(Replace YOUR_USERNAME after creating the GitHub repo)

---

## Publisher Settings Tab

- **Contact email:** lizic@wix.com (must be verified)
- **Publisher display name:** your name or brand

---

## Future Updates

1. Make code changes
2. Bump `"version"` in `manifest.json` (e.g. `1.0.0` → `1.1.0`)
3. Recreate the ZIP (run the zip command above)
4. Chrome Store → Your item → Package tab → Upload new package
5. Submit for review — **no need to re-fill descriptions**
