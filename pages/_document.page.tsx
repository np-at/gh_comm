import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document";
import {ServerStyleSheet} from "styled-components";


// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel={"stylesheet"}
            href={
              "https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700;800&&display=swap"
            }
          />
          <link
            rel={"stylesheet"}
            href={
              "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap"
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
}
