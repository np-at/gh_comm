import React, { useState } from "react";
import type { IComment } from "@interfaces/IComment";
import dynamic from "next/dynamic";
import styled from "styled-components";

const Comment: React.FC<{ comment: IComment; slug: string }> = ({ comment, slug }) => {
  const [reply, setReply] = useState(false); // This state will manage the reply form
  const AddComment = dynamic(() => import("@components/Comments/AddComment")); // No need to import this component if the user won't click on "Reply"

  return (
    <li
      // If this is a child component, we apply a custom class. This is useful to offset child comments from the parent and make a hierachy effect
      className={`${comment.parentCommentId ? "child" : ""}`}>
      <div>
        {"  Posted by: "}
        <span>{comment.username}</span>
        <span aria-hidden={"true"}> | </span>
        <span>{new Date(comment.date).toLocaleString()}</span>
      </div>
      <CommentBody>{comment.content}</CommentBody>
      <ReplyButton type="button" onClick={() => setReply(!reply)}>
        Reply
      </ReplyButton>
      {/*// If the reply button is clicked, render the <AddComment/> form*/}
      {reply && <AddComment slug={slug} parentCommentId={comment.id} />}
      {/*// If there is any child comment, render those too*/}
      {comment.children && (
        <ol>
          {comment.children.map((child, index) => (
            <Comment comment={child} slug={slug} key={index} />
          ))}
        </ol>
      )}
    </li>
  );
};
const CommentBody = styled.p`
  padding-left: 1em;
`;

const ReplyButton = styled.button`
  background: rgba(75, 180, 104, 0.58);
  border: none;
  padding: 10px;
  //font-size: 1em;
  //margin: 0.5em;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background: rgba(75, 180, 104, 0.8);
  }
`;

export default Comment;
