/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx } from "theme-ui";
import Link from "./Link";
import Nav from "./Nav";

const Header: React.FC<{ home?: string }> = props => (
  <Flex
    sx={{
      py: [2, 3],
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Box sx={{ fontSize: 4, fontWeight: "bold", fontFamily: "heading" }}>
      <Link to={props.home || "/"} variant="header">
        •
      </Link>
    </Box>

    <Nav />
  </Flex>
);

export default Header;
