import dynamic from "next/dynamic";
import React, {useState} from "react";
import IComment from "@interfaces/IComment";
import {decrypt, Hash} from "@lib/encryption/crypto";

const Comment: React.FC<{ comment: IComment, slug: string }> = ({
                                                                    comment,
                                                                    slug,
                                                                }) => {
    const [reply, setReply] = useState(false); // This state will manage the reply form
    const AddComment = dynamic(() => import("@components/Comments/AddComment")); // No need to import this component if the user won't click on "Reply"

    return (
        <div
            // If this is a child component, we apply a custom class. This is useful to offset child comments from the parent and make a hierachy effect
            className={`${comment.parentCommentId ? "child" : ""}`}>
            <div>
                <div>
                    <span>{comment.date}</span>
                    <span>{comment.username}</span>
                </div>
            </div>
            <p>{comment.content}</p>{" "}
            <button
                type="button"
                onClick={() => setReply(!reply)}
            >
                Reply
            </button>
            {/*// If the reply button is clicked, render the <AddComment/> form (that we'll build next)*/}
            {reply && <AddComment slug={slug} parentCommentId={comment.id}/>}
            {/*// If there is any child comment, render those too*/}
            {comment.children &&
                comment.children.map((child, index) => (
                    <Comment comment={child} slug={slug} key={index}/>
                ))}
        </div>
    );
};
export default Comment