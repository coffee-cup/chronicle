/** @jsx jsx */
import * as React from "react";
import { jsx, Box, Text } from "theme-ui";
import Link from "./Link";

const Links: React.FC = () => (
  <Box sx={{ py: 3 }}>
    <Link variant="footer" href="https://twitter.com/chronicle_ink">
      twitter
    </Link>
    <Link variant="footer" href="/faq">
      faq
    </Link>
    <Link variant="footer" href="/profile">
      profile
    </Link>
  </Box>
);

const Footer = () => (
  <Box
    as="footer"
    sx={{
      pt: [5, 6],
      pb: 4,
      textAlign: ["center", "left"],
    }}
  >
    <Box
      sx={{
        display: ["flex"],
        flexDirection: ["column-reverse", "row"],
        alignItems: "center",
        justifyContent: "space-between",
        pt: 2,
      }}
    >
      <Text sx={{ fontSize: [1, 2] }}>
        Created with <span sx={{ color: "crimson" }}>&hearts;</span> by{" "}
        <Link to="https://jakerunzer.com">jake runzer</Link>
      </Text>
      <Links />
    </Box>
  </Box>
);

export default Footer;
