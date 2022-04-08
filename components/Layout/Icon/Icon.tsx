import React, {forwardRef, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import "./index.module.css";
import {IconType} from "@components/Layout/Icon/types";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    type: IconType;
}
const Icon = forwardRef<HTMLDivElement, IconProps>(({label, className, type, ...other}, ref) => {
    const isMounted = useRef(true);
    const [, name, direction] = type.match(/(.*)-(right|left|up|down)$/) || [
        '',
        type
    ];
    const [IconSVG, setIcon] = useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
        isMounted.current = true;
        // NOTE: we don't want to pollute test output with
        //  console.errors as a result of the dynamic imports
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        import(`./icons/${name}.svg`)
            .then(icon => {
                isMounted.current && setIcon(() => icon.default);
            })
            .catch(() => {
                console.error(`Could not find icon type "${type}".`);
                isMounted.current && setIcon(null);
            });

        return () => {
            isMounted.current = false;
        };
    }, [type,name]);

    const data = {
        ...other,
        'aria-hidden': !label,
        className: classNames('Icon', `Icon--${type}`, className, {
            [`Icon__${direction}`]: !!direction
        })
    };

    return (
        <div ref={ref} {...data}>
            {label && <div className={"sr-only"}>{label}</div>}
            {IconSVG && <IconSVG/>}
        </div>
    )
})
Icon.displayName = 'Icon';
export default Icon
