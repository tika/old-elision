import { User } from "firebase/auth";
import { Avatar } from "./avatar";

export type UserDisplayProps = {
  user: ElisionUser;
  size?: number;
  reversed?: boolean;
  children?: React.ReactNode;
  onClick?(): void;
  className?: string;
};

export function UserDisplay(props: UserDisplayProps) {
  return (
    <div
      className={
        props.className +
        " flex items-center gap-4 font-medium" +
        (props.reversed ? " flex-row-reverse text-right" : "")
      }
      onClick={props.onClick}
    >
      <Avatar user={props.user} size={props.size} />
      <div>
        <h1>{props.user.username}</h1>
        {props.children}
      </div>
    </div>
  );
}
