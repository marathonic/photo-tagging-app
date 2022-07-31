import Header from "../components/Header";
import GameArea from "../components/GameArea";
import { useState } from "react";

export default function Play() {
  const [positionX, setPositionX] = useState(0);
  const [showSelectionModal, setShowSelectionModal] = useState(false);

  const clickPosition = (e) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    const matchesX = xCoord >= 74 && xCoord <= 82;
    const matchesY = yCoord >= 83 && xCoord <= 91;
    if (matchesX && matchesY) {
      console.log("You found Rogue!");
    }

    setPositionX(xCoord);
  };

  return (
    <>
      {/* We don't need a header here!!! We'll have Navbar. */}
      <Header />
      {/* ^We don't need a header here!!! We'll have Navbar. */}
      {/* So do we even  need a separate <GameArea /> ? We could just do all that right here */}
      <GameArea clickPosition={clickPosition} positionX={positionX} />
    </>
  );
}
