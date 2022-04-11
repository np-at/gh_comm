import { IComment, ICommentFile, ICommentStorage } from "@interfaces/IComment";
import path from "path";
import { readFileSync } from "fs";
import { decrypt } from "@lib/encryption/crypto";

// export const getComments = async (slug: string): Promise<Array<IComment> | null> => {
//     const {ref, repo, owner} = getGithubParamsFromEnv()
//     try {
//         const comments = await request(
//             "GET /repos/{owner}/{repo}/contents/{path}",
//             {
//                 headers: {
//                     authorization: `token ${token}`,
//                     accept: "application/vnd.github.v3.raw",
//                 },
//                 owner: owner,
//                 repo: repo,
//                 path: `../../comments/${slug}.json`,
//                 ref: ref,
//             }
//         );
//         return JSON.parse(comments.data as unknown as string);
//     } catch (e) {
//         return null;
//     }
// }
const convertCommentStoragetoDisplay: (comment: ICommentStorage) => IComment = (
  comment: ICommentStorage
) => {
  let displayComment: IComment = {
    id: comment.id,
    parentCommentId: comment.parentCommentId ? comment.parentCommentId : null,
    content: comment.content,
    email: comment.email ? decrypt(comment.email) : "",
    date: comment.date,
    username: comment.username,
    page_name: comment.page_name,
    childrenIds: comment.childrenIds,
    children: comment.children
      ? comment.children.map(convertCommentStoragetoDisplay)
      : []
  };
  return displayComment;
};

export const getCommentsFromStatic: (
  slug: string
) => Promise<IComment[] | null> = async (slug: string) => {
  const p = path.join(process.cwd(), "comments", `${slug}.json`);
  try {
    const commentPageJson = readFileSync(p);
    const comments = JSON.parse(
      commentPageJson.toString("utf8")
    ) as ICommentFile | null;

    return assembleCommentRelationships(
      comments?.comments.map(convertCommentStoragetoDisplay) || []
    );
  } catch (e) {
    return null;
  }
};

const assembleCommentRelationships: (
  comments: IComment[] | null,
  debug?: boolean
) => null | IComment[] = (comments: IComment[] | null) => {
  if (comments === null) {
    return null;
  }
  // Iterate over all comments and clear out the children to avoid clobbering
  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i];
    comment.children = [];
  }
  for (const element of comments) {
    const comment = element;
    if (comment.parentCommentId) {
      const parent = comments?.find((c) => c.id === comment.parentCommentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(comment);
      } else
        console.warn(
          "comment found with parentCommentId that does not exist",
          comment
        );
    }
    //        comment .children = comments?.filter(c => c.parentCommentId === comment.id)
  }
  return comments.filter((c) => !c.parentCommentId) ?? [];
};

export const getCommentsFromStaticSync: (slug: string) => IComment[] | null = (
  slug: string
) => {
  const p = path.join(process.cwd(), "comments", `${slug}.json`);
  try {
    const commentPageJson = readFileSync(p);
    return JSON.parse(commentPageJson.toString("utf8")) as IComment[] | null;
  } catch (e) {
    return null;
  }
};
