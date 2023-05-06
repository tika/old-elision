import { Button } from "@/components/button";
import { Input } from "@/components/elisioninput";
import { updateUsernameDB } from "@/lib/auth";
import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";

const auth = getAuth(app);
const db = getFirestore(app);

export default function Onboarding() {
  // This page will be visited every time someone logs in/signs up
  const [user, loading, error] = useAuthState(auth);
  const [userdata] = useDocumentData(doc(db, "userdata/" + user?.uid));
  const [username, setUsername] = useState("");
  const router = useRouter();

  if (!user) {
    router.push("/");

    return <div>Not signed in</div>;
  }

  if (userdata) {
    // check to see if username
    if (userdata.username) {
      router.push("/app");

      return <div>Onboarding complete</div>;
    }
  }

  function submit() {
    if (!user) return null;

    if (!username) {
      return toast.error("You must enter a username!");
    }
    if (username.length < 3) {
      return toast.error("You must use at least 3 letters!");
    }

    updateUsernameDB(db, user, username);
  }

  return (
    <div>
      <h1>Welcome to Elision!</h1>
      <Input
        label="Username"
        value={username}
        onChange={(val) => setUsername(val)}
        placeholder={user.displayName ?? "Firstname Surname"}
      />
      <Button onClick={submit}>Start using Elision</Button>
    </div>
  );
}
