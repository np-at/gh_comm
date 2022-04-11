import React, { forwardRef, ReactSVG, ReactSVGElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./index.module.css";
import { IconType, iconTypes } from "@components/Layout/Icon/types";
import { SRSpan } from "@components/Reusable/SROnly";
import dynamic from "next/dynamic";


export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  type: IconType;
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ label, className, type, ...other }, ref) => {
    const isMounted = useRef(true);
    const [, name, direction] = type.match(/(.*)-(right|left|up|down)$/) || [
      "",
      type
    ];
    const [IconSVG, setIcon] = useState<React.ComponentType<ReactSVG> | null>(null);
  // const ICO = dynamic(() => import(`@components/Layout/Icon/icons/${name}.svg`), {})
    useEffect(() => {
      const setupIcon = async () => {
        if (isMounted.current) {
          const IC: React.ComponentType<React.ReactSVG> = dynamic<ReactSVG>(()=> import(
            `@components/Layout/Icon/icons/${name}.svg`
          ),{ ssr:true});
          IC && setIcon(IC);
        }
      };
      isMounted.current = true;
      // NOTE: we don't want to pollute test output with
      //  console.errors as a result of the dynamic imports
      if (process.env.NODE_ENV === "test") {
        return () => {};
      }

      // import(`./icons/${name}.svg`)
      //     .then(icon => {
      //         isMounted.current && setIcon(() => icon.default);
      //     })
      //     .catch(() => {
      //         console.error(`Could not find icon type "${type}".`);
      //         isMounted.current && setIcon(null);
      //     });
      setupIcon()
        .then((r) => console.log(r))
        .catch((e) => console.error(e));

      return () => {
        isMounted.current = false;
      };
    }, [type,name]);

    const data = {
      ...other,
      "aria-hidden": !label,
      className: classNames("Icon", `Icon--${type}`, className, {
        [`Icon__${direction}`]: !!direction
      })
    };
    return (
      <div ref={ref} {...data}>
        {/*<Asdf />*/}
        {/*{IconSVG && (*/}
        {/*  // <img*/}
        {/*  //   src={require(`@components/Layout/Icon/icons/${name}.svg`)}*/}
        {/*  //   alt={label}*/}
        {/*  // />*/}
        {/*)}*/}
        {label && <SRSpan className={"sr-only"}>{label}</SRSpan>}


        {// @ts-ignore
          IconSVG && <IconSVG aria-hidden={true} />}
      </div>
    );
  }
);
Icon.displayName = "Icon";
export default Icon;
