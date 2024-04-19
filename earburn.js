function checkLinksForWebmention(list) {
  for (let i=0;i<list.length;i++) {
    const rels = list[i].relList;

    if (rels.contains('webmention')) {
      return true;
    }
  }

  return false;
}

function toggleIconOnWebmention() {
  const inHead = document.head.querySelectorAll('link[rel]');
  const inBody = document.body.querySelectorAll('link[rel]');

  if (checkLinksForWebmention(inHead) || checkLinksForWebmention(inBody)) {
    browser.runtime.sendMessage({ action: 'turnOn' });
  } else {
    browser.runtime.sendMessage({ action: 'turnOff' });
  }
}

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  if (message.triggerAction) {
    toggleIconOnWebmention();
  } else if (message.action === 'h-card') {
    const hCards = document.body.getElementsByClassName('h-card');
    reply(hCards[0].outerHTML);
  }
});

toggleIconOnWebmention();
