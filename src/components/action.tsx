import { useState } from "react";
import { Button } from "./button";

export function Action(props: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = props.cards[index];

  return (
    <div>
      <div className="flex justify-center pb-10">
        <h1>{card.term}</h1>
      </div>

      {flipped && (
        <div>
          <hr />
          <h1 className="pt-10 flex justify-center">{card.definition}</h1>
        </div>
      )}

      <Button onClick={() => setFlipped(!flipped)}>Flip</Button>
    </div>
  );
}
