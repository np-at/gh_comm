import React from "react";
import { sanitizeSlug } from "@components/Comments/utils";
import CommentBlock from "@components/Comments/CommentBlock";
import { getCommentsFromStatic } from "@lib/comments/_utils";
import { InferGetStaticPropsType } from "next";

const SLUG = "/nested/comment_page";
const SLUG2 = sanitizeSlug(SLUG);

//
export const getStaticProps = async () => {
  const comments = await getCommentsFromStatic(SLUG2);
  return { notFound: false, props: { comments: comments } };
};

const CommentPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = (
  p
) => {

  return <CommentBlock slug={SLUG2} comments={p.comments} />;
};


// noinspection JSUnusedGlobalSymbols
export default CommentPage;
