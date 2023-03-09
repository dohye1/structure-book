import { GithubAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import firebase from "@/config/firebase-config";
import userStore from "@/store/userStore";

export const githubProvider = new GithubAuthProvider();

export default function useLogin() {
  const provider = new GithubAuthProvider();
  const login = userStore((state) => state.login);
  const logout = userStore((state) => state.logout);

  const githubLogin = async () => {
    try {
      const result = await signInWithPopup(getAuth(firebase), provider);
      if (result) {
        const { uid, displayName, email, photoURL } = result.user;
        if (!email) {
          throw new Error("email is necessary field");
        }
        const newUser: User = {
          id: uid,
          displayName,
          email,
          photoURL,
        };
        login(newUser);
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

  return { githubLogin, logout };
}
