import firebase from "firebase/app";
import "firebase/firestore";
import * as React from "react";
import { useImmer } from "use-immer";
import { newLog, getGroupForDate, getLocalLogs, clearLocalLogs } from "../logs";
import { ILog, KeyedLogs, LogProtocol } from "../types";
import useUser from "./use-user";

const logsCollection = "logs";

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

const createFirebaseLog = (
  logs: KeyedLogs,
  text: string,
  date: Date,
  user: firebase.User,
): ILog => {
  const logGroup = getGroupForDate(date, logs);
  const order = logGroup == null ? 0 : logGroup.length;
  const log = newLog(text, date, order, user.uid);

  firestore
    .collection(logsCollection)
    .doc(log.id)
    .set(log);

  return log;
};

const saveLocalLogs = async (user: firebase.User) => {
  const localLogs = await getLocalLogs({});
  if (Object.keys(localLogs).length === 0) {
    return;
  }

  const data = await firestore
    .collection(logsCollection)
    .where("userId", "==", user.uid)
    .get();

  const logs: KeyedLogs = {};
  for (const doc of data.docs) {
    logs[doc.id] = firestoreLogToLog(doc.data() as IFirestoreLog);
  }

  for (const [id, log] of Object.entries(localLogs)) {
    const newLog = createFirebaseLog(logs, log.text, log.date, user);
    logs[newLog.id] = newLog;
  }

  clearLocalLogs();
};

const useFirebaseLogs = (): LogProtocol => {
  const { user, loading: userLoading } = useUser();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [logs, updateLogs] = useImmer<KeyedLogs>({});
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(new Date().toDateString()),
  );
  const [logsFetched, setLogsFetched] = React.useState(false);

  const createLog = (text: string, date: Date) => {
    if (user == null) {
      throw new Error("cannot create log for no user");
    }

    createFirebaseLog(logs, text, date, user);
  };

  const deleteLog = (id: string) => {
    firestore
      .collection(logsCollection)
      .doc(id)
      .delete();
  };

  React.useEffect(() => {
    if (user != null && logsFetched) {
      saveLocalLogs(user);
    }
  }, [logsFetched, user]);

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
        setLogsFetched(true);
      },
      error => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const deleteAllLogs = () => {
    const batch = firestore.batch();
    Object.keys(logs).forEach(k => {
      batch.delete(firestore.collection(logsCollection).doc(k));
    });
    batch.commit();
  };

  const protocol: LogProtocol = {
    loading,
    error,
    logs,
    selectedDate,
    setSelectedDate,
    createLog,
    deleteLog,
    deleteAllLogs,
  };

  return protocol;
};

export default useFirebaseLogs;
