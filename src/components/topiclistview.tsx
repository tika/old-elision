import Link from "next/link";

export function TopicListView(props: { topic: Topic; id: string }) {
  return (
    <Link href={"/app/topics/" + props.id}>
      <div className="border py-8 px-8 rounded-lg">
        <h1>{props.topic.title}</h1>
        <span>{props.topic.cards.length} cards</span>
      </div>
    </Link>
  );
}
