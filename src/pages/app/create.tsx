import { Button } from "@/components/button";
import { EditableInline } from "@/components/editablefield";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import Head from "next/head";
import { EditCardModal } from "@/components/editcardmodal";
import { getBlankCard } from "@/lib/cardutils";
import Latex from "react-latex";
import {
  loadAutosavedTopic,
  removeAutosavedTopic,
  saveAutosavedTopic,
} from "@/lib/browserstorage";

const auth = getAuth(app);
const db = getFirestore(app);

export default function Create() {
  const [user, loading, error] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [cardEditorOpen, setCardEditorOpen] = useState<Flashcard | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedTopic = loadAutosavedTopic();
    if (!savedTopic || title || cards.length > 0) return;

    setTitle(savedTopic.title);
    setCards(savedTopic.cards);
  }, [title, cards]);

  // autosave
  useEffect(() => {
    if (!title || cards.length === 0) return;

    saveAutosavedTopic({
      title,
      cards,
    });
  }, [title, cards]);

  async function createTopic() {
    if (!user) return;

    if (!title[0] || title[0].length < 3) {
      return toast.error("Topics need titles");
    }

    if (cards.length < 2) {
      return toast.error("A topic needs at least 2 cards");
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
    return (
      <main>
        <Head>
          <title>Loading...| Elision</title>
        </Head>
        <div>Loading</div>
      </main>
    );
  }

  if (!user) {
    router.push("/");

    return <div>Not signed in</div>;
  }

  return (
    <div>
      <Head>
        <title>Create Topic | Elision</title>
      </Head>

      <EditCardModal
        setIsOpen={(val) =>
          setCardEditorOpen(val === false ? null : getBlankCard())
        }
        card={cardEditorOpen}
        className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-25 z-50"
        topic={title[0]}
        onCardUpdate={(newCard) => {
          if (cardEditorOpen === getBlankCard()) {
            setCards([...cards, newCard]);
          } else {
            const cardsFiltered = cards.filter((it) => it !== cardEditorOpen);

            setCards([...cardsFiltered, newCard]);
          }
        }}
      />

      <div className={`${cardEditorOpen ? "blur-sm" : ""}`}>
        <EditableInline
          label="Topic Title"
          tagName="span"
          state={[title, setTitle]}
          className="text-5xl font-black p-2 cursor-text mb-6"
          dataContent="Topic title"
        />

        <div className="flex gap-2">
          <Button onClick={() => setCardEditorOpen(getBlankCard())}>
            Add new card
          </Button>
          <Button onClick={createTopic}>Create Topic</Button>

          <Button
            onClick={() => {
              removeAutosavedTopic();
              setTitle("");
              setCards([]);
            }}
          >
            Clear Topic
          </Button>
        </div>

        <hr className="my-5" />

        <h1 className="font-bold text-lg">Your cards</h1>

        <div className="border-solid mb-10 flex gap-y-2 justify-between flex-wrap">
          {cards.map((card, index) => (
            <div
              key={index}
              style={{ width: "33%" }}
              onClick={() => setCardEditorOpen(card)}
              className="border rounded p-4 cursor-pointer"
            >
              <Latex>{card.front}</Latex>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
