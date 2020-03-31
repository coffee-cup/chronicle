/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Text, Box, jsx } from "theme-ui";
import { useLogs } from "../../hooks/use-logs";
import { getLogGroups, groupKey } from "../../logs";
import { ILogGroup } from "../../types";
import LogItem from "./LogItem";
import Today from "../Today";

const LogGroup: React.FC<{
  group: ILogGroup;
}> = props => {
  const { deleteLog } = useLogs();

  const formattedDate = format(props.group[0].date, "iiii, MMMM do");
  const id = format(props.group[0].date, "yyyy-MM-dd");

  return (
    <Box
      className={`log-group`}
      sx={{
        pt: 3,
        pb: 2,
        borderTop: "solid 2px",
        borderColor: "muted",
      }}
      id={id}
    >
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

      <Box>
        {props.group.map(log => (
          <LogItem key={log.id} log={log} deleteLog={deleteLog} />
        ))}
      </Box>
    </Box>
  );
};

const LogList: React.FC = props => {
  const { logs, loading } = useLogs();
  const { keys, groups } = getLogGroups(logs);

  const todayGroup = groups[groupKey(new Date())];

  if (loading) {
    return null;
  }

  return (
    <Box className="log-list">
      <Today empty={keys.length === 0} />

      {keys.map(k => (
        <LogGroup key={k} group={groups[k]} />
      ))}
    </Box>
  );
};

export default LogList;
