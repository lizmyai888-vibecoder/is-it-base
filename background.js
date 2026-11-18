const tabData = {};

function resetTab(tabId) {
  tabData[tabId] = { platform: null, evidence: [], scanned: false };
}

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabData[tabId];
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    resetTab(tabId);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_TAB_DATA") {
    sendResponse(tabData[message.tabId] || { platform: null, evidence: [], scanned: false });
    return true;
  }

  if (message.type === "PLATFORM_FINDINGS") {
    const tabId = sender.tab?.id;
    if (tabId == null) return;
    if (!tabData[tabId]) resetTab(tabId);

    tabData[tabId].platform = message.platform;
    tabData[tabId].scanned = true;

    for (const item of message.evidence || []) {
      if (!tabData[tabId].evidence.includes(item)) {
        tabData[tabId].evidence.push(item);
      }
    }

    sendResponse({ ok: true });
    return true;
  }
});
