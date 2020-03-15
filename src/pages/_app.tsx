import { AppProps } from "next/app";

import "react-nice-dates/build/style.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
