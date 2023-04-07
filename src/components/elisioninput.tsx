import { useKeyPress } from "@/hooks/usekeypress";
import styles from "../styles/elisioninput.module.css";

export function ElisionInput() {
  const isO = useKeyPress("Enter", "Control");

  return <div contentEditable className={styles.main}></div>;
}
