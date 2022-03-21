import dynamic from "next/dynamic";
import React, {useState} from "react";
import IComment from "@interfaces/IComment";
// import {decrypt, Hash} from "@lib/encryption/crypto";

const Comment: React.FC<{ comment: IComment, slug: string }> = ({
                                                                    comment,
                                                                    slug,

                                                                }) => {
    const [reply, setReply] = useState(false); // This state will manage the reply form
    const AddComment = dynamic(() => import("@components/Comments/AddComment")); // No need to import this component if the user won't click on "Reply"

    return (
        <li
            // If this is a child component, we apply a custom class. This is useful to offset child comments from the parent and make a hierachy effect
            className={`${comment.parentCommentId ? "child" : ""}`}>
            <div>
                <div>
                    <div>{ new Date(comment.date).toLocaleString()}</div>
                    <span>{comment.username || comment.email}</span>
                </div>
            </div>
            <p>{comment.content}</p>
            <button
                type="button"
                onClick={() => setReply(!reply)}
            >
                Reply
            </button>
            {/*// If the reply button is clicked, render the <AddComment/> form*/}
            {reply && <AddComment slug={slug} parentCommentId={comment.id}/>}
            {/*// If there is any child comment, render those too*/}
            {comment.children &&
                <ol>{comment.children.map((child, index) => (
                    <Comment comment={child} slug={slug} key={index}/>
                ))}</ol>}
        </li>
    );
};
export default Comment