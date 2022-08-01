import React, { useRef } from "react";
import ReactDOM from "react-dom";

export const Modal = ({ setShowModal, clientClickPosition }) => {
  const useModalRef = useRef();
  const closeModal = (e) => {
    if (e.target === useModalRef.current) {
      setShowModal(false);
    }
  };

  const screenWidth = window.innerWidth;
  const isOverflowingScreen = screenWidth * 0.6 < clientClickPosition.x;
  const avoidOverflow = clientClickPosition.x * 0.5;

  const modalLocation = {
    left: isOverflowingScreen
      ? avoidOverflow + "px"
      : clientClickPosition.x + "px",
    top: clientClickPosition.y + "px",
  };

  //   Renders modal to the portal in index.html

  return ReactDOM.createPortal(
    <div className="modal-container" ref={useModalRef} onClick={closeModal}>
      <div className="modal" style={modalLocation}>
        <span>Who's that?</span>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
