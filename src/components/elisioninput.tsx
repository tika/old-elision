import { useKeyPress } from "@/hooks/usekeypress";
import styles from "../styles/elisioninput.module.css";

export function FullInput() {
  const isO = useKeyPress("Enter", "Control");

  return <div contentEditable className={styles.main}></div>;
}

export function Input(props: {
  // state?: [string, (value: string) => void];
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
