//noinspection JSUnusedGlobalSymbols

import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getContentDirectory, getMarkdownFileContentFromPath } from "@lib/pages";
import { join } from "node:path";
import { TimelineEventProps } from "./index.page";
import { NextPageWithLayout } from "../_app.page";
import CommentBlock from "@components/Comments/CommentBlock";
import { getHighlightsSourceFiles } from "./utils";
import styled from "styled-components";
import RowDiv, { CenteredRow } from "@components/Layout/Row";
import { getCommentsFromStatic } from "@lib/comments/_utils";
import { sanitizeSlug } from "@components/Comments/utils";

// TODO: make this less awful
export const getStaticPaths: GetStaticPaths = async () => {
  const highlights = await getHighlightsSourceFiles(false);
  const paths = highlights.map((highlight) => {
    const ev = highlight
      .replace(/^content[\/\\]events/, "timeline")
      .replace(/\.md$/, "");
    return {
      params: {
        event: ev.replaceAll(/(\.md$)|(timeline[\/\\])/gim, ""),
        pth: ev
      }
    };
  });
  return {
    paths,
    fallback: false
  };
};
export const getStaticProps: GetStaticProps<TimelineEventProps> = async ({
  params
}) => {
  const event = params?.event;
  const sanitizedPath = sanitizeSlug(event ? `/timeline/${event}` : "");
  const resolvedPath = join(getContentDirectory(true), `events/${event}.md`);
  const comments = await getCommentsFromStatic(sanitizedPath);
  const eventContent = getMarkdownFileContentFromPath(
    resolvedPath
  ) as TimelineEventProps;
  eventContent.comments = comments;
  eventContent.path = sanitizedPath;
  return {
    notFound: !eventContent,
    props: eventContent
  };
};

const Highlight: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
  title,
  description,
  date,
  featured_image,
  body,
  fullPath,
  comments,
  path
}: TimelineEventProps) => {
  return (
    <div style={{ width: "80%" }}>
      <RowDiv className="row">
        <h1>{title}</h1>
        <h2>{date}</h2>
        <CenteredRow>
          <BannerImage src={featured_image} alt={description} />
        </CenteredRow>

        <div dangerouslySetInnerHTML={{ __html: body }} />
      </RowDiv>
      <RowDiv>
        <CommentBlock slug={path ?? fullPath} comments={comments} />
      </RowDiv>
    </div>
  );
};
const BannerImage = styled.img`
  height: auto;
  aspect-ratio: initial;
  max-height: 400px;
  //width: 100%;
`;
export default Highlight;
