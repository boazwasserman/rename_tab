chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'renameTab') {
    document.title = request.title;
    chrome.runtime.sendMessage({ request: "getTabId" }, response => {
        const tabId = response.tabId;
        localStorage.setItem('customTitle_' + tabId, request.title); // Save title to local storage
      });
  }
});

function setTabName() {
    chrome.runtime.sendMessage({ request: "getTabId" }, response => {
        const tabId = response.tabId;
        const customTitle = localStorage.getItem('customTitle_' + tabId);
        if (customTitle) {
            document.title = customTitle;
        }
      });
}

// Retrieve and set title on load
window.addEventListener('load', () => {
    // Access the tab ID from the global window object set by background.js
    setTabName();
    setInterval(setTabName, 5000);
});
