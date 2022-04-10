import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { NextPageWithLayout } from "../_app.page";
import { SRSpan } from "@components/Reusable/SROnly";

const Contact: NextPageWithLayout<{}> = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <h1>Contact</h1>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        doloremque, quidem quisquam, quisquam quisquam quisquam quisquam
        dignissimos.
      </p>
      <StyledModal
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        aria={{ modal: true }}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <ModalCloseButton onClick={() => setModalIsOpen(false)}>
          <span aria-hidden={true}>X</span>
          <SRSpan>Close Dialog</SRSpan>{" "}
        </ModalCloseButton>
        <h2>Modal</h2>
        <div>Hiya Folks!</div>
      </StyledModal>
    </div>
  );
};
const ModalCloseButton = styled.button`
  //z-index: 10000;
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
export default Contact;
