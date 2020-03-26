import * as React from "react";
import { LogProtocol } from "../types";

const LogsContext = React.createContext<LogProtocol>({} as LogProtocol);

export const useLogs = (): LogProtocol => React.useContext(LogsContext);

export const LogsProvider: React.FC<{ protocol: LogProtocol }> = props => {
  return (
    <LogsContext.Provider value={props.protocol}>
      {props.children}
    </LogsContext.Provider>
  );
};
