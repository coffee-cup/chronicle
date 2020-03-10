/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import Link from "./Link";
import { jsx, Flex, NavLink } from "theme-ui";

const StyledHeader = styled.header(
  css({
    color: "text",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pt: 3
  })
);

const Logo = styled.span(
  css({
    fontSize: 4,
    fontWeight: "bold",
    fontFamily: "heading"
  })
);

const Nav = () => (
  <Flex as="nav">
    <NavLink as={Link} href="/">
      home
    </NavLink>
    <NavLink as={Link} href="/about">
      about
    </NavLink>
    <NavLink as={Link} href="/login">
      login
    </NavLink>
  </Flex>
);

const Header: React.FC<{ home?: string }> = props => (
  <StyledHeader>
    <Logo>
      <Link to={props.home || "/"} variant="header">
        Chronicle
      </Link>
    </Logo>
    <Nav />
  </StyledHeader>
);

export default Header;
