import { getAuth } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { app } from "../lib/firebase";
import Link from "next/link";
import { useRouter } from "next/router";

const auth = getAuth(app);

export default function Landing() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [u, l, e] = useAuthState(auth);
  const router = useRouter();

  if (error || e) {
    return (
      <div>
        <p>Error: {error?.message || e?.message}</p>
      </div>
    );
  }

  if (loading || l) {
    return <p>Loading...</p>;
  }

  if (user || u) {
    router.push("/app/onboarding");

    return (
      <div>
        <Link href="/app/onboarding">Go to app</Link>
      </div>
    );
  }

  return (
    <div className="p-64">
      <h1 className="text-3xl font-bold underline">Elision</h1>

      <div>[flashcards for stem]</div>

      <div className="py-4"></div>

      <button
        className="bg-fuchsia-500 px-4 py-1 rounded text-white "
        onClick={() => signInWithGoogle()}
      >
        Login with Google
      </button>
    </div>
  );
}
