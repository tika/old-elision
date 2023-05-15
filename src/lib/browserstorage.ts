// localstorage
const autosaveTopicKey = "autosave-topic";

function isTopic(item: any): item is Topic {
  const keys = Object.keys(item);

  console.log(keys);

  if (!keys.includes("title") || !keys.includes("cards")) {
    return false;
  }

  return true;
}

function resetAutosavedTopic() {
  localStorage.removeItem(autosaveTopicKey);
}

export function loadAutosavedTopic(): Topic | null {
  const item = localStorage.getItem(autosaveTopicKey);
  if (!item) return null;

  const topic = JSON.parse(item);

  // if (!isTopic(topic)) {
  //   resetAutosavedTopic();
  //   return null;
  // }

  return topic;
}

export function saveAutosavedTopic(topic: Topic) {
  localStorage.setItem(autosaveTopicKey, JSON.stringify(topic));
}

export function removeAutosavedTopic() {
  localStorage.removeItem(autosaveTopicKey);
}
