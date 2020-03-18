/** @jsx jsx */
import { format, getDayOfYear } from "date-fns";
import { groupBy } from "lodash";
import * as React from "react";
import { Box, jsx } from "theme-ui";
import { ILog } from "../../types";
import LogItem from "./LogItem";

const LogGroup: React.FC<{ dayOfYear: string; logs: ILog[] }> = props => {
  const formattedDate = format(props.logs[0].date, "iiii, MMMM do");

  return (
    <Box className={`log-group day-${props.dayOfYear}`} sx={{ pb: 2 }}>
      <Box
        sx={{
          bg: "muted",
          px: 2,
          py: 1,
          mb: 1,
          fontSize: 1,
          color: "grey.700",
        }}
      >
        {formattedDate}
      </Box>

      <Box as="ul" sx={{ listStyle: "none", pl: 0 }}>
        {props.logs.map(log => (
          <LogItem key={log.id} log={log} />
        ))}
      </Box>
    </Box>
  );
};

const LogList: React.FC<{ logs: ILog[] }> = props => {
  const groups = groupBy(props.logs, l => getDayOfYear(l.date));

  return (
    <Box
      className="log-list"
      sx={{
        py: 3,
      }}
    >
      {Object.keys(groups).map(dayOfYear => (
        <LogGroup
          key={dayOfYear}
          logs={groups[dayOfYear]}
          dayOfYear={dayOfYear}
        />
      ))}
    </Box>
  );
};

export default LogList;
