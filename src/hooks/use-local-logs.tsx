import { subDays } from "date-fns";
import * as React from "react";
import {
  getGroupForDate,
  newLog,
  getLocalLogs,
  saveLocalLogs,
  clearLocalLogs,
} from "../logs";
import { IKeyedLogs, LogProtocol } from "../types";

const initialLogs: IKeyedLogs = [
  newLog(
    "Journal entries are small and explain one thing you did",
    subDays(new Date(), 1),
    1,
  ),
  ,
  newLog("Try creating one yourself", subDays(new Date(), 1), 0),
].reduce(
  (acc, log) => ({
    ...acc,
    [log.id]: log,
  }),
  {},
);

const useLocalLogs = (): LogProtocol => {
  const [logs, setLogs] = React.useState<IKeyedLogs>({});
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(new Date().toDateString()),
  );
  const fetchedLocal = React.useRef(false);
  const firstRun = React.useRef(true);

  React.useEffect(() => {
    if (fetchedLocal.current && !firstRun.current) {
      saveLocalLogs(logs);
    }

    if (fetchedLocal.current) {
      firstRun.current = false;
    }
  }, [logs]);

  React.useEffect(() => {
    (async () => {
      const logs = await getLocalLogs(initialLogs);
      setLogs(logs);

      fetchedLocal.current = true;
    })();
  }, []);

  const createLog = (text: string, date: Date) => {
    const logGroup = getGroupForDate(date, logs);
    const order = logGroup == null ? 0 : logGroup.length;

    const log = newLog(text, date, order);

    setLogs({
      ...logs,
      [log.id]: log,
    });
  };

  const deleteLog = (id: string) => {
    delete logs[id];
    setLogs({ ...logs });
  };

  const deleteAllLogs = () => {
    clearLocalLogs();
  };

  const protocol: LogProtocol = {
    loading: false,
    error: null,
    logs,
    selectedDate,
    setSelectedDate,
    createLog,
    deleteLog,
    deleteAllLogs,
  };

  return protocol;
};

export default useLocalLogs;
