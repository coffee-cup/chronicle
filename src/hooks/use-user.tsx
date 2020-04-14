import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";
import * as Sentry from "@sentry/node";
import { useRouter } from "next/router";
import { saveItem, getItem } from "../local";

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

type UserState = UserResult & {
  cameFromTwitter: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  createAccount: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>;
  loginWithTwitter: () => void;
};

const UserContext = React.createContext<UserState>({} as UserState);

export const useUser = (): UserState => React.useContext(UserContext);

const twitterKey = "@chronicle/twitter";

export const UserProvider: React.FC = props => {
  const router = useRouter();
  const [userResult, setUserResult] = React.useState<UserResult>({
    loading: true,
    error: null,
    user: null,
  });
  const [cameFromTwitter, setCameFromTwitter] = React.useState(false);

  const onChange = (user: firebase.User) => {
    setUserResult({
      loading: false,
      error: null,
      user,
    });

    if (user != null) {
      Sentry.configureScope(scope => {
        scope.setUser({
          id: user.uid,
          email: user.email,
        });
      });
    }
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

  React.useEffect(() => {
    (async () => {
      const result = await getItem(twitterKey, false);
      if (result) {
        setCameFromTwitter(true);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const result = await firebase.auth().getRedirectResult();
      if (
        result.user != null &&
        result.additionalUserInfo.providerId === "twitter.com"
      ) {
        router.push("/journal");
      }

      setCameFromTwitter(false);
    })();
  });

  const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithTwitter = async () => {
    await saveItem(twitterKey, true);
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
  };

  const logout = () => firebase.auth().signOut();

  const createAccount = (email: string, password: string) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const value: UserState = {
    ...userResult,
    cameFromTwitter,
    login,
    loginWithTwitter,
    logout,
    createAccount,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default useUser;
