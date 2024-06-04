document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rename').addEventListener('click', () => {
      const newTitle = document.getElementById('title').value;
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'renameTab', title: newTitle, tab_id: tabs[0].id}, (response) => {
        });
      });
    });
  });
  