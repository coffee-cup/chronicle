/** @jsx jsx */
import * as React from "react";
import { jsx, Box } from "theme-ui";
import Link from "./Link";
import UnderDevelopment from "./UnderDevelopment";

const Links: React.FC = () => (
  <Box sx={{ py: 3 }}>
    <Link variant="footer" href="/faq">
      faq
    </Link>
    <Link variant="footer" href="/me">
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
        display: ["block", "flex"],
        alignItems: "center",
        justifyContent: "space-between",
        pt: 2,
      }}
    >
      <Box>
        Created with ♥ by <Link to="https://jakerunzer.com">jake runzer</Link>
      </Box>
      <Links />
    </Box>
  </Box>
);

export default Footer;
