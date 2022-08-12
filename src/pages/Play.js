import GameArea from "../components/GameArea";
import { useEffect } from "react";
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
  clientClickPosition,
  lastFound,
  setPreviouslyFound,
  setStartTime,
  setEndTime,
  setIsGameOver,
  setMyScore,
  totalTime,
  setTotalTime,
}) {
  // Reset everything to start a new game when page loads.
  useEffect(() => {
    setPreviouslyFound([]);
    setLastFound("");
    setIsGameOver(false);
    setEndTime(0);
    setMyScore(0);
    setTotalTime(0);
  }, [
    setPreviouslyFound,
    setLastFound,
    setIsGameOver,
    setEndTime,
    setMyScore,
    setTotalTime,
  ]);

  useEffect(() => {
    setStartTime(new Date());
  }, [setStartTime]);

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
    let clickPos = { x: 0, y: 0 };
    clickPos.x = e.clientX - rect.left; // get the click's position relative to the element
    clickPos.y = e.clientY - e.target.scrollTop; //

    console.log(window.innerWidth);
    setClientClickPosition({ x: clickPos.x, y: clickPos.y });
  };

  return (
    <>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          clientClickPosition={clientClickPosition}
          allPositions={allPositions}
          lastFound={lastFound}
          previouslyFound={previouslyFound}
          setPreviouslyFound={setPreviouslyFound}
        />
      ) : null}
      <GameArea
        clickPosition={clickPosition}
        previouslyFound={previouslyFound}
        setShowModal={setShowModal}
        totalTime={totalTime}
      />
    </>
  );
}
