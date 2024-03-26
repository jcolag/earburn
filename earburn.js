function checkLinksForWebmention(list) {
  for (let i=0;i<list.length;i++) {
    const rels = list[i].relList;

    if (rels.contains('webmention')) {
      return true;
    }
  }

  return false;
}
