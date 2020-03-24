import firebase from "firebase";
import * as React from "react";

export type UserResult =
  | {
      loading: false;
      error: null;
      user: firebase.User;
    }
  | {
      loading: true;
      error: null;
      user: null;
    }
  | {
      loading: false;
      error: string;
      user: null;
    };

const useUser = () => {
  const [userResult, setUserResult] = React.useState<UserResult>({
    loading: true,
    error: null,
    user: null,
  });

  const onChange = (user: firebase.User) => {
    setUserResult({
      loading: false,
      error: null,
      user,
    });
  };

  const onError = (error: firebase.auth.Error) => {
    setUserResult({
      loading: false,
      error: error.message,
      user: null,
    });
  };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange, onError);
    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const logout = () => firebase.auth().signOut();

  const createAccount = (email: string, password: string) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  return {
    ...userResult,
    login,
    logout,
    createAccount,
  };
};

export default useUser;

// const useUser = (
//   options: { authRequired: boolean } = {
//     authRequired: false,
//   },
// ) => {
//   const [user, initialising, error] = useAuthState(firebase.auth());
//   const router = useRouter();

//   const login = (email: string, password: string) =>
//     firebase.auth().signInWithEmailAndPassword(email, password);

//   const logout = () => firebase.auth().signOut();

//   const createAccount = (email: string, password: string) =>
//     firebase.auth().createUserWithEmailAndPassword(email, password);

//   if (options && options.authRequired && user == null && !initialising) {
//     router.push("/login");
//   }

//   return {
//     user,
//     initialising,
//     error,
//     login,
//     createAccount,
//     logout,
//   };
// };

// export default useUser;
