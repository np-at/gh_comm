import dynamic from "next/dynamic";
import React, {useState} from "react";
import IComment from "@interfaces/IComment";
import {getKey} from "@lib/utils/Utils";

interface CommentBlockProps {
    slug: string,
    comments?: Array<IComment> | null
}

const CommentBlock: React.FC<CommentBlockProps> = ({
                                                       slug,
                                                       comments,
                                                   }) => {
    // Dynamically import everything to reduce the first load of a page. Also, there might be no comments at all.
    const Comment = dynamic(() => import("@components/Comments/Comment"));
    const AddComment = dynamic(() => import("@components/Comments/AddComment"));
    const [showAddComment, setShowAddComment] = useState(false);

    return (
        <div>
            <p>Comments</p>
            {comments ? (
                comments.map((c) => (
                    <Comment comment={c} key={getKey()} slug={slug}/>
                ))
            ) : (
                <p>
                    There are no comments.
                </p>
            )}
            {showAddComment ? (
                <AddComment slug={slug}/>
            ) : (
                <div>
                    <button
                        type="submit"
                        onClick={() => setShowAddComment(true)}
                    >
                        Comment
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentBlock