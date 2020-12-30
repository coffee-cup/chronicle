import { AppProps } from "next/app";
import "react-nice-dates/build/style.css";
import { Styled, ThemeProvider } from "theme-ui";
import theme from "../styles";
import { UserProvider } from "../hooks/use-user";
import * as Sentry from "@sentry/node";
import { useFathom } from "../hooks/useFathom";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

function MyApp({ Component, pageProps }: AppProps) {
  useFathom("BBAISTHM", "chronicle.ink");

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Styled.root>
          <Component {...pageProps} />
        </Styled.root>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
