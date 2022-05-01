import React, { useEffect, useMemo, useRef, useState } from "react";
import { calculateSpacing } from "@components/Timeline/utils";
import { AiFillAlert } from "react-icons/ai";
import styled from "styled-components";
import type { TimelineGuideDProps } from "@components/Timeline/Timeline";

const TimelineGuideO: React.FC<TimelineGuideDProps> = ({
  itemDistribution,
  containerHeight,
  currentIndex
}) => {
  const [emHeight, setEmHeight] = useState(14);
  useEffect(() => {
    if (guideRef?.current) {
      setEmHeight(parseFloat(getComputedStyle(guideRef?.current).fontSize));
    }
  }, [containerHeight]);
  const itemSpacing = useMemo(
    () => calculateSpacing(itemDistribution, containerHeight, undefined, undefined, emHeight),
    [itemDistribution, containerHeight, emHeight]
  );
  // console.warn("itemSpacing", itemSpacing);
  const guideRef = useRef<HTMLDivElement>(null);
  const [pointerPosition, setPointerPosition] = useState(0);
  const pointerPositions = useMemo(() => {
    const spacing = calculateSpacing(
      itemDistribution,
      containerHeight,
      undefined,
      undefined,
      emHeight
    );
    const positions = [];
    let offset = 0;
    let ind = 0;
    for (let i = 0; i < spacing.length  ; i++) {
      const item = spacing[i];
      if (item.size) offset += item.size;
      if (item.content) {
        ind++;
        positions.push(offset - emHeight);
      }
    }
    return positions;
  }, [containerHeight, emHeight, itemDistribution]);
  useEffect(
    () => setPointerPosition(pointerPositions[currentIndex]),
    [currentIndex, pointerPositions]
  );
  // recalculate the pointer position as the absolute
  // distance from the top of the container
  // useEffect(() => {
  //   let offset = 0;
  //   let ind = 0;
  //   for (let i = 0; i < itemSpacing.length - 1; i++) {
  //     const item = itemSpacing[i];
  //     if (item.size) offset += item.size;
  //     if (item.content) {
  //       ind++;
  //       if (ind > currentIndex) {
  //         break;
  //       }
  //     }
  //   }
  //   if (currentIndex < itemDistribution.length - 1) {
  //     offset -= emHeight;
  //   }
  //   setPointerPosition(offset);
  //
  //   // setPointerPosition(itemDistribution[currentIndex].distribution * containerHeight);
  // }, [containerHeight, currentIndex, emHeight, itemDistribution, itemSpacing]);
  return (
    <TimelineGuide pointerHeight={pointerPosition} ref={guideRef}>
      {itemSpacing.map((v, i) => {
        return !v.content && v.size ? (
          <div key={i} style={{ height: v.size }} />
        ) : (
          <TimelineGuideItem key={`i-${v.content}`}>
            <a href={`#${v.id}`}>
              <AiFillAlert aria-hidden={true} />
              {v.content}
            </a>
          </TimelineGuideItem>
        );

        // return <TimelineGuideItem key={`i-${v.distribution}`}>{v.label}</TimelineGuideItem>;
      })}
    </TimelineGuide>
  );
};
const TimelineGuideItem = styled.div`
  width: 100%;
  display: flex;

  & > a {
    box-sizing: content-box;
    //position: relative;
    display: block;
    //width: 100%;
    //max-width: 30vw;
    margin-right: auto;
    height: 1em;
    //color: black;
    opacity: 1;
    pointer-events: auto;
    cursor: pointer;
  }
`;
const TimelineGuide = styled.div<{ pointerHeight: number }>`
  margin-top: 1em;
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
  border-left: 5px solid red;
  margin-left: 3px;

  & > div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    //border-left: 5px solid red;
    //margin-left: 3px;
    background: transparent url("/img/glyphs/t1.svg") no-repeat left;
    pointer-events: none;
  }

  & > :first-child > a::before {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    height: 1em;
    background-color: #ff7b72;
    left: 0;
    z-index: -1;
    transition: transform 0.3s ease-in-out;
    transform: translateY(${(props) => props.pointerHeight}px);
  }
`;

export default TimelineGuideO;
