import React, { useRef } from "react";
import ReactDOM from "react-dom";

export const Modal = ({ setShowModal, clientClickPosition, allPositions }) => {
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

  // map
  // we could store the data locally
  const thumbnails = allPositions.map((person) => {
    return (
      <div className="person-preview">
        <img src={person.thumbnail} alt={person.name} className="thumbnail" />
        <span>{person.name}</span>
      </div>
    );
  });

  return ReactDOM.createPortal(
    <div className="modal-container" ref={useModalRef} onClick={closeModal}>
      <div className="modal" style={modalLocation}>
        {/* Who's that?
            map over each individual in allPositions and display their image, like:
            <img src={person.thumbnail} alt={person.name}/>  
        */}
        <h4>Who's that?</h4>
        <div className="thumbnails-div">{thumbnails}</div>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
