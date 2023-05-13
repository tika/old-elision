import { Dialog } from "@headlessui/react";
import { Button } from "./button";
import { FormattedInput } from "./elisioninput";
import { useState } from "react";
import Latex from "react-latex";

type CreateCardModalProps = {
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
  className: string;
  topic: string;
};

export function CreateCardModal(props: CreateCardModalProps) {
  const [previewFormatting, setPreviewFormatting] = useState(false);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      className={props.className}
    >
      <Dialog.Panel className="bg-white px-10 py-10 rounded w-2/5">
        <Dialog.Title className="text-3xl mb-10 flex justify-between">
          {props.topic ?? "Untitled Topic"} &gt; New Card
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
              <Latex>{cardFront}</Latex>
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
              <Latex>{cardBack}</Latex>
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
          <Button onClick={() => props.setIsOpen(false)}>
            Add card to topic
          </Button>
          <Button onClick={() => props.setIsOpen(false)}>Cancel</Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
