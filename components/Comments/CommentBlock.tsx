import React, { useEffect, useState } from "react";
import { IComment, ICommentFile } from "@interfaces/IComment";
import styled from "styled-components";
import { sanitizeSlug } from "@components/Comments/utils";
import { convertCommentStorageToDisplayClientSide } from "@lib/comments/convertCommentStorageToDisplayClientSide";
import useFetch from "react-fetch-hook";
import { CompareCommentLists } from "@lib/comments/Extensions";
import { assembleCommentRelationships } from "@lib/comments/assembleCommentRelationships";
import dynamic from "next/dynamic";
import { PreferOpportunisticFetch } from "@lib/GLOBALS";

interface CommentBlockProps {
  slug: string;
  comments: Array<IComment> | null;
  attemptPreemptiveFetch?: boolean;
}

const CommentBlock: React.FC<CommentBlockProps> = ({
  slug,
  comments,
  attemptPreemptiveFetch = PreferOpportunisticFetch
}) => {
  // Dynamically import everything to reduce the first load of a page. Also, there might be no comments at all.
  const Comment = dynamic(() => import("@components/Comments/Comment"), { ssr: true });
  const AddComment = dynamic(() => import("@components/Comments/AddComment"), { ssr: false });
  const [showAddComment, setShowAddComment] = useState(!comments);
  const [currentComments, setCurrentComments] = useState(comments ?? []);
  const sanitizedSlug = sanitizeSlug(slug);

  const { data, error, isLoading } = useFetch<ICommentFile>(
    `https://raw.githubusercontent.com/np-at/gh_comm/main/content/comments/${slug}.json`,
    {}
  );
  console.log("comments",comments)
  useEffect(() => {
    if (!attemptPreemptiveFetch) {
      return;
    }
    if (error) {
      console.log("Error fetching comments", error);
    }
    if (!data) return;
    console.debug("content fetched", data);

    const remoteComments =
      assembleCommentRelationships(data.comments.map(convertCommentStorageToDisplayClientSide)) ??
      [];

    console.log("remoteComments", remoteComments);
    console.log("currentComments", currentComments);
    if (CompareCommentLists(remoteComments, currentComments ?? [])) {
      console.debug("No new comments");
    } else {
      console.debug("new comments", remoteComments);
      setCurrentComments(remoteComments);
    }
  }, [isLoading, data, error, attemptPreemptiveFetch, currentComments]);

  return (
    <CommentsBlockWrapper>
      <h2>Comments</h2>
      {
        <ul>
          {(currentComments &&
            currentComments?.map((c) => (
              <Comment comment={c} key={c.id} slug={sanitizedSlug} />
            ))) ?? <p>There are no comments.</p>}
        </ul>
      }
      {/*<AddComment slug={sanitizedSlug} />*/}
      {showAddComment ? (
        <AddComment slug={slug} />
      ) : (
        <div>
          <button type="submit" onClick={() => setShowAddComment(true)}>
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
