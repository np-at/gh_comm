import React, {
  forwardRef,
  ReactSVG,
  useEffect,
  useRef,
  useState
} from "react";
import classNames from "classnames";
import "./index.module.css";
import { IconType } from "@components/Layout/Icon/types";
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
    const [IconSVG, setIcon] = useState<React.ComponentType<ReactSVG> | null>(
      null
    );
    useEffect(() => {
      const setupIcon = async () => {
        if (isMounted.current) {
          const IC: React.ComponentType<React.ReactSVG> = dynamic<ReactSVG>(
            () => import(`@components/Layout/Icon/icons/${name}.svg`),
            { ssr: true }
          );
          IC && setIcon(IC);
        }
      };
      isMounted.current = true;


      setupIcon()
        .then((r) => console.log(r))
        .catch((e) => console.error(e));

      return () => {
        isMounted.current = false;
      };
    }, [type, name]);

    const data = {
      ...other,
      "aria-hidden": !label,
      className: classNames("Icon", `Icon--${type}`, className, {
        [`Icon__${direction}`]: !!direction
      })
    };
    return (
      <div ref={ref} {...data}>
        {label && <SRSpan className={"sr-only"}>{label}</SRSpan>}

        {
          // @ts-ignore
          IconSVG && <IconSVG aria-hidden={true} />
        }
      </div>
    );
  }
);
Icon.displayName = "Icon";
export default Icon;
