import React, { useState } from "react";
import { IComment } from "@interfaces/IComment";
import styled from "styled-components";
import Comment from "./Comment";
import { sanitizeSlug } from "@components/Comments/utils";
import AddComment from "@components/Comments/AddComment";

interface CommentBlockProps {
  slug: string;
  comments: Array<IComment> | null;
}

const CommentBlock: React.FC<CommentBlockProps> = ({ slug, comments }) => {
  // Dynamically import everything to reduce the first load of a page. Also, there might be no comments at all.
  //    const Comment = dynamic(() => import("@components/Comments/Comment"));
  //    const AddComment = dynamic(() => import("@components/Comments/AddComment"));
  const [showAddComment, setShowAddComment] = useState(!comments);
  const sanitizedSlug = sanitizeSlug(slug);
  return (
    <CommentsBlockWrapper>
      <h2>Comments</h2>
      {
        <ul>
          {(comments &&
            comments.map((c) => (
              <Comment comment={c} key={c.id} slug={sanitizedSlug} />
            ))) ?? <p>There are no comments.</p>}
        </ul>
      }
      {/*<AddComment slug={sanitizedSlug} />*/}
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
    </CommentsBlockWrapper>
  );
};

export default CommentBlock;

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
`;
