import React, { Fragment, useCallback, useEffect, useState } from "react";
import EventLine from "@components/TimelineView/Parts/EventLine";
import Events from "@components/TimelineView/Parts/Events";
import Faders from "@components/TimelineView/Parts/Faders";
import HorizontalTimelineButtons from "@components/TimelineView/Parts/HorizontalTimelineButtons";

import type { EventsBarProps } from "@components/TimelineView/Parts/EventsBarProps";

const EventsBar2: React.FC<EventsBarProps> = (props) => {
  const [touch, setTouch] = useState({
    coors: {
      x: 0,
      y: 0
    },
    isSwiping: false,
    started: false,
    threshold: 3
  });
  const [position, setPosition] = React.useState<number>(0);
  const [maxPosition, setMaxPosition] = React.useState<number>(
    Math.min(props.visibleWidth - props.totalWidth, 0)
  );

  const slideToPosition: (pos: number) => void = useCallback(
    (pos: number) => {
      // Never scroll to the right
      const maxPos = Math.min(props.visibleWidth - props.totalWidth, 0);
      setPosition(Math.max(Math.min(0, pos), maxPos));
      setMaxPosition(maxPos);
    },
    [props.totalWidth, props.visibleWidth]
  );
  const updateSlide = useCallback(
    (direction: string) => {
      if (direction === "ArrowRight" || direction === "right") {
        slideToPosition(position - props.visibleWidth + props.labelWidth);
      } else if (direction === "ArrowLeft" || direction === "left") {
        slideToPosition(position + props.visibleWidth - props.labelWidth);
      } else {
        console.error("bad direction of : ", direction);
      }
    },
    [position, props.labelWidth, props.visibleWidth, slideToPosition]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (props.isKeyboardEnabled) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          updateSlide(event.key);
        } else if (event.key === "ArrowUp") {
          props.indexClick(Math.min(props.index + 1, props.events.length - 1));
        } else if (event.key === "ArrowDown") {
          props.indexClick(Math.max(props.index - 1, 0));
        }
      }
    },
    [props, updateSlide]
  );

  const handleTouchStart: React.TouchEventHandler = (event) =>
    setTouch({
      coors: {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      },
      isSwiping: false,
      started: true,
      threshold: touch.threshold
    });
  const handleTouchMove: React.TouchEventHandler = (event) => {
    if (!touch.started) {
      handleTouchStart(event);
      return;
    }
    const touchObj = event.touches[0];
    const dx = Math.abs(touch.coors.x - touchObj.pageX);
    const dy = Math.abs(touch.coors.y - touchObj.pageY);

    const isSwiping = dx > dy && dx > touch.threshold;

    if (isSwiping || dx > touch.threshold || dy > touch.threshold) {
      const dX = touch.coors.x - touchObj.pageX; // amount scrolled
      setPosition(position - dX);
      setTouch({
        coors: {
          x: touchObj.pageX,
          y: touch.coors.y
        },
        isSwiping: isSwiping,
        started: touch.started,
        threshold: touch.threshold
      });
    }
    if (!isSwiping) return;
  };

  const handleTouchEnd: React.TouchEventHandler = (_) => {
    slideToPosition(position);
    setTouch({
      coors: {
        x: 0,
        y: 0
      },
      isSwiping: false,
      started: false,
      threshold: touch.threshold
    });
  };
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Might need to reduce dependency args
  useEffect(() => {
    const selectedEvent = props.events[props.index ?? 0];
    selectedEvent && slideToPosition(-(selectedEvent.distance - props.visibleWidth / 2));
  }, [props.events, props.index, props.visibleWidth, slideToPosition]);

  useEffect(() => {
    const selectedEvent = props.events[props.index];
    // position is always negative!
    const minVisible = position;

    const maxVisible = minVisible + props.visibleWidth;
    if (selectedEvent.distance > minVisible + 10 && selectedEvent.distance < maxVisible - 10) {
      //Make sure we are not outside the view
      slideToPosition(position);
    } else {
      //Try to center the selected index
      slideToPosition(-(selectedEvent.distance - props.visibleWidth / 2));
    }
  }, [position, props.events, props.index, props.visibleWidth, slideToPosition]);
  const _centerEvent = (index: number) => {
    const event = props.events[index];
    event?.distance && slideToPosition(-event.distance);
  };
  //  creating an array of list items that have an onClick handler into which
  //  passing the index of the clicked entity.
  // NOTE: Improve timeline dates handeling and eventsMinLapse handling
  const touchEvents = props.isTouchEnabled
    ? {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd
      }
    : {};

  // filled value = distane from origin to the selected event
  if (props.index < 0 || !props.events[props.index]) {
    console.warn("index is invalid!!!", props.index);
    console.warn("selected event is invalid!!!", props.events[props.index]);
  }
  // @ts-ignore
  const filledValue = props.events[props.index].distance - props.barPaddingLeft;
  const eventLineWidth = props.totalWidth - props.barPaddingLeft - props.barPaddingRight;

  return (
    <Fragment>
      {props.index != null && (
        <div
          style={{
            width: `${props.width}px`,
            height: `${props.height}px`
          }}
          {...touchEvents}>
          <div
            className="events-wrapper"
            style={{
              position: "relative",
              height: "100%",
              margin: "0 40px",
              overflow: "hidden"
            }}>
            <div
              className="events"
              style={{
                position: "absolute",
                left: 0,
                top: 49,
                height: 2,
                width: props.totalWidth,
                transition: "ease-in-out .3s transform",
                WebkitTransform: `translate3d(${position}, 0, 0)px`,
                transform: `translate3d(${position}px, 0, 0)`
              }}>
              <EventLine
                left={props.barPaddingLeft}
                width={eventLineWidth}
                backgroundColor={props.styles?.outline}
              />
              <EventLine
                left={props.barPaddingLeft}
                width={filledValue}
                backgroundColor={props.styles?.foreground}
              />
              <Events
                events={props.events}
                selectedIndex={props.index}
                styles={props.styles}
                handleDateClick={props.indexClick}
                labelWidth={props.labelWidth}
              />
            </div>
          </div>
          <Faders styles={props.styles} />
          <HorizontalTimelineButtons
            maxPosition={maxPosition}
            position={position}
            styles={props.styles}
            updateSlide={updateSlide}
          />
        </div>
      )}
    </Fragment>
  );
};

export default EventsBar2;
