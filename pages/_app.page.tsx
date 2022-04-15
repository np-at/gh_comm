import type { AppProps } from "next/app";
import type { NextPage } from "next";
import React, { type ReactElement, useEffect } from "react";
import type {ReactNode} from "react";
import Layout from "@components/Layout/Layout";
import { setAppElement } from "react-modal";
import GlobalStylesProvider, { darkTheme, lightTheme } from "@styles/GlobalStylesProvider";
import { ThemeProvider } from "styled-components";

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any>;
};
const themeSwitcher = (theme: string) => {
  switch (theme) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return {  };
  }
};
function App({ Component, pageProps }: AppPropsWithLayout) {
  const [theme, setTheme] = React.useState("");
  const themeToggler = () => {
    console.log("theme: ", theme);
    console.log("theme: ", theme === "light");
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    setAppElement("#__next");
    // @ts-ignore
    window.netlifyIdentity?.on("init", (user) => {
      if (!user) {
        // @ts-ignore
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout;
  return (
    <ThemeProvider theme={themeSwitcher(theme)}>
      <GlobalStylesProvider />
        {(getLayout && getLayout(<Component {...pageProps} />)) || (
          <Layout toggleThemeCallback={themeToggler}>
            <Component {...pageProps} />
          </Layout>
        )}
    </ThemeProvider>
  );
}

export default App;
