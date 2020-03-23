/** @jsx jsx */
import * as React from "react";
import { Box, jsx } from "theme-ui";
import "../firebase";
import Footer from "./Footer";
import Header from "./Header";
import SEO from "./SEO";

export interface Props {
  title?: string;
  description?: string;
}

const Layout: React.FC<Props> = props => {
  return (
    <>
      <SEO title={props.title} description={props.description} />

      <Box
        sx={{
          maxWidth: "container",
          mx: "auto",
          my: 0,
          px: [3, 4],
          py: 0,
        }}
      >
        <Box
          sx={{
            minHeight: "100vh",
          }}
        >
          <Header />
          {props.children}
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default Layout;
