import React from "react";

export const ACItem: React.FC<{ comment: IACom }> = props => {


    return <li>
        <div>{new Date(props.comment.date ?? "").toLocaleString()}</div>
        <div>{props.comment.user ?? ""}</div>
        <div>{props.comment.content ?? ""}</div>
        {props.comment.children &&
            <ol>{props.comment.children.map((x, idx) => <ACItem key={`e${idx}`} comment={x}/>)}</ol>}
    </li>
}

export interface IACom {
    date: number,
    user: string,
    content: string,
    children?: IACom[]

}
