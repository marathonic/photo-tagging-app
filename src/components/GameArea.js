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
}) {
  const [conditionalDisabled, setConditionalDisabled] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const navigate = useNavigate();

  async function createScore(name, score) {
    if (name.trim() === "") {
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

      const limit = 18;
      setInputThing(val.slice(0, limit));
    };
    useEffect(() => {
      setShowModal(false);
      setConditionalDisabled(false);
    }, []);

    let inSeconds = (totalTime / 1000).toFixed(2);
    let formattedSeconds = inSeconds + " s";
    const conditionalEmphasis = {
      border: isInputEmpty ? "crimson 4px solid" : "",
      borderRadius: isInputEmpty ? "6px" : "",
    };

    const conditionalBtnStyle = {
      opacity: isInputEmpty ? "90%" : "",
    };

    return (
      <div className="victory-modal-container">
        {/* ________________________________PLEASE READ: */}
        {/* WE TRIED TO RENDER THIS CONDITIONALLY,
        a bunch of different ways, like creating [isLoading, setIsLoading]
        and checking that before rendering either this below, or, a div 
        that said "Loading...". That div never showed up!
        Look into implementing a loading animation if possible. */}
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
          <button
            style={conditionalBtnStyle}
            onClick={async () => {
              createScore(inputThing, totalTime);
            }}
          >
            {isInputEmpty ? "Enter name to proceed" : "OK"}
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
        border="0"
        width={"100%"}
        alt=""
        onClick={clickPosition}
      />
    </div>
  );
}
