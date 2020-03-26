import firebase from "firebase";
import * as React from "react";
import { useImmer } from "use-immer";
import { newLog, getGroupForDate, getLocalLogs, clearLocalLogs } from "../logs";
import { ILog, KeyedLogs, LogProtocol } from "../types";
import useUser from "./use-user";

const logsCollection = "logs";

const FirebaseContext = React.createContext<LogProtocol>({} as LogProtocol);

export const useFirebaseLogs = (): LogProtocol =>
  React.useContext(FirebaseContext);

const firestore = firebase.firestore();

export type IFirestoreLog = Omit<ILog, "date" | "created"> & {
  date: firebase.firestore.Timestamp;
  created: firebase.firestore.Timestamp;
};

const firestoreLogToLog = (data: IFirestoreLog): ILog => ({
  ...data,
  date: data.date.toDate(),
  created: data.created.toDate(),
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

    const query = firestore
      .collection(logsCollection)
      .where("userId", "==", user.uid);

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

  // upload all logs in local storage to the user account
  React.useEffect(() => {
    if (user != null) {
      const localLogs = getLocalLogs({});
      if (Object.keys(localLogs).length > 0) {
        for (const [id, log] of Object.entries(localLogs)) {
          firestore
            .collection(logsCollection)
            .doc(id)
            .set({
              ...log,
              userId: user.uid,
            });
        }

        clearLocalLogs();
      }
    }
  }, [user]);

  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(new Date().toDateString()),
  );

  const createLog = (text: string, date: Date) => {
    if (user == null) {
      throw new Error("cannot create log for no user");
    }

    const logGroup = getGroupForDate(date, logs);
    const order = logGroup == null ? 0 : logGroup.length;

    const log = newLog(text, date, order, user.uid);

    firestore
      .collection(logsCollection)
      .doc(log.id)
      .set(log);
  };

  const deleteLog = (id: string) => {
    firestore
      .collection(logsCollection)
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
