import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import styles from "../styles/editablefield.module.css";

export function EditableInline(props: {
  tagName: "h1" | "h2" | "h3" | "span";
  state: [string, (value: string) => void];
  onFinish?: (value: string) => void;
  className?: string;
  dataContent: string;
  label: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="font-black text-lg">{props.label}</label>
      <ContentEditable
        html={props.state[0]}
        onBlur={(evt) => props.onFinish && props.onFinish(evt.target.innerHTML)}
        onChange={(evt) => props.state[1](evt.target.value)}
        className={props.className + " " + styles.field}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            evt.currentTarget.blur();
          }
        }}
        tagName={props.tagName}
      />
    </div>
  );
}

export function EditableArea(props: {
  state: [string, (value: string) => void];
  onFinish?: (value: string) => void;
  className?: string;
}) {
  function onChange(evt: ContentEditableEvent) {
    const newVal = evt.target.value;

    // call set state
    props.state[1](newVal);
  }

  return (
    <ContentEditable
      html={props.state[0]}
      onBlur={(evt) => props.onFinish && props.onFinish(evt.target.innerHTML)}
      onChange={(evt) => onChange(evt)}
      tagName="pre"
      className={props.className + " "}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          document.execCommand("insertLineBreak");
          event.preventDefault();
        }
      }}
    />
  );
}
