export function getBlankCard(): Flashcard {
  return {
    front: "",
    back: "",
  };
}

export function isBlankCard(card: Flashcard | null): boolean {
  return card?.front === "" && card?.back === "";
}
