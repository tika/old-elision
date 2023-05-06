type Flashcard = {
  definition: string;
  term: string;
};

type Topic = {
  title: string;
  cards: Flashcard[];
};

// Extra information stored in the DB
type Userdata = {
  username: string;
};

type ElisionUser = {
  id: string;
  username: string;
  avatarURL: string | null;
};
