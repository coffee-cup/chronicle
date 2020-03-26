/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Box, jsx } from "theme-ui";
import { getLogGroups } from "../../logs";
import { ILog, LogProtocol } from "../../types";
import LogItem from "./LogItem";

const LogGroup: React.FC<{
  logs: ILog[];
  deleteLog: (id: string) => void;
}> = props => {
  const formattedDate = format(props.logs[0].date, "iiii, MMMM do");
  const id = format(props.logs[0].date, "yyyy-MM-dd");

  return (
    <Box className={`log-group`} sx={{ pb: 2 }} id={id}>
      <Box
        sx={{
          pb: 1,
          fontSize: 0,
          color: "grey.600",
          letterSpacing: "0.2px",
        }}
      >
        {formattedDate.toUpperCase()}
      </Box>

      <Box sx={{}}>
        {props.logs.map(log => (
          <LogItem key={log.id} log={log} deleteLog={props.deleteLog} />
        ))}
      </Box>
    </Box>
  );
};

const LogList: React.FC<LogProtocol> = props => {
  const { keys, groups } = getLogGroups(props.logs);

  return (
    <Box className="log-list">
      {keys.map(k => (
        <LogGroup key={k} logs={groups[k]} deleteLog={props.deleteLog} />
      ))}
    </Box>
  );
};

export default LogList;
