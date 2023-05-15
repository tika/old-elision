import { Dialog } from "@headlessui/react";
import { Button } from "./button";
import { useEffect, useState } from "react";
import Latex from "react-latex";
import { getBlankCard, isBlankCard } from "@/lib/cardutils";

type EditCardModalProps = {
  card: Flashcard | null;
  setIsOpen(isOpen: boolean): void;
  onCardUpdate(card: Flashcard): void;
  className: string;
  topic: string;
};

export function EditCardModal(props: EditCardModalProps) {
  const [previewFormatting, setPreviewFormatting] = useState(false);

  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  useEffect(() => {
    if (!props.card) return;

    setCardFront(props.card.front);
    setCardBack(props.card.back);
  }, [props.card]);

  function close() {
    props.setIsOpen(false);
  }

  return (
    <Dialog
      open={props.card !== null}
      onClose={() => close()}
      className={props.className}
    >
      <Dialog.Panel className="bg-white px-10 py-10 rounded w-2/5">
        <Dialog.Title className="text-3xl mb-10 flex justify-between">
          {props.topic ?? "Untitled Topic"} &gt;{" "}
          {isBlankCard(props.card) ? "New" : "Edit"} Card
          <Button onClick={() => setPreviewFormatting(!previewFormatting)}>
            <p className="text-base">
              Preview with{previewFormatting && "out"} Formatting
            </p>
          </Button>
        </Dialog.Title>

        <div>
          <h1 className="font-medium text-lg">Front of Card</h1>
          <div
            className={
              "mb-16 h-40 border rounded " +
              (previewFormatting && "cursor-not-allowed")
            }
          >
            {previewFormatting ? (
              <div>
                {cardFront.split("\n").map((it, i) => (
                  <>
                    <Latex key={i}>{it}</Latex>
                    <br key={it + " " + i}></br>
                  </>
                ))}
              </div>
            ) : (
              <textarea
                value={cardFront}
                onChange={(e) => setCardFront(e.target.value)}
                className="w-full resize-none h-full"
              >
                {cardFront}
              </textarea>
            )}
          </div>

          <h1 className="font-medium text-lg">Back of Card</h1>
          <div
            className={
              "mb-16 h-40 border rounded " +
              (previewFormatting && "cursor-not-allowed")
            }
          >
            {previewFormatting ? (
              <div>
                {cardBack.split("\n").map((it, i) => (
                  <>
                    <Latex key={i}>{it}</Latex>
                    <br key={it + " " + i}></br>
                  </>
                ))}
              </div>
            ) : (
              <textarea
                value={cardBack}
                onChange={(e) => setCardBack(e.target.value)}
                className="w-full resize-none h-full"
              >
                {cardBack}
              </textarea>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-10">
          <Button
            onClick={() => {
              props.onCardUpdate({
                front: cardFront,
                back: cardBack,
              });

              close();
            }}
          >
            {isBlankCard(props.card) ? "Create" : "Update"} card
          </Button>
          <Button onClick={() => close()}>Cancel</Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
