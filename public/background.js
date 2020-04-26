// eslint-disable-next-line
chrome.tabs.onUpdated.addListener(function () {
  // eslint-disable-next-line
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    if (activeTab) {
      // eslint-disable-next-line
      chrome.tabs.sendMessage(activeTab.id, {activeTabId: activeTab.id});
    }
  });
});
