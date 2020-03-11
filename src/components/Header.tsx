/** @jsx jsx */
import * as React from "react";
import Link from "./Link";
import { jsx, Spinner, Flex, Box, NavLink } from "theme-ui";
import useUser from "../hooks/use-user";

const Nav = () => {
  const { user, initialising } = useUser();

  return (
    <Flex as="nav">
      <NavLink as={Link} href="/">
        home
      </NavLink>
      <NavLink as={Link} href="/faq">
        faq
      </NavLink>
      <NavLink as={Link} href={user == null ? "/login" : "/me"}>
        {initialising ? <Spinner size={22} /> : user == null ? "login" : "me"}
      </NavLink>
    </Flex>
  );
};

const Header: React.FC<{ home?: string }> = props => (
  <Flex
    sx={{
      py: 3,
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
