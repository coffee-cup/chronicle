import { AppProps } from "next/app";
import "react-nice-dates/build/style.css";
import { Styled, ThemeProvider } from "theme-ui";
import theme from "../styles";
import { UserProvider } from "../hooks/use-user";

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
