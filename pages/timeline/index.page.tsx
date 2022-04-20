import React, { Fragment, useMemo } from "react";
import type { ReactEventHandler } from "react";
import type { NextPageWithLayout } from "../_app.page";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { getMarkdownFileContentFromPath } from "@lib/serverside_utils/pages";
import type { ContentPageData } from "@lib/serverside_utils/pages";
import type { IComment } from "@interfaces/IComment";
import styled from "styled-components";
import { getHighlightsSourceFiles } from "./utils";
import Link from "next/link";
import { niceDateDisplay } from "./FormattingUtils";
import Head from "next/head";
import RowDiv from "@components/Layout/Row";
import NextImageFix from "@components/Reusable/NextImageFix";
import { sanitizeSlug } from "@components/Comments/utils";
import { breakpoints } from "@styles/MediaBreakpoints";

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
      const evProps = (await getMarkdownFileContentFromPath(file)) as TimelineEventProps;

      // kludge
      evProps.path = sanitizeSlug(
        file
          .replace(/^content[\/\\]events/, "timeline")
          .replace(/\.md$/, "")
          .replaceAll(/(\.md$)|(timeline[\/\\])/gim, "")
      );
      return evProps;
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

const TimelinePage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
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
                {(event.body && <div dangerouslySetInnerHTML={{ __html: event.body }}></div>) ?? (
                  <div />
                )}
                {event.featured_image && (
                  <div>
                    <Link passHref={true} href={`/timeline/${event.path}`}>
                      <a>
                        <Img src={event.featured_image} alt={""} />
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
  --row-height: 30rem;

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

  // & > article:nth-child(even) {
  //   flex-direction: row-reverse;
  //   @media screen and (max-width: 720px) {
  //     flex-direction: column;
  //   }
  //   //background-color: rgba(108, 44, 175, 0.3);
  //
  //   background: linear-gradient(
  //     to right,
  //     rgba(108, 44, 175, 0.1) 0%,
  //     rgba(108, 44, 175, 0.3) 50%,
  //     rgba(108, 44, 175, 0.5) 100%
  //   );
  //
  //   @media screen and (min-width: 720px) {
  //     & > div:first-child {
  //       margin: 1.5rem;
  //       //margin-right: 1rem;
  //       //margin-left: 1rem;
  //       text-align: right;
  //
  //       & h2 {
  //         text-align: right;
  //       }
  //     }
  //   }
  // }
  //
  // & > article:nth-child(odd) {
  //   @media screen and (max-width: 720px) {
  //     flex-direction: column;
  //   }
  //   //background-color: rgba(255, 0, 0, 0.3);
  //
  //
  //   @media screen and (min-width: ${breakpoints.md}) {
  //     & > div:first-child {
  //       margin-left: 1rem;
  //       text-align: left;
  //
  //       & h2 {
  //         text-align: left;
  //       }
  //     }
  //   }
  // }
  //
  // & > article {
  //   @media screen and (max-width: ${breakpoints.md}) {
  //     margin: 1rem 0;
  //     text-align: center;
  //     & > div > h2 {
  //       text-align: center;
  //     }
  //
  //     & > div:last-child {
  //       // this pushes the image wrapper to the top
  //       // visually but maintains heading structure
  //       // for accessibility purposes
  //       order: -1;
  //     }
  //   }
  // }
`;
// noinspection CssReplaceWithShorthandSafely
const EventCard = styled.article`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-flow: dense;

  & > div {
    // title and date cell
    &:first-child {
      text-align: center;
    }
  }

  &:nth-child(even) {
    background: linear-gradient(
      to right,
      rgba(108, 44, 175, 0.1) 0%,
      rgba(108, 44, 175, 0.3) 50%,
      rgba(108, 44, 175, 0.5) 100%
    );

    & > div {
      display: inline-block;
      grid-row: 1 / span 1;

      // Title / date cell
      &:first-child {
        text-align: center;

        grid-column: 1 / span 2;
      }

      // Card body cell
      &:nth-child(2) {
        grid-column: 3 / span 4;
      }

      // Image cell
      &:nth-child(3) {
        grid-column: 7 / span 3;
      }
    }
  }

  &:nth-child(odd) {
    background: linear-gradient(
      to left,
      rgba(255, 0, 0, 0.1) 0%,
      rgba(255, 0, 0, 0.3) 50%,
      rgba(255, 0, 0, 0.5) 100%
    );

    & > div {
      &:nth-child(1) {
        grid-column: 8 / span 2;
      }

      &:nth-child(2) {
        grid-column: 4 / span 4;
      }

      &:nth-child(3) {
        left: 0;
        margin-right: auto;
        grid-column: 1 / span 3;
      }
    }
  }

  //display: flex;
  //flex-direction: row;
  align-items: flex-start;
  flex-wrap: nowrap;
  justify-content: flex-start;

  width: 100%;
  min-height: 12rem;
  @media screen and (min-width: ${breakpoints.md}) {
    max-height: var(--row-height);
  }
  @media screen and (max-width: ${breakpoints.md}) {
    max-height: unset;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(9, 1fr);
    & > div {
      width: 100%;
      display: block;
      grid-column: unset !important;

      &:nth-child(1) {
        grid-row: span 2;
        width: 100%;
        height: auto;
      }

      &:nth-child(2) {
        grid-row: span 4;
      }

      &:nth-child(3) {
        left: unset;
        margin-right: auto;
        margin-left: auto;
        grid-row: 1 / span 3;
      }
    }
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
    height: 100%;
    max-width: 40vw;
    width: auto;
    //overflow-y: auto;
    //display: block;

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
      margin-right: 0;
      //margin: 0;
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
  aspect-ratio: 1.33;
  //width: 100%;

  //min-width: 25em;
  width: 100%;
  height: auto;
  //height: 100%;
  max-height: var(--row-height);
  //height: auto;
  border-radius: 7px;
`;
// noinspection JSUnusedGlobalSymbols
export default TimelinePage;
