/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx, Spinner } from "theme-ui";
import { useLogs } from "../../hooks/use-logs";
import Editor from "../Editor";
import LogList from "./LogList";

const Log: React.FC = () => {
  const { loading, error } = useLogs();

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
      <Box sx={{ flexGrow: 1, pr: [0, 2], maxWidth: "100%" }}>
        {loading && (
          <Flex sx={{ justifyContent: "center", py: 2 }}>
            <Spinner />
          </Flex>
        )}

        {error != null && <Box sx={{ color: "error" }}>{error}</Box>}

        <LogList />
      </Box>

      <Box sx={{ minWidth: ["100%", "300px", "400px"] }}>
        <Editor />
      </Box>
    </Box>
  );
};

export default Log;
