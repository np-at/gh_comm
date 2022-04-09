import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { IComment } from "@interfaces/IComment";
import styled from "styled-components";

import { getMarkdownFileContentFromSlug, HomePageCMSFields } from "@lib/pages";

interface HomePageProps {
  comments: IComment[] | null;
  matterData: HomePageCMSFields;
}

//noinspection JSUnusedGlobalSymbols
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
      matterData: s,
    },
  };
};

const Home: NextPage<HomePageProps> = (props) => (
  <HomePageLayout>
    {/*<PortraitWrapper2><NextImageFix src={props.matterData.picture} alt={""} /></PortraitWrapper2>*/}
    <PortraitWrapper>
      <Img  src={props.matterData.picture} alt={""} />
    </PortraitWrapper>
    <ArticleColumn>
      <h1>{props.matterData.title}</h1>
      {props.matterData.body && (
        <div dangerouslySetInnerHTML={{ __html: props.matterData.body }} />
      )}
    </ArticleColumn>
  </HomePageLayout>
);

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
  //border-radius: 10px;
`;
const PortraitWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: auto;
`
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

  @media (min-width: 768px) {
    grid-template-columns: 66% 33%;
    grid-template-rows: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;
export default Home;
