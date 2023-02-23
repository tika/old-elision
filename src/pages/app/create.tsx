import { Button } from "@/components/button";
import { EditableInline } from "@/components/editablefield";
import { Navigation } from "@/components/navigation";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(app);
const db = getFirestore(app);

export default function Create() {
  const [user, loading, error] = useAuthState(auth);
  const title = useState("");
  const [terms, setTerms] = useState([]);
  const router = useRouter();

  async function createTopic() {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "topics"), {
        title: title[0],
        terms,
        uid: user.uid,
      });

      console.log("Document written with ID: ", docRef.id);

      // redirect
      router.push("/app");
    } catch (e) {
      console.log("Error");
    }
  }

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

  return (
    <div className="px-48">
      <Navigation user={user} />

      <EditableInline
        tagName="span"
        state={title}
        className="text-5xl font-black h-24"
        dataContent="hello"
      />

      <div className="flex flex-col mt-16">
        <span className="font-black text-lg">Term</span>
        <input placeholder="What is d/dy of x"></input>
        <br />
        <span className="font-black text-lg">Definition</span>
        <input placeholder="1"></input>
        <Button onClick={createTopic}>Create Topic</Button>
      </div>
    </div>
  );
}
