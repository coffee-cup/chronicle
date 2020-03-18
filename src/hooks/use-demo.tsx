import { subDays } from "date-fns";
import { sortBy } from "lodash";
import * as React from "react";
import { ILog } from "../types";

export interface DemoState {
  logs: ILog[];
  createLog: (log: ILog) => void;
}

const DemoContext = React.createContext<DemoState>({} as DemoState);

const initialLogs: ILog[] = [
  {
    id: "1",
    date: new Date(),
    text: "Went to see the swans at Brockwell park",
  },
  {
    id: "2",
    date: subDays(new Date(), 1),
    text: "This is a log for yesterday",
  },
  {
    id: "3",
    date: new Date(),
    text: "This is also today",
  },
];

export const useDemo = (): DemoState => React.useContext(DemoContext);

export const DemoProvider: React.FC = props => {
  const [logs, setLogs] = React.useState<ILog[]>(initialLogs);

  const createLog = (log: ILog) => {
    setLogs(sortBy([log, ...logs], l => new Date(l.date)).reverse());
  };

  const value: DemoState = {
    logs,
    createLog,
  };

  return (
    <DemoContext.Provider value={value}>{props.children}</DemoContext.Provider>
  );
};
