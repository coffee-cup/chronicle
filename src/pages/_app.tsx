import { AppProps } from "next/app";
import "react-nice-dates/build/style.css";
import { Styled, ThemeProvider } from "theme-ui";
import theme from "../styles";
import { UserProvider } from "../hooks/use-user";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

console.log("SENTRY", process.env.SENTRY_DSN);

function MyApp({ Component, pageProps }: AppProps) {
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
