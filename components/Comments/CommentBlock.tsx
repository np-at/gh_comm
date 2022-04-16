import React, { SetStateAction, useEffect, useState } from "react";
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
//
// const rootRepoTemplate =
//   "https://raw.githubusercontent.com/np-at/gh_comm/main/content/comments/%s.json";

const checkForNewer = (
  slug: string,
  setStateCallback: React.Dispatch<SetStateAction<IComment[]>>,
  currentComments?: IComment[] | null
) => {
  console.log("testing for newer comments");
  const remoteFile = ""// rootRepoTemplate.replace("%s", slug);
  fetch(remoteFile)
    .then((res) => res.json())
    .then((remoteCommentFile: ICommentFile) => {
      const remoteComments = remoteCommentFile.comments.map(
        convertCommentStorageToDisplayClientSide
      );
      if (CompareCommentLists(remoteComments, currentComments ?? [])) {
        console.log("No new comments");
      } else {
        console.log("new comments", remoteComments);
        setStateCallback(remoteComments);
      }
    });
};
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
  // const { data, error, isLoading } = useFetch<
  //   Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]
  // >(
  //   `https://api.github.com/repos/np-at/gh_comm/contents/content/comments/${sanitizedSlug}.json?ref=main`,
  //
  //   {
  //     headers: {
  //       // Accept: "application/vnd.github.v3.raw"
  //     },
  //     method: "GET"
  //   }
  // );

  useEffect(() => {
    if (!attemptPreemptiveFetch) {
      return;
    }
    if (error) {
      console.log("Error fetching comments", error);
    }
    if (!data) return;
    console.debug("content fetched", data);
    // // @ts-ignore
    // const intermediateContents = data.content
    //   ? // @ts-ignore
    //     JSON.parse<ICommentFile>(Buffer.from(data.content, "base64").toString()).comments
    //   : [];
    // const remoteComments = assembleCommentRelationships(intermediateContents.map(convertCommentStorageToDisplayClientSide)) ?? [];
const remoteComments=    assembleCommentRelationships(data.comments.map(convertCommentStorageToDisplayClientSide)) ??      [];

    console.log("remoteComments", remoteComments);
    console.log("currentComments", currentComments);
    if (CompareCommentLists(remoteComments, currentComments ?? [])) {
      console.debug("No new comments");
    } else {
      console.debug("new comments", remoteComments);
      setCurrentComments(remoteComments);
    }
  }, [isLoading, data, error]);

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
