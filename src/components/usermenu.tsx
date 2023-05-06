import { Auth, signOut } from "firebase/auth";
import { UserDisplay } from "./userdisplay";

export function UserMenu(props: { auth: Auth; user: ElisionUser }) {
  return (
    <div>
      <div onClick={() => signOut(props.auth)}>Sign out</div>
    </div>
  );
}
