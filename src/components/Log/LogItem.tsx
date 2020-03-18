/** @jsx jsx */
import * as React from "react";
import { Box, jsx } from "theme-ui";
import { ILog } from "../../types";

export interface Props {
  log: ILog;
}

const LogItem: React.FC<Props> = props => (
  <Box
    as="li"
    sx={{
      py: 2,
      bg: "background",
    }}
    className="log"
  >
    {props.log.text}
  </Box>
);

export default LogItem;
