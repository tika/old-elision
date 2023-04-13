import { Action } from "@/components/action";
import { app } from "@/lib/firebase";
import { doc, getFirestore } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";

const db = getFirestore(app);

export default function TopicPage() {
  // access the topic id from the url
  const router = useRouter();
  const topicId = router.query.topicId as string;

  // get topic from firestore using id collection
  const [topic, loading, error] = useDocumentData(
    doc(db, "topics", "xJ6uoQW1FoQ6DNVANzeW")
  );

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
