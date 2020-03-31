/** @jsx jsx */
import * as React from "react";
import { jsx, Box, Text, useColorMode } from "theme-ui";
import { ArrowRight, ArrowUp } from "react-feather";

const Today: React.FC<{ empty: boolean }> = props => {
  const [mode] = useColorMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column-reverse", "row"],
        alignItems: ["flex-start", "center"],
        justifyContent: ["center", "space-between"],
        width: "100%",
        pt: 2,
        pb: 3,
        textAlign: ["center", "left"],
      }}
    >
      <Box sx={{ pr: [0, 3], width: "100%" }}>
        <Text sx={{ fontSize: 3, pb: 2 }}>
          <span sx={{ color: "accent" }}>φ</span>（．．）
        </Text>

        <Text>Jot down a highlight of the day</Text>
      </Box>

      <ArrowRight size={22} sx={{ display: ["none", "inline"] }} />
    </Box>
  );
};

export default Today;
