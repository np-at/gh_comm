import type { IComment } from "@interfaces/IComment";

const getChildrenForComment = (rootComment: IComment, comments: IComment[]) => {
  const { childrenIds } = rootComment;
  if (!childrenIds) {
    return;
  }
  const children = comments.filter((comment) => childrenIds?.includes(comment.id));
  if (children.length > 0) {
    rootComment.children = children ? children : [];
    children.forEach((childComment) => getChildrenForComment(childComment, comments));
  }
};

// takes a flattened list of comments and assembled the comment tree (populates the children property using the parentId property of each node)
// could definitely be optimized
export const assembleCommentRelationships = (comments: IComment[]) => {
  const rootComments = comments.filter((c) => c.parentCommentId === null) ?? [];
  rootComments.forEach((comment) => getChildrenForComment(comment, comments));
  return rootComments;
};


export const assembleCommentRelationships_old: (
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
