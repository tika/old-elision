import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Raleway } from "@next/font/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Navigation } from "@/components/navigation";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        toastOptions={{
          position: "bottom-right",
        }}
      />
      <Navigation user={user} />
      <Component {...pageProps} />
    </main>
  );
}
