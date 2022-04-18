import React from "react";
import parse from "react-html-parser";
import NextImageFix from "@components/Reusable/NextImageFix";

export interface GalleryItemProps {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  card_type?: "white" | "black" | undefined;
}

const GalleryItemPreview: React.FC<GalleryItemProps> = ({
  id,
  title,
  body,
  image,
  imageAlt,
  card_type
}) => {
  // return (
  //   <div className="gallery-item">
  //     <img src={image} alt={title} />
  //     <div className="gallery-item-info">
  //       <h3>{title}</h3>
  //       <p>{description}</p>
  //     </div>
  //   </div>
  // );

  return (
    <article aria-labelledby={id} className={card_type ?? "white"}>
      <div className="content">
        <h2 id={id}>{title}</h2>
        {parse(body)}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <NextImageFix src={image} alt={imageAlt} />
    </article>
  );
};

export default GalleryItemPreview;
