import { IComment, ICommentFile } from "@interfaces/IComment";
import path from "path";
import { readFileSync } from "fs";

export const getCommentsFromStatic: (slug: string) => Promise<IComment[] | null> = async (slug: string) => {
  const p = path.join(process.cwd(), "comments", `${slug}.json`);
  try {
    const commentPageJson = readFileSync(p);
    const comments = JSON.parse(commentPageJson.toString("utf8")) as (ICommentFile | null);
    return assembleCommentRelationships(comments?.comments || []);
  } catch (e) {
    return null;
  }
};

const assembleCommentRelationships: (comments: (IComment[] | null), debug?: boolean) => (null | IComment[]) = (comments: IComment[] | null) => {
  if (comments === null) {
    return null;
  }
  // Iterate over all comments and clear out the children to avoid clobbering
  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i]
    comment.children = [];
  }
  for (let i = 0; i < comments.length; i++){
    const comment = comments[i];
    if (comment.parentCommentId) {
      const parent = comments?.find(c => c.id === comment.parentCommentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(comment);
      } else
        console.warn("comment found with parentCommentId that does not exist", comment);
    }
//        comment .children = comments?.filter(c => c.parentCommentId === comment.id)
  }
  return comments.filter(c => !c.parentCommentId) ?? [];

};

export const getCommentsFromStaticSync: (slug: string) => IComment[] | null = (slug: string) => {
  const p = path.join(process.cwd(), "comments", `${slug}.json`);
  try {
    const commentPageJson = readFileSync(p);
    return JSON.parse(commentPageJson.toString("utf8")) as (IComment[] | null);
  } catch (e) {
    return null;
  }
};
