/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Box, jsx } from "theme-ui";
import { useLogs } from "../../hooks/use-logs";
import { getLogGroups } from "../../logs";
import { ILogGroup } from "../../types";
import LogItem from "./LogItem";

const LogGroup: React.FC<{
  group: ILogGroup;
}> = props => {
  const { deleteLog } = useLogs();

  const formattedDate = format(props.group[0].date, "iiii, MMMM do");
  const id = format(props.group[0].date, "yyyy-MM-dd");

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
        {props.group.map(log => (
          <LogItem key={log.id} log={log} deleteLog={deleteLog} />
        ))}
      </Box>
    </Box>
  );
};

const LogList: React.FC = props => {
  const { logs } = useLogs();
  const { keys, groups } = getLogGroups(logs);

  return (
    <Box className="log-list">
      {keys.map(k => (
        <LogGroup key={k} group={groups[k]} />
      ))}
    </Box>
  );
};

export default LogList;
