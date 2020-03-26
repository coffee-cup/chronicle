import { subDays } from "date-fns";
import * as React from "react";
import { getGroupForDate, newLog, getLocalLogs, saveLocalLogs } from "../logs";
import { KeyedLogs, LogProtocol } from "../types";

const startingLogs: KeyedLogs = [
  newLog(
    "They are small, bite size, and simply explain one thing you did",
    new Date(),
    0,
  ),
  newLog("This is a log", new Date(), 1),
  newLog(
    "You can create them for any day in the past (or future)",
    subDays(new Date(), 1),
    0,
  ),
].reduce(
  (acc, log) => ({
    ...acc,
    [log.id]: log,
  }),
  {},
);

const initialLogs = getLocalLogs(startingLogs);

const LocalContext = React.createContext<LogProtocol>({} as LogProtocol);

export const useLocalLogs = (): LogProtocol => React.useContext(LocalContext);

export const LocalProvider: React.FC = props => {
  const [logs, setLogs] = React.useState<KeyedLogs>(initialLogs);
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(new Date().toDateString()),
  );
  const firstRun = React.useRef(true);

  React.useEffect(() => {
    if (!firstRun.current) {
      console.log("saving logs!");
      saveLocalLogs(logs);
    }

    firstRun.current = false;
  }, [logs]);

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

  const value: LogProtocol = {
    loading: false,
    error: null,
    logs,
    selectedDate,
    setSelectedDate,
    createLog,
    deleteLog,
  };

  return (
    <LocalContext.Provider value={value}>
      {props.children}
    </LocalContext.Provider>
  );
};
