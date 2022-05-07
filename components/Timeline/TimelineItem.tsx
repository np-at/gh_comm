import React, { MouseEventHandler, useCallback } from "react";
import styled from "styled-components";

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
export default TimelineItemP;