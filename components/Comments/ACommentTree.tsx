import React from "react";
import { ACItem, IACom } from "@components/Comments/ACItem";

const comments: IACom[] = [
  {
    date: Date.parse("3/30/2022, 11:33:54 AM"),
    user: "test",
    content: "content",
    children: [
      {
        user: "buttface",
        content: "f u",
        date: Date.parse("3/30/2022, 11:34:22 AM") - 20
      }
    ]
  },
  {
    date: Date.parse("3/30/2022, 11:34:22 AM"),
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
        date: -22
      }
    ]
  }
];
export const Overview: React.FC<{ title: string }> = ({title}) => {



    return <>
        <h2>{title}</h2>
        <ol>{comments.map((value, idx) => <ACItem key={`a${idx}`} comment={value}/>)}</ol>
    </>;
}
