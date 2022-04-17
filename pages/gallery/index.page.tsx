import React, { Fragment } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextPageWithLayout } from "../_app.page";
import GalleryItemPreview, { GalleryItemProps } from "./GalleryItem";
import { getGalleryItems } from "./_gallery_helpers";
import styled from "styled-components";
import Head from "next/head";

interface GalleryPageProps {
  items: GalleryItemProps[];
}

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
  const galleryItems = getGalleryItems();
  // console.debug("galleryItems", galleryItems);
  return {
    props: {
      title: "Gallery",
      description: "Gallery page description",
      items: galleryItems
    }
  };
};

const GalleryPage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
  items
}) => {
  return (
    <Fragment>
      <Head>
        <title>Gallery</title>
        <meta name="description" content="Gallery du Dmitri" />
      </Head>
      <GalleryCardsWrapper>
        <h1>Galerie du Dmitri</h1>
        {items.map((x) => (
          <GalleryItemPreview {...x} key={x.title} />
        ))}
      </GalleryCardsWrapper>
    </Fragment>
  );
};
const GalleryCardsWrapper = styled.div`
  //@imporkt url("https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700;800&&display=swap");
  //@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap");
  //background: #666666;
  max-width: 1000px;
  box-sizing: border-box;
  font-family: "EB Garamond", serif;
  font-weight: 500;
  line-height: 1.5;
  font-size: 16px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Oswald", sans-serif;
    font-weight: 500;
  }

  h1 {
    margin-left: 1rem;
    color: #dcc6e0;
    font-size: 3rem;
    font-weight: 400;
  }

  h2 {
    text-align: start;
  }

  article {
    text-align: start;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column-reverse;
  }

  article:nth-of-type(odd) img {
    align-self: flex-end;
  }

  @media only screen and (min-width: 768px) {
    article:nth-of-type(odd) img {
      align-self: auto;
    }
  }

  article:nth-of-type(odd) .content {
    margin-right: 2rem;
    margin-left: 1rem;
  }

  @media only screen and (min-width: 768px) {
    article:nth-of-type(odd) .content {
      margin-left: -2rem;
      margin-right: 1rem;
    }
  }

  article:nth-of-type(even) .content {
    margin-right: 1rem;
    margin-left: 2rem;
  }

  @media only screen and (min-width: 768px) {
    article:nth-of-type(even) .content {
      margin-left: -2rem;
      margin-right: 1rem;
    }
  }
  @media only screen and (min-width: 768px) {
    article {
      margin: 2rem 1rem;
      flex-direction: row-reverse;
    }
  }

  article .content {
    padding: 2rem 2rem 1rem;
    background: #cccccc;
    color: #333333;
    font-size: 1.125rem;
    margin-top: -1.25rem;
  }

  article .content a {
    display: inline-block;
    color: white;
    background: #333333;
    padding: 0.5rem;
    margin: 0.5rem 0;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1875rem;
    outline: 4px solid transparent;
    transition: color 0.6s ease-in-out, background 0.6s ease-in-out, outline 0.6s ease-in-out;
  }

  article .content a:focus,
  article .content a:hover {
    color: #9e009e;
    background: white;
    outline: 4px solid #9e009e;
  }

  @media only screen and (min-width: 768px) {
    article .content {
      padding: 1rem 2rem 1rem 4rem;
      margin-top: 1.25rem;
    }
  }

  article img {
    flex-basis: 200px;
    flex-grow: 0;
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    object-fit: cover;
    box-shadow: 10px 10px #000000;
  }

  article.black img {
    box-shadow: 10px 10px #ffffff;
  }
`;

// noinspection JSUnusedGlobalSymbols
export default GalleryPage;
