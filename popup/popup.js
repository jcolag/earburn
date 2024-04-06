function updateHCard(html) {
  const c = document.getElementById('h-card');
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.getElementsByTagName('img');
  let card = doc.body.firstChild;

  if (!html) {
    card = 'No h-card found.';
  }

  card.style = null;
  c.replaceChildren(card);
}
