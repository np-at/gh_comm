import React from "react";
import {GetStaticProps} from "next";
import {IPageBase} from "@interfaces/IPageBase";
import { sanitizeSlug} from "@components/Comments/utils";
import CommentBlock from "@components/Comments/CommentBlock";
import {getCommentsFromStatic} from "@lib/comments/_utils";

const SLUG = "/nested/comment_page"
const SLUG2 = sanitizeSlug(SLUG)

export interface CommentPageProps extends IPageBase {

}

export const getStaticProps: GetStaticProps<CommentPageProps> = async context => {
    const comments = await getCommentsFromStatic(SLUG2)
    // const comments = await getComments(SLUG2)
    return {notFound: false, props: {comments: comments}};
}

const CommentPage: React.FC<CommentPageProps> = (props, context) => {
    return <>
        <CommentBlock slug={SLUG2} comments={props.comments} />
    </>
}
export default CommentPage