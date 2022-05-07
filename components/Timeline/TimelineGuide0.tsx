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
    () => calculateSpacing(itemDistribution, containerHeight, 0, 20, emHeight),
    [itemDistribution, containerHeight, emHeight]
  );
  // console.warn("itemSpacing", itemSpacing);
  const guideRef = useRef<HTMLDivElement>(null);
  const [pointerPosition, setPointerPosition] = useState(0);
  const pointerPositions = useMemo(() => {

    const positions = [];
    let offset = 0;
    let ind = 0;
    for (const element of itemSpacing) {
      const item = element;
      if (item.size) offset += item.size;
      if (item.content) {
        ind++;
        positions.push(offset - emHeight);
      }
    }
    return positions;
  }, [emHeight, itemSpacing]);
  useEffect(() => {
    const newPosition = pointerPositions[currentIndex];
    console.log("newPosition", newPosition);
    setPointerPosition(newPosition);
    guideRef.current?.querySelectorAll('a')[currentIndex].scrollIntoView({behavior:"smooth", block: "center"});

  }, [currentIndex, pointerPositions]);
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
    <TimelineGuide
      pointerHeight={pointerPosition}
      viewStartOffset={0}
      viewHeight={800}
      ref={guideRef}>
      <div>
        {itemSpacing.map((v, i) => {
          return (!v.content && v.size) ? (
            <div key={`i-${i}`} style={{ height: v.size }} />
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
      </div>
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
const TimelineGuide = styled.div<{ pointerHeight: number, viewStartOffset: number, viewHeight: number }>`
  //margin-top: 1em;
  pointer-events: none;
  //padding-top: 3em;
  //padding-bottom: 3em;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props=>(props.viewHeight)}px;
  background-color: transparent;
  z-index: 1;
  border-left: 5px solid red;
  margin-left: 3px;
  & > div {
    height: 100%;
    transition: transform 1s ease-in-out;
    transform: translateY(-${props=>props.viewStartOffset ?? 0}px);
    & > div::before {
      content: " ";
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

    & > div:first-child::before {
      content: " ";
      position: absolute;
      top: 0;
      width: calc(100% - 0.2em);
      height: 1.2em;
      border-radius: 0.5em 0  0 0.5em;
      background: #ff7b72 url("/img/glyphs/t1.svg") left no-repeat;
      left: 0;
      z-index: -1;
      transition: transform 0.3s ease-in-out;
      transform: translateY(calc(${(props) => props.pointerHeight}px + 0.05em))  rotate(180deg);
    }
  }  //margin-bottom: 5rem;
 
`;

export default TimelineGuideO;
