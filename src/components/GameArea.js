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
            required={true}
            title="please provide a name"
          ></input>
          <button
            onClick={async () => {
              createScore(inputThing, totalTime);
            }}
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="game-area-container">
      {/* checking length is less elegant, but faster, than using isGameOver below */}
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
