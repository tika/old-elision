import styles from "../styles/elisioninput.module.css";
import Latex from "react-latex";
import { useEffect, useRef, useState } from "react";
import { getValFormatted } from "@/lib/contenteditableutils";

export function FormattedInput() {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("test");

  const editableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editableDiv = editableDivRef.current;

    function handlePaste(event: ClipboardEvent) {
      if (!event.clipboardData) {
        return;
      }

      event.preventDefault();
      const text = event.clipboardData.getData("text/plain");

      // Insert the plain text from the clipboard at the current cursor position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    }

    if (editableDiv) {
      editableDiv.addEventListener("paste", handlePaste);
    }

    return () => {
      if (editableDiv) {
        editableDiv.removeEventListener("paste", handlePaste);
      }
    };
  }, [editableDivRef]);

  // when unfocused, change back to div
  return (
    <div>
      <div
        className={
          "top-0 border rounded py-2 px-4 " +
          (editing
            ? "opacity-100"
            : "opacity-0 pointer-events-none absolute top-0 left-0 -z-50")
        }
        contentEditable
        onFocus={() => setEditing(true)}
        onBlur={(e) => {
          setValue(getValFormatted(e.currentTarget.childNodes));
          console.log(getValFormatted(e.currentTarget.childNodes));
          setEditing(false);
        }}
        ref={editableDivRef}
      ></div>
      <div
        className={
          "top-0 py-2 px-4 border min-h-fit " + (editing ? "hidden" : "")
        }
        onClick={() => {
          if (editableDivRef.current) {
            editableDivRef.current.focus();
            setTimeout(function () {
              const sel = window.getSelection();

              if (!editableDivRef.current || !sel) return;

              const range = document.createRange();

              const lastChild = editableDivRef.current.lastChild;

              if (!lastChild || !lastChild.textContent) return;

              const lastCharacterOffset = lastChild.textContent.length;

              range.setStart(lastChild, lastCharacterOffset);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            }, 0);
          }
        }}
      >
        <Latex>{value}</Latex>
      </div>
    </div>
  );
}

export function Input(props: {
  placeholder?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <span className="font-black text-lg">{props.label}</span>
      <br />
      <input
        placeholder={props.placeholder}
        className="w-full"
        value={props.value}
        onChange={(evt) => props.onChange(evt.target.value)}
      />
    </div>
  );
}

export function EditableInlineInput(props: {
  state?: [string, (value: string) => void];
  className?: string;
}) {
  return (
    <span
      contentEditable
      className={styles.editableinlineinput + " " + props.className}
    >
      {props.state ? props.state[0] : ""}
    </span>
  );
}
