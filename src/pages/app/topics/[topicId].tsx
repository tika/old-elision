import { Action } from "@/components/action";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
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
          <title>Elision | Loading...</title>
        </Head>
        Loading
      </main>
    );
  }

  return (
    <main>
      <Head>
        <title>Elision | {topic.title}</title>
      </Head>
      <div>
        <Action cards={topic.cards} />
      </div>
    </main>
  );
}
