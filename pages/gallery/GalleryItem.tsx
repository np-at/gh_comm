import React, { Fragment } from "react";
import { useId } from "react-id-generator";
import styled from "styled-components";
import parse from "react-html-parser";

export interface GalleryItemProps {
  id: number;
  title: string;
  body: string;
  image: string;
  image_alt: string;
  card_type?: "white" | "black";
}

const GalleryItemPreview: React.FC<GalleryItemProps> = ({
  id,
  title,
  body,
  image,
  image_alt,
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
        {/*< dangerouslySetInnerHTML={{ __html: body }} />*/}
      </div>
      <img src={image} alt={image_alt} />
    </article>
  );
};
const GalleryItemWrapper = styled.article`
  & {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column-reverse;
  }

  &:nth-of-type(odd) img {
    align-self: flex-end;
  }

  @media only screen and (min-width: 768px) {
    &:nth-of-type(odd) img {
      align-self: auto;
    }
  }

  &:nth-of-type(odd) .content {
    margin-right: 2rem;
    margin-left: 1rem;
  }

  @media only screen and (min-width: 768px) {
    &:nth-of-type(odd) .content {
      margin-left: -2rem;
      margin-right: 1rem;
    }
  }

  &:nth-of-type(even) .content {
    margin-right: 1rem;
    margin-left: 2rem;
  }

  @media only screen and (min-width: 768px) {
    &:nth-of-type(even) .content {
      margin-left: -2rem;
      margin-right: 1rem;
    }
  }

  & .content {
    padding: 2rem 2rem 1rem;
    background: #cccccc;
    color: #333333;
    font-size: 1.125rem;
    margin-top: -1.25rem;
  }

  & .content a {
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

  & .content a:focus,
  article .content a:hover {
    color: #9e009e;
    background: white;
    outline: 4px solid #9e009e;
  }

  @media only screen and (min-width: 768px) {
    & .content {
      padding: 1rem 2rem 1rem 4rem;
      margin-top: 1.25rem;
    }
  }

  & img {
    flex-basis: 200px;
    flex-grow: 0;
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    object-fit: cover;
    box-shadow: 10px 10px #000000;
  }

  &.black img {
    box-shadow: 10px 10px #ffffff;
  }
`;

export default GalleryItemPreview;