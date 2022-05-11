//noinspection JSUnusedGlobalSymbols

import React from "react";
import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {getContentDirectory, getMarkdownFileContentFromPath} from "@lib/serverside_utils/pages";
import {join} from "node:path";
import type {TimelineEventProps} from "./index.page";
import type {NextPageWithLayout} from "../_app.page";
import CommentBlock from "@components/Comments/CommentBlock";
import {getHighlightsSourceFiles} from "./utils";
import styled from "styled-components";
import RowDiv, {CenteredRow} from "@components/Layout/Row";
import {getCommentsFromStatic} from "@lib/comments/_utils";
import {sanitizeSlug} from "@components/Comments/utils";
import {niceDateDisplay} from "./FormattingUtils";
import NextImageFix from "@components/Reusable/NextImageFix";

// TODO: make this less awful
export const getStaticPaths: GetStaticPaths = async () => {
  const highlights = await getHighlightsSourceFiles(false);
  const paths = highlights.map((highlight) => {
    // kludgy
    const ev = highlight.replace(/^content[\/\\]events/, "timeline").replace(/\.md$/, "");
    return {
      params: {
        event: sanitizeSlug(ev.replaceAll(/(\.md$)|(timeline[\/\\])/gim, "")),
        pth: ev
      }
    };
  });
  return {
    paths,
    fallback: false
  };
};
export const getStaticProps: GetStaticProps<TimelineEventProps> = async ({ params }) => {
  const event = params?.event;
  const sanitizedPath = sanitizeSlug(event ? `/timeline/${event}` : "");
  const resolvedPath = join(getContentDirectory(true), `events/${event}.md`);
  const comments = await getCommentsFromStatic(sanitizedPath);
  const eventContent = getMarkdownFileContentFromPath(resolvedPath) as TimelineEventProps;
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
}) => {
  return (
    <div style={{ width: "80%" }}>
      <RowDiv className="row">
        <h1>{title}</h1>
        <h2>{niceDateDisplay(date)}</h2>
        <CenteredRow>
          <BannerImage src={featured_image} alt={description} />
        </CenteredRow>

        <div dangerouslySetInnerHTML={{ __html: body }} />
      </RowDiv>
      <RowDiv>
        <CommentBlock slug={path ?? fullPath} comments={comments} attemptPreemptiveFetch={false} />
      </RowDiv>
    </div>
  );
};
const BannerImage = styled(NextImageFix)`
  height: auto;
  aspect-ratio: initial;
  max-height: 400px;
  border-radius: 8px;
  //width: 100%;
`;
export default Highlight;
