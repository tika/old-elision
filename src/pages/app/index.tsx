import { Avatar } from "@/components/avatar";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/button";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [topics, y, z] = useCollection(
    query(collection(db, "topics"), where("uid", "==", user?.uid))
  );
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

  if (!topics) {
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
      <h1>Good evening, {user.displayName}!</h1>
      <div className="py-8"></div>
      <h2>Your topics</h2>
      {topics.docs.map((it) => (
        <h1 key={it.id}>{it.data().title}</h1>
      ))}
      <div>
        <Button href="/app/create" icon={<PlusIcon width={20} height={20} />}>
          Create Topic
        </Button>
      </div>
    </div>
  );
}
