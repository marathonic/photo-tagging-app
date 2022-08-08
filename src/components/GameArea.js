import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function GameArea({
  clickPosition,
  showSelectionModal,
  openModal,
  previouslyFound,
  allPositions,
  setShowModal,
  isGameOver,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  const VictoryModal = () => {
    // Should we setEndTime here? I think it's better if we do that over in Modal.js, Line 54 or 53
    useEffect(() => {
      setShowModal(false);
    }, []);

    // Store timeDiff vars to our Firestore for comparison.
    // After sorting, re-use the code below to display
    //  each time in a human-readable way.
    const timeDiff = Math.abs(new Date() - startTime);

    // Update object to include the game time
    // But wait, we need a different collection!
    // Edit: We've created a "scores" collection in Firestore.
    // We need to figure out how to get the ID of the object inside of the scores collection.
    // So we're looking for: scores --> IDabcdefgID?? --> then, assign a time: value,
    // DUH we just create a new one!
    const scoreObjID = 
    const scoreRef = doc(db, "scores", );

    let inSeconds = (timeDiff / 1000).toFixed(2);
    let inMinutes = null;
    if (inSeconds > 60) {
      let mins = Math.floor(timeDiff / 6000);
      let secs = ((timeDiff % 6000) / 1000).toFixed(0);
      inMinutes = mins + "Min, " + secs < 10 ? "0" : "" + secs + "S";
    }

    return (
      <div className="victory-modal-container">
        <div className="victory-modal">
          <h5>You win!</h5>
          <span className="stopwatch-span">
            <BsStopwatch /> {inSeconds < 60 ? inSeconds + " s" : inMinutes}
          </span>
          <img
            src="https://www.pngmart.com/files/12/Cute-Corgi-Dog-Transparent-Background.png"
            className="victory-pupper"
            alt="a corgi dog"
          />
          <p>*boop*</p>
          <input placeholder="Your Name" className="victory-input"></input>
          <button>OK</button>
        </div>
      </div>
    );
  };

  return (
    <div className="game-area-container">
      {/* Try switching below to {previouslyFound.length === allPositions.length ? <VictoryModal /> : null};
      It should behave the same, but would avoid hard coding. Could also try _isGameOver ? <VictoryModal />_ again */}
      {previouslyFound.length === 4 ? <VictoryModal /> : null}
      <img
        id="img_ID"
        src="./superheroes-edit.jpg"
        // useMap="#superheroes-map"
        border="0"
        width={"100%"}
        alt=""
        onClick={clickPosition}
      />
    </div>
  );
}
