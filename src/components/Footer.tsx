/** @jsx jsx */
import * as React from "react";
import { jsx, Box, Text } from "theme-ui";
import Link from "./Link";

const Links: React.FC = () => (
  <Box sx={{ py: 3 }}>
    <Link variant="footer" href="/faq">
      faq
    </Link>
    <Link variant="footer" href="/profile">
      profile
    </Link>
    <Link variant="footer" href="https://twitter.com/jakerunzer">
      contact
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
        Created with &hearts; by{" "}
        <Link to="https://jakerunzer.com">jake runzer</Link>
      </Text>
      <Links />
    </Box>
  </Box>
);

export default Footer;
