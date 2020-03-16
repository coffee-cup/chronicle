/** @jsx jsx */
import { Styled, Button, Grid, Flex, Input, Box, jsx } from "theme-ui";
import * as React from "react";
import { ILog } from "../types";

export interface Props {
  log: ILog;
}

const LogItem: React.FC<Props> = props => (
  <Box
    sx={{
      mb: 4,
      py: 2,
      bg: "background",
    }}
    className="log"
  >
    {props.log.text}
  </Box>
);

export default LogItem;
