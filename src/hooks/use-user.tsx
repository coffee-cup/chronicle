import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";
import * as Sentry from "@sentry/node";

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
  login: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  createAccount: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>;
};

const UserContext = React.createContext<UserState>({} as UserState);

export const useUser = (): UserState => React.useContext(UserContext);

export const UserProvider: React.FC = props => {
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

  const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const logout = () => firebase.auth().signOut();

  const createAccount = (email: string, password: string) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const value: UserState = {
    ...userResult,
    login,
    logout,
    createAccount,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default useUser;
