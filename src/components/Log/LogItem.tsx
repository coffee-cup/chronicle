/** @jsx jsx */
import * as React from "react";
import { Trash } from "react-feather";
import { Box, IconButton, jsx } from "theme-ui";
import { ILog } from "../../types";

export interface Props {
  log: ILog;
  deleteLog: (id: string) => void;
}

const LogItem: React.FC<Props> = props => (
  <Box
    as="li"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      py: 2,
      bg: "background",
      overflow: "hidden",
      wordWrap: "break-word",
      transition: "all 150ms ease-in-out",

      "&:hover": {
        bg: "muted",

        ".trash": {
          opacity: 1,
        },
      },
    }}
    className="log"
  >
    {props.log.text}
    <IconButton
      className="trash"
      sx={{ opacity: 0, transition: "opacity 150ms ease-in-out" }}
      onClick={() => {
        props.deleteLog(props.log.id);
      }}
    >
      <Trash size={16} />
    </IconButton>
  </Box>
);

export default LogItem;
