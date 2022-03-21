// IComment.ts
import { Hash } from "@lib/encryption/crypto"; // That's the Hash interface we created before

export default interface IComment {
    // Mandatory parameters
    id: string; // Unique id of the comment
    content: string; // The comment itself
    children: Array<IComment>; // Children of this comment
    parentCommentId?: string; // Optional parent comment id

    // These are optionals, based on one's needs
    username: string;
    date: Date;
    email: Hash
}