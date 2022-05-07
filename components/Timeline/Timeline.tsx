import React, { useLayoutEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { calculateDistribution } from "@components/Timeline/utils";
import useResize from "@lib/hooks/useResize";
import TimelineGuideO from "@components/Timeline/TimelineGuide0";
import TimelineItemP, { TimelineItempProps } from "@components/Timeline/TimelineItem";

export interface TimelineProps {
  items?: TimelineItempProps[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const [elementDimensions, setElementDimensions] = useState({ width: 500, height: 600 });

  const { ref: wrapperRef } = useResize<HTMLDivElement>({
    default: {
      width: 500,
      height: 300
    },
    onResize: setElementDimensions
  });
  const itemDist = useMemo(() => {
    if (!items) return [];
    return calculateDistribution(items);
  }, [items]);
  const [pointerIndex, setPointerIndex] = useState(0);
  const updatePointerIndex = (index: number) => {
    if (pointerIndex !== index) setPointerIndex(index);
  };
  return (
    <TimelineOuterWrapper ref={wrapperRef}>
      <GuideWrapper>
        {itemDist && (
          <TimelineGuideO
            containerHeight={elementDimensions.height * 2}
            itemDistribution={itemDist}
            currentIndex={pointerIndex}
          />
        )}
      </GuideWrapper>
      <TimelineInnerWrapper>
        <div>
          {itemDist &&
            itemDist.map((item, index) => {
              return (
                <TimelineItemP
                  id={item.id}
                  onHoverCallback={() => updatePointerIndex(index)}
                  key={`${item.title}-${index}`}
                  isFirst={index === 0}
                  isLast={index === itemDist.length - 1}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                />
              );
            })}
        </div>
      </TimelineInnerWrapper>
    </TimelineOuterWrapper>
  );
};

export interface TimelineItemDistributionProps extends TimelineItempProps {
  distribution: number;
  label: string;
}

export interface TimelineGuideDProps {
  containerHeight: number;
  itemDistribution: TimelineItemDistributionProps[];
  currentIndex: number;
}

const GuideWrapper = styled.div`
  top: 0;
  margin-top: 0;
  flex: none;
  overflow-y: scroll;
  overflow-x: clip;
  width: 10vw;
  min-width: 8em;
  display: block;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const TimelineOuterWrapper = styled.div`
  margin-right: 1rem;
  margin-left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
`;
const TimelineInnerWrapper = styled.div`
  //position: static;
  display: block;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    //height: 100%;
    padding-bottom: 5rem;
  }

  box-sizing: border-box;

  padding-top: 2em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  outline: 3px purple solid;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export default Timeline;
