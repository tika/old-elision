import { Avatar } from "@/components/avatar";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getFirestore, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { ElisionInput } from "@/components/elisioninput";

const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [chats, y, z] = useCollection(query(collection(db, "chats")));

  const router = useRouter();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (!user) {
    router.push("/");

    return <div>Not signed in</div>;
  }

  if (!chats) {
    return;
  }

  return (
    <div className="px-48">
      <nav className="flex justify-between py-16">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <div className="flex items-center">
          <Avatar url={user.photoURL!} name={user.displayName!} size={48} />
        </div>
      </nav>
      <h1>Hi, {user.displayName}!</h1>
      <div className="py-8"></div>

      <div>
        <ElisionInput></ElisionInput>
      </div>
    </div>
  );
}
