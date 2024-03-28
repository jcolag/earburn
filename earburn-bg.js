browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'turnOn') {
    browser.browserAction.setIcon({
      path: {
        48: 'icons/burn-48.png',
        96: 'icons/burn-96.png',
      }
    });
  } else if (message.action === 'turnOff') {
    browser.browserAction.setIcon({
      path: {
        48: 'icons/ear-48.png',
        96: 'icons/ear-96.png',
      }
    });
  }
});
