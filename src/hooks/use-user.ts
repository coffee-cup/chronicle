import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { useRouter } from "next/router";

const useUser = (
  options: { authRequired: boolean } = {
    authRequired: false,
  },
) => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const router = useRouter();

  const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const logout = () => firebase.auth().signOut();

  const createAccount = (email: string, password: string) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  if (options && options.authRequired && user == null && !initialising) {
    router.push("/login");
  }

  return {
    user,
    initialising,
    error,
    login,
    createAccount,
    logout,
  };
};

export default useUser;
