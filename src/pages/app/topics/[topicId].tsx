import { app } from "@/lib/firebase";
import { doc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";

const db = getFirestore(app);

export default function TopicPage() {
  // access the topic id from the url
  const router = useRouter();
  const topicId = router.query.topicId as string;

  // get topic from firestore using id collection
  const [topic, loading, error] = useDocumentData(
    doc(db, "topics", "xJ6uoQW1FoQ6DNVANzeW"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log(loading, error);

  if (!topic) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>Topic {topicId}</h1>
      <h1>{topic.cards[0].definition}</h1>
    </div>
  );
}
