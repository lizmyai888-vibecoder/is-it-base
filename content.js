(function () {
  if (window.__isItBaseScanned) return;
  window.__isItBaseScanned = true;

  const evidence = [];
  let detectedPlatform = null;

  function safeCheck(fn) {
    try { return fn(); } catch { return false; }
  }

  function networkUrls() {
    return performance.getEntriesByType("resource").map((e) => e.name.toLowerCase());
  }

  function scriptSrcs() {
    return Array.from(document.querySelectorAll("script[src]")).map((s) => s.src.toLowerCase());
  }

  function metaGenerator() {
    const el = document.querySelector('meta[name="generator"]');
    return el ? el.content.toLowerCase() : "";
  }

  function htmlSnippet() {
    return (document.head ? document.head.innerHTML : "").toLowerCase().slice(0, 8000);
  }

  function localStorageKeys() {
    try {
      return Object.keys(localStorage).map((k) => k.toLowerCase());
    } catch { return []; }
  }

  function cookieStr() {
    try { return document.cookie.toLowerCase(); } catch { return ""; }
  }

  const PLATFORMS = [
    {
      id: "base44",
      name: "Base44",
      checks: [
        () => {
          const urls = networkUrls();
          if (urls.some((u) => /base44\.com|base44\.app|api\.base44/i.test(u))) {
            evidence.push("Network call to base44 domain");
            return true;
          }
        },
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /base44/i.test(s))) {
            evidence.push("Script loaded from base44");
            return true;
          }
        },
        () => {
          if (/base44/i.test(metaGenerator())) {
            evidence.push("meta[generator] = Base44");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.Base44 !== "undefined" && window.Base44)) {
            evidence.push("window.Base44 global found");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.__base44 !== "undefined")) {
            evidence.push("window.__base44 global found");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window._base44 !== "undefined")) {
            evidence.push("window._base44 global found");
            return true;
          }
        },
        () => {
          const keys = localStorageKeys();
          if (keys.some((k) => /base44/.test(k))) {
            evidence.push("localStorage key with 'base44'");
            return true;
          }
        },
        () => {
          if (/base44/.test(cookieStr())) {
            evidence.push("Cookie with 'base44'");
            return true;
          }
        },
        () => {
          if (/base44\.com|base44\.app/.test(htmlSnippet())) {
            evidence.push("base44 reference in page head");
            return true;
          }
        },
        () => {
          const host = window.location.hostname.toLowerCase();
          if (/base44\.(app|com|io)/.test(host)) {
            evidence.push("Hosted on base44 domain");
            return true;
          }
        },
      ],
    },
    {
      id: "lovable",
      name: "Lovable",
      checks: [
        () => {
          if (/lovable/i.test(metaGenerator())) {
            evidence.push("meta[generator] = Lovable");
            return true;
          }
        },
        () => {
          const urls = networkUrls();
          if (urls.some((u) => /lovable\.dev|lovableproject\.com|gptengineer\.app|gpteng\.co/i.test(u))) {
            evidence.push("Network call to Lovable/GPT Engineer domain");
            return true;
          }
        },
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /lovable|gptengineer|gpteng\.co/i.test(s))) {
            evidence.push("Script loaded from Lovable domain");
            return true;
          }
        },
        () => {
          if (/lovable|gptengineer/.test(htmlSnippet())) {
            evidence.push("Lovable reference in page head");
            return true;
          }
        },
        () => {
          if (/lovable\.app|lovableproject\.com/.test(window.location.hostname.toLowerCase())) {
            evidence.push("Hosted on lovable.app domain");
            return true;
          }
        },
      ],
    },
    {
      id: "bolt",
      name: "Bolt",
      checks: [
        () => {
          if (/bolt/i.test(metaGenerator())) {
            evidence.push("meta[generator] = Bolt");
            return true;
          }
        },
        () => {
          const urls = networkUrls();
          if (urls.some((u) => /bolt\.new|stackblitz/i.test(u))) {
            evidence.push("Network call to Bolt/StackBlitz domain");
            return true;
          }
        },
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /bolt\.new|stackblitz/i.test(s))) {
            evidence.push("Script loaded from StackBlitz");
            return true;
          }
        },
      ],
    },
    {
      id: "v0",
      name: "v0 by Vercel",
      checks: [
        () => {
          if (/^v0/i.test(metaGenerator())) {
            evidence.push("meta[generator] = v0");
            return true;
          }
        },
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /v0\.dev/i.test(s))) {
            evidence.push("Script loaded from v0.dev");
            return true;
          }
        },
        () => {
          const urls = networkUrls();
          if (urls.some((u) => /v0\.dev/i.test(u))) {
            evidence.push("Network call to v0.dev");
            return true;
          }
        },
      ],
    },
    {
      id: "replit",
      name: "Replit",
      checks: [
        () => {
          const host = window.location.hostname.toLowerCase();
          if (/replit\.(com|app|co)/.test(host)) {
            evidence.push("Hosted on replit.com");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.REPL_ID !== "undefined")) {
            evidence.push("window.REPL_ID global found");
            return true;
          }
        },
        () => {
          const urls = networkUrls();
          if (urls.some((u) => /replit\.com/i.test(u))) {
            evidence.push("Network call to replit.com");
            return true;
          }
        },
      ],
    },
    {
      id: "bubble",
      name: "Bubble",
      checks: [
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /bubble\.io/i.test(s))) {
            evidence.push("Script loaded from bubble.io");
            return true;
          }
        },
        () => {
          const urls = networkUrls();
          if (urls.some((u) => /bubble\.io/i.test(u))) {
            evidence.push("Network call to bubble.io");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.bubble !== "undefined" && window.bubble)) {
            evidence.push("window.bubble global found");
            return true;
          }
        },
      ],
    },
    {
      id: "webflow",
      name: "Webflow",
      checks: [
        () => {
          if (/webflow/i.test(metaGenerator())) {
            evidence.push("meta[generator] = Webflow");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.Webflow !== "undefined")) {
            evidence.push("window.Webflow global found");
            return true;
          }
        },
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /webflow\.com/i.test(s))) {
            evidence.push("Script loaded from webflow.com");
            return true;
          }
        },
      ],
    },
    {
      id: "framer",
      name: "Framer",
      checks: [
        () => {
          if (/framer/i.test(metaGenerator())) {
            evidence.push("meta[generator] = Framer");
            return true;
          }
        },
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /framercanvas\.com|framer\.com\/m\//i.test(s))) {
            evidence.push("Script loaded from Framer CDN");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.FramerEvents !== "undefined")) {
            evidence.push("window.FramerEvents global found");
            return true;
          }
        },
      ],
    },
    {
      id: "glide",
      name: "Glide",
      checks: [
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /glideapps\.com/i.test(s))) {
            evidence.push("Script loaded from glideapps.com");
            return true;
          }
        },
        () => {
          const urls = networkUrls();
          if (urls.some((u) => /glideapps\.com|glide-prod\.appspot\.com/i.test(u))) {
            evidence.push("Network call to Glide backend");
            return true;
          }
        },
      ],
    },
    {
      id: "wix",
      name: "Wix (regular site)",
      checks: [
        () => {
          if (/wix\.com/i.test(metaGenerator())) {
            evidence.push("meta[generator] = Wix");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.wixBiSession !== "undefined")) {
            evidence.push("window.wixBiSession global found");
            return true;
          }
        },
        () => {
          const srcs = scriptSrcs();
          if (srcs.some((s) => /parastorage\.com|static\.wix\.com/i.test(s))) {
            evidence.push("Script loaded from Wix CDN");
            return true;
          }
        },
      ],
    },
    {
      id: "squarespace",
      name: "Squarespace",
      checks: [
        () => {
          if (/squarespace/i.test(metaGenerator())) {
            evidence.push("meta[generator] = Squarespace");
            return true;
          }
        },
        () => {
          if (safeCheck(() => typeof window.Static !== "undefined" && window.Static && window.Static.SQUARESPACE_CONTEXT)) {
            evidence.push("window.Static.SQUARESPACE_CONTEXT found");
            return true;
          }
        },
      ],
    },
  ];

  for (const platform of PLATFORMS) {
    const prevEvidenceLen = evidence.length;
    const hit = platform.checks.some((check) => safeCheck(check));
    if (hit) {
      detectedPlatform = platform.name;
      break;
    }
    if (evidence.length > prevEvidenceLen) evidence.length = prevEvidenceLen;
  }

  chrome.runtime.sendMessage({
    type: "PLATFORM_FINDINGS",
    platform: detectedPlatform,
    evidence: evidence,
  });
})();
