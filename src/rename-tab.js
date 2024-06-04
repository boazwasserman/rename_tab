chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'renameTab') {
    document.title = request.title;
    chrome.runtime.sendMessage({ request: "getTabId" }, response => {
        const tabId = response.tabId;
        console.log("Found tab ID:", tabId);
        localStorage.setItem('customTitle_' + tabId, request.title); // Save title to local storage
      });
    
    chrome.storage.sync.set({customTitle: request.title}, function() {
      sendResponse({status: 'title set'});
    });
  }
});

// Retrieve and set title on load
window.addEventListener('load', () => {
  
  console.log("load");

  // Access the tab ID from the global window object set by background.js
  chrome.runtime.sendMessage({ request: "getTabId" }, response => {
    const tabId = response.tabId;
    console.log("Loaded tab ID:", tabId);
    const customTitle = localStorage.getItem('customTitle_' + tabId);
    if (customTitle) {
        document.title = customTitle;
    }
  });
});
