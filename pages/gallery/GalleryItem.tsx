import React from "react";
import NextImageFix from "@components/Reusable/NextImageFix";

export interface GalleryItemProps {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  card_type?: "white" | "black";
}

const GalleryItemPreview: React.FC<GalleryItemProps> = ({
  id,
  title,
  body,
  image,
  imageAlt,
  card_type
}) => {


  return (
    <article aria-labelledby={id} className={card_type ?? "white"}>
      <div className="content">
        <h2 id={id}>{title}</h2>
        {body && <div dangerouslySetInnerHTML={{__html: body}}></div>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <NextImageFix src={image} alt={imageAlt} />
    </article>
  );
};

export default GalleryItemPreview;
