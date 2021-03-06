import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import type { NextPageWithLayout } from "../_app.page";
import { SRSpan } from "@components/Reusable/SROnly";
import RowDiv, { FlexRow } from "@components/Layout/Row";
import HorizontalTimeline from "@components/TimelineView/Parts/HorizontalTimeline";
import useResize from "@lib/hooks/useResize";

const VALUES = [
  "2008-06-01",
  "2010-06-01",
  "2013-06-01",
  "2015-03-01",
  "2019-01-01",
  "2019-06-17",
  "2019-08-01"
];
const Contact: NextPageWithLayout<{}> = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [timelineValue, setTimelineValue] = useState(0);
  const [_timelinePreviousValue, setTimelinePreviousValue] = useState(0);

  const [elementDimensions, setElementDimensions] = useState({ width: 500, height: 600 });

  const {ref:wrapperRef} = useResize<HTMLDivElement>({
   default: {
     width: 500,
     height: 300
   },
   onResize: setElementDimensions
  })
//
//  useEffect(() => {
//    const observer = new ResizeObserver((entries) => {
//      console.log("entries", entries);
//      if (entries[0].borderBoxSize) {
//        const { inlineSize, blockSize } = entries[0].borderBoxSize[0];
//        setElementDimensions({ width: inlineSize, height: blockSize })
//      } else {
//        const { width, height } = entries[0].contentRect;
//        setElementDimensions({ width, height });
//      }
//    });
//    if (wrapperRef.current) {
//      observer.observe(wrapperRef.current);
//    }
//    return () => {
//      observer.disconnect();
//    };
//  }, [wrapperRef]);

  return (
    <div>
      <h1>Contact</h1>
      <RowDiv>
        <h1>Probably going to deprecate this page, not sure if it&apos;s worth it.</h1>
      </RowDiv>
      <RowDiv style={{ textAlign: "center" }}>
        <button type={"button"} data-test={"modal_button"} onClick={() => setModalIsOpen(true)}>
          Open Modal
        </button>
      </RowDiv>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam doloremque, quidem
        quisquam, quisquam quisquam quisquam quisquam dignissimos.
      </p>
      <StyledModal
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        aria={{ modal: true }}
        onRequestClose={() => setModalIsOpen(false)}>
        <ModalCloseButton onClick={() => setModalIsOpen(false)}>
          <span aria-hidden={true}>X</span>
          <SRSpan>Close Dialog</SRSpan>
        </ModalCloseButton>
        <h2>Modal</h2>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam doloremque, quidem
            quisquam, quisquam quisquam quisquam quisquam dignissimos.
          </p>
        </div>
      </StyledModal>
      <FlexRow >
        {/* Bounding box for the Timeline */}
        <div ref={wrapperRef} style={{ width: "70%"}}>
          <HorizontalTimeline
            containerWidth={elementDimensions.width}
            containerHeight={elementDimensions.height}
            index={timelineValue}
            indexClick={(index) => {
              setTimelinePreviousValue(timelineValue);
              setTimelineValue(index);
            }}
            values={VALUES}
          />
        </div>
      </FlexRow>
    </div>
  );
};
const ModalCloseButton = styled.button`
  position: absolute;
  align-items: unset;
  justify-content: unset;
  right: 0;
  border: none;
  background: none;
  color: #000;
  font-size: 1.5rem;
  padding: 0;
  margin: 0 1em 0 0;
  cursor: pointer;
`;
const StyledModal = styled(ReactModal)`
  background-color: #fff;
  color: #000;
  padding: 20px;
  width: 50%;
  height: 50%;
  margin: auto;
  border-radius: 10px;
  text-align: center;
  z-index: 100;
  top: 20%;
  //left: 20%;
  position: sticky;
`;
// noinspection JSUnusedGlobalSymbols
export default Contact;
