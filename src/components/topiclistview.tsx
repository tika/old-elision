export function TopicListView(props: { topic: Topic }) {
  return (
    <div className="border py-8 px-8 rounded-lg">
      <h1>{props.topic.title}</h1>
      <span>{props.topic.cards.length}</span>
    </div>
  );
}
