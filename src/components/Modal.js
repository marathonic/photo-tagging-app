import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { GiCheckMark } from "react-icons/gi";

export const Modal = ({
  setShowModal,
  clientClickPosition,
  allPositions,
  lastFound,
  previouslyFound,
  setPreviouslyFound,
  setIsGameOver,
}) => {
  const useModalRef = useRef();
  const closeModal = (e) => {
    if (e.target === useModalRef.current) {
      setShowModal(false);
    }
  };

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const isOverflowingScreen = screenWidth * 0.52 < clientClickPosition.x;
  const isOverflowingScreenY = screenHeight * 0.71 < clientClickPosition.y;
  const avoidOverflow = clientClickPosition.x * 0.5;
  const avoidOverflowY = clientClickPosition.y * 0.75;

  const modalLocation = {
    left: isOverflowingScreen
      ? avoidOverflow + "px"
      : clientClickPosition.x + "px",
    top: isOverflowingScreenY ? avoidOverflowY : clientClickPosition.y + "px",
  };

  // const validateFind = (e) => {
  //   // Get the name of the person from the "alt" attr
  //   const selectedPerson = e.target.alt;
  //   if (lastFound !== selectedPerson) {
  //     return;
  //   } else if (previouslyFound.includes(selectedPerson)) {
  //     return;
  //   }
  //   setPreviouslyFound((prevFound) => [...prevFound, selectedPerson]);
  // };

  const newValidation = (selection) => {
    const selectedPerson = selection;
    if (lastFound !== selectedPerson) {
      return;
    } else if (previouslyFound.includes(selectedPerson)) {
      return;
    }
    setPreviouslyFound((prevFound) => [...prevFound, selectedPerson]);
    if (previouslyFound.length === allPositions.length) {
      setIsGameOver(true);
    }
  };

  console.log("previouslyFound: ");
  console.log(previouslyFound);
  const thumbnails = allPositions.map((person) => {
    return (
      <div
        className="person-preview"
        key={person.id}
        onClick={() => newValidation(person.name)}
      >
        <img
          src={person.thumbnail}
          alt={person.name}
          className="thumbnail"
          // onClick={validateFind}
        />
        <span className="person-name-span">{person.name}</span>
        {previouslyFound.includes(person.name) && (
          <span>
            <GiCheckMark color="green" />
          </span>
        )}
      </div>
    );
  });

  return ReactDOM.createPortal(
    <div className="modal-container" ref={useModalRef} onClick={closeModal}>
      <div className="modal" style={modalLocation}>
        <h4>Who's that?</h4>
        <div className="thumbnails-div">{thumbnails}</div>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
