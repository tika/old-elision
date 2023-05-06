import Image from "next/image";
import { Avatar } from "./avatar";
import { Auth, User, signOut } from "firebase/auth";
import Link from "next/link";
import { Button } from "./button";
import { UserDisplay } from "./userdisplay";
import { useState } from "react";

interface NavigationProps {
  user: ElisionUser;
  auth: Auth;
}

export function Navigation(props: NavigationProps) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <>
      {userMenuOpened && (
        <div
          className="absolute h-screen w-screen left-0 top-0 z-10"
          onClick={() => setUserMenuOpened(false)}
        ></div>
      )}
      <nav className="flex justify-between py-16 items-center relative">
        <Link href="/app">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-10">
          <Button onClick={() => signOut(props.auth)}>Sign out</Button>

          <UserDisplay
            reversed
            user={props.user}
            size={48}
            onClick={() => setUserMenuOpened(!userMenuOpened)}
            className="z-20"
          >
            <h1 className="font-light">3,800 ✿</h1>
          </UserDisplay>
          {userMenuOpened && (
            <div className="absolute bg-white border w-60 p-4 max-h-64 overflow-auto rounded top-32 right-0 z-30">
              Hello world
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
