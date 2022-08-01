import Header from "../components/Header";
import GameArea from "../components/GameArea";
import { useState } from "react";

export default function Play({
  openModal,
  setLastClickPosition,
  lastClickPosition,
  setClientClickPosition,
}) {
  const clickPosition = (e) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    // we could bundle these into const rogue
    const matchesX = xCoord >= 74 && xCoord <= 82;
    const matchesY = yCoord >= 83 && xCoord <= 91;
    if (matchesX && matchesY) {
      console.log("You found Rogue!");
    }

    setLastClickPosition({
      x: xCoord,
      y: yCoord,
    });
    openModal();
    // We don't need an event listener bc we're already clicking on the image

    // new code:
    var rect = e.target.getBoundingClientRect(); // get some poition, scale,... properties of the item
    let mousePos = { x: 0, y: 0 };
    mousePos.x = e.clientX - rect.left; // get the mouse position relative to the element
    mousePos.y = e.clientY - rect.top;
    setClientClickPosition({ x: mousePos.x, y: mousePos.y });
  };

  return (
    <>
      {/* We don't need a header here!!! We'll have Navbar. */}
      <Header />
      {/* ^We don't need a header here!!! We'll have Navbar. */}
      {/* So do we even  need a separate <GameArea /> ? We could just do all that right here */}
      <GameArea clickPosition={clickPosition} openModal={openModal} />
    </>
  );
}
