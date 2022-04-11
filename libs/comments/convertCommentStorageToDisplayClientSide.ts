import { IComment, ICommentStorage } from "@interfaces/IComment";

export const convertCommentStorageToDisplayClientSide: (
  comment: ICommentStorage
) => IComment = (comment) => ({
  id: comment.id,
  parentCommentId: comment.parentCommentId ? comment.parentCommentId : null,
  content: comment.content,
  email: "",
  date: comment.date,
  username: comment.username,
  page_name: comment.page_name,
  childrenIds: comment.childrenIds,
  children: comment.children
    ? comment.children.map((c) => convertCommentStorageToDisplayClientSide(c))
    : []
});
