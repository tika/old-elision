import { User } from "firebase/auth";
import { Avatar } from "./avatar";

export type UserDisplayProps = {
  user: ElisionUser;
  size?: number;
  reversed?: boolean;
  children?: React.ReactNode;
};

export function UserDisplay(props: UserDisplayProps) {
  return (
    <div
      className={
        "flex items-center gap-2 font-medium" +
        (props.reversed ? " flex-row-reverse text-right" : "")
      }
    >
      <Avatar user={props.user} size={props.size} />
      <div>
        <h1>{props.user.username}</h1>
        {props.children}
      </div>
    </div>
  );
}
