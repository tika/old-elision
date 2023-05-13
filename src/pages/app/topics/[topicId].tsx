import { Action } from "@/components/action";
import { Button } from "@/components/button";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export default function TopicPage() {
  const [user, userLoading, userError] = useAuthState(auth);

  // access the topic id from the url
  const router = useRouter();
  const topicId = router.query.topicId as string;

  // get topic from firestore using id collection
  const [topic, loading, error] = useDocumentData(doc(db, "topics", topicId));

  if (userError) {
    return (
      <div>
        <p>Error: {userError.message}</p>
      </div>
    );
  }

  if (userLoading) {
    return <div>Loading</div>;
  }

  if (!user) {
    router.push("/");

    return <div>Not signed in</div>;
  }

  if (!topic || loading) {
    return (
      <main>
        <Head>
          <title>Loading...| Elision</title>
        </Head>
        Loading
      </main>
    );
  }

  async function deleteTopic() {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "topics/" + topicId));

      // redirect
      router.push("/app");
    } catch (e) {
      console.log("Error");
    }
  }

  return (
    <main>
      <Head>
        <title>{topic.title} | Elision</title>
      </Head>
      <div>
        <Action cards={topic.cards} />
        <Button className="bg-red-500" onClick={() => deleteTopic()}>
          Delete Topic
        </Button>
      </div>
    </main>
  );
}
