import React from "react";
import { NextPageWithLayout } from "../_app.page";
import { GetStaticProps } from "next";
import { ContentPageData, getMarkdownFileContentFromPath } from "@lib/pages";
import { IComment } from "@interfaces/IComment";
import styled from "styled-components";
import { getHighlightsSourceFiles } from "./utils";
import Link from "next/link";

export interface HighlightProps extends ContentPageData {
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

export interface HighLightPageProps {
  title: string;
  description: string;
  highlights?: HighlightProps[];
}

export const getStaticProps: GetStaticProps<HighLightPageProps> = async (
  context
) => {

  const hlightsSourceFiles = await getHighlightsSourceFiles();
  const highlights: HighlightProps[] = await Promise.all(
    hlightsSourceFiles.map(async (file) => {
      return (await getMarkdownFileContentFromPath(file)) as HighlightProps;
    })
  );

  return {
    props: {
      title: "Highlights",
      description: "Highlights",
      highlights: highlights ?? [],
    },
  };
};

const Highlight: NextPageWithLayout<HighLightPageProps> = ({ highlights }) => {
  console.log("highlights", highlights);
  return (
    <>
      <div style={{ width: "100%" }}>
        <h1>Highlights</h1>
        <EventCardContainer>
          {highlights?.map((highlight, index) => (
            <EventCard key={`${highlight.fullPath}`}>
              <div>
                <h2>{highlight.title}</h2>
                <div>{highlight.date}</div>
              </div>
              {/*<div><p>{highlight.description}</p></div>*/}
              <div>
                <p dangerouslySetInnerHTML={{ __html: highlight.body }} />
              </div>
              {highlight.featured_image && (
                <div>
                  <Link passHref={true} href={`/highlights/${highlight.title}`}>
                    <a>
                      <Img
                        src={highlight.featured_image}
                        alt={highlight.title}
                      />
                    </a>
                  </Link>
                </div>
              )}
            </EventCard>
          ))}
        </EventCardContainer>
      </div>
    </>
  );
};
const EventCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  margin: 1rem;

  & div {
    //box-sizing: content-box;
    margin-left: auto;
    margin-right: auto;
  }

  & > div {
    height: 100%;
  }

  & > article:nth-child(even) {
    flex-direction: row-reverse;

    & > div:first-child {
      margin: 1.5rem;
      //margin-right: 1rem;
      //margin-left: 1rem;
      text-align: right;
    }
  }

  & > article:nth-child(odd) {
    background-color: red;

    & > div:first-child {
      margin-left: 1rem;
      text-align: left;
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
  background-color: var(--card-background-color);
  color: var(--card-text-color);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  //padding: 10px;
  padding: 2em 2em;
  transition: all 0.3s ease;

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
      min-width: 40vw;
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
  //border-radius: 10px;
`;
export default Highlight;
