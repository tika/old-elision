type Flashcard = {
  definition: string;
  term: string;
};

type Topic = {
  title: string;
  cards: Flashcard[];
};
