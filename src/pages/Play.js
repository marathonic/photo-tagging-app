import BountyBar from "../components/Header";
import GameArea from "../components/GameArea";
import { useState } from "react";
import { Modal } from "../components/Modal";

export default function Play({
  openModal,
  setLastClickPosition,
  setClientClickPosition,
  setLastFound,
  allPositions,
  previouslyFound,
  showModal,
  setShowModal,
  lastClickPosition,
  clientClickPosition,
  lastFound,
  setPreviouslyFound,
}) {
  console.log(allPositions);

  const clickPosition = (e) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    console.log("Coordinates clicked: ");
    console.log(xCoord, yCoord);

    for (let i = 0; i < allPositions.length; i++) {
      const curr = allPositions[i];
      if (curr.xMin <= xCoord && xCoord <= curr.xMax) {
        if (curr.yMin <= yCoord && yCoord <= curr.yMax) {
          setLastFound(curr.name);
        }
      }
    }

    setLastClickPosition({
      x: xCoord,
      y: yCoord,
    });
    openModal();

    var rect = e.target.getBoundingClientRect(); // get some position, scale,... properties of the item
    let mousePos = { x: 0, y: 0 };
    mousePos.x = e.clientX - rect.left; // get the mouse position relative to the element
    mousePos.y = e.clientY - e.target.scrollTop; //

    console.log(window.innerWidth);
    setClientClickPosition({ x: mousePos.x, y: mousePos.y });
  };

  return (
    <>
      {/* We don't need a BountyBar here!!! We'll have Navbar. */}
      {/* ^We don't need a BountyBar here!!! We'll have Navbar. */}
      {/* So do we even  need a separate <GameArea /> ? We could just do all that right here */}
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          lastClickPosition={lastClickPosition}
          clientClickPosition={clientClickPosition}
          allPositions={allPositions}
          lastFound={lastFound}
          previouslyFound={previouslyFound}
          setPreviouslyFound={setPreviouslyFound}
        />
      ) : null}
      <GameArea clickPosition={clickPosition} openModal={openModal} />
    </>
  );
}
