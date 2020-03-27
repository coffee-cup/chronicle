/** @jsx jsx */
import { AlertTriangle } from "react-feather";
import { Flex, jsx, Box } from "theme-ui";

const UnderDevelopment = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: ["flex-start", "center"],
      flexDirection: ["column", "row"],
      py: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: [2, 0], mr: 2 }}>
      <AlertTriangle size={18} />
    </Box>
    Chronicle is in beta and under active development
  </Box>
);

export default UnderDevelopment;
