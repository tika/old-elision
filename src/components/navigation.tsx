import Image from "next/image";
import { Avatar } from "./avatar";
import { Auth, User, signOut } from "firebase/auth";
import Link from "next/link";
import { Button } from "./button";

interface NavigationProps {
  user: User;
  auth: Auth;
}

export function Navigation(props: NavigationProps) {
  const avatar = props.user && {
    url: props.user.photoURL,
    name: props.user.displayName,
  };

  return (
    <nav className="flex justify-between py-16">
      <Link href="/app">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </Link>
      <div className="flex items-center">
        {/* <Avatar size={48} /> */}
        <Button onClick={() => signOut(props.auth)}>Sign out</Button>
      </div>
    </nav>
  );
}
