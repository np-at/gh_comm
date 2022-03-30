import React from "react";
import {IPageBase} from "@interfaces/IPageBase";
import {sanitizeSlug} from "@components/Comments/utils";
import CommentBlock from "@components/Comments/CommentBlock";
import {getCommentsFromStatic, getCommentsFromStaticSync} from "@lib/comments/_utils";
import {GetStaticProps, InferGetServerSidePropsType} from "next";

const SLUG = "/nested/comment_page"
const SLUG2 = sanitizeSlug(SLUG)

export interface CommentPageProps extends IPageBase {

}

//
export const getStaticProps = async () => {
    const comments = await getCommentsFromStatic(SLUG2)
    // const comments = await getComments(SLUG2)
    return {notFound: false, props: {comments: comments}};
}

const CommentPage: React.FC<InferGetServerSidePropsType<typeof getStaticProps>> = (p) => {

    // const comments = getCommentsFromStaticSync(SLUG2) ?? []
    // console.log(comments)

    return <CommentBlock slug={SLUG2} comments={p.comments ?? []}/>

}
export default CommentPage