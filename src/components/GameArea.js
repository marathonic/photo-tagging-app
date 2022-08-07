import { useEffect } from "react";

export default function GameArea({
  clickPosition,
  showSelectionModal,
  openModal,
  previouslyFound,
  allPositions,
  setShowModal,
  isGameOver,
}) {
  const VictoryModal = () => {
    useEffect(() => {
      setShowModal(false);
    }, []);

    return (
      <div className="victory-modal-container">
        <div className="victory-modal">
          <h5>You win!</h5>
          <img
            src="https://www.pngmart.com/files/12/Cute-Corgi-Dog-Transparent-Background.png"
            className="victory-pupper"
            alt="a corgi dog"
          />
          <p>*boop*</p>
          <input placeholder="your name here" className="victory-input"></input>
          <button>OK</button>
        </div>
      </div>
    );
  };

  return (
    <div className="game-area-container">
      {/* Try switching below to {previouslyFound.length === allPositions.length ? <VictoryModal /> : null};
      It should behave the same, but would avoid hard coding */}
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
