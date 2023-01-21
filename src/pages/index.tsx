import { Inter } from "@next/font/google";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { app } from "../lib/firebase";

const inter = Inter({ subsets: ["latin"] });
const auth = getAuth(app);

export default function Home() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.user.email}</p>
      </div>
    );
  }

  return (
    <div className="p-64">
      <h1 className="text-3xl font-bold underline">Elision</h1>

      <div>[leaving something out? nah no way.]</div>

      <div className="py-4"></div>

      <button
        className="bg-fuchsia-500 px-4 py-1 rounded text-white"
        onClick={() => signInWithGoogle()}
      >
        Login with Google
      </button>

      {/* <Link
        href="/demo"
        className="bg-fuchsia-500 px-4 py-1 rounded text-white"
      >
        Get Started
      </Link> */}
    </div>
  );
}
