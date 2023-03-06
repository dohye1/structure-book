import { GithubAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import firebase from "@/config/firebase-config";

export const githubProvider = new GithubAuthProvider();

export default function useLogin() {
  const provider = new GithubAuthProvider();

  const githubLogin = async () => {
    try {
      const result = await signInWithPopup(getAuth(firebase), provider);
      if (result) {
        console.log(result.user);
      }
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      if (errorCode === "auth/account-exists-with-different-credential") {
        alert("You have signed up with a different provider for that email.");
        // Handle linking here if your app allows it.
      } else {
        console.error(error);
      }
    }
  };

  return { githubLogin };
}
