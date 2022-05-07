import type {IComment, ICommentFile, ICommentStorage} from "@interfaces/IComment";
import path from "path";
import {readFileSync} from "fs";
import {decrypt} from "@lib/encryption/crypto";
import {assembleCommentRelationships} from "@lib/comments/assembleCommentRelationships";

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
const convertCommentStorageToDisplay: (
  comment: ICommentStorage,
  unmaskEmails?: boolean
) => IComment = (comment, unmaskEmails = false) => {
  return {
    id: comment.id,
    parentCommentId: comment.parentCommentId ? comment.parentCommentId : null,
    content: comment.content,
    email: unmaskEmails && comment.email ? decrypt(comment.email) : "",
    date: comment.date,
    username: comment.username,
    page_name: comment.page_name,
    childrenIds: comment.childrenIds,
    children: comment.children
      ? comment.children.map((c) => convertCommentStorageToDisplay(c, unmaskEmails))
      : []
  };
};

export const getCommentsFromStatic: (
  slug: string,
  unmaskEmails?: boolean
) => Promise<IComment[] | null> = async (slug: string, unmaskEmails = false) => {
  const p = path.join(process.cwd(),"content", "comments", `${slug}.json`);
  try {
    const commentPageJson = readFileSync(p);
    const comments = JSON.parse(
      commentPageJson.toString("utf8")
    ) as ICommentFile | null;

    return assembleCommentRelationships(comments?.comments.map((c)=>convertCommentStorageToDisplay(c, unmaskEmails)) || []);
  } catch (e) {
    return null;
  }
};

export const getCommentsFromStaticSync: (slug: string) => IComment[] | null = (
  slug: string
) => {
  const p = path.join(process.cwd(),"content", "comments", `${slug}.json`);
  try {
    const commentPageJson = readFileSync(p);
    return JSON.parse(commentPageJson.toString("utf8")) as IComment[] | null;
  } catch (e) {
    return null;
  }
};
