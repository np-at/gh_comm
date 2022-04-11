// IComment.ts

import { Hash } from "@lib/encryption/crypto";

interface ICommentBase {
  page_name: string;
  // Mandatory parameters
  id: string; // Unique id of the comment
  content: string; // The comment itself
  childrenIds: string[] | null; // The ids of the comments that are children to this comment.
  parentCommentId: string | null; // Optional parent comment id

  // These are optionals, based on one's needs
  username: string;
  date: Date;
}

export interface ICommentStorage extends ICommentBase {
  children: Array<ICommentStorage> | null; // Objects of type IComment that are children to this comment.  This is a convenience property that is only used for the UI. It is not persisted.

  email: Hash | null;
}

export interface IComment extends ICommentBase {
  children: Array<IComment> | null; // Objects of type IComment that are children to this comment.  This is a convenience property that is only used for the UI. It is not persisted.

  email: string;
}

export interface ICommentFile {
  comments: ICommentStorage[];
  page_name: string;
}
