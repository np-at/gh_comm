import config from "./_config";
import dynamic from "next/dynamic";
import type { NextPageWithLayout } from "../_app.page";
import React, { Fragment } from "react";


// const Comp = dynamic(()=>import("./comp"), { ssr: false });
// const CMSINIT = dynamic<React.ComponentProps<typeof Comp>>(async (props) => {
//  // @ts-ignore
//   window.CMS_MANUAL_INIT = true;
//   // @ts-ignore
//   const NetlifyCMS = await import("netlify-cms");
//   const NetlifyIdentity = await import("netlify-identity-widget");
//   // NetlifyIdentity.init();
//   // NetlifyCMS.init({config: config, load_config_file: false});
//   // const {reload} = useRouter()
// return <Comp NetlifyCMS={NetlifyCMS} NetlifyIdentity={NetlifyIdentity}></Comp>
// }, { ssr: false, loading: () => <div>Loading...</div> });
const CMS = dynamic(
  //@ts-ignore
  async () => {
    //@ts-ignore
    window.CMS_MANUAL_INIT = true;
    const NetlifyIdentity = await import("netlify-identity-widget");
    const CMS = await import("netlify-cms-app");

    NetlifyIdentity.init({ container: "#nc-id" });
    // @ts-ignore
    CMS.init({
      config: config,
      load_config_file: false,
      //@ts-ignore
      // load_config_file: false,
    });
    // useEffect(() => {
    //   NetlifyIdentity.on("login", () => {
    //     console.log("login", NetlifyIdentity.currentUser());
    //     window.location.reload();
    //   });
    //   NetlifyIdentity.on("logout", () => {
    //     window.location.reload();
    //   });
    //   return () => {
    //     NetlifyIdentity.off("login");
    //     NetlifyIdentity.off("logout");
    //   };
    // }, []);
    if (!NetlifyIdentity.currentUser()) {
      console.log("currentUser", NetlifyIdentity.currentUser());
      NetlifyIdentity.open();
      NetlifyIdentity.on("login", () => {
        console.log("login", NetlifyIdentity.currentUser());
        NetlifyIdentity.close();

        window.location.reload();
      });
      NetlifyIdentity.on("logout", () => {
        window.location.reload();
      });
    } else {
      console.log("currentUser", NetlifyIdentity.currentUser());
    }

    // const { init } = await import("netlify-cms");
    // const {open}  = await import("netlify-identity-widget")
    // open("login")
    //@ts-ignore
    // const { initCMS: init } = window;
    // init({
    //   config: config
    // });
  },
  {
    ssr: false,
    loading: () => {
      return <h1>Loading</h1>;
    }
  }
);

const AdminPage: NextPageWithLayout<{}> = () => {
// useEffect(() => {
  //   //@ts-ignore
  //   // window.CMS_MANUAL_INIT = true;
  //   NetlifyIdentityWidget.init({
  //     container: "#nc-id"
  //   });
  //   NetlifyIdentityWidget.on("login", () => {
  //     console.log("login");
  //   });
  //   if (!NetlifyIdentityWidget.currentUser()) {
  //     NetlifyIdentityWidget.open("login");
  //   }
  //   // netlifyCMS.init({ config });
  //
  //   return () => {
  //     NetlifyIdentityWidget.off("login");
  //   };
  // }, []);
  return (
    <Fragment>
      {/*<Script*/}
      {/*  id={"netlify_identity"}*/}
      {/*  src={"https://identity.netlify.com/v1/netlify-identity-widget.js"}*/}
      {/*/>*/}
      <div id={"nc-id"}></div>
      {/*<IdentityWidget/>*/}
      <div id={"nc-root"} />
      <CMS />
      {/*<CMS />*/}
    </Fragment>
  );
};

AdminPage.getLayout = (page) => page;
export default AdminPage;
