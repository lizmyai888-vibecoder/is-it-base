let currentTabId = null;

async function injectAndScan() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return render({ platform: null, evidence: [], scanned: false });

  currentTabId = tab.id;

  const urlBar = document.getElementById("url-bar");
  if (urlBar) {
    try {
      urlBar.textContent = new URL(tab.url).hostname || tab.url;
    } catch {
      urlBar.textContent = tab.url || "";
    }
  }

  try {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
  } catch (_) {}

  setTimeout(async () => {
    const data = await chrome.runtime.sendMessage({ type: "GET_TAB_DATA", tabId: tab.id });
    render(data);
  }, 900);
}

function render(data) {
  const { platform, evidence = [], scanned = false } = data || {};
  const verdictEl = document.getElementById("verdict");
  const evidenceSection = document.getElementById("evidence-section");
  const evidenceList = document.getElementById("evidence-list");

  verdictEl.className = "verdict";
  verdictEl.innerHTML = "";

  if (!scanned) {
    verdictEl.classList.add("scanning");
    verdictEl.innerHTML = `
      <div class="spinner"></div>
      <div class="verdict-title">Scanning page…</div>
      <div class="verdict-sub">Running detection</div>`;
    return;
  }

  if (platform === "Base44") {
    verdictEl.classList.add("yes");
    verdictEl.innerHTML = `
      <span class="verdict-icon">🟠</span>
      <div class="verdict-title">YES! This is Base44</div>
      <div class="verdict-sub">Built with Base44</div>
      <span class="platform-pill">Base44</span>`;
  } else if (platform) {
    verdictEl.classList.add("matched");
    verdictEl.innerHTML = `
      <span class="verdict-icon">🔍</span>
      <div class="verdict-title">Not Base44</div>
      <div class="verdict-sub">Built on another platform</div>
      <span class="platform-pill">${platform}</span>`;
  } else {
    verdictEl.classList.add("no");
    verdictEl.innerHTML = `
      <span class="verdict-icon">❓</span>
      <div class="verdict-title">Not built on Base44</div>
      <div class="verdict-sub">No known vibe-coding platform detected</div>`;
  }

  evidenceList.innerHTML = "";
  if (evidence.length > 0) {
    for (const item of evidence) {
      const li = document.createElement("li");
      li.className = "evidence-item";
      li.innerHTML = `<span class="evidence-dot"></span><span>${item}</span>`;
      evidenceList.appendChild(li);
    }
    evidenceSection.style.display = "block";
  } else {
    evidenceSection.style.display = "none";
  }
}

document.getElementById("btn-rescan").addEventListener("click", async () => {
  if (currentTabId == null) return;
  const verdictEl = document.getElementById("verdict");
  verdictEl.className = "verdict scanning";
  verdictEl.innerHTML = `
    <div class="spinner"></div>
    <div class="verdict-title">Scanning page…</div>
    <div class="verdict-sub">Running detection</div>`;
  document.getElementById("evidence-section").style.display = "none";

  try {
    await chrome.scripting.executeScript({ target: { tabId: currentTabId }, files: ["content.js"] });
  } catch (_) {}

  setTimeout(async () => {
    const data = await chrome.runtime.sendMessage({ type: "GET_TAB_DATA", tabId: currentTabId });
    render(data);
  }, 900);

});

injectAndScan();
