import { useState } from "react";
import { Button } from "./button";

export function Action(props: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (props.cards.length < 1) {
    return null;
  }

  const card = props.cards[index];

  function next() {
    setIndex((index + 1) % props.cards.length);
  }

  function previous() {
    setIndex((index - 1 + props.cards.length) % props.cards.length);
  }

  return (
    <div className="relative">
      <div>
        <div className="flex justify-center pb-10">
          <h1>{card.front}</h1>
        </div>

        {flipped && (
          <div>
            <hr />
            <h1 className="pt-10 flex justify-center">{card.back}</h1>
          </div>
        )}
      </div>

      <div className="absolute -bottom-16 w-full">
        <div className="flex gap-2 justify-center">
          <Button onClick={previous}>Previous</Button>
          <Button onClick={() => setFlipped(!flipped)}>Reveal</Button>
          <Button onClick={next}>Next</Button>
        </div>
      </div>
    </div>
  );
}
