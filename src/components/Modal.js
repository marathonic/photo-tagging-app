import React, { useRef } from "react";
import ReactDOM from "react-dom";

export const Modal = ({ setShowModal }) => {
  const useModalRef = useRef();
  const closeModal = (e) => {
    if (e.target === useModalRef.current) {
      setShowModal(false);
    }
  };

  //   Renders modal to the portal in index.html

  return ReactDOM.createPortal(
    <div className="modal-container" ref={useModalRef} onClick={closeModal}>
      <div className="modal">
        <h2>This is a modal</h2>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
