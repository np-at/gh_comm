import React from 'react'

const ACItem: React.FC<{ comment: IACom }> = props => {
    return <li>
        <div>{new Date(props.comment.date).toLocaleString()}</div>
        <div>{props.comment.user}</div>
        <div>{props.comment.content}</div>
        {props.comment.children &&
            <ol>{props.comment.children.map((x, idx) => <ACItem key={`e${idx}`} comment={x}/>)}</ol>}
    </li>
}

interface IACom {
    date: number,
    user: string,
    content: string,
    children?: IACom[]

}

const comments: IACom[] = [
    {
        date: Date.now(),
        user: "test",
        content: "content",
        children: [
            {
                user: "buttface",
                content: "f u",
                date: Date.now() - 20,
            }
        ]
    },
    {
        date: Date.now(),
        user: "test",
        content: "content",
        children: [
            {
                date: 1238888,
                user: "me",
                content: "content"
            },
            {
                user: "buttface",
                content: "f u",
                date: Date.now() - 20
            }
        ]
    }
]
export const Overview: React.FC<{ title: string }> = ({title}) => <>
    <h2>{title}</h2>
    <ol>{comments.map((value, idx) => <ACItem key={`a${idx}`} comment={value}/>)}</ol>
</>