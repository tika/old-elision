import Image from "next/image";
import { Avatar } from "./avatar";
import { User } from "firebase/auth";
import Link from "next/link";

interface NavigationProps {
  user: User;
}

export function Navigation(props: NavigationProps) {
  return (
    <nav className="flex justify-between py-16">
      <Link href="/app">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </Link>
      <div className="flex items-center">
        <Avatar
          url={props.user.photoURL!}
          name={props.user.displayName!}
          size={48}
        />
      </div>
    </nav>
  );
}
