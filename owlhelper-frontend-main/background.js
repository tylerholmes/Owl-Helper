// When the browser-action button is clicked...
chrome.action.onClicked.addListener(function (tab) {
  // ...check the URL of the active tab against our pattern and...
  // ...if it matches, send a message specifying a callback too
  chrome.tabs.sendMessage(tab.id, { text: 'report_back' });
  console.log(tab);
});