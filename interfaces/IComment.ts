// IComment.ts
export interface IComment {
    page_name: string;
    // Mandatory parameters
    id: string; // Unique id of the comment
    content: string; // The comment itself
    childrenIds?: string[]; // The ids of the comments that are children to this comment.
    children?: Array<IComment>; // Objects of type IComment that are children to this comment.  This is a convenience property that is only used for the UI. It is not persisted.
    parentCommentId?: string; // Optional parent comment id

    // These are optionals, based on one's needs
    username: string;
    date: Date;
    email: string
}

export interface ICommentFile {
    comments: IComment[];
    page_name: string;
}
