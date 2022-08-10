import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import db from "../firebase";
import {
  onSnapshot,
  collection,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";

export default function GameArea({
  clickPosition,
  previouslyFound,
  setShowModal,
  startTime,
  setGameTime,
  myScore,
  setMyScore,
}) {
  // What do we need to do?
  // The code below just gives us 0.something seconds.
  // EDIT: READ MODAL LINE 55
  useEffect(() => {
    setMyScore(Math.abs(new Date() - startTime));
  }, [setMyScore, startTime]);

  const handleNew = async () => {
    const runtime = Math.abs(new Date() - startTime);
    const docRef = await addDoc(collection(db, "scores"), {
      name: "newTest",
      time: runtime,
    });
    setDoc(docRef);
  };

  async function createScore(name, score) {
    await addDoc(collection(db, "scores"), {
      name: name,
      score: score,
    });
  }

  const VictoryModal = () => {
    const [inputThing, setInputThing] = useState("");

    const handleChange = (e) => {
      setInputThing(e.target.value);
    };
    // Should we setEndTime here? I think it's better if we do that over in Modal.js, Line 54 or 53
    useEffect(() => {
      setShowModal(false);
    }, []);

    // Store myScore vars to our Firestore for comparison.
    // After sorting, re-use the code below to display
    //  each time in a human-readable way.
    // Update object to include the game time
    // But wait, we need a different collection!
    // Edit: We've created a "scores" collection in Firestore.
    // We need to figure out how to get the ID of the object inside of the scores collection.
    // So we're looking for: scores --> IDabcdefgID?? --> then, assign a time: value,
    // DUH we just create a new one!
    // Why can't we use await here?
    // Edit: Because this isn't an async function! We're moving all the code that was below here before to a function in App.js

    let inSeconds = (myScore / 1000).toFixed(2);
    let inMinutes = null;
    if (inSeconds > 60) {
      let mins = Math.floor(myScore / 6000);
      let secs = ((myScore % 6000) / 1000).toFixed(0);
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
          <input
            placeholder="Your Name"
            className="victory-input"
            value={inputThing}
            onChange={handleChange}
          ></input>
          {/* <button onClick={async () => handleNew()}>OK</button> */}
          <button onClick={async () => createScore(inputThing, myScore)}>
            OK
          </button>
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
