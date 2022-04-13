import React, { Fragment } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextPageWithLayout } from "../_app.page";
import GalleryItemPreview, { GalleryItemProps } from "./GalleryItem";
import { getContentDirectory } from "@lib/pages";
import path from "node:path";

interface GalleryPageProps  {
  items: GalleryItemProps[];
}

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
  const contentDir = path.join(getContentDirectory(), "gallery");

  return {
    props: {
      title: 'Gallery',
      description: 'Gallery page description',
      items: [],
    },
  };
};

const GalleryPage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({items}) => {
  return <Fragment>{items.map((x)=><GalleryItemPreview {...x} key={x.title} />)}</Fragment>;
};


export default GalleryPage;