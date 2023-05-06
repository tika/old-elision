import Image from "next/image";
import { Auth } from "firebase/auth";
import Link from "next/link";
import { UserDisplay } from "./userdisplay";
import { useState } from "react";
import { UserMenu } from "./usermenu";

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
          <UserDisplay
            reversed
            user={props.user}
            size={48}
            onClick={() => setUserMenuOpened(!userMenuOpened)}
            className="z-20 hover:bg-neutral-100 py-1 pl-8 cursor-pointer pr-1 rounded-full"
          >
            <h1 className="font-light">3,800 ✿</h1>
          </UserDisplay>
          {userMenuOpened && (
            <div className="absolute bg-white border w-60 p-4 max-h-64 overflow-auto rounded top-32 right-0 z-30">
              <UserMenu user={props.user} auth={props.auth} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
