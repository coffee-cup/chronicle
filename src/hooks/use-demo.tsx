import { subDays } from "date-fns";
import * as React from "react";
import { getItem, saveItem } from "../local";
import {
  deserializeLogs,
  newLog,
  getLogGroups,
  getGroupForDate,
} from "../logs";
import { KeyedLogs, LogProtocol } from "../types";

const DemoContext = React.createContext<LogProtocol>({} as LogProtocol);

const initialLogs: KeyedLogs = [
  newLog(
    "They are small, bite size, and simply explain one thing you did",
    new Date(),
    0,
  ),
  newLog("This is a log", new Date(), 1),
  newLog(
    "You can create them for any day in the past (or even future)",
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

export const useDemo = (): LogProtocol => React.useContext(DemoContext);

const demoLogKey = "@demo-logs";

export const DemoProvider: React.FC = props => {
  const [logs, setLogs] = React.useState<KeyedLogs>({});
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(new Date().toDateString()),
  );

  React.useEffect(() => {
    const logs = getItem(demoLogKey, initialLogs, deserializeLogs);
    setLogs(logs);
  }, []);

  React.useEffect(() => {
    saveItem(demoLogKey, logs);
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
    <DemoContext.Provider value={value}>{props.children}</DemoContext.Provider>
  );
};
