import React from "react";

import Image, { ImageProps } from "next/image";
import styled from "styled-components";

const NextImageFix: React.FC<ImageProps> = ({ layout, alt, ...others }) => {
  if (layout) {
    console.warn("NextImageFix: layout prop is will be overwritten");
  }

  return (
    <NextImageWrapper>
      <Img layout={"fill"} alt={alt} {...others} />
    </NextImageWrapper>
  );
};
const Img = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;
const NextImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  & > span {
    position: unset !important;
  }
`;

export default NextImageFix;
