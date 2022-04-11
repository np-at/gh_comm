import { IComment } from "@interfaces/IComment";

export const assembleCommentRelationships: (
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
      } else console.warn("comment found with parentCommentId that does not exist", comment);
    }
    //        comment .children = comments?.filter(c => c.parentCommentId === comment.id)
  }
  return comments.filter((c) => !c.parentCommentId) ?? [];
};
