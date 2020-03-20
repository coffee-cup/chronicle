/** @jsx jsx */
import { format, getDayOfYear, getYear } from "date-fns";
import { groupBy, sortBy } from "lodash";
import * as React from "react";
import { Box, jsx } from "theme-ui";
import { ILog, KeyedLogs } from "../../types";
import LogItem from "./LogItem";

const LogGroup: React.FC<{ logs: ILog[] }> = props => {
  const formattedDate = format(props.logs[0].date, "iiii, MMMM do");
  const id = format(props.logs[0].date, "yyyy-MM-dd");

  return (
    <Box className={`log-group`} sx={{ pb: 2 }} id={id}>
      <Box
        sx={{
          py: 1,
          fontSize: 0,
          color: "grey.600",
          letterSpacing: "0.2px",
        }}
      >
        {formattedDate.toUpperCase()}
      </Box>

      <Box as="ul" sx={{ listStyle: "none", pl: 0 }}>
        {props.logs.map(log => (
          <LogItem key={log.id} log={log} />
        ))}
      </Box>
    </Box>
  );
};

const groupByKey = (d: Date): string => `${getDayOfYear(d)}-${getYear(d)}`;

const LogList: React.FC<{ logs: KeyedLogs }> = props => {
  const groups = groupBy(props.logs, l => groupByKey(l.date));
  const sortedGroupKeys = sortBy(
    Object.keys(groups),
    k => groups[k][0].date,
  ).reverse();

  return (
    <Box
      className="log-list"
      sx={{
        py: 3,
      }}
    >
      {sortedGroupKeys.map(k => (
        <LogGroup key={k} logs={groups[k]} />
      ))}
    </Box>
  );
};

export default LogList;
