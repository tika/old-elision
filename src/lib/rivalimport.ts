// import topics from other sites

// assuming in format:
// TAB between definitions
// New line between rows
export function loadExternalTopic(title: string, cardData: string): Topic {
  const ourCards: Flashcard[] = [];

  const cards = cardData.split("\n");

  for (let i = 0; i < cards.length; i++) {
    const parts = cards[i].split("\t");

    ourCards.push({
      front: parts[0],
      back: parts[1],
    });
  }

  return { title, cards: ourCards };
}
