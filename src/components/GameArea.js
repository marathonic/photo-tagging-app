import { useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import profaneWords from "profane-words";

export default function GameArea({
  clickPosition,
  previouslyFound,
  setShowModal,
  totalTime,
  setPreviouslyFound,
  setLastFound,
  setIsGameOver,
  setEndTime,
  setMyScore,
  setTotalTime,
}) {
  const [conditionalDisabled, setConditionalDisabled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  // x profane word:
  // const arg = process.argv[2];

  async function createScore(name, score) {
    if (name.trim() === "") {
      // alert("empty input");
      return;
    }

    if (profaneWords.includes(name.toLowerCase())) {
      name = "bonk";
    }
    await addDoc(collection(db, "scores"), {
      name: name,
      score: score,
    });

    goToScores();
  }

  const goToScores = () => {
    setConditionalDisabled(true);
    navigate("/scores");
  };

  const VictoryModal = () => {
    const [inputThing, setInputThing] = useState("");

    const handleChange = (e) => {
      const val = e.target.value;
      // if (val.trim() !== "") {
      //   setIsButtonDisabled(false);
      // }
      // if (val.trim() !== "") {
      //   setIsButtonDisabled(false);
      // }
      setInputThing(val);
    };
    // Should we setEndTime here? I think it's better if we do that over in Modal.js, Line 54 or 53
    useEffect(() => {
      setShowModal(false);
      setConditionalDisabled(false);
    }, []);

    let inSeconds = (totalTime / 1000).toFixed(2);
    let formattedSeconds = inSeconds + " s";
    const conditionalEmphasis = {
      border: isButtonDisabled ? "crimson 4px solid" : "",
      borderRadius: isButtonDisabled ? "6px" : "",
    };

    const conditionalBtnStyle = {
      opacity: isButtonDisabled ? "90%" : "",
      // backgroundColor: isButtonDisabled ? "transparent" : "",
    };

    return (
      <div className="victory-modal-container">
        <div className="victory-modal">
          <h5>You win!</h5>
          <span className="stopwatch-span">
            <BsStopwatch /> {formattedSeconds}
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
            disabled={conditionalDisabled}
            style={conditionalEmphasis}
            required={true}
            title="please provide a name"
          ></input>
          {/* <button onClick={async () => handleNew()}>OK</button> */}
          <button
            disabled={isButtonDisabled}
            style={conditionalBtnStyle}
            onClick={async () => {
              createScore(inputThing, totalTime);
            }}
          >
            {isButtonDisabled ? "Enter name to proceed" : "OK"}
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
