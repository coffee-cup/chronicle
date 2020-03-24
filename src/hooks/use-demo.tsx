import { subDays } from "date-fns";
import * as React from "react";
import { getItem, saveItem } from "../local";
import { deserializeLogs, newLog } from "../logs";
import { KeyedLogs, LogProtocol } from "../types";

const DemoContext = React.createContext<LogProtocol>({} as LogProtocol);

const initialLogs: KeyedLogs = {
  1: {
    id: "1",
    date: new Date(),
    text: "Went to see the swans at Brockwell park",
    created: new Date(),
  },
  2: {
    id: "2",
    date: subDays(new Date(), 1),
    text: "This is a log for yesterday",
    created: new Date(),
  },
  3: {
    id: "3",
    date: new Date(),
    text: "This is also today",
    created: new Date(),
  },
  4: {
    id: "4",
    date: new Date(),
    text: `this
is
multiline`,
    created: new Date(),
  },
};

export const useDemo = (): LogProtocol => React.useContext(DemoContext);

const demoLogKey = "@demo-logs";

export const DemoProvider: React.FC = props => {
  const [logs, setLogs] = React.useState<KeyedLogs>(initialLogs);
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
    const log = newLog(text, date);

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
