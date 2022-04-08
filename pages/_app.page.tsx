import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import Layout from "@components/Layout/Layout";
import { setAppElement } from "react-modal";


export type NextPageWithLayout<T> = NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout<any>
}
setAppElement('#__next')
function App({Component, pageProps}: AppPropsWithLayout) {

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout;
    return (getLayout && getLayout(<Component {...pageProps} />)) || <Layout><Component {...pageProps} /></Layout>
}

export default App
