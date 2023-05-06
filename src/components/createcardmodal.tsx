import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./button";
import { FormattedInput } from "./elisioninput";

type CreateCardModalProps = {
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
  className: string;
  topic: string;
};

export function CreateCardModal(props: CreateCardModalProps) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      className={props.className}
    >
      <Dialog.Panel className="bg-white px-10 py-10 rounded w-2/5">
        <Dialog.Title className="text-3xl mb-10">
          {props.topic ?? "Untitled Topic"} &gt; New Card
        </Dialog.Title>

        <div>
          <h1 className="font-medium text-lg">Front of Card</h1>
          <div className="mb-16">
            <FormattedInput />
          </div>

          <h1 className="font-medium text-lg">Back of Card</h1>
          <div>
            <FormattedInput />
          </div>
        </div>

        <div className="flex gap-2 mt-10">
          <Button onClick={() => props.setIsOpen(false)}>Deactivate</Button>
          <Button onClick={() => props.setIsOpen(false)}>Cancel</Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
