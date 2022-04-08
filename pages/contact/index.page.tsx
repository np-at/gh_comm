import React, { KeyboardEventHandler, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";


const Contact: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);


  // react-modal's built in Esc handler doesn't work, so we need to handle it ourselves
  const closeModal: KeyboardEventHandler = (ev) => {
    if (ev.key === "Escape") {
      ev.stopPropagation();
      setModalIsOpen(false);
    }
  };

  return (
    <div onKeyUp={closeModal}>
      <h1>Contact</h1>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        doloremque, quidem quisquam, quisquam quisquam quisquam quisquam
        dignissimos.
      </p>
      <StyledModal isOpen={modalIsOpen} shouldCloseOnEsc={true} shouldReturnFocusAfterClose={true}
                   shouldFocusAfterRender={true} shouldCloseOnOverlayClick={false}>
        <div>Hiya Folks!</div>
      </StyledModal>
    </div>
  );
};
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
`;
export default Contact;
