import { Button } from "@/components/button";
import { EditableInline } from "@/components/editablefield";
import { Navigation } from "@/components/navigation";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { CreateCard } from "@/components/createcard";

const auth = getAuth(app);
const db = getFirestore(app);

export default function Create() {
  const [user, loading, error] = useAuthState(auth);
  const title = useState("");
  const [cards, setCards] = useState<Flashcard[]>([
    { definition: "", term: "" },
  ]);
  const router = useRouter();

  async function createTopic() {
    if (!user) return;

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

  // If the user wants to add a new flashcard, we add a new card to the array
  function addBlankCard() {
    // ensure that there are current no blank cards
    if (cards.some((card) => card.term === "" || card.definition === "")) {
      return;
    }

    setCards([...cards, { term: "", definition: "" }]);
  }

  return (
    <div className="px-48">
      <Navigation user={user} />

      <EditableInline
        label="Topic Title"
        tagName="span"
        state={title}
        className="text-5xl font-black h-24"
        dataContent="hello"
      />

      <div className="border-solid mb-10 flex flex-col gap-2">
        {cards.map((card, index) => (
          <CreateCard
            key={index}
            term={card.term}
            definition={card.definition}
            onChange={(card) => {
              const newCards = [...cards];
              newCards[index] = card;
              setCards(newCards);
            }}
          />
        ))}
      </div>

      <Button onClick={addBlankCard}>Add new card</Button>

      <Button onClick={createTopic}>Create Topic</Button>
    </div>
  );
}
