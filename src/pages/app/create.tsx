import { Button } from "@/components/button";
import { EditableInline } from "@/components/editablefield";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import Head from "next/head";
import { CreateCardModal } from "@/components/createcardmodal";

const auth = getAuth(app);
const db = getFirestore(app);

export default function Create() {
  const [user, loading, error] = useAuthState(auth);
  const title = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [cardEditorOpen, setCardEditorOpen] = useState(false);
  const router = useRouter();

  async function createTopic() {
    if (!user) return;

    if (!title || title.length < 3) {
      return toast.error("Topics need titles");
    }

    try {
      const docRef = await addDoc(collection(db, "topics"), {
        title: title[0],
        cards,
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
    <div>
      <Head>
        <title>Elision | Create Topic</title>
      </Head>

      <CreateCardModal
        isOpen={cardEditorOpen}
        setIsOpen={(val) => setCardEditorOpen(val)}
        className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-25 z-50"
        topic={title[0]}
        addCard={(newCard) => setCards([...cards, newCard])}
      />

      <div className={`${cardEditorOpen ? "blur-sm" : ""}`}>
        <EditableInline
          label="Topic Title"
          tagName="span"
          state={title}
          className="text-5xl font-black p-2 cursor-text mb-6"
          dataContent="Topic title"
        />

        <div className="flex gap-2">
          <Button onClick={() => setCardEditorOpen(true)}>Add new card</Button>
          <Button onClick={createTopic}>Create Topic</Button>
        </div>

        <hr className="my-5" />

        <h1 className="font-bold text-lg">Your cards</h1>

        <div className="border-solid mb-10 flex gap-y-2 justify-between flex-wrap">
          {cards.map((card, index) => (
            <div
              key={index}
              className="border rounded p-4"
              style={{ width: "33%" }}
            >
              {card.front}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
