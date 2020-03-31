import * as React from "react";
import { LogProtocol } from "../types";
import useFirebaseLogs from "./use-firebase-logs";
import useLocalLogs from "./use-local-logs";
import useLogsType from "./use-logs-type";

const LogsContext = React.createContext<LogProtocol>({} as LogProtocol);

export const useLogs = (): LogProtocol => React.useContext(LogsContext);

const Provider: React.FC<{ protocol: LogProtocol }> = props => {
  return (
    <LogsContext.Provider value={props.protocol}>
      {props.children}
    </LogsContext.Provider>
  );
};

const FirebaseLogs: React.FC = props => {
  const logs = useFirebaseLogs();
  return <Provider protocol={logs}>{props.children}</Provider>;
};

const LocalLogs: React.FC = props => {
  const logs = useLocalLogs();
  return <Provider protocol={logs}>{props.children}</Provider>;
};

export const LogsProvider: React.FC = props => {
  const logsType = useLogsType();
  const LogsComp: React.FC = logsType === "firebase" ? FirebaseLogs : LocalLogs;

  return <LogsComp>{props.children}</LogsComp>;
};
