/** @jsx jsx */
import * as React from "react";
import { Box, jsx, ThemeProvider } from "theme-ui";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../styles";
import SEO from "./SEO";

export interface Props {
  title?: string;
  description?: string;
}

const Layout: React.FC<Props> = props => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <SEO title={props.title} description={props.description} />

        <Box
          sx={{
            maxWidth: "container",
            mx: "auto",
            my: 0,
            px: [3, 4],
            py: 0
          }}
        >
          <Box
            sx={{
              minHeight: "100vh"
            }}
          >
            <Header />
            {props.children}
          </Box>

          <Footer />
        </Box>
      </>
    </ThemeProvider>
  );
};

export default Layout;
