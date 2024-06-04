chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
if (message.request === "getTabId") {
    sendResponse({ tabId: sender.tab.id });
}
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "rename_tab") {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;
        
        chrome.scripting.executeScript({
          target: {tabId: tabId},
          func: () => {
            const newTitle = prompt("Enter a new tab title:");
            return newTitle;
          }
        }, (results) => {
          if (results && results[0] && results[0].result) {
            const newTitle = results[0].result;
            chrome.scripting.executeScript({
              target: {tabId: tabId},
              func: (title, tabId) => {
                document.title = title;
                localStorage.setItem('customTitle_' + tabId, title);
              },
              args: [newTitle, tabId]
            });
          }
        });
      });
    }
  });
  