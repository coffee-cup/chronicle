/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { jsx } from "theme-ui";
import Link from "./Link";

const StyledFooter = styled.footer(
  css({
    display: "flex",
    alignItems: "center"
  })
);

const Footer = () => (
  <StyledFooter>
    <div
      sx={{
        py: 4
      }}
    >
      Created with ♥ by <Link to="https://jakerunzer.com">jake runzer</Link>
    </div>
  </StyledFooter>
);

export default Footer;
