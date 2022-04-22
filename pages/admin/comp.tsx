import React, { useEffect } from "react";
import { useRouter } from "next/router";
import config from "./_config";

export const Comp: React.FC<{ NetlifyIdentity: any; NetlifyCMS: any; children?: never }> = ({
  NetlifyIdentity,
  NetlifyCMS
}) => {
  const { reload } = useRouter();
  useEffect(() => {
    NetlifyIdentity.init();
    NetlifyCMS.init({
      config: config,
      load_config_file: false
    });

    NetlifyIdentity.on("login", () => {
      console.log("login", NetlifyIdentity.currentUser());
      reload();
    });
    NetlifyIdentity.on("logout", () => {
      reload();
    });
    if (NetlifyIdentity.currentUser()) {
      console.log("currentUser", NetlifyIdentity.currentUser());
    } else {
      console.log("currentUser", NetlifyIdentity.currentUser());
      NetlifyIdentity.open();
      NetlifyIdentity.on("login", () => {
        console.log("login", NetlifyIdentity.currentUser());
        NetlifyIdentity.close();

        reload();
      });
      NetlifyIdentity.on("logout", () => {
        reload();
      });
    }
    return () => {
      NetlifyIdentity.off("login");
      NetlifyIdentity.off("logout");
    };
  }, [NetlifyCMS, NetlifyIdentity, reload]);
  return <div></div>;
};
export default Comp;
