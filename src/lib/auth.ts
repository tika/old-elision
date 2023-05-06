import { User } from "firebase/auth";
import { Firestore, doc, setDoc } from "firebase/firestore";

export async function updateUsernameDB(
  db: Firestore,
  user: User,
  username: string
) {
  if (!user) return;

  try {
    await setDoc(
      doc(db, "userdata/" + user.uid),
      {
        username,
      },
      { merge: true }
    );
  } catch (e) {
    console.log("Error");
  }
}

export function convertElisionUser(
  user: User,
  userdata: any // we can't control what firebase gives us back
): ElisionUser {
  return {
    id: user.uid,
    username: userdata.username,
    avatarURL: user.photoURL,
  };
}
