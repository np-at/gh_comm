import config from "./_config";
import type { NextPageWithLayout } from "../_app.page";
import React, { Fragment, useEffect } from "react";

const AdminPage: NextPageWithLayout<{}> = () => {
  useEffect(() => {
    // @ts-ignore
    window.CMS_MANUAL_INIT = true;
    import("netlify-identity-widget").then(({ default: NetlifyIdentityWidget }) => {
      NetlifyIdentityWidget.init({
        container: "#nc-id"
      });
      NetlifyIdentityWidget.on("login", () => {
        console.log("login");
        window.location.reload();
      });
      if (!NetlifyIdentityWidget.currentUser()) {
        NetlifyIdentityWidget.open("login");
      }

      return () => {
        NetlifyIdentityWidget.off("login");
      };
    });
    // @ts-ignore
    import("netlify-cms").then((NetlifyCmsApp) => {
      // @ts-ignore
      NetlifyCmsApp.init({
        config: config,
        // @ts-ignore
        load_config_file: false
      });
    });
    // @ts-ignore
    window.netlifyIdentity?.on("init", () => {
      // @ts-ignore
      const user = window.netlifyIdentity.currentUser();
      console.log("user", user);
      if (!user) {
        // @ts-ignore
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin#/";
        });
        // @ts-ignore
        window.netlifyIdentity.open();
      }
    });
  }, []);
  return (
    <Fragment>
      <div id={"nc-id"} />
    </Fragment>
  );
};

AdminPage.getLayout = (page) => page;

// noinspection JSUnusedGlobalSymbols
export default AdminPage;
