import React, { useEffect } from "react";

// Decorators
// Components
// Helpers and constansts
import { cummulativeSeperation } from "../helpers";
import Constants from "../Constants";
import { TimelineEvent } from "@components/TimelineView/Parts/Events";
import EventsBar2 from "@components/TimelineView/Parts/EventsBar2";

/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @param _index
 * @return {string} The formatted date string
 */
const defaultGetLabel = (date: string, _index?: number) =>
  new Date(date).toDateString().substring(4);

/*
 * This is the Horizontal Timeline. This component expects an array of dates
 * just as strings (e.g. 1993-01-01) and layes them horizontaly on the the screen
 * also expects a callback which is activated when that particular index is
 * clicked passing that index along
 */
const HorizontalTimeline: React.FC<HorizontalTimelineProps> = (props) => {
  console.log("width", props.containerWidth);
  // Convert the date strings to actual date objects
  const dates = props.values.map((value) => new Date(value ?? ""));
  // Calculate the distances for all events
  const distances = cummulativeSeperation(
    dates,
    props.labelWidth ?? Constants.DATE_WIDTH,
    props.minEventPadding ?? Constants.MIN_EVENT_PADDING,
    props.maxEventPadding ?? Constants.MAX_EVENT_PADDING,
    props.linePadding ?? Constants.TIMELINE_PADDING
  );
  const getLabel = props.getLabel ?? defaultGetLabel;
  // Convert the distances and dates to events
  const events: TimelineEvent[] = distances.map((distance, index) => ({
    distance,
    label: (getLabel && getLabel(props.values[index], index)) ?? "invalid label",
    date: props.values[index],
  }));
  const [visibleWidth, setVisibleWidth] = React.useState<number>(props.containerWidth - 80);
  useEffect(() => {
    setVisibleWidth(props.containerWidth - 80);
  }, [props.containerWidth]);


  const totalWidth = Math.max(events[events.length - 1].distance + props.linePadding!!, visibleWidth);

  let barPaddingRight = 0;
  let barPaddingLeft = 0;
  if (!props.isOpenEnding) {
    barPaddingRight = totalWidth - events[events.length - 1].distance;
  }
  if (!props.isOpenBeginning) {
    barPaddingLeft = events[0].distance;
  }
  return (
    <EventsBar2
      width={props.containerWidth}
      height={props.containerHeight}
      events={events}
      isTouchEnabled={props.isTouchEnabled ?? defaultProps.isTouchEnabled}
      totalWidth={totalWidth}
      visibleWidth={visibleWidth}
      index={props.index}
      styles={props.styles ?? defaultProps.styles}
      indexClick={props.indexClick}
      labelWidth={props.labelWidth ?? defaultProps.labelWidth}
      fillingMotion={props.fillingMotion}
      barPaddingRight={barPaddingRight}
      barPaddingLeft={barPaddingLeft}
      isKeyboardEnabled={props.isKeyboardEnabled ?? defaultProps.isKeyboardEnabled}
    />
  );
};

/**
 * The expected properties from the parent
 * @type {Object}
 */

interface HorizontalTimelineProps  {
  index: number;
  values: string[];
  indexClick: (index: number) => void;
  getLabel?: (date: string, index: number) => string;
  minEventPadding?: number;
  maxEventPadding?: number;
  linePadding?: number;
  labelWidth?: number;
  styles?: any;
  fillingMotion?: any;
  slidingMotion?: any;
  isOpenBeginning?: boolean;
  isOpenEnding?: boolean;

  isTouchEnabled?: boolean;
  isKeyboardEnabled?: boolean;
  containerWidth: number;
  containerHeight: number;
}
/**
 * The values that the properties will take if they are not provided
 * by the user.
 * @type {Object}
 */
 const defaultProps = {
  // --- EVENTS ---
  getLabel: defaultGetLabel,
  // --- POSITIONING ---
  minEventPadding: Constants.MIN_EVENT_PADDING,
  maxEventPadding: Constants.MAX_EVENT_PADDING,
  linePadding: Constants.TIMELINE_PADDING,
  labelWidth: Constants.DATE_WIDTH,
  // --- STYLING ---
  styles: {
    outline: "#dfdfdf",
    background: "#f8f8f8",
    foreground: "#7b9d6f"
  },
  fillingMotion: {
    stiffness: 150,
    damping: 25
  },
  slidingMotion: {
    stiffness: 150,
    damping: 25
  },
  isOpenEnding: true,
  isOpenBeginning: true,
  // --- INTERACTION ---
  isTouchEnabled: true,
  isKeyboardEnabled: true
};
 HorizontalTimeline.defaultProps = defaultProps
export default HorizontalTimeline;
// export default Radium(dimensions({elementResize: true})(HorizontalTimeline));
//export default Radium(HorizontalTimeline);
