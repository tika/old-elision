import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getFirestore, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Button } from "@/components/button";
import Head from "next/head";
import { TopicListView } from "@/components/topiclistview";

const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [topics] = useCollection(query(collection(db, "topics")));

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
    <main>
      <Head>
        <title>Elision | Homepage</title>
      </Head>
      <div>
        <div>
          <h1 className="text-2xl">Your Topics</h1>
          <div className="py-8 flex flex-col gap-2">
            {topics.docs.map((it) => {
              const topic = it.data() as Topic;
              return <TopicListView topic={topic} key={it.id} id={it.id} />;
            })}
          </div>
          <Button onClick={() => router.push("/app/create")}>
            Create New Topic
          </Button>
        </div>
      </div>
    </main>
  );
}
