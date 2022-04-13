import React from "react";
import { useId } from "react-id-generator";
import parse from "react-html-parser";

export interface GalleryItemProps {
  id: number;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  card_type?: "white" | "black" | undefined;
}

const GalleryItemPreview: React.FC<GalleryItemProps> = ({
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

  const ids = useId(1);
  return (
    <article aria-labelledby={ids[0]} className={card_type ?? "white"}>
      <div className="content">
        <h2 id={ids[0]}>{title}</h2>
        {parse(body)}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={imageAlt} />
    </article>
  );
};

export default GalleryItemPreview;
