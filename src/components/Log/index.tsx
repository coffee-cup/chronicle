/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx, Spinner } from "theme-ui";
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
        {props.loading && (
          <Flex sx={{ justifyContent: "center", py: 2 }}>
            <Spinner />
          </Flex>
        )}

        {props.error != null && (
          <Box sx={{ color: "error" }}>{props.error}</Box>
        )}

        <LogList {...props} />
      </Box>

      <Box sx={{ width: ["100%", "300px", "400px"] }}>
        <Editor {...props} />
      </Box>
    </Box>
  );
};

export default Log;
