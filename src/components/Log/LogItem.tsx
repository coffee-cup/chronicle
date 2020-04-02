/** @jsx jsx */
import * as React from "react";
import { X } from "react-feather";
import { Box, IconButton, jsx } from "theme-ui";
import { ILog } from "../../types";

export interface Props {
  log: ILog;
  deleteLog: (id: string) => void;
}

const LogItem: React.FC<Props> = props => (
  <Box
    sx={{
      position: "relative",
      py: 2,
      px: 2,
      whiteSpace: "pre-wrap",
      lineHeight: "body",
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
      sx={{
        position: "absolute",
        p: 0,
        top: 1,
        right: 0,
        opacity: 0,
        transition: "opacity 150ms ease-in-out",
      }}
      onClick={() => {
        props.deleteLog(props.log.id);
      }}
      aria-label="delete"
    >
      <X size={16} />
    </IconButton>
  </Box>
);

export default LogItem;
