import config from "./_config"
import dynamic from "next/dynamic";
import {NextPageWithLayout} from "../_app";
import Script from "next/script";
import { Fragment } from "react";



const CMS = dynamic(
    //@ts-ignore
    async () => {
        //@ts-ignore
        window.CMS_MANUAL_INIT = true;
        //@ts-ignore
        await import("netlify-cms")
        //@ts-ignore
        const {initCMS: init} = window;
        init({
            config: config
        })
    },
    {
        ssr: false,
        loading: () => <h1>Loading</h1>,
    }
);

const AdminPage: NextPageWithLayout<{}> = () => {

    return (
        <Fragment>
            <Script async={false} id={"netlify_identity"} src={"https://identity.netlify.com/v1/netlify-identity-widget.js"}/>
            {/*<div id={"nl-ml"} data-netlify-identity-button>Login with Netlify Identity</div>*/}
            {/*<IdentityWidget/>*/}
            <div id={"nc-root"}/>
            <CMS/>
        </Fragment>
    );
};

AdminPage.getLayout = (page) => page;
export default AdminPage;
