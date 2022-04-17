import type { InferGetStaticPropsType, NextPage } from "next";
import { type GetStaticProps } from "next";
import { type IComment } from "@interfaces/IComment";
import styled from "styled-components";

import {
  getMarkdownFileContentFromSlug,
  type HomePageCMSFields
} from "@lib/serverside_utils/pages";
import type { AppThemeProps } from "@styles/GlobalStylesProvider";
import { SRSpan } from "@components/Reusable/SROnly";
import { Fragment } from "react";
import Head from "next/head";

interface HomePageProps {
  comments: IComment[] | null;
  matterData: HomePageCMSFields;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (_) => {
  const s = getMarkdownFileContentFromSlug<HomePageCMSFields>("home");
  if (s === null) {
    throw new Error("No home page found");
  }
  const comments = null;
  return {
    notFound: false,
    props: {
      comments: comments,
      matterData: s
    }
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => (
  <Fragment>
    <Head>
      <title>Dmitri Memorial - Home</title>
    </Head>
    <div>
      <HomePageLayout>
        {/*<PortraitWrapper2><NextImageFix src={props.matterData.picture} alt={""} /></PortraitWrapper2>*/}
        <PortraitWrapper>
          <Img src={props.matterData.picture} alt={""} />
        </PortraitWrapper>
        <ArticleColumn>
          <h1>{props.matterData.title}</h1>
          {props.matterData.body && (
            <div dangerouslySetInnerHTML={{ __html: props.matterData.body }} />
          )}
        </ArticleColumn>
      </HomePageLayout>
      <Footer>
        <h2>Other Suggested Links</h2>
        {props.matterData.suggested_links && (
          <ul>
            {props.matterData.suggested_links.map((link) => (
              <li key={link.title}>
                <a
                  href={link.url}
                  target={"_blank"}
                  rel={"noreferrer"}
                  referrerPolicy={"no-referrer"}>
                  {link.title}
                  <SRSpan>Opens in new page</SRSpan>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Footer>
    </div>
  </Fragment>
);
const Footer = styled.footer<AppThemeProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-bottom: 2rem;
  margin-top: 1rem;
  //background-color: #fafafa;
  background-color: var(--menu-background-color);

  //border-top: 1px solid #eaeaea;
  //font-size: 0.8rem;
  color: var(--text-color-base);
  width: 100%;
  //height: 4em;
  flex-wrap: wrap;
  //padding: 1em 1rem;
  & h2 {
    font-size: 1.5rem;
    text-decoration: underline;
    //margin-bottom: 0.5rem;
    //flex-grow: ;
  }

  & > ul {
    padding: 0;
    margin: 1rem 0;
    list-style: none;
    height: 100%;
    display: flex;

    width: 100%;
    justify-content: space-around;
    align-items: center;

    & > li {
      &:last-child {
        margin-right: 1rem;
      }

      &:first-child {
        margin-left: 1rem;
      }

      height: 100%;
      //border: 2px solid var(--menu-shadow);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: center;
      padding: 0;
      margin: 0 auto;
      //margin-left: 1rem;
      //margin-right: 1rem;
      & > a {
        border-radius: 4px;
        color: var(--text-color);
        font-size: var(--text-size-normal);
        margin-top: 0;
        margin-bottom: 0;
        padding: 0 1em;
        //color: #666;
        text-decoration: none;
        height: 100%;
        text-align: center;
        text-justify: auto;
        position: relative;

        &:hover {
          color: #6446a1;
          text-decoration: underline;
          //transition: background 1s ease-in-out;
          //background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3));
        }

        &::before {
          transition: border 100ms ease-in-out;
          content: "";
          bottom: 0;
          left: 0;
          height: 100%;
          width: 100%;
          position: absolute;
          border-left: 2px solid var(--menu-shadow);
          border-right: 2px solid var(--menu-shadow);
        }

        &:hover::before {
          content: " ";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          //background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3));
          z-index: 100;
          pointer-events: auto;
          border-left: 2px solid white;
          border-right: 2px solid white;
        }
      }
    }
  }
`;

const ArticleColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  margin-bottom: auto;

  & > :not(h1, h2, h3, h4, h5, h6) {
    align-self: start;
    padding: 1rem;
  }
`;

const Img = styled.img`
  //object-fit: contain;
  width: 100% !important;
  //position: relative !important;
  //height: unset !important;
  //border-radius: 11px;
  padding-top: 2rem;
`;
const PortraitWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: auto;
`;
const PortraitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: auto;

  & span {
    position: unset !important;
  }

  //& > .image {
  //  object-fit: contain;
  //  width: 100% !important;
  //  position: relative !important;
  //  height: unset !important;
  //}
  //padding: 1.5em;
`;
const HomePageLayout = styled.div`
  padding-top: 1em;
  width: 88vw;
  grid-gap: 1rem;
  display: grid;
  @media (max-width: 48rem) {
    grid-template-columns: 1fr;
    width: 100%;
  }
  @media (min-width: 48rem) {
    grid-template-columns: 66% 33%;
    grid-template-rows: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

//noinspection JSUnusedGlobalSymbols
export default Home;
