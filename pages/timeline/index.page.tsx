import React, { Fragment } from "react";
import { type NextPageWithLayout } from "../_app.page";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { type ContentPageData, getMarkdownFileContentFromPath } from "@lib/pages";
import type { IComment } from "@interfaces/IComment";
import styled from "styled-components";
import { getHighlightsSourceFiles } from "./utils";
import Link from "next/link";
import parse from "react-html-parser";
import { niceDateDisplay } from "./FormattingUtils";
import Head from "next/head";

export interface TimelineEventProps extends ContentPageData {
  path?: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  featured_image: string;
  date: string;
  tags: string[];
  comments: IComment[] | null;
}

export interface TimelinePageProps {
  title: string;
  description: string;
  timelineEvents: TimelineEventProps[];
}

export const getStaticProps: GetStaticProps<TimelinePageProps> = async () => {
  const hlightsSourceFiles = await getHighlightsSourceFiles();
  const timelineEvents: TimelineEventProps[] = await Promise.all(
    hlightsSourceFiles.map(async (file) => {
      return (await getMarkdownFileContentFromPath(file)) as TimelineEventProps;
    })
  );
  timelineEvents.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate.getTime() - aDate.getTime();
  });
  return {
    props: {
      title: "Timeline",
      description: "Timeline",
      timelineEvents: timelineEvents ?? []
    }
  };
};
const Highlight: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
  timelineEvents
}) => (
  <Fragment>
    <Head>
      <title>Timeline</title>
    </Head>
    <div>
      <h1>Highlights</h1>

      <EventCardContainer>
        {timelineEvents &&
          timelineEvents.map((event, index) => (
            <EventCard key={`${event.title}-${index}`}>
              <div>
                <h2>{event.title}</h2>
                <div>{niceDateDisplay(event.date)}</div>
              </div>
              <div>{parse(event.body)}</div>
              {event.featured_image && (
                <div>
                  <Link passHref={true} href={`/timeline/${event.title}`}>
                    <a>
                      <Img src={event.featured_image} alt={event.title ?? ""} />
                    </a>
                  </Link>
                </div>
              )}
            </EventCard>
          ))}
      </EventCardContainer>
    </div>
  </Fragment>
);
const EventCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  //border: 1px solid black;
  //border-radius: 5px;
  //margin: 1rem;
  & div {
    margin-left: auto;
    margin-right: auto;
  }

  & > div {
    height: 100%;
  }
 
  & > article:nth-child(even) {
    flex-direction: row-reverse;
    //background-color: rgba(108, 44, 175, 0.3);

    background: linear-gradient(
      to right,
      rgba(108, 44, 175, 0.1) 0%,
      rgba(108, 44, 175, 0.3) 50%,
      rgba(108, 44, 175, 0.5) 100%
    );
   

    & > div:first-child {
      margin: 1.5rem;
      //margin-right: 1rem;
      //margin-left: 1rem;
      text-align: right;

      & h2 {
        text-align: right;
      }
    }
  }

  & > article:nth-child(odd) {
    //background-color: rgba(255, 0, 0, 0.3);
    background: linear-gradient(
      to left,
      rgba(255, 0, 0, 0.1) 0%,
      rgba(255, 0, 0, 0.3) 50%,
      rgba(255, 0, 0, 0.5) 100%
    );

    & > div:first-child {
      margin-left: 1rem;
      text-align: left;

      & h2 {
        text-align: left;
      }
    }
  }
`;
// noinspection CssReplaceWithShorthandSafely
const EventCard = styled.article`
  --row-height: 30rem;

  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: nowrap;
  justify-content: flex-start;

  width: 100%;
  min-height: 12rem;
  max-height: var(--row-height);
  //max-height: 50vh;
  //background-color: var(--card-background-color);
  //color: var(--card-text-color);
  
  color: var(--text-color-base);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  //padding: 10px;
  padding: 2em 2em;
  //transition: all 0.3s ease;

  & > div {
    flex-direction: column;
    max-height: 100%;
    flex-wrap: nowrap;
    //min-width: 26vw;
    //height: 100%;
    max-width: 40vw;
    //overflow-y: auto;
    display: block;

    &:first-child {
      margin: 1rem;
    }

    &:nth-child(2) {
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: inherit;
      padding-bottom: inherit;
      min-width: 30vw;
    }

    &:last-child {
      margin: 0;
      min-height: 13vh;
      max-height: var(--row-height);
    }
  }

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;
const Img = styled.img`
  //display: flex;
  //flex-shrink: 1;
  aspect-ratio: auto;
  //width: 100%;

  //min-width: 25em;
  width: 100%;
  height: auto;
  max-height: var(--row-height);
  //height: auto;
  border-radius: 7px;
`;
// noinspection JSUnusedGlobalSymbols
export default Highlight;
