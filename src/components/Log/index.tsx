/** @jsx jsx */
import * as React from "react";
import { Box, jsx } from "theme-ui";
import { LogProtocol } from "../../types";
import Editor from "../Editor";
import LogList from "./LogList";

const Log: React.FC<LogProtocol> = props => {
  return (
    <Box
      className="log-container"
      sx={{
        display: "flex",
        flexWrap: ["wrap", "nowrap"],
        flexDirection: ["column-reverse", "row"],
        width: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1, pr: [0, 2] }}>
        <LogList {...props} />
      </Box>

      <Box sx={{ width: ["100%", "300px", "400px"] }}>
        <Editor {...props} />
      </Box>
    </Box>
  );
};

export default Log;
