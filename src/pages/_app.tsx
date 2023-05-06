import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Raleway } from "@next/font/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Navigation } from "@/components/navigation";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import { convertElisionUser } from "@/lib/auth";

const font = Raleway({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const auth = getAuth(app);
const db = getFirestore(app);

export default function App({ Component, pageProps }: AppProps) {
  // get user from firebase auth
  const [user, loading, error] = useAuthState(auth);
  const [userdata] = useDocumentData(doc(db, "userdata/" + user?.uid));

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <main className={font.className + " px-48 min-h-screen"}>
      <Toaster
        toastOptions={{
          position: "bottom-right",
        }}
      />
      {user && userdata && (
        <Navigation auth={auth} user={convertElisionUser(user, userdata)} />
      )}
      <Component {...pageProps} />
    </main>
  );
}
