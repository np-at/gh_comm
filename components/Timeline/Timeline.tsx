import React, { useCallback, useMemo, useState } from "react";
import type { MouseEventHandler } from "react";
import styled from "styled-components";
import { calculateDistribution } from "@components/Timeline/utils";
import useResize from "@lib/hooks/useResize";
import TimelineGuideO from "@components/Timeline/TimelineGuide0";

export interface TimelineProps {
  items?: TimelineItempProps[];
}

export interface TimelineItempProps {
  id?: string;
  isFirst?: boolean;
  isLast?: boolean;
  title: string;
  date: string;
  description: string;
  onHoverCallback?: MouseEventHandler<HTMLDivElement>;
}

const TimelineItemP: React.FC<TimelineItempProps> = ({
  title,
  date,
  description,
  onHoverCallback,
  id
}) => {
  const hoverHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (onHoverCallback) {
        onHoverCallback(e);
      }
    },
    [onHoverCallback]
  );
  return (
    <TimelineItem id={id} tabIndex={-1} onMouseOver={hoverHandler}>
      <TimelineItemContent>
        <TimelineItemTitle>
          <TimelineItemTitleText>{title}</TimelineItemTitleText>
          <TimelineItemTitleDate>{date}</TimelineItemTitleDate>
        </TimelineItemTitle>
        <TimelineItemDescription>
          <TimelineItemDescriptionText>{description}</TimelineItemDescriptionText>
        </TimelineItemDescription>
      </TimelineItemContent>
    </TimelineItem>
  );
};
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
  let lastUpdateTime = 0;
  const updatePointerIndex = (index: number) => {
    if (pointerIndex !== index) {
      setPointerIndex(index);
      lastUpdateTime = Date.now();
    }
  };
  return (
    <TimelineOuterWrapper ref={wrapperRef}>
      <TimelineGuideO
        containerHeight={elementDimensions.height}
        itemDistribution={itemDist}
        currentIndex={pointerIndex}
      />
      <TimelineInnerWrapper>
        {itemDist &&
          itemDist.map((item, index) => {
            return <TimelineItemP
              id={item.id}
              onHoverCallback={() => updatePointerIndex(index)}
              key={`${item.title}-${index}`}
              isFirst={index === 0}
              isLast={index === itemDist.length - 1}
              title={item.title}
              date={item.date}
              description={item.description}
            />;
          })}
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

const TimelineOuterWrapper = styled.div`
  margin-right: 1rem;
  margin-left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TimelineInnerWrapper = styled.div`
  box-sizing: content-box;
  //margin-top: 3rem;
  margin-bottom: 5rem;
  margin-left: 8rem;
  margin-right: auto;
  //padding: 3rem 5rem 10rem;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;
const TimelineItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  
  align-items: center;
  justify-content: center;
  margin: 20px auto 1rem auto;
  padding-left: 4em;
  padding-right: 4em;

`;
const TimelineItemContent = styled.div`
  outline: 1px solid black;


  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //margin-right: 3rem;
  //margin: 20px 13em 20px 3em;
  margin: 20px auto;
  padding-bottom: 1em;
  &:hover,&:focus,&:focus-within {
    outline: 3px solid black;
  }
`;
const TimelineItemTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const TimelineItemTitleText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const TimelineItemTitleDate = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const TimelineItemDescription = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const TimelineItemDescriptionText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export default Timeline;
