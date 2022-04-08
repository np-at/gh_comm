import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import Layout from "@components/Layout/Layout";


export type NextPageWithLayout<T> = NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout<any>
}

function App({Component, pageProps}: AppPropsWithLayout) {

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout;
    return (getLayout && getLayout(<Component {...pageProps} />)) || <Layout><Component {...pageProps} /></Layout>
}

export default App
