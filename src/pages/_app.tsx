import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Raleway } from "@next/font/google";
import Image from "next/image";
import { Avatar } from "@/components/avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import Link from "next/link";

const font = Raleway({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const auth = getAuth(app);

export default function App({ Component, pageProps }: AppProps) {
  // get user from firebase auth
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!user) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }

  return (
    <main className={font.className + " px-48 min-h-screen"}>
      <nav className="flex justify-between py-16">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>

        <div className="flex items-center">
          <Avatar url={user.photoURL!} name={user.displayName!} size={48} />
        </div>
      </nav>
      <Component {...pageProps} />
    </main>
  );
}
