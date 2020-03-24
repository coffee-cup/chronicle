import firebase from "firebase";
import * as React from "react";
import { useImmer } from "use-immer";
import { newLog } from "../logs";
import { ILog, KeyedLogs, LogProtocol } from "../types";
import useUser from "./use-user";

const FirebaseContext = React.createContext<LogProtocol>({} as LogProtocol);

export const useFirebase = (): LogProtocol => React.useContext(FirebaseContext);

const firestore = firebase.firestore();

export type IFirestoreLog = ILog & {
  date: firebase.firestore.Timestamp;
};

const firestoreLogToLog = (data: IFirestoreLog): ILog => ({
  ...data,
  date: data.date.toDate(),
});

export const FirebaseProvider: React.FC = props => {
  const { user, loading: userLoading } = useUser();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [logs, updateLogs] = useImmer<KeyedLogs>({});

  React.useEffect(() => {
    if (userLoading || user == null) {
      return;
    }

    const query = firestore.collection("logs").where("userId", "==", user.uid);

    const unsubscribe = query.onSnapshot(
      snapshot => {
        setLoading(false);
        updateLogs(logs => {
          for (const change of snapshot.docChanges()) {
            if (change.type === "added") {
              const log = firestoreLogToLog(change.doc.data() as IFirestoreLog);
              logs[log.id] = log;
            } else if (change.type === "modified") {
              const log = firestoreLogToLog(change.doc.data() as IFirestoreLog);
              logs[log.id] = log;
            } else if (change.type === "removed") {
              delete logs[change.doc.id];
            }
          }
        });
      },
      error => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(new Date().toDateString()),
  );

  const createLog = (text: string, date: Date) => {
    if (user == null) {
      throw new Error("cannot create log for no user");
    }

    const log = newLog(text, date, user.uid);

    firestore
      .collection("logs")
      .doc(log.id)
      .set(log);
  };

  const deleteLog = (id: string) => {
    firestore
      .collection("logs")
      .doc(id)
      .delete();
  };

  const value: LogProtocol = {
    loading,
    error,
    logs,
    selectedDate,
    setSelectedDate,
    createLog,
    deleteLog,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
