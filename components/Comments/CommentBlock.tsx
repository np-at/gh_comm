import dynamic from "next/dynamic";
import React, {useState} from "react";
import IComment from "@interfaces/IComment";
import styled from "styled-components"
import Comment from "./Comment";
import AddComment from "@components/Comments/AddComment";


interface CommentBlockProps {
    slug: string,
    comments: Array<IComment>
}

const CommentBlock: React.FC<CommentBlockProps> = ({
                                                       slug,
                                                       comments,
                                                   }) => {
    // Dynamically import everything to reduce the first load of a page. Also, there might be no comments at all.
//    const Comment = dynamic(() => import("@components/Comments/Comment"));
//    const AddComment = dynamic(() => import("@components/Comments/AddComment"));
    // const [showAddComment, setShowAddComment] = useState(false);

    return (
        <CommentsBlockWrapper>
            <h2>Comments</h2>
            {
                <ol>{
                    comments.map((c) => (
                        <Comment comment={c} key={c.id} slug={slug}/>
                    )) ?? <p>
                        There are no comments.
                    </p>
                }</ol>
            }
            <AddComment slug={slug}/>
            {/*{showAddComment ? (*/}
            {/*    <AddComment slug={slug}/>*/}
            {/*) : (*/}
            {/*    <div>*/}
            {/*        <button*/}
            {/*            type="submit"*/}
            {/*            onClick={() => setShowAddComment(true)}*/}
            {/*        >*/}
            {/*            Comment*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*)}*/}
        </CommentsBlockWrapper>
    );
};

export default CommentBlock

const CommentsBlockWrapper = styled.div`
  display: block;
  width: 100%;

  & > div {
    display: block;
    width: 100%;

    & > div {
      display: inherit;
      width: inherit;
      margin-left: 2em;
    }
  }
`
