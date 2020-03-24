import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { InitializeColorMode } from "theme-ui";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            async
            defer
            src="https://cdn.simpleanalytics.io/hello.js"
          ></script>
          <noscript>
            <img src="https://api.simpleanalytics.io/hello.gif" alt="" />
          </noscript>
        </Head>

        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
