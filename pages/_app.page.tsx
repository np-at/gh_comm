import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactNode } from "react";
import React, { type ReactElement, useEffect } from "react";
import Layout from "@components/Layout/Layout";
import { setAppElement } from "react-modal";
import GlobalStylesProvider, { darkTheme, lightTheme } from "@styles/GlobalStylesProvider";
import styled, { ThemeProvider } from "styled-components";
import HexGrid from "@components/Layout/Backgrounds/HexGrid";

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
      return {};
  }
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [theme, setTheme] = React.useState("");
  const themeToggler = () => {
    // console.log("theme: ", theme);
    // console.log("theme: ", theme === "light");
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

export const BackgroundContainer = styled.div`
  //display: flex;
  position: absolute;
  z-index: -1;
  //top:0;
  bottom: 0;
  background: none;
  //background-color: var(--workspace-color);
  width: 100%;
  height: 100%;
  //overflow-y: clip;
  //flex-basis: 200%;
  //overflow: auto;
  //overflow-y: auto;
`;

// noinspection JSUnusedGlobalSymbols
export default App;
