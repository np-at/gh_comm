import React, { Fragment, ReactEventHandler, useMemo } from "react";
import { type NextPageWithLayout } from "../_app.page";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { type ContentPageData, getMarkdownFileContentFromPath } from "@lib/serverside_utils/pages";
import type { IComment } from "@interfaces/IComment";
import styled from "styled-components";
import { getHighlightsSourceFiles } from "./utils";
import Link from "next/link";
import parse from "react-html-parser";
import { niceDateDisplay } from "./FormattingUtils";
import Head from "next/head";
import RowDiv from "@components/Layout/Row";
import NextImageFix from "@components/Reusable/NextImageFix";

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

const sortByDate = (a: TimelineEventProps, b: TimelineEventProps) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};
export const getStaticProps: GetStaticProps<TimelinePageProps> = async () => {
  const hlightsSourceFiles = await getHighlightsSourceFiles();
  const timelineEvents: TimelineEventProps[] = await Promise.all(
    hlightsSourceFiles.map(async (file) => {
      return (await getMarkdownFileContentFromPath(file)) as TimelineEventProps;
    })
  );
  timelineEvents.sort(sortByDate);
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
}) => {
  const [sortBy, setSortBy] = React.useState("date");
  const events = useMemo(() => {
    switch (sortBy) {
      case "date":
        timelineEvents.sort(sortByDate);
        break;
      case "title":
        timelineEvents.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      default:
        break;
    }
    return timelineEvents;
  }, [timelineEvents, sortBy]);

  const sortHandler: ReactEventHandler<HTMLSelectElement> = (ev) =>
    setSortBy(ev.currentTarget.value);

  return (
    <Fragment>
      <Head>
        <title>Timeline</title>
      </Head>

      <ExpandWrapper>
        <h1>Highlights</h1>
        <RowDiv alignment={"center"}>
          <label>
            Sort By:{" "}
            <select onChange={sortHandler} defaultValue={"date"}>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </label>
        </RowDiv>
        <EventCardContainer>
          {events &&
            events.map((event, index) => (
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
      </ExpandWrapper>
    </Fragment>
  );
};
const ExpandWrapper = styled.div`
  width: 100%;
`;
const EventCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;

  & div {
    margin-left: auto;
    margin-right: auto;
  }

  & > div {
    height: 100%;
  }

  & > article:nth-child(even) {
    flex-direction: row-reverse;
    @media screen and (max-width: 720px) {
      flex-direction: column;
    }
    //background-color: rgba(108, 44, 175, 0.3);

    background: linear-gradient(
      to right,
      rgba(108, 44, 175, 0.1) 0%,
      rgba(108, 44, 175, 0.3) 50%,
      rgba(108, 44, 175, 0.5) 100%
    );

    @media screen and (min-width: 720px) {
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
  }

  & > article:nth-child(odd) {
    @media screen and (max-width: 720px) {
      flex-direction: column;
    }
    //background-color: rgba(255, 0, 0, 0.3);
    background: linear-gradient(
      to left,
      rgba(255, 0, 0, 0.1) 0%,
      rgba(255, 0, 0, 0.3) 50%,
      rgba(255, 0, 0, 0.5) 100%
    );

    @media screen and (min-width: 720px) {
      & > div:first-child {
        margin-left: 1rem;
        text-align: left;

        & h2 {
          text-align: left;
        }
      }
    }
  }

  & > article {
    @media screen and (max-width: 720px) {
      margin: 1rem 0;
      text-align: center;
      & > div > h2 {
        text-align: center;
      }

      & > div:last-child {
        // this pushes the image wrapper to the top
        // visually but maintains heading structure
        // for accessibility purposes
        order: -1;
      }
    }
  }
`;
// noinspection CssReplaceWithShorthandSafely
const EventCard = styled.article`
  --row-height: 30rem;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: nowrap;
  justify-content: flex-start;

  width: 100%;
  min-height: 12rem;
  @media screen and (min-width: 720px) {
    max-height: var(--row-height);
  }
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

  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > div {
      width: 100%;
      max-width: 100%;
    }
  }
`;
const Img = styled(NextImageFix)`
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
