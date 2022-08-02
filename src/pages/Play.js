import Header from "../components/Header";
import GameArea from "../components/GameArea";
import { useState } from "react";

export default function Play({
  openModal,
  setLastClickPosition,
  lastClickPosition,
  setClientClickPosition,
  lastFound,
  setLastFound,
}) {
  const clickPosition = (e) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    // we could bundle these into const rogue
    // We want to rework this logic to work alongside our Firebase integration
    // Loop over each object in our database, and
    // if the click coordinates here match those values,
    // get the [name] value, which will be 'rogue' in this case.
    // reworked: const matchesX = xCoord >= myObj.xMin && myObj.xCoord <= xMax;
    // reworked: const matchesY = yCoord >= myObj.yMin && yCoord <= myObj.yMax;
    // reworked: if (matchesX && matchesY) {
    // reworked: console.log(`You found ${myObj.name}!`); // <--- "You found rogue!"
    // reworked: setLastFound(myObj.name); // <--- lastFound === 'rogue'
    // reworked: }
    const matchesX = xCoord >= 74 && xCoord <= 82;
    const matchesY = yCoord >= 83 && xCoord <= 91;
    if (matchesX && matchesY) {
      console.log("You found Rogue!");
      setLastFound("rogue");
    }

    setLastClickPosition({
      x: xCoord,
      y: yCoord,
    });
    openModal();

    // new code:
    var rect = e.target.getBoundingClientRect(); // get some position, scale,... properties of the item
    let mousePos = { x: 0, y: 0 };
    mousePos.x = e.clientX - rect.left; // get the mouse position relative to the element
    mousePos.y = e.clientY - e.target.scrollTop; //

    // test console log
    console.log(window.innerWidth);
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
