chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'turnOn') {
    chrome.action.setIcon({
      path: {
        48: 'icons/burn-48.png',
        96: 'icons/burn-96.png',
      }
    });
  } else if (message.action === 'turnOff') {
    chrome.action.setIcon({
      path: {
        48: 'icons/ear-48.png',
        96: 'icons/ear-96.png',
      }
    });
  }
});
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId)
    .then((tabId) =>
      chrome.tabs.sendMessage(activeInfo.tabId, {
        action: 'retry',
        triggerAction: true,
      })
    )
    .then((r) => {
      if (r) {
        console.log(r);
      }
    })
    .catch((e) => console.error(e));
});
