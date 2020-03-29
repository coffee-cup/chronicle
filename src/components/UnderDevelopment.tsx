/** @jsx jsx */
import { AlertTriangle } from "react-feather";
import { Flex, jsx, Box } from "theme-ui";

const UnderDevelopment = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      bg: "accent",
      py: 2,
      px: [3, 2],
      mx: [-3, 0],
      fontSize: 1,
    }}
  >
    <AlertTriangle size={18} sx={{ mr: 2, display: ["none", "inline"] }} />
    Chronicle is in beta and under active development
  </Box>
);

export default UnderDevelopment;
